/*
 *
 *   Plugin for Message Translation and Bundling
 *
 */


import {isElementMarker, isFunctionMarker} from './ast';
import {
    extractFunctionMessage,
    extractElementMessageWithoutSideEffects,
} from './extract';
import io from './io';
import parsing from './parsing';
import translatedRendererFor from './translation';



export default function translateMessagesToBundle(src, translationsSrc, {inputFormat = 'po', ...options} = {}) {
    const bundle = {};
    const missing = {};
    const translations = io[inputFormat].in(translationsSrc, options);

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
                    if (isFunctionMarker(node)) {
                        const message = extractFunctionMessage(node);
                        attemptToCreateRenderer(node, message);
                    }
                },

                JSXElement({node}) {
                    if (isElementMarker(node)) {
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
