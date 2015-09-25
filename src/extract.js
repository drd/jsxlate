"use strict";

var babel = require('babel');
require('babel/polyfill');

var escodegen = require('escodegen-wallaby')

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

    let plugin = function({Plugin, t}) {
        return new Plugin('extraction', {
            visitor: {
                CallExpression(node, parent) {
                    if (node.callee.name === 'i18n') {
                        messages.push(node.arguments[0].value);
                    }
                },

                JSXElement: {
                    enter(node, parent) {
                        if (ast.isElementMarker(node)) {  // <I18N>...
                            enterMarker();
                            validation.validateMessage(node);
                            messages.push(extraction.extractElementMessage(node));
                        }
                    },

                    exit(node, parent) {
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
        });
    };

    babel.transform(src, {
        plugins: [plugin]
    });

    return messages;
};
