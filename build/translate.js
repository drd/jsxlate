'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = translateMessagesToBundle;

var _ast = require('./ast');

var _extract = require('./extract');

var _io = require('./io');

var _io2 = _interopRequireDefault(_io);

var _parsing = require('./parsing');

var _parsing2 = _interopRequireDefault(_parsing);

var _translation = require('./translation');

var _translation2 = _interopRequireDefault(_translation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /*
                                                                                                                                                                                                                              *
                                                                                                                                                                                                                              *   Plugin for Message Translation and Bundling
                                                                                                                                                                                                                              *
                                                                                                                                                                                                                              */

function translateMessagesToBundle(src, translationsSrc) {
    var _ref = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    var _ref$inputFormat = _ref.inputFormat;
    var inputFormat = _ref$inputFormat === undefined ? 'po' : _ref$inputFormat;

    var options = _objectWithoutProperties(_ref, ['inputFormat']);

    var bundle = {};
    var missing = {};
    var translations = _io2.default[inputFormat].in(translationsSrc, options);

    function attemptToCreateRenderer(node, message) {
        if (translations[message]) {
            if ((0, _ast.isElementMarker)(node) && bundle[message]) {
                return;
            }
            bundle[message] = (0, _translation2.default)(node, translations[message], message);
        } else {
            missing[message] = message;
        }
    }

    var plugin = function plugin() {
        return {
            visitor: {
                CallExpression: function CallExpression(_ref2) {
                    var node = _ref2.node;

                    if ((0, _ast.isFunctionMarker)(node)) {
                        var message = (0, _extract.extractFunctionMessage)(node);
                        attemptToCreateRenderer(node, message);
                    }
                },
                JSXElement: function JSXElement(_ref3) {
                    var node = _ref3.node;

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

