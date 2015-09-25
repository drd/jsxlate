require('babel/polyfill');

const ast = require('./ast');
const extraction = require('./extraction');
const freeVariables = require('./free-variables');


module.exports = function({Plugin, types: t}) {
    return new Plugin('transformation', {
        visitor: {
            JSXElement: function(node, parent) {
                if (ast.isElementMarker(node)) {
                    const vars = freeVariables.freeVariablesInMessage(node);
                    const message = extraction.extractElementMessage(node);
                    return t.callExpression(
                        t.memberExpression(
                            t.identifier('React'),
                            t.identifier('createElement')
                        ),
                        [
                            t.identifier('I18N'),
                            t.objectExpression([
                                t.property('init', t.identifier('message'), t.literal(message)),
                                t.property('init', t.identifier('context'), t.identifier('this')),
                                t.property('init', t.identifier('args'), t.arrayExpression(
                                    vars.map(v => t.identifier(v))
                                )),
                                t.property('init', t.identifier('fallback'), t.functionExpression(
                                    null,
                                    [],
                                    t.blockStatement([
                                        t.returnStatement(
                                            t.callExpression(
                                                t.memberExpression(
                                                    t.identifier('React'),
                                                    t.identifier('createElement')
                                                ),
                                                [
                                                    t.literal('span'),
                                                    t.identifier('null'),
                                                    t.arrayExpression(node.children)
                                                ]
                                            )
                                        )
                                    ])
                                ))
                            ]),
                            t.identifier('null')
                        ]
                    )
                }
            }
        }
    });
};
