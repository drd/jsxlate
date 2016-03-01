/*
 *
 *   Plugin for Message Translation and Bundling
 *
 */

const babel = require('babel-core');
var jsx = require('babel-plugin-syntax-jsx');

import ast from './ast';
import {extractElementMessageWithoutSideEffects} from './extract';
import translation from './translation';


const Translate = {
    translateMessagesToBundle(src, translations) {
        const bundle = {};

        const plugin = function() {
            return {
                visitor: {
                    CallExpression({node}) {
                        if (node.callee.name === 'i18n') {
                            const message = node.arguments[0].value;
                            bundle[message] = translation.translatedRendererFor(node, translations[message], message);
                        }
                    },

                    JSXElement({node}) {
                        if (ast.isElementMarker(node)) {
                            const message = extractElementMessageWithoutSideEffects(node);
                            const translationForMessage = translations[message];
                            const renderer = translation.translatedRendererFor(node, translationForMessage, message);
                            bundle[message] = renderer;
                        }
                    }
                }
            };
        };

        babel.transform(src, {
            plugins: [jsx, plugin]
        });

        return bundle;
    },
};


export default Translate;
