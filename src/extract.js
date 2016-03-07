const fs = require('fs');

import {isElementMarker, isFunctionMarker} from './ast';
import {assertInput} from './errors';
import generate from './generation';
import {options} from './options';
import parsing from './parsing';
import {
    validateFunctionMessage,
    validateAndSanitizeElement
} from './validation';


export function extractFunctionMessage(callExpression) {
    return callExpression.arguments[0].value;
}


export function extractElementMessage(jsxElementPath) {
    validateAndSanitizeElement(jsxElementPath);
    const messageWithContainer = generate(jsxElementPath.node);
    // TODO: is there a better way to handle whitespace of jsxChildren ?
    // thought: possibly by re-situating them as the children of a Block?
    const extractRe = new RegExp(
        `<${options.elementMarker}>([\\s\\S]+?)<\\/${options.elementMarker}>`
    );
    return extractRe.exec(messageWithContainer)[1].trim();
}


// TODO: is there a more elegant approach?
export function extractElementMessageWithoutSideEffects(jsxElement) {
    assertInput(
        isElementMarker(jsxElement),
        "Attempted to extract message from non-marker",
        jsxElement
    );
    return extractFromSource(generate(jsxElement))[0];
}


export function extractFromSource(src) {
    const messages = [];

    const plugin = function({types: t}, {opts} = {opts: {}}) {
        Object.assign(options, opts);
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
                        messages.push(extractElementMessage(path));
                    }
                },
            }
        };
    };

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
