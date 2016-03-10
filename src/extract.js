import fs from 'fs';

import {isElementMarker, isFunctionMarker} from './ast';
import {assertInput} from './errors';
import generate from './generation';
import io from './io';
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
    return Object.keys(extractFromSource(generate(jsxElement)))[0];
}


function messageReferenceForNode(node, sourceFile) {
    return {
        sourceFile,
        line: node.loc.start.line,
        node
    };
}


export function extractFromSource(src, filePath = '<Program>') {
    const messages = {};

    function addMessage(node, message) {
        let item = messages[message];
        if (item) {
            item.push(messageReferenceForNode(node, filePath));
        } else {
            messages[message] = [messageReferenceForNode(node, filePath)];
        }
    }

    const plugin = function({types: t}, {opts} = {opts: {}}) {
        Object.assign(options, opts);
        return {
            visitor: {
                CallExpression({node: callExpression}) {
                    if (isFunctionMarker(callExpression)) {
                        validateFunctionMessage(callExpression);
                        addMessage(callExpression, extractFunctionMessage(callExpression));
                    }
                },

                JSXElement(path) {
                    if (isElementMarker(path.node)) {
                        addMessage(path.node, extractElementMessage(path));
                    }
                },
            }
        };
    };

    parsing.transform(src, plugin);
    return messages;
}


export function extractMessages(src) {
    return Object.keys(extractFromSource(src));
}


export default function extractFromPaths(paths, {outputFormat = 'po', ...options} = {}) {
    let messages = {};
    const ffmp = require('../bin/filesFromMixedPaths');

    function addItem(message, item) {
        let existing = messages[message];
        if (existing) {
            messages[message] = existing.concat(item);
        } else {
            messages[message] = item;
        }
    }

    ffmp(paths).forEach(path => {
        const src = fs.readFileSync(path, "utf-8");
        try {
            Object.entries(extractFromSource(src, path)).forEach(
                ([msg, item]) => addItem(msg, item)
            );
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

    return io[outputFormat].out(messages, options);
}
