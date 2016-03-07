'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = translateMessagesToBundle;

var _ast = require('./ast');

var _ast2 = _interopRequireDefault(_ast);

var _extract = require('./extract');

var _parsing = require('./parsing');

var _parsing2 = _interopRequireDefault(_parsing);

var _translation = require('./translation');

var _translation2 = _interopRequireDefault(_translation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 *
 *   Plugin for Message Translation and Bundling
 *
 */

function translateMessagesToBundle(src, translations) {
    var bundle = {};
    var missing = {};

    function foo(node, message) {
        if (translations[message]) {
            bundle[message] = _translation2.default.translatedRendererFor(node, translations[message], message);
        } else {
            missing[message] = message;
        }
    }

    var plugin = function plugin() {
        return {
            visitor: {
                CallExpression: function CallExpression(_ref) {
                    var node = _ref.node;

                    if (node.callee.name === 'i18n') {
                        var message = (0, _extract.extractFunctionMessage)(node);
                        foo(node, message);
                    }
                },
                JSXElement: function JSXElement(_ref2) {
                    var node = _ref2.node;

                    if (_ast2.default.isElementMarker(node)) {
                        var message = (0, _extract.extractElementMessageWithoutSideEffects)(node);
                        foo(node, message);
                    }
                }
            }
        };
    };

    _parsing2.default.transform(src, [plugin]);

    return { bundle: bundle, missing: missing };
};

