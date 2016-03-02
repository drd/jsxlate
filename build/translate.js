'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = translateMessagesToBundle;

var _ast = require('./ast');

var _ast2 = _interopRequireDefault(_ast);

var _extract = require('./extract');

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

function translateMessagesToBundle(src, translations) {
    var bundle = {};

    var plugin = function plugin() {
        return {
            visitor: {
                CallExpression: function CallExpression(_ref) {
                    var node = _ref.node;

                    if (node.callee.name === 'i18n') {
                        var message = node.arguments[0].value;
                        bundle[message] = _translation2.default.translatedRendererFor(node, translations[message], message);
                    }
                },
                JSXElement: function JSXElement(_ref2) {
                    var node = _ref2.node;

                    if (_ast2.default.isElementMarker(node)) {
                        var message = (0, _extract.extractElementMessageWithoutSideEffects)(node);
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
};

