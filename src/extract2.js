const fs = require('fs');

const babel = require('babel-core');

import babelGenerator from 'babel-generator';
import * as types from 'babel-types';


import parsing from './parsing';


const options = {
    functionMarker: 'i18n',
    elementMarker: 'I18N',
    whitelistedAttributes: {
        a:   ['href'],
        img: ['alt'],
        '*': ['title', 'placeholder', 'alt', 'summary'],
        'Pluralize': ['on'],
        'Match': ['when'],
    },
};

const whitelist = (function(wl) {
    const shared = wl['*'];
    return Object.keys(wl).reduce((whitelist, name) => {
        const attrs = wl[name];
        if (name !== '*') {
            wl[name] = attrs.concat(shared);
        }
        return wl;
    }, {'*': shared});
})(options.whitelistedAttributes);


// Error types

export function InputError(description, node) {
    Object.assign(this, {
        description,
        node,
        inputError: true
    });
}

function assertInput(condition, description, node) {
    if (!condition) {
        throw new InputError(description, node);
    }
}

function assertUnique(map, description, node) {
    const dupes = Object.entries(map).filter(
        ([key, value]) => value > 1
    );
    assertInput(dupes.length === 0,
        `${description}: ${dupes}`,
        node
    );
}


// Code generation

function generate(ast) {
    return babelGenerator(ast, {comments: false}).code;
}





// Function messages: i18n("Foo all the bars.")

function isFunctionMarker(callExpression) {
    return callExpression.callee.name === options.functionMarker;
}

function validateFunctionMessage(callExpression) {
    assertInput(
        callExpression.arguments.length === 1,
        `Expected exactly 1 argument to ${options.functionMarker}(), but got ${callExpression.arguments.length}`,
        callExpression
    );

    assertInput(
        callExpression.arguments[0].type === 'StringLiteral',
        `Expected a StringLiteral argument to ${options.functionMarker}(), but got ${callExpression.arguments[0].type}`,
        callExpression
    );
}

function extractFunctionMessage(callExpression) {
    return callExpression.arguments[0].value;
}


// Element messages: <I18N>Foo <span>all the</span> bars.</I18N>

function nodeName(node) {
    return generate(node.name);
}

function elementName(jsxElement) {
    return nodeName(jsxElement.openingElement);
}

function elementNamespaceOrName(jsxElement) {
    if (hasNamespacedName(jsxElement)) {
        return jsxElement.openingElement.name.namespace.name;
    } else {
        return elementName(jsxElement);
    }
}

function elementAttributes(jsxElement) {
    return jsxElement.openingElement.attributes;
}

function isElementMarker(jsxElement) {
    return elementName(jsxElement) === 'I18N';
}

function isTag(jsxElement) {
    return /^[a-z]|\-/.test(elementName(jsxElement));
}

function isComponent(jsxElement) {
    return !isTag(jsxElement);
}

function isSimpleExpression(expression) {
    if (expression.type === 'Identifier') {
        return true;
    } else if (expression.type === 'ThisExpression') {
        return true;
    } else if (expression.type === 'MemberExpression') {
        return !expression.computed && isSimpleExpression(expression.object);
    } else {
        return false;
    }
}

function hasNamespacedName(jsxElement) {
    return jsxElement.openingElement.name.type === 'JSXNamespacedName';
}

function hasI18nId(jsxElement) {
    return (
        hasNamespacedName(jsxElement) ||
        hasI18nIdAttribute(jsxElement)
    );
}

function hasI18nIdAttribute(jsxElement) {
    return elementAttributes(jsxElement).map(attributeName).includes('i18n-id');
}

function hasUnsafeAttributes(jsxElement) {
    return elementAttributes(jsxElement).some(a => attributeIsSanitized(jsxElement, a));
}

function i18nId(jsxElement) {
    if (hasNamespacedName(jsxElement)) {
        // It's names all the way down
        return jsxElement.openingElement.name.name.name;
    } else {
        const attr = elementAttributes(jsxElement)
            .find(a => attributeName(a) === 'i18n-id');
        if (attr) {
            assertInput(attr.value.type === 'StringLiteral',
                "i18n-id attribute found with non-StringLiteral value",
                jsxElement
            );
            return attr.value.value;
        }
    }
}

