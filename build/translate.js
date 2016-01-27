'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ast = require('./ast');

var _ast2 = _interopRequireDefault(_ast);

var _extraction = require('./extraction');

var _extraction2 = _interopRequireDefault(_extraction);

var _translation = require('./translation');

var _translation2 = _interopRequireDefault(_translation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 *
 *   Plugin for Message Translation and Bundling
 *
 */

var babel = require('babel-core');
var jsx = require('babel-plugin-syntax-jsx');

var Translate = {
    translateMessagesToBundle: function translateMessagesToBundle(src, translations) {
        var bundle = {};

        var plugin = function plugin(_ref) {
            var t = _ref.types;

            return {
                visitor: {
                    CallExpression: function CallExpression(_ref2) {
                        var node = _ref2.node;

                        if (node.callee.name === 'i18n') {
                            var message = node.arguments[0].value;
                            bundle[message] = translations[message];
                        }
                    },
                    JSXElement: function JSXElement(_ref3) {
                        var node = _ref3.node;

                        if (_ast2.default.isElementMarker(node)) {
                            var message = _extraction2.default.extractElementMessage(node);
                            var translationForMessage = translations[message];
                            var renderer = _translation2.default.translatedRendererFor(node, translationForMessage, message);
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
    }
};

exports.default = Translate;

