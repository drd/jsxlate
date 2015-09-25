/*
 *
 *   Message Extraction
 *
 */

'use strict';

var ast = require('./ast');
var whitelisting = require('./whitelisting');

module.exports = {
    extractElementMessage: function extractElementMessage(node) {
        var _this = this;

        return node.children.reduce(function (message, c) {
            return message + _this.extractChild(c);
        }, '');
    },

    extractChild: function extractChild(child) {
        switch (child.type) {
            case 'Literal':
                return child.value;
                break;

            case 'JSXExpressionContainer':
                return this.extractExpression(child.expression);
                break;

            case 'JSXElement':
                return this.extractElement(child);
                break;

            default:
                throw new Error("Unexpected child type: " + child.type);
        }
    },

    extractExpression: function extractExpression(expression) {
        return '{' + ast.memberExpressionName(expression) + '}';
    },

    extractElementAttribute: function extractElementAttribute(attribute) {
        return ast.attributeName(attribute) + '="' + ast.attributeValue(attribute) + '"';
    },

    extractElementAttributes: function extractElementAttributes(element) {
        var attributesToExtract = whitelisting.extractableAttributes(element);

        return attributesToExtract.length ? ' ' + attributesToExtract.map(this.extractElementAttribute).join(' ') : '';
    },

    extractElement: function extractElement(element) {
        var name = ast.elementName(element);
        if (whitelisting.hasUnsafeAttributes(element)) {
            var i18nId = ast.findIdAttribute(element);
            name = name + ':' + i18nId;
        }
        var attributes = this.extractElementAttributes(element);
        if (element.children.length) {
            return '<' + name + attributes + '>' + this.extractElementMessage(element) + '</' + name + '>';
        } else {
            return '<' + name + attributes + ' />';
        }
    }
};

