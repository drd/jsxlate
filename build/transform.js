'use strict';

require('babel-polyfill');

var ast = require('./ast');
var extraction = require('./extraction');
var freeVariables = require('./free-variables');

module.exports = function (_ref) {
    var Plugin = _ref.Plugin;
    var t = _ref.types;

    return new Plugin('transformation', {
        visitor: {
            JSXElement: function JSXElement(node, parent) {
                if (ast.isElementMarker(node)) {
                    var vars = freeVariables.freeVariablesInMessage(node);
                    var message = extraction.extractElementMessage(node);
                    return t.callExpression(t.memberExpression(t.identifier('React'), t.identifier('createElement')), [t.identifier('I18N'), t.objectExpression([t.property('init', t.identifier('message'), t.literal(message)), t.property('init', t.identifier('context'), t.identifier('this')), t.property('init', t.identifier('args'), t.arrayExpression(vars.map(function (v) {
                        return t.identifier(v);
                    }))), t.property('init', t.identifier('fallback'), t.functionExpression(null, [], t.blockStatement([t.returnStatement(t.callExpression(t.memberExpression(t.identifier('React'), t.identifier('createElement')), [t.literal('span'), t.identifier('null')].concat(node.children)))])))]), t.identifier('null')]);
                }
            }
        }
    });
};