function convertToNamespacedName(jsxElement) {
    if (!hasNamespacedName(jsxElement)) {
        const name = elementName(jsxElement);
        const id = i18nId(jsxElement);
        if (id) {
            const nameAst = types.JSXNamespacedName(
                types.JSXIdentifier(name),
                types.JSXIdentifier(id)
            );
            jsxElement.openingElement.name = nameAst;
            if (jsxElement.closingElement) {
                jsxElement.closingElement.name = nameAst;
            }
        }
    }

    return elementName(jsxElement);
}


function incrementKey(map, key) {
    map[key] = (map[key] || 0) + 1;
}


const ExtractionValidationVisitor = {
    JSXElement(path) {
        // prevent nested markers
        assertInput(!isElementMarker(path.node),
            "Found a nested message marker",
            path.node
        );

        const elementName = convertToNamespacedName(path.node);
        if (hasUnsafeAttributes(path.node)) {
            if (isComponent(path.node)) {
                // keep track of custom components to ensure there are no duplicates
                incrementKey(this.validationContext.componentNamesAndIds, elementName);
            } else {
                // tags with sanitized attributes must have an i18n-id or namespace
                assertInput(
                    hasI18nId(path.node),
                    "Found a tag with sanitized attributes with no i18n-id",
                    path.node
                );
            }
        }
    },

    JSXAttribute(path) {
        // technically part of sanitization, but visitors are merged
        // for performance
        if (attributeIsSanitized(path.parentPath.parent, path.node)) {
            path.remove();
        }
    },

    JSXExpressionContainer(path) {
        if (path.parent.type === 'JSXElement') {
            assertInput(isSimpleExpression(path.node.expression),
                "Only identifiers and simple member expressions (foo.bar, " +
                "this.that.other) are allowed in <I18N> tags.",
                path.node
            );
        }
    },
};

function attributeName(jsxAttribute) {
    return nodeName(jsxAttribute);
}

function attributeIsSanitized(element, attribute) {
    const name = elementNamespaceOrName(element);
    const whitelistedAttributes = whitelist[name] || whitelist['*'];
    return (
        !whitelistedAttributes.includes(attributeName(attribute)) ||
        attribute.value.type !== 'StringLiteral'
    );
}


function extractElementMessage(jsxElement) {
    const messageWithContainer = generate(jsxElement);
    // HACK.
    return /<I18N>([\s\S]+?)<\/I18N>/.exec(messageWithContainer)[1].trim();
}

function validateElementContext(validationContext) {
    const dupes = Object.entries(validationContext.componentNamesAndIds).filter(
        ([key, value]) => value > 1
    );

    assertUnique(
        validationContext.componentsWithSanitizedAttributes,
        'Found the following duplicate elements/components',
        validationContext.root
    );

    assertUnique(
        validationContext.componentNamesAndIds,
        'Found the following duplicate elements/components',
        validationContext.root
    );
}

export function extractFromSource(src) {
    const messages = [];

    const plugin = function({types: t}, {opts} = {opts: {}}) {
        Object.assign(options, opts)
        return {
            visitor: {
                CallExpression({node: callExpression}) {
                    if (isFunctionMarker(callExpression)) {
                        validateFunctionMessage(callExpression);
                        messages.push(extractFunctionMessage(callExpression));
                    }
                },

                JSXElement(path) {
                    if (isElementMarker(path.node)) {
                        // Traverse with state of validationContext
                        const validationContext = {
                            root: path,
                            componentNamesAndIds: {},
                            componentsWithSanitizedAttributes: {},
                        };
                        path.traverse(ExtractionValidationVisitor, {validationContext});
                        validateElementContext(validationContext);
                        messages.push(extractElementMessage(path.node));
                    }
                },
            }
        }
    }

    parsing.transform(src, plugin);
    return messages;
}


export default function extractFromPaths(paths) {
    let messages = {};
    const ffmp = require('../bin/filesFromMixedPaths');

    ffmp(paths).forEach(path => {
        const src = fs.readFileSync(path, "utf-8");
        try {
            extractFromSource(src).forEach(msg => messages[msg] = msg);
        } catch(e) {
            console.error(path, e);
            if (e.stack) {
                console.error(e.stack);
            }
            if (e.node) {
                console.error("Error at", e.node.loc, generate(e.node));
            }
        }
    });

    return messages;
}
