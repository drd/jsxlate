/*
 *
 *   Plugin for Message Translation and Bundling
 *
 */


import ast from './ast';
import {
    extractFunctionMessage,
    extractElementMessageWithoutSideEffects,
} from './extract';
import parsing from './parsing';
import translatedRendererFor from './translation';



export default function translateMessagesToBundle(src, translations) {
    const bundle = {};
    const missing = {};

    function attemptToCreateRenderer(node, message) {
        if (translations[message]) {
            bundle[message] = translatedRendererFor(
                node,
                translations[message],
                message
            );
        } else {
            missing[message] = message;
        }
    }

    const plugin = function() {
        return {
            visitor: {
                CallExpression({node}) {
                    if (ast.isFunctionMarker(node)) {
                        const message = extractFunctionMessage(node);
                        attemptToCreateRenderer(node, message);
                    }
                },

                JSXElement({node}) {
                    if (ast.isElementMarker(node)) {
                        const message = extractElementMessageWithoutSideEffects(node);
                        attemptToCreateRenderer(node, message);
                    }
                }
            }
        };
    };

    parsing.transform(src, [plugin]);

    return {bundle, missing};
};
