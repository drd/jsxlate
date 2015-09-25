/*
 *
 *   Message Extraction
 *
 */

const ast = require('./ast');
const whitelisting = require('./whitelisting');


module.exports = {
    extractElementMessage: function(node) {
        return node.children.reduce((message, c) => {
            return message + this.extractChild(c)
        }, '')
    },

    extractChild: function(child) {
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

    extractExpression: function(expression) {
        return `{${ast.memberExpressionName(expression)}}`;
    },


    extractElementAttribute: function(attribute) {
        return `${ast.attributeName(attribute)}="${ast.attributeValue(attribute)}"`;
    },

    extractElementAttributes: function(element) {
        let attributesToExtract = whitelisting.extractableAttributes(element);

        return attributesToExtract.length
            ? ` ${attributesToExtract.map(this.extractElementAttribute).join(' ')}`
            : '';
    },

    extractElement: function(element) {
        let name = ast.elementName(element);
        if (whitelisting.hasUnsafeAttributes(element)) {
            let i18nId = ast.findIdAttribute(element);
            name = `${name}:${i18nId}`;
        }
        let attributes = this.extractElementAttributes(element);
        if (element.children.length) {
            return `<${name}${attributes}>${this.extractElementMessage(element)}</${name}>`;
        } else {
            return `<${name}${attributes} />`;
        }
    }
};
