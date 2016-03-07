'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _babelGenerator = require('babel-generator');

var _babelGenerator2 = _interopRequireDefault(_babelGenerator);

var _babelTraverse = require('babel-traverse');

var _babelTraverse2 = _interopRequireDefault(_babelTraverse);

var _ast = require('./ast');

var _ast2 = _interopRequireDefault(_ast);

var _freeVariables = require('./free-variables');

var _freeVariables2 = _interopRequireDefault(_freeVariables);

var _parsing = require('./parsing');

var _parsing2 = _interopRequireDefault(_parsing);

var _validation = require('./validation');

var _validation2 = _interopRequireDefault(_validation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 *
 *   Message Translation and Bundling
 *
 */

var Translation = {
    translatedRendererFor: function translatedRendererFor(markerNode, translatedMessage, originalMessage) {
        try {
            var unprintedTranslation = undefined;
            var freeVars = [];
            if (_ast2.default.isElement(markerNode)) {
                var translated = _parsing2.default.parse('<I18N>' + translatedMessage + '</I18N>');
                freeVars = (0, _freeVariables2.default)(markerNode);
                _validation2.default.validateTranslation(markerNode, translated.program.body[0].expression);
                var reconstituted = Translation.reconstitute(markerNode, translated);
                unprintedTranslation = (0, _babelGenerator2.default)(reconstituted, undefined, translatedMessage).code;
            } else {
                unprintedTranslation = JSON.stringify(translatedMessage) + ';';
            }
            return Translation.renderer(freeVars, unprintedTranslation);
        } catch (exc) {
            if (process.env.NODE_ENV === 'test') {
                throw exc;
            }
            return Translation.errorRenderer(originalMessage, translatedMessage, exc);
        }
    },
    reconstitute: function reconstitute(original, translated) {
        (0, _babelTraverse2.default)(original, {
            noScope: true,
            JSXElement: function JSXElement(_ref) {
                var node = _ref.node;

                _ast2.default.convertNamespacedNameToIdAttribute(node);
            }
        });
        var sanitized = _validation2.default.sanitizedAttributesOf(original);
        (0, _babelTraverse2.default)(translated, {
            JSXElement: function JSXElement(_ref2) {
                var node = _ref2.node;

                if (_ast2.default.isElementMarker(node)) {
                    _validation2.default.validateMessage(node);
                    node.openingElement.name.name = 'span';
                    node.closingElement.name.name = 'span';
                }
                _ast2.default.convertNamespacedNameToIdAttribute(node);
                var id = _ast2.default.idOrComponentName(node);
                if (id && sanitized[id]) {
                    sanitized[id].forEach(function (a) {
                        node.openingElement.attributes.push(a);
                    });
                }
                _ast2.default.removeIdAttribute(node);
            }
        });
        return translated;
    },
    renderer: function renderer(freeVariables, translation) {
        return 'function(' + freeVariables.join(', ') + ') { return ' + translation + ' }';
    },
    errorRenderer: function errorRenderer(message, translation, exception) {
        return 'function() {\n    return <span class="error">Error for translation "' + translation + '" of "' + message + '":\n<pre>\n' + exception + '\n' + exception.stack + '\n</pre></span>;\n}';
    }
};

exports.default = Translation;

