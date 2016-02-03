/*
 *
 *   Message Translation and Bundling
 *
 */

const babylon = require('babylon');
import generate from 'babel-generator';
import traverse from 'babel-traverse';

import ast from 'ast';
const freeVariables = require('free-variables');
import validation from 'validation';


const Translation = {
    translatedRendererFor(markerNode, translatedMessage, originalMessage) {
        try {
            let unprintedTranslation;
            if (ast.isElementMarker(markerNode)) {
                unprintedTranslation = `<I18N>${translatedMessage}</I18N>`;
            } else {
                unprintedTranslation = JSON.stringify(translatedMessage);
            }
            const translated = babylon.parse(unprintedTranslation, {plugins: ['jsx']});
            const freeVars = freeVariables.freeVariablesInMessage(markerNode);
            const reconstituted = Translation.reconstitute(markerNode, translated);
            return Translation.renderer(freeVars, reconstituted.program.body[0].expression, markerNode);
        } catch(exc) {
            return Translation.errorRenderer(originalMessage, exc)
        }
    },

    reconstitute(original, translated) {
        const sanitized = validation.sanitizedAttributesOf(original);

        traverse(translated, {
            JSXElement({node}) {
                const id = ast.idOrComponentName(node);
                if (sanitized[id]) {
                    sanitized[id].forEach(a => {
                        node.openingElement.attributes.push(a);
                    })
                }
            },
        });

        return translated;
    },

    renderer(freeVariables, reconstituted, originalNode) {
        return (
`function(${freeVariables.join(', ')}) {
    return ${generate(reconstituted).code};
}`
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
