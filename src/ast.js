/*
 *
 *   AST Manipulation
 *
 */


const types = require('babel-types');

import {assertInput} from './errors';
import generate from './generation';
import {options} from './options';


// does this callExpression node represent a call to `i18n()`
export function isFunctionMarker(callExpression) {
    return callExpression.callee.name === options.functionMarker;
}


// Element markers (`<I18N> ... </I18N>`)

export function nodeName(node) {
    return node.name && generate(node.name);
}

export function elementName(jsxElement) {
    return nodeName(jsxElement.openingElement);
}

export function attributeName(jsxAttribute) {
    return nodeName(jsxAttribute);
}

export function elementNamespaceOrName(jsxElement) {
    if (hasNamespacedName(jsxElement)) {
        return jsxElement.openingElement.name.namespace.name;
    } else {
        return elementName(jsxElement);
    }
}

export function elementAttributes(jsxElement) {
    return jsxElement.openingElement.attributes;
}

export function isElementMarker(jsxElement) {
    return (
        isElement(jsxElement) &&
        elementName(jsxElement) === options.elementMarker
    );
}

export function isElement(node) {
    return node.type === 'JSXElement';
}

export function isTag(jsxElement) {
    return /^[a-z]|\-/.test(elementName(jsxElement));
}

export function isComponent(jsxElement) {
    return !isTag(jsxElement);
}

export function isSimpleExpression(expression) {
    if (expression.type === 'Identifier') {
        return true;
    } else if (expression.type === 'ThisExpression') {
        return true;
    } else if (expression.type === 'MemberExpression') {
        return !expression.computed && isSimpleExpression(expression.object);
    } else {
        return false;
    }
}

export function hasNamespacedName(jsxElement) {
    return jsxElement.openingElement.name.type === 'JSXNamespacedName';
}

export function hasI18nId(jsxElement) {
    return (
        hasNamespacedName(jsxElement) ||
        hasI18nIdAttribute(jsxElement)
    );
}

export function hasI18nIdAttribute(jsxElement) {
    return elementAttributes(jsxElement).map(attributeName).includes('i18n-id');
}

export function filterAttributes(jsxElement, condition) {
    jsxElement.openingElement.attributes = jsxElement.openingElement.attributes.filter(
        a => condition(jsxElement, a)
    );
}

export function i18nId(jsxElement) {
    if (hasNamespacedName(jsxElement)) {
        // It's names all the way down
        return jsxElement.openingElement.name.name.name;
    } else {
        const attr = elementAttributes(jsxElement)
            .find(a => attributeName(a) === 'i18n-id');
        if (attr) {
            assertInput(attr.value.type === 'StringLiteral',
                "i18n-id attribute found with non-StringLiteral value",
                jsxElement
            );
            return attr.value.value;
        }
    }
}

export function removeIdAttribute(jsxElement) {
    filterAttributes(jsxElement, (_, a) => attributeName(a) !== 'i18n-id');
}

export function stripI18nId(jsxElement) {
    if (jsxElement.openingElement.name.type === 'JSXNamespacedName') {
        const newName = jsxElement.openingElement.name.namespace.name;
        jsxElement.openingElement.name.type = 'JSXIdentifier';
        jsxElement.openingElement.name.name = newName;
        delete jsxElement.openingElement.name.object;

        if (jsxElement.closingElement) {
            jsxElement.closingElement.name.type = 'JSXIdentifier';
            jsxElement.closingElement.name.name = newName;
            delete jsxElement.closingElement.name.object;
        }
    } else {
        removeIdAttribute(jsxElement);
    }
}

export function convertToNamespacedName(jsxElement) {
    if (!hasNamespacedName(jsxElement)) {
        const name = elementName(jsxElement);
        const id = i18nId(jsxElement);
        if (id) {
            removeIdAttribute(jsxElement);
            const nameAst = types.JSXNamespacedName(
                types.JSXIdentifier(name),
                types.JSXIdentifier(id)
            );
            jsxElement.openingElement.name = nameAst;
            if (jsxElement.closingElement) {
                jsxElement.closingElement.name = nameAst;
            }
        }
    }

    return elementName(jsxElement);
}

export function convertNamespacedNameToIdAttribute(jsxElement) {
    if (jsxElement.openingElement.name.type === 'JSXNamespacedName') {
        const i18nId = jsxElement.openingElement.name.name.name;
        stripI18nId(jsxElement);

        jsxElement.openingElement.attributes.push(
            types.JSXAttribute(
                types.JSXIdentifier('i18n-id'),
                types.StringLiteral(i18nId)
            )
        );
    }
}

export function idOrComponentName(jsxElement) {
    let id = i18nId(jsxElement);
    if (!id && isComponent(jsxElement)) {
        id = elementName(jsxElement);
    }
    return id;
};
