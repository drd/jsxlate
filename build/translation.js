'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = translatedRendererFor;

var _babelTraverse = require('babel-traverse');

var _babelTraverse2 = _interopRequireDefault(_babelTraverse);

var _ast = require('./ast');

var _generation = require('./generation');

var _generation2 = _interopRequireDefault(_generation);

var _freeVariables = require('./free-variables');

var _freeVariables2 = _interopRequireDefault(_freeVariables);

var _options = require('./options');

var _parsing = require('./parsing');

var _parsing2 = _interopRequireDefault(_parsing);

var _validation = require('./validation');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function translatedRendererFor(markerNode, translatedMessage, originalMessage) {
    try {
        var unprintedTranslation = undefined;
        var freeVars = [];
        if ((0, _ast.isElement)(markerNode)) {
            var translated = _parsing2.default.parse('<' + _options.options.elementMarker + '>' + translatedMessage + '</' + _options.options.elementMarker + '>\n            ');
            freeVars = (0, _freeVariables2.default)(markerNode);
            (0, _validation.validateTranslation)(markerNode, translated.program.body[0].expression);
            var reconstituted = reconstitute(markerNode, translated);
            unprintedTranslation = (0, _generation2.default)(reconstituted, undefined, translatedMessage);
        } else {
            unprintedTranslation = JSON.stringify(translatedMessage) + ';';
        }
        return renderer(freeVars, unprintedTranslation);
    } catch (exc) {
        if (process.env.NODE_ENV === 'test') {
            throw exc;
        }
        return errorRenderer(originalMessage, translatedMessage, exc);
    }
} /*
   *
   *   Message Translation and Bundling
   *
   */

function reconstitute(original, translated) {
    (0, _babelTraverse2.default)(original, {
        noScope: true,
        JSXElement: function JSXElement(_ref) {
            var node = _ref.node;

            (0, _ast.convertNamespacedNameToIdAttribute)(node);
        }
    });
    var sanitized = (0, _validation.sanitizedAttributesOf)(original);
    (0, _babelTraverse2.default)(translated, {
        JSXElement: function JSXElement(_ref2) {
            var node = _ref2.node;

            if ((0, _ast.isElementMarker)(node)) {
                (0, _validation.validateMessage)(node);
                node.openingElement.name.name = 'span';
                node.closingElement.name.name = 'span';
            }
            (0, _ast.convertNamespacedNameToIdAttribute)(node);
            var id = (0, _ast.idOrComponentName)(node);
            if (id && sanitized[id]) {
                sanitized[id].forEach(function (a) {
                    node.openingElement.attributes.push(a);
                });
            }
            (0, _ast.removeIdAttribute)(node);
        }
    });
    return translated;
}

function renderer(freeVariables, translation) {
    return 'function(' + freeVariables.join(', ') + ') { return ' + translation + ' }';
}

function errorRenderer(message, translation, exception) {
    return 'function() {\nreturn <span class="error">Error for translation "' + translation + '" of "' + message + '":\n<pre>\n' + exception + '\n' + exception.stack + '\n</pre></span>;\n}';
}

