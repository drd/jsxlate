/*
 *
 *   AST Manipulation
 *
 */

'use strict';

module.exports = {
    // Given an AST of either a MemberExpression or a JSXMemberExpression,
    // return a dotted string (e.g. "this.props.value")
    memberExpressionName: function memberExpressionName(name) {
        var segments = [];
        var iteratee = name;
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
    elementName: function elementName(element) {
        var name = element.openingElement.name;

        if (name.type === 'JSXIdentifier') {
            return name.name;
        } else if (name.type === 'JSXNamespacedName') {
            return name.namespace.name + ':' + name.name.name;
        } else if (name.type === 'JSXMemberExpression') {
            return this.memberExpressionName(name);
        } else {
            throw new Error('unknown elementName type: ' + name.type);
        }
    },

    // Return the name of a JSXAttribute
    attributeName: function attributeName(attribute) {
        var name = attribute.name;

        if (name.type === 'JSXIdentifier') {
            return name.name;
        } else if (name.type === 'JSXNamespacedName') {
            return name.namespace.name + ':' + name.name.name;
        } else {
            throw new Error('unknown attributeName type: ' + name.type);
        }
    },

    // Return if an element is a tag
    isTag: function isTag(element) {
        return /^[a-z]|\-/.test(this.elementName(element));
    },

    // Return if an element is a custom component
    isComponent: function isComponent(element) {
        return !this.isTag(element);
    },

    // Return the value of a JSXAttribute
    // Currently only works for Literals.
    attributeValue: function attributeValue(attribute) {
        var value = attribute.value;

        switch (value.type) {
            case 'Literal':
                return value.value;
                break;

            default:
        }
    },

    // Return the attribute list of a JSXElement
    elementAttributes: function elementAttributes(element) {
        return element.openingElement.attributes;
    },

    // Find and return the value of the i18n-id attribute of a JSXElement
    findIdAttribute: function findIdAttribute(element) {
        var _this = this;

        var attribute = this.elementAttributes(element).find(function (a) {
            return _this.attributeName(a).toLowerCase() === 'i18n-id';
        });
        if (attribute) {
            return this.attributeValue(attribute);
        }
    },

    // Identify <I18N> tags
    isElementMarker: function isElementMarker(node) {
        return this.elementName(node) === 'I18N';
    }
};

