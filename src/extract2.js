const fs = require('fs');

const babel = require('babel-core');
import babelGenerator from 'babel-generator';

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

function InputError(description) {
    return {
        description,
        inputError: true
    };
}

function assertInput(condition, description) {
    if (!condition) {
        throw InputError(description);
    }
}


// Code generation

function generate(ast) {
    return babelGenerator(ast).code;
}





// Function messages: i18n("Foo all the bars.")

function isFunctionMarker(callExpression) {
    return callExpression.callee.name === options.functionMarker;
}

function validateFunctionMessage(callExpression) {
    assertInput(
        callExpression.arguments.length === 1,
        `Expected exactly 1 argument to ${options.functionMarker}(), but got ${callExpression.arguments.length}`
    );

    assertInput(
        callExpression.arguments[0].type === 'StringLiteral',
        `Expected a StringLiteral argument to ${options.functionMarker}(), but got ${callExpression.arguments[0].type}`
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

function isElementMarker(jsxElement) {
    return elementName(jsxElement) === 'I18N';
}

const JSXElementValidationVisitor = {
    JSXElement(path)  {

    },

    JSXAttribute(path) {

    },

    JSXExpressionContainer(path) {

    },
};

function attributeName(jsxAttribute) {
    return nodeName(jsxAttribute);
}

function attributeIsSanitized(elementName, attributeName) {
    const whitelistedAttributes = whitelist[elementName] || whitelist['*'];
    return !whitelistedAttributes.includes(attributeName);
}


const JSXElementSanitizationVisitor = {
    JSXAttribute(path) {
        if (attributeIsSanitized(elementName(path.parentPath.parent), attributeName(path.node))) {
            path.remove();
        }
    }
};

function extractElementMessage(jsxElement) {
    const messageWithContainer = generate(jsxElement);
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
                        const validationContext = {};
                        path.traverse(JSXElementSanitizationVisitor);
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
        }
    });

    return messages;
}
