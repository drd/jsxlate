/*
 *
 *   Message Translation and Bundling
 *
 */

const babylon = require('babylon');
import generate from 'babel-generator';
import traverse from 'babel-traverse';

import ast from './ast';
import freeVariablesInMessage from './free-variables';
import validation from './validation';


const Translation = {
    translatedRendererFor(markerNode, translatedMessage, originalMessage) {
        try {
            let unprintedTranslation;
            let freeVars = [];
            if (ast.isElement(markerNode)) {
                const translated = babylon.parse(`<I18N>${translatedMessage}</I18N>`, {plugins: ['jsx']});
                freeVars = freeVariablesInMessage(markerNode);
                validation.validateTranslation(markerNode, translated.program.body[0].expression);
                const reconstituted = Translation.reconstitute(markerNode, translated);
                unprintedTranslation = generate(reconstituted, undefined, translatedMessage).code;
            } else {
                unprintedTranslation = JSON.stringify(translatedMessage) + ';';
            }
            return Translation.renderer(freeVars, unprintedTranslation, markerNode);
        } catch(exc) {
            if (process.env.NODE_ENV === 'test') {
                throw exc;
            }
            return Translation.errorRenderer(originalMessage, exc)
        }
    },

    reconstitute(original, translated) {
        traverse(original, {
            noScope: true,
            JSXElement({node}) {
                ast.convertNamespacedNameToIdAttribute(node);
            }
        });
        const sanitized = validation.sanitizedAttributesOf(original);
        traverse(translated, {
            JSXElement({node}) {
                if (ast.isElementMarker(node)) {
                    validation.validateMessage(node);
                    node.openingElement.name.name = 'span';
                    node.closingElement.name.name = 'span';
                }
                ast.convertNamespacedNameToIdAttribute(node);
                const id = ast.idOrComponentName(node);
                if (id && sanitized[id]) {
                    sanitized[id].forEach(a => {
                        node.openingElement.attributes.push(a);
                    })
                }
                ast.removeIdAttribute(node);
            },
        });
        return translated;
    },

    renderer(freeVariables, translation, originalNode) {
        return (
`function(${freeVariables.join(', ')}) { return ${translation} }`
        );
    },

    errorRenderer(message, exception) {
        return (
`function() {
    return <span class="error">Error for translation of ${message}:
<pre>
${exception}
${exception.stack}
</pre></span>;
}`
        );
    },
};

export default Translation;
