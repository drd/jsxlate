'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _babelGenerator = require('babel-generator');

var _babelGenerator2 = _interopRequireDefault(_babelGenerator);

var _babelTraverse = require('babel-traverse');

var _babelTraverse2 = _interopRequireDefault(_babelTraverse);

var _ast = require('ast');

var _ast2 = _interopRequireDefault(_ast);

var _validation = require('validation');

var _validation2 = _interopRequireDefault(_validation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 *
 *   Message Translation and Bundling
 *
 */

var babylon = require('babylon');

var freeVariables = require('free-variables');

var Translation = {
    translatedRendererFor: function translatedRendererFor(markerNode, translatedMessage, originalMessage) {
        try {
            var unprintedTranslation = undefined;
            if (_ast2.default.isElementMarker(markerNode)) {
                unprintedTranslation = '<I18N>' + translatedMessage + '</I18N>';
            } else {
                unprintedTranslation = JSON.stringify(translatedMessage);
            }
            var translated = babylon.parse(unprintedTranslation, { plugins: ['jsx'] });
            var freeVars = freeVariables.freeVariablesInMessage(markerNode);
            var reconstituted = Translation.reconstitute(markerNode, translated);
            return Translation.renderer(freeVars, reconstituted.program.body[0].expression, markerNode);
        } catch (exc) {
            return Translation.errorRenderer(originalMessage, exc);
        }
        // build out mapping of unique/id'd components with sanitized attributes
        // parse translatedMessage
        // walk its ast and translate sanitized messages where appropriate
        // determine free variables in markerNode
        // generate a render function with proper arguments and return
    },
    reconstitute: function reconstitute(original, translated) {
        var sanitized = _validation2.default.sanitizedAttributesOf(original);

        (0, _babelTraverse2.default)(translated, {
            JSXElement: function JSXElement(_ref) {
                var node = _ref.node;

                var id = _ast2.default.idOrComponentName(node);
                if (sanitized[id]) {
                    sanitized[id].forEach(function (a) {
                        node.openingElement.attributes.push(a);
                    });
                }
            }
        });

        return translated;
    },
    renderer: function renderer(freeVariables, reconstituted, originalNode) {
        return 'function(' + freeVariables.join(', ') + ') {\n    return ' + (0, _babelGenerator2.default)(reconstituted).code + ';\n}';
    },
    errorRenderer: function errorRenderer(message, exception) {
        return 'function() {\n    return <span class="error">Error for translation of ' + message + ':\n<pre>\n' + exception + '\n' + exception.stack + '\n</pre></span>;\n}';
    }
};

exports.default = Translation;

