/*
 *
 *   Plugin for Message Extraction
 *
 */


require('babel-polyfill');

import parsing from './parsing';
var ast = require('./ast');
var extraction = require('./extraction');
var validation = require('./validation');


module.exports.extract = function extract(src) {
    const messages = [];
    let inMarker = false;

    function enterMarker() {
        if (inMarker) {
            throw new Error("Nested markers");
        }
        inMarker = true;
    }

    function leaveMarker() {
        inMarker = false;
    }

    let plugin = function({types: t}) {
        return {
            visitor: {
                CallExpression({node}) {
                    if (ast.isFunctionMarker(node)) {
                        messages.push(node.arguments[0].value);
                    }
                },

                JSXElement: {
                    enter({node}) {
                        if (ast.isElementMarker(node)) {  // <I18N>...
                            enterMarker();
                            validation.validateMessage(node);
                            messages.push(extraction.extractElementMessage(node));
                        }
                    },

                    exit({node}) {
                        if (ast.isElementMarker(node)) {  // ...</I18N>
                            leaveMarker();
                        }
                    }
                },

                // JSXAttribute(node, parent) {
                //     if (!inMarker) {
                //         if (extractableAttribute(node)) {
                //             messages.push(extractAttribute(node))
                //         }
                //     }
                // }
            }
        };
    };

    parsing.transform(src, plugin);

    return messages;
};
