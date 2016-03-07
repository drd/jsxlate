/*
 *
 *   AST Manipulation
 *
 */


const types = require('babel-types');

import {assertInput} from './errors';
import generate from './generation';
import {options} from './options';


const AST = {
    // Given an AST of either a MemberExpression or a JSXMemberExpression,
    // return a dotted string (e.g. "this.props.value")
    memberExpressionName(name) {
        let segments = [];
        let iteratee = name;
        while (iteratee.type.endsWith('MemberExpression')) {
            segments.push(iteratee.property.name);
            iteratee = iteratee.object;
        }
        if (iteratee.type === 'ThisExpression') {
            segments.push('this');
        } else {
            segments.push(iteratee.name);
        }
        return segments.reverse().join('.');
    },


    // Return the name of a JSXElement
    elementName(element) {
        let name = element.openingElement.name;

        if (name.type === 'JSXIdentifier') {
            return name.name;
        } else if (name.type === 'JSXNamespacedName') {
            return `${name.namespace.name}:${name.name.name}`;
        } else if (name.type === 'JSXMemberExpression') {
            return this.memberExpressionName(name);
        } else {
            throw new Error("unknown elementName type: " + name.type);
        }
    },


    // Return the name of a JSXElement, but for namespaced names,
    // only return the namespace. Example: elementName(<a:foo/>) === 'a'
    unNamespacedElementName(element) {
        let name = element.openingElement.name;

        if (name.type === 'JSXIdentifier') {
            return name.name;
        } else if (name.type === 'JSXNamespacedName') {
            return name.namespace.name;
        } else if (name.type === 'JSXMemberExpression') {
            return this.memberExpressionName(name);
        } else {
            throw new Error("unknown elementName type: " + name.type);
        }
    },


    // Return the name of a JSXAttribute
    attributeName(attribute) {
        if (!attribute.name) {
            return '';
        }

        let name = attribute.name;
        if (name.type === 'JSXIdentifier') {
            return name.name;
        } else if (name.type === 'JSXNamespacedName') {
            return `${name.namespace.name}:${name.name.name}`;
        } else {
            throw new Error("unknown attributeName type: " + name.type);
        }
    },


    // Return if an element is a tag
    isTag(element) {
        return /^[a-z]|\-/.test(this.elementName(element));
    },


    // Return if an element is a custom component
    isComponent(element) {
        return !this.isTag(element);
    },


    // Return the value of a JSXAttribute
    // Currently only works for Literals.
    attributeValue(attribute) {
        let value = attribute.value;

        switch (value.type) {
            case 'Literal':
            case 'StringLiteral':
            case 'NumericLiteral':
                return value.value;
            break;

            default:
        }
    },


    // Return the attribute list of a JSXElement
    elementAttributes(element) {
        return element.openingElement.attributes;
    },

    stripI18nId(element) {
        if (element.openingElement.name.type === 'JSXNamespacedName') {
            const newName = element.openingElement.name.namespace.name;
            element.openingElement.name.type = 'JSXIdentifier';
            element.openingElement.name.name = newName;
            delete element.openingElement.name.object;

            if (element.closingElement) {
                element.closingElement.name.type = 'JSXIdentifier';
                element.closingElement.name.name = newName;
                delete element.closingElement.name.object;
            }
        } else {
            this.removeIdAttribute(element);
        }
    },

    // remove i18n-id attribute from an element
    removeIdAttribute(element) {
        if (this.elementAttributes(element)) {
            element.openingElement.attributes = this.elementAttributes(element).filter(
                a => !this.isIdAttribute(a)
            );
        }
        return element;
    },

    convertNamespacedNameToIdAttribute(element) {
        if (element.openingElement.name.type === 'JSXNamespacedName') {
            const i18nId = element.openingElement.name.name.name;
            this.stripI18nId(element);

            element.openingElement.attributes.push(
                types.JSXAttribute(
                    types.JSXIdentifier('i18n-id'),
                    types.StringLiteral(i18nId)
                )
            );
        }
    },

    isIdAttribute(attribute) {
        return this.attributeName(attribute).toLowerCase() === 'i18n-id';
    },

    // Find and return the value of the i18n-id attribute of a JSXElement
    findIdAttribute(element) {
        let attribute = this
            .elementAttributes(element).find(a => this.isIdAttribute(a));
        if (attribute) {
            return this.attributeValue(attribute);
        }
        if (element.openingElement.name.type === 'JSXNamespacedName') {
            return element.openingElement.name.name.name;
        }
    },

    idOrComponentName(element) {
        let id = this.findIdAttribute(element);
        if (!id && this.isComponent(element)) {
            id = this.elementName(element);
        }
        return id;
    },

    isElement(node) {
        return node.type === 'JSXElement';
    },

    // Identify <I18N> tags
    isElementMarker(node) {
        return (
            this.isElement(node) &&
            this.elementName(node) === options.elementMarker
        );
    },

    // Identify i18n() functions
    isFunctionMarker(node) {
        return (
            node.type === 'CallExpression' &&
            node.callee.name === options.functionMarker
        );
    },
};
export default AST;


// Code generation



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
    return elementName(jsxElement) === options.elementMarker;
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

export function convertToNamespacedName(jsxElement) {
    if (!hasNamespacedName(jsxElement)) {
        const name = elementName(jsxElement);
        const id = i18nId(jsxElement);
        if (id) {
            filterAttributes(jsxElement, (_, a) => attributeName(a) !== 'i18n-id');
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
