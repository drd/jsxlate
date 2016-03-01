/*
 *
 *   AST Manipulation
 *
 */


const types = require('babel-types');


module.exports = {
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

    // remove i18n-id attribute from an element
    removeIdAttribute(element) {
        if (element.openingElement.attributes) {
            element.openingElement.attributes = element.openingElement.attributes.filter(a => !this.isIdAttribute(a));
        }
        return element;
    },

    convertNamespacedNameToIdAttribute(element) {
        if (element.openingElement.name.type === 'JSXNamespacedName') {
            const newName = element.openingElement.name.namespace.name;
            const i18nId = element.openingElement.name.name.name;
            element.openingElement.name.type = 'JSXIdentifier';
            element.openingElement.name.name = newName;
            delete element.openingElement.name.object;

            if (element.closingElement) {
                element.closingElement.name.type = 'JSXIdentifier';
                element.closingElement.name.name = newName;
                delete element.closingElement.name.object;
            }

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
        return this.isElement(node) && this.elementName(node) === 'I18N';
    },

    // Identify i18n() functions
    isFunctionMarker(node) {
        return node.type === 'CallExpression' && node.callee.name === 'i18n';
    },
};
