"use strict";

var babel = require('babel');
var escodegen = require('escodegen-wallaby')


/*
 *
 *   Attribute whitelisting
 *
 */


// Each tag can have a specific list of attributes to extract,
// which is merged with the wildcard list.
let tagWhitelistedAttributes = {
    a:   ['href'],
    img: ['alt'],
    '*': ['title', 'placeholder', 'alt', 'summary']
};


// Return all whitelisted attribute names for this elementName
function whitelistedAttributeNames(elementName) {
    return (tagWhitelistedAttributes[elementName] || []).concat(tagWhitelistedAttributes['*']);
}


function extractableAttributes(element) {
    return elementAttributes(element).filter(
        a => isExtractableAttribute(element, a)
    );
}


function sanitizedAttributes(element) {
    return element.openingElement.attributes.filter(
        a => !isWhitelistedAttribute(element, a)
    );
}


function isWhitelistedAttribute(element, attribute) {
    let name = elementName(element);
    let elementWhitelistedAttributes = whitelistedAttributeNames(name);
    return elementWhitelistedAttributes.indexOf(attributeName(attribute)) !== -1;
}


// Reports if an attribute is both whitelisted and has an extractable value
// NOTE: Will warn to stderr if it finds a whitelisted attribute with no value
function isExtractableAttribute(element, attribute) {
    let value = attributeValue(attribute);
    let attributeIsWhitelisted = isWhitelistedAttribute(element, attribute);
    if (attributeIsWhitelisted && !value) {
        console.warn("Ignoring non-literal extractable attribute:", escodegen.generate(attribute));
    }
    return value && attributeIsWhitelisted;
}


// Reports if an element has any attributes to be sanitized
function hasUnsafeAttributes(element) {
    return sanitizedAttributes(element).length > 0;
}


/*
 *
 *   AST Manipulation
 *
 */


// Given an AST of either a MemberExpression or a JSXMemberExpression,
// return a dotted string (e.g. "this.props.value")
function memberExpressionName(name) {
    let segments = [];
    let iteratee = name;
    while (iteratee.type.endsWith('MemberExpression')) {
        segments.push(iteratee.property.name);
        iteratee = iteratee.object;
    }
    if (iteratee.type === 'ThisExpression') {
        segments.push('this');
    } else {
        segments.push(iteratee.name);
    }
    return segments.reverse().join('.');
}


// Return the name of a JSXElement
function elementName(element) {
    let name = element.openingElement.name;

    if (name.type === 'JSXIdentifier') {
        return name.name;
    } else if (name.type === 'JSXNamespacedName') {
        return `${name.namespace.name}:${name.name.name}`;
    } else if (name.type === 'JSXMemberExpression') {
        return memberExpressionName(name)
    } else {
        throw new Error("unknown elementName type: " + name.type);
    }
}


// Return the name of a JSXAttribute
function attributeName(attribute) {
    let name = attribute.name;

    if (name.type === 'JSXIdentifier') {
        return name.name;
    } else if (name.type === 'JSXNamespacedName') {
        return `${name.namespace.name}:${name.name.name}`;
    } else {
        throw new Error("unknown attributeName type: " + name.type);
    }
}


// Return if an element is a tag
function isTag(element) {
    return /^[a-z]|\-/.test(elementName(element));
}


// Return the value of a JSXAttribute
// Currently only works for Literals.
function attributeValue(attribute) {
    let value = attribute.value;

    switch (value.type) {
        case 'Literal':
            return value.value;
        break;

        default:
    }
}


// Return the attribute list of a JSXElement
function elementAttributes(element) {
    return element.openingElement.attributes;
}


// Find and return the value of the i18n-id attribute of a JSXElement
// NOTE: This throws an exception if it is not present on the element
function findIdAttribute(element) {
    return elementAttributes(element).filter(a => {
        return attributeName(a).toLowerCase() === 'i18n-id'
    })[0];
}


// Identify <I18N> tags
function isElementMarker(node) {
    return elementName(node) === 'I18N';
}


