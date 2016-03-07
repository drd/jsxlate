'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = translateMessagesToBundle;

var _ast = require('./ast');

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

    function attemptToCreateRenderer(node, message) {
        if (translations[message]) {
            bundle[message] = (0, _translation2.default)(node, translations[message], message);
        } else {
            missing[message] = message;
        }
    }

    var plugin = function plugin() {
        return {
            visitor: {
                CallExpression: function CallExpression(_ref) {
                    var node = _ref.node;

                    if ((0, _ast.isFunctionMarker)(node)) {
                        var message = (0, _extract.extractFunctionMessage)(node);
                        attemptToCreateRenderer(node, message);
                    }
                },
                JSXElement: function JSXElement(_ref2) {
                    var node = _ref2.node;

                    if ((0, _ast.isElementMarker)(node)) {
                        var message = (0, _extract.extractElementMessageWithoutSideEffects)(node);
                        attemptToCreateRenderer(node, message);
                    }
                }
            }
        };
    };

    _parsing2.default.transform(src, [plugin]);

    return { bundle: bundle, missing: missing };
};

