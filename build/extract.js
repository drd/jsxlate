'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.extractFunctionMessage = extractFunctionMessage;
exports.extractElementMessage = extractElementMessage;
exports.extractElementMessageWithoutSideEffects = extractElementMessageWithoutSideEffects;
exports.extractFromSource = extractFromSource;
exports.default = extractFromPaths;

var _ast = require('./ast');

var _errors = require('./errors');

var _generation = require('./generation');

var _generation2 = _interopRequireDefault(_generation);

var _options = require('./options');

var _parsing = require('./parsing');

var _parsing2 = _interopRequireDefault(_parsing);

var _validation = require('./validation');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');

function extractFunctionMessage(callExpression) {
    return callExpression.arguments[0].value;
}

function extractElementMessage(jsxElementPath) {
    (0, _validation.validateAndSanitizeElement)(jsxElementPath);
    var messageWithContainer = (0, _generation2.default)(jsxElementPath.node);
    // TODO: is there a better way to handle whitespace of jsxChildren ?
    // thought: possibly by re-situating them as the children of a Block?
    var extractRe = new RegExp('<' + _options.options.elementMarker + '>([\\s\\S]+?)<\\/' + _options.options.elementMarker + '>');
    return extractRe.exec(messageWithContainer)[1].trim();
}

// TODO: is there a more elegant approach?
function extractElementMessageWithoutSideEffects(jsxElement) {
    (0, _errors.assertInput)((0, _ast.isElementMarker)(jsxElement), "Attempted to extract message from non-marker", jsxElement);
    return extractFromSource((0, _generation2.default)(jsxElement))[0];
}

function extractFromSource(src) {
    var messages = [];

    var plugin = function plugin(_ref) {
        var t = _ref.types;

        var _ref2 = arguments.length <= 1 || arguments[1] === undefined ? { opts: {} } : arguments[1];

        var opts = _ref2.opts;

        Object.assign(_options.options, opts);
        return {
            visitor: {
                CallExpression: function CallExpression(_ref3) {
                    var callExpression = _ref3.node;

                    if ((0, _ast.isFunctionMarker)(callExpression)) {
                        (0, _validation.validateFunctionMessage)(callExpression);
                        messages.push(extractFunctionMessage(callExpression));
                    }
                },
                JSXElement: function JSXElement(path) {
                    if ((0, _ast.isElementMarker)(path.node)) {
                        messages.push(extractElementMessage(path));
                    }
                }
            }
        };
    };

    _parsing2.default.transform(src, plugin);
    return messages;
}

function extractFromPaths(paths) {
    var messages = {};
    var ffmp = require('../bin/filesFromMixedPaths');

    ffmp(paths).forEach(function (path) {
        var src = fs.readFileSync(path, "utf-8");
        try {
            extractFromSource(src).forEach(function (msg) {
                return messages[msg] = msg;
            });
        } catch (e) {
            console.error(path, e);
            if (e.stack) {
                console.error(e.stack);
            }
            if (e.node) {
                console.error("Error at", e.node.loc, (0, _generation2.default)(e.node));
            }
        }
    });

    return messages;
}

