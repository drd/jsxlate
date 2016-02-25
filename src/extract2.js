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
    return Object.entries(wl).reduce((whitelist, [name, attrs]) => {
        if (name !== '*') {
            wl[name] = attrs.concat(shared);
        }
        return wl;
    }, {'*': shared});
})(options.whitelistedAttributes);


// Error types

function InputError(description, node) {
    return {
        description,
        node,
        inputError: true
    };
}

function assertInput(condition, description, node) {
    if (!condition) {
        throw InputError(description, node);
    }
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

function elementAttributes(jsxElement) {
    return jsxElement.openingElement.attributes;
}

function isElementMarker(jsxElement) {
    return elementName(jsxElement) === 'I18N';
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

const JSXElementValidationVisitor = {
    JSXElement(path) {
        // prevent nested markers
        assertInput(!isElementMarker(path.node),
            "Found a nested message marker",
            path.node
        );

        // // ensure i18n-id is present if there are sanitized attributes
        // if (path.node.openingElement.attributes.some(
        //     a => attributeIsSanitized(path.node, a))
        // ) {
        //     assertInput(hasI18nId(path.node),
        //         "Element with sanitized attributes was missing an i18n-id",
        //         path.node
        //     );
        // }

        // keep count of name/id for duplicate checking
        const elementName = convertToNamespacedName(path.node);
        const count = this.validationContext.componentNamesAndIds[elementName] || 0;
        this.validationContext.componentNamesAndIds[elementName] = count + 1;
    },

    JSXAttribute(path) {
        // technically part of sanitization, but visitors are merged
        // for performance
        if (attributeIsSanitized(path.parentPath.parent, path.node)) {
            path.remove();
        }
    },

    JSXExpressionContainer(path) {
        assertInput(isSimpleExpression(path.node),
            "Only identifiers and simple member expressions (this.that.thud) are allowed in " +
            "<I18N> tags.",
            path.node
        );
    },
};

function attributeName(jsxAttribute) {
    return nodeName(jsxAttribute);
}

function attributeIsSanitized(element, attribute) {
    const whitelistedAttributes = whitelist[elementName(element)] || whitelist['*'];
    return !whitelistedAttributes.includes(attributeName(attribute));
}


function extractElementMessage(jsxElement) {
    const messageWithContainer = generate(jsxElement);
    // HACK.
    return /<I18N>([\s\S]+?)<\/I18N>/.exec(messageWithContainer)[1].trim();
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
                        };
                        path.traverse(JSXElementValidationVisitor, {validationContext});
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
                console.error("Error at ", generate(e.node));
            }
        }
    });

    return messages;
}
