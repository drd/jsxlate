'use strict';

/*
 *
 *   Plugin for Message Extraction
 *
 */

var babel = require('babel-core');
var jsx = require('babel-plugin-syntax-jsx');
require('babel-polyfill');

var ast = require('./ast');
var extraction = require('./extraction');
var validation = require('./validation');

module.exports.extract = function extract(src) {
    var messages = [];
    var inMarker = false;

    function enterMarker() {
        if (inMarker) {
            throw new Error("Nested markers");
        }
        inMarker = true;
    }

    function leaveMarker() {
        inMarker = false;
    }

    var plugin = function plugin(_ref) {
        var t = _ref.types;

        return {
            visitor: {
                CallExpression: function CallExpression(_ref2) {
                    var node = _ref2.node;

                    if (node.callee.name === 'i18n') {
                        messages.push(node.arguments[0].value);
                    }
                },

                JSXElement: {
                    enter: function enter(_ref3) {
                        var node = _ref3.node;

                        if (ast.isElementMarker(node)) {
                            // <I18N>...
                            enterMarker();
                            validation.validateMessage(node);
                            messages.push(extraction.extractElementMessage(node));
                        }
                    },
                    exit: function exit(_ref4) {
                        var node = _ref4.node;

                        if (ast.isElementMarker(node)) {
                            // ...</I18N>
                            leaveMarker();
                        }
                    }
                }

            }
        };
    };

    // JSXAttribute(node, parent) {
    //     if (!inMarker) {
    //         if (extractableAttribute(node)) {
    //             messages.push(extractAttribute(node))
    //         }
    //     }
    // }
    babel.transform(src, {
        plugins: [jsx, plugin]
    });

    return messages;
};

