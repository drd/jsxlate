'use strict';

/*
 *
 *   AST Manipulation
 *
 */

var types = require('babel-types');

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
            throw new Error("unknown elementName type: " + name.type);
        }
    },

    // Return the name of a JSXElement, but for namespaced names,
    // only return the namespace. Example: elementName(<a:foo/>) === 'a'
    unNamespacedElementName: function unNamespacedElementName(element) {
        var name = element.openingElement.name;

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
    attributeName: function attributeName(attribute) {
        if (!attribute.name) {
            return '';
        }

        var name = attribute.name;
        if (name.type === 'JSXIdentifier') {
            return name.name;
        } else if (name.type === 'JSXNamespacedName') {
            return name.namespace.name + ':' + name.name.name;
        } else {
            throw new Error("unknown attributeName type: " + name.type);
        }
    },

    // Return if an element is a tag
    isTag: function isTag(element) {
        return (/^[a-z]|\-/.test(this.elementName(element))
        );
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
            case 'StringLiteral':
            case 'NumericLiteral':
                return value.value;
                break;

            default:
        }
    },

    // Return the attribute list of a JSXElement
    elementAttributes: function elementAttributes(element) {
        return element.openingElement.attributes;
    },
    stripI18nId: function stripI18nId(element) {
        if (element.openingElement.name.type === 'JSXNamespacedName') {
            var newName = element.openingElement.name.namespace.name;
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
    removeIdAttribute: function removeIdAttribute(element) {
        var _this = this;

        if (this.elementAttributes(element)) {
            element.openingElement.attributes = this.elementAttributes(element).filter(function (a) {
                return !_this.isIdAttribute(a);
            });
        }
        return element;
    },
    convertNamespacedNameToIdAttribute: function convertNamespacedNameToIdAttribute(element) {
        if (element.openingElement.name.type === 'JSXNamespacedName') {
            var i18nId = element.openingElement.name.name.name;
            this.stripI18nId(element);

            element.openingElement.attributes.push(types.JSXAttribute(types.JSXIdentifier('i18n-id'), types.StringLiteral(i18nId)));
        }
    },
    isIdAttribute: function isIdAttribute(attribute) {
        return this.attributeName(attribute).toLowerCase() === 'i18n-id';
    },

    // Find and return the value of the i18n-id attribute of a JSXElement
    findIdAttribute: function findIdAttribute(element) {
        var _this2 = this;

        var attribute = this.elementAttributes(element).find(function (a) {
            return _this2.isIdAttribute(a);
        });
        if (attribute) {
            return this.attributeValue(attribute);
        }
        if (element.openingElement.name.type === 'JSXNamespacedName') {
            return element.openingElement.name.name.name;
        }
    },
    idOrComponentName: function idOrComponentName(element) {
        var id = this.findIdAttribute(element);
        if (!id && this.isComponent(element)) {
            id = this.elementName(element);
        }
        return id;
    },
    isElement: function isElement(node) {
        return node.type === 'JSXElement';
    },

    // Identify <I18N> tags
    isElementMarker: function isElementMarker(node) {
        return this.isElement(node) && this.elementName(node) === 'I18N';
    },

    // Identify i18n() functions
    isFunctionMarker: function isFunctionMarker(node) {
        return node.type === 'CallExpression' && node.callee.name === 'i18n';
    }
};

