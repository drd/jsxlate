const babel = require('babel-core');
import generate from 'babel-generator';
// const jsxt = require('babel-plugin-transform-react-jsx');
const objectRestSpread = require('babel-plugin-transform-object-rest-spread');
const template = require('babel-template');
import traverse from 'babel-traverse';
const types = require('babel-types')

const ast = require('./ast');
import {extractElementMessageWithoutSideEffects} from './extract';
const freeVariables = require('./free-variables');


const transformElementMarker = template(`
    <I18N message={MESSAGE} context={this} args={ARGS} fallback={function() { return FALLBACK; }}/>
`);

function wrapExpression(expression) {
    return types.program([types.expressionStatement(expression)]);
}

export default {
    transformMarker(node) {
        if (ast.isElementMarker(node)) {
            return this.transformElementMarker(node);
        } else {
            return node;
        }
    },

    transformElementMarker(node) {
        const vars = freeVariables.freeVariablesInMessage(node);
        const message = extractElementMessageWithoutSideEffects(node);
        const fallback = this.makeFallback(node);
        const transformed = transformElementMarker({
            MESSAGE: types.stringLiteral(message),
            ARGS: types.arrayExpression(
                vars.map(v => types.identifier(v))
            ),
            FALLBACK: fallback,
        });
        return transformed;
    },

    makeFallback(node) {
        node.openingElement.name.name = 'span';
        node.closingElement.name.name = 'span';
        traverse(node, {
            noScope: true,
            JSXElement({node}) {
                ast.removeIdAttribute(node);
            }
        });
        return node;
    },

    needsTransformation(node) {
        // TODO: possibly a better test would be to assert the attribute
        // names are a superset of {message, context, args, fallback}
        return node.openingElement.attributes.length !== 4;
    },
}
