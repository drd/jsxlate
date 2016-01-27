/*
 *
 *   AST Manipulation
 *
 */


module.exports = {
    // Given an AST of either a MemberExpression or a JSXMemberExpression,
    // return a dotted string (e.g. "this.props.value")
    memberExpressionName: function(name) {
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
    elementName: function(element) {
        let name = element.openingElement.name;

        if (name.type === 'JSXIdentifier') {
            return name.name;
        } else if (name.type === 'JSXNamespacedName') {
            return `${name.namespace.name}:${name.name.name}`;
        } else if (name.type === 'JSXMemberExpression') {
            return this.memberExpressionName(name)
        } else {
            throw new Error("unknown elementName type: " + name.type);
        }
    },


    // Return the name of a JSXAttribute
    attributeName: function(attribute) {
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
    isTag: function(element) {
        return /^[a-z]|\-/.test(this.elementName(element));
    },


    // Return if an element is a custom component
    isComponent: function(element) {
        return !this.isTag(element);
    },


    // Return the value of a JSXAttribute
    // Currently only works for Literals.
    attributeValue: function(attribute) {
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
    elementAttributes: function(element) {
        return element.openingElement.attributes;
    },


    // Find and return the value of the i18n-id attribute of a JSXElement
    findIdAttribute: function(element) {
        let attribute = this.elementAttributes(element).find(a => {
            return this.attributeName(a).toLowerCase() === 'i18n-id'
        });
        if (attribute) {
            return this.attributeValue(attribute);
        }
    },

    idOrComponentName(element) {
        let id = this.findIdAttribute(element);
        if (!id && this.isComponent(element)) {
            id = this.elementName(element);
        }
        return id;
    },

    // Identify <I18N> tags
    isElementMarker: function(node) {
        return this.elementName(node) === 'I18N';
    }
};
