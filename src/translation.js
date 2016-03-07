/*
 *
 *   Message Translation and Bundling
 *
 */

import traverse from 'babel-traverse';

import {
    convertNamespacedNameToIdAttribute,
    idOrComponentName,
    isElement,
    isElementMarker,
    removeIdAttribute
} from './ast';
import generate from './generation';
import freeVariablesInMessage from './free-variables';
import {options} from './options';
import parsing from './parsing';
import {validateTranslation, sanitizedAttributesOf, validateMessage} from './validation';


export default function translatedRendererFor(markerNode, translatedMessage, originalMessage) {
    try {
        let unprintedTranslation;
        let freeVars = [];
        if (isElement(markerNode)) {
            const translated = parsing.parse(
                `<${options.elementMarker}>${translatedMessage}</${options.elementMarker}>
            `);
            freeVars = freeVariablesInMessage(markerNode);
            validateTranslation(markerNode, translated.program.body[0].expression);
            const reconstituted = reconstitute(markerNode, translated);
            unprintedTranslation = generate(reconstituted, undefined, translatedMessage);
        } else {
            unprintedTranslation = JSON.stringify(translatedMessage) + ';';
        }
        return renderer(freeVars, unprintedTranslation);
    } catch(exc) {
        if (process.env.NODE_ENV === 'test') {
            throw exc;
        }
        return errorRenderer(originalMessage, translatedMessage, exc);
    }
}

function reconstitute(original, translated) {
    traverse(original, {
        noScope: true,
        JSXElement({node}) {
            convertNamespacedNameToIdAttribute(node);
        }
    });
    const sanitized = sanitizedAttributesOf(original);
    traverse(translated, {
        JSXElement({node}) {
            if (isElementMarker(node)) {
                validateMessage(node);
                node.openingElement.name.name = 'span';
                node.closingElement.name.name = 'span';
            }
            convertNamespacedNameToIdAttribute(node);
            const id = idOrComponentName(node);
            if (id && sanitized[id]) {
                sanitized[id].forEach(a => {
                    node.openingElement.attributes.push(a);
                });
            }
            removeIdAttribute(node);
        },
    });
    return translated;
}

function renderer(freeVariables, translation) {
    return (
`function(${freeVariables.join(', ')}) { return ${translation} }`
    );
}

function errorRenderer(message, translation, exception) {
    return (
`function() {
return <span class="error">Error for translation "${translation}" of "${message}":
<pre>
${exception}
${exception.stack}
</pre></span>;
}`
    );
}
