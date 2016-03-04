const template = require('babel-template');
import traverse from 'babel-traverse';
const types = require('babel-types');

const ast = require('./ast');
import {extractElementMessageWithoutSideEffects} from './extract';
import freeVariablesInMessage from './free-variables';
import {options} from './options';


const transformElementMarker = template(`
    <${options.elementMarker} message={MESSAGE} context={this} args={ARGS} fallback={function() { return FALLBACK; }}/>
`, {plugins: ['jsx']});


export default {
    transformMarker(node) {
        if (ast.isElementMarker(node)) {
            return this.transformElementMarker(node);
        } else {
            return node;
        }
    },

    transformElementMarker(node) {
        const vars = freeVariablesInMessage(node);
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
                ast.stripI18nId(node);
            }
        });
        return node;
    },

    needsTransformation(node) {
        // Babel will re-visit the node after replacement, so we must check to
        // see if a node has already been processed. Since we transform to a
        // self-closing tag, the absence of children signifies completion.
        return node.children.length;
    },
};