/*
 *
 *   Message Validation
 *
 */

function validateMessage(element) {
    let context = {
        root: element,
        componentsWithoutIds: {}
    };

    validateChildren(element.children, context);

    assertUniqueComponenets(context);
}

function assertUniqueComponenets(context) {
    return Object.values(context.componentsWithoutIds).every(count => count === 1);
}

function validateJSXElement(element, context) {
    if (isElementMarker(element)) {
        // TODO: unified error handling showing source of exception
        // and context, including line/character positions.
        throw new Error("Found a nested element marker in " + escodegen.generate(context.root));
    }
    if (isTag(element) && hasUnsafeAttributes(element)) {
        assertI18nId(element);
    } else {
        let name = elementName(element);
        let count = context.componentsWithoutIds[name];
        if (count === undefined) {
            context.componentsWithoutIds[name] = 0;
        } else {
            context.componentsWithoutIds[name]++;
        }
    }

    validateChildren(element.children, context);
}

function validateJSXExpressionContainer(container, context) {
    return container.type === 'Identifier'
        || container.type === 'ThisExpression'
        || (container.type === 'MemberExpression'
            && container.computed === false
            && validateJSXExpressionContainer(container.object, context));
}

function validateChildren(children, context) {
    children.forEach(child => {
        switch(child.type) {
            case 'JSXElement':
                validateJSXElement(child, context);
            break;

            case 'JSXExpressionContainer':
                validateJSXExpressionContainer(child, context);
            break;
        }
    })
}


/*
 *
 *   Message Extraction
 *
 */


function extractElementMessage(node) {
    return node.children.reduce((message, c) => {
        return message + extractChild(c)
    }, '')
}

function extractChild(child) {
    switch (child.type) {
        case 'Literal':
            return child.value;
        break;

        case 'JSXExpressionContainer':
            return extractExpression(child.expression);
        break;

        case 'JSXElement':
            return extractElement(child);
        break;

        default:
            throw new Error("Unexpected child type: " + child.type);
    }
}

function extractExpression(expression) {
    return `{${memberExpressionName(expression)}}`;
}


function extractElementAttribute(attribute) {
    return `${attributeName(attribute)}="${attributeValue(attribute)}"`;
}

function extractElementAttributes(element) {
    let attributesToExtract = extractableAttributes(element);

    return attributesToExtract.length
        ? ` ${attributesToExtract.map(extractElementAttribute).join(' ')}`
        : '';
}

function extractElement(element) {
    let name = elementName(element);
    if (sanitizedAttributes(element).length) {
        let i18nId = findIdAttribute(element);
        name = `${name}:${i18nId}`;
    }
    let attributes = extractElementAttributes(element);
    return `<${name}${attributes}>${extractElementMessage(element)}</${name}>`;
}


module.exports.extract = function extract(src) {
    const messages = [];
    let inMarker = false;

    function enterMarker() {
        if (inMarker) {
            throw new Error("Nested markers");
        }
        inMarker = true;
    }

    function leaveMarker() {
        inMarker = false;
    }

    let plugin = function({Plugin, t}) {
        return new Plugin('extraction', {
            visitor: {
                CallExpression(node, parent) {
                    if (node.callee.name === 'i18n') {
                        messages.push(node.arguments[0].value);
                    }
                },

                JSXElement: {
                    enter(node, parent) {
                        if (isElementMarker(node)) {  // <I18N>...
                            enterMarker();
                            validateMessage(node);
                            messages.push(extractElementMessage(node));
                        }
                    },

                    exit(node, parent) {
                        if (isElementMarker(node)) {  // ...</I18N>
                            leaveMarker();
                        }
                    }
                },

                // JSXAttribute(node, parent) {
                //     if (!inMarker) {
                //         if (extractableAttribute(node)) {
                //             messages.push(extractAttribute(node))
                //         }
                //     }
                // }
            }
        });
    };

    babel.transform(src, {
        plugins: [plugin]
    });

    return messages;
};
