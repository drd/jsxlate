/*
 *
 *   Plugin for Message Translation and Bundling
 *
 */

const babel = require('babel-core');
var jsx = require('babel-plugin-syntax-jsx');

import ast from './ast';
import extraction from './extraction';
import translation from './translation';


const Translate = {
    translateMessagesToBundle(src, translations) {
        const bundle = {};

        const plugin = function({types: t}) {
            return {
                visitor: {
                    CallExpression({node}) {
                        if (node.callee.name === 'i18n') {
                            const message = node.arguments[0].value;
                            bundle[message] = translations[message];
                        }
                    },

                    JSXElement({node}) {
                        if (ast.isElementMarker(node)) {
                            const message = extraction.extractElementMessage(node);
                            const translationForMessage = translations[message];
                            const renderer = translation.translatedRendererFor(node, translationForMessage, message);
                            bundle[message] = renderer;
                        }
                    }
                }
            };
        }

        babel.transform(src, {
            plugins: [jsx, plugin]
        });

        return bundle;
    },
};


export default Translate;
