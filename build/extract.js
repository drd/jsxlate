'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.extractFunctionMessage = extractFunctionMessage;
exports.extractElementMessage = extractElementMessage;
exports.extractElementMessageWithoutSideEffects = extractElementMessageWithoutSideEffects;
exports.extractFromSource = extractFromSource;
exports.extractMessages = extractMessages;
exports.default = extractFromPaths;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _ast = require('./ast');

var _errors = require('./errors');

var _generation = require('./generation');

var _generation2 = _interopRequireDefault(_generation);

var _io = require('./io');

var _io2 = _interopRequireDefault(_io);

var _options = require('./options');

var _parsing = require('./parsing');

var _parsing2 = _interopRequireDefault(_parsing);

var _validation = require('./validation');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

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
    return Object.keys(extractFromSource((0, _generation2.default)(jsxElement)))[0];
}

function messageReferenceForNode(node, sourceFile) {
    return {
        sourceFile: sourceFile,
        line: node.loc.start.line,
        node: node
    };
}

function extractFromSource(src) {
    var filePath = arguments.length <= 1 || arguments[1] === undefined ? '<Program>' : arguments[1];

    var messages = {};

    function addMessage(node, message) {
        var item = messages[message];
        if (item) {
            item.push(messageReferenceForNode(node, filePath));
        } else {
            messages[message] = [messageReferenceForNode(node, filePath)];
        }
    }

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
                        addMessage(callExpression, extractFunctionMessage(callExpression));
                    }
                },
                JSXElement: function JSXElement(path) {
                    if ((0, _ast.isElementMarker)(path.node)) {
                        addMessage(path.node, extractElementMessage(path));
                    }
                }
            }
        };
    };

    _parsing2.default.transform(src, plugin);
    return messages;
}

function extractMessages(src) {
    return Object.keys(extractFromSource(src));
}

function extractFromPaths(paths, _ref4) {
    var _ref4$outputFormat = _ref4.outputFormat;
    var outputFormat = _ref4$outputFormat === undefined ? 'po' : _ref4$outputFormat;

    var options = _objectWithoutProperties(_ref4, ['outputFormat']);

    var messages = {};
    var ffmp = require('../bin/filesFromMixedPaths');

    function addItem(message, item) {
        var existing = messages[message];
        if (existing) {
            messages[message] = existing.concat(item);
        } else {
            messages[message] = item;
        }
    }

    ffmp(paths).forEach(function (path) {
        var src = _fs2.default.readFileSync(path, "utf-8");
        try {
            Object.entries(extractFromSource(src, path)).forEach(function (_ref5) {
                var _ref6 = _slicedToArray(_ref5, 2);

                var msg = _ref6[0];
                var item = _ref6[1];
                return addItem(msg, item);
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

    return _io2.default[outputFormat].out(messages, options);
}

