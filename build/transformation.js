'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _babelTraverse = require('babel-traverse');

var _babelTraverse2 = _interopRequireDefault(_babelTraverse);

var _extract = require('./extract');

var _freeVariables = require('./free-variables');

var _freeVariables2 = _interopRequireDefault(_freeVariables);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var template = require('babel-template');

var types = require('babel-types');

var ast = require('./ast');

var _transformElementMarker = template('\n    <I18N message={MESSAGE} context={this} args={ARGS} fallback={function() { return FALLBACK; }}/>\n', { plugins: ['jsx'] });

exports.default = {
    transformMarker: function transformMarker(node) {
        if (ast.isElementMarker(node)) {
            return this.transformElementMarker(node);
        } else {
            return node;
        }
    },
    transformElementMarker: function transformElementMarker(node) {
        var vars = (0, _freeVariables2.default)(node);
        var message = (0, _extract.extractElementMessageWithoutSideEffects)(node);
        var fallback = this.makeFallback(node);
        var transformed = _transformElementMarker({
            MESSAGE: types.stringLiteral(message),
            ARGS: types.arrayExpression(vars.map(function (v) {
                return types.identifier(v);
            })),
            FALLBACK: fallback
        });
        return transformed;
    },
    makeFallback: function makeFallback(node) {
        node.openingElement.name.name = 'span';
        node.closingElement.name.name = 'span';
        (0, _babelTraverse2.default)(node, {
            noScope: true,
            JSXElement: function JSXElement(_ref) {
                var node = _ref.node;

                ast.stripI18nId(node);
            }
        });
        return node;
    },
    needsTransformation: function needsTransformation(node) {
        // Babel will re-visit the node after replacement, so we must check to
        // see if a node has already been processed. Since we transform to a
        // self-closing tag, the absence of children signifies completion.
        return node.children.length;
    }
};

