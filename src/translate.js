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
import translation from './translation';



export default function translateMessagesToBundle(src, translations) {
    const bundle = {};
    const missing = {};

    function foo(node, message) {
        if (translations[message]) {
            bundle[message] = translation.translatedRendererFor(
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
                    if (node.callee.name === 'i18n') {
                        const message = extractFunctionMessage(node);
                        foo(node, message);
                    }
                },

                JSXElement({node}) {
                    if (ast.isElementMarker(node)) {
                        const message = extractElementMessageWithoutSideEffects(node);
                        foo(node, message);
                    }
                }
            }
        };
    };

    parsing.transform(src, [plugin]);

    return {bundle, missing};
};
