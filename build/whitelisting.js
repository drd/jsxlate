/*
 *
 *   Attribute whitelisting
 *
 */

'use strict';

var escodegen = require('escodegen-wallaby');

var ast = require('./ast');

// Each tag can have a specific list of attributes to extract,
// which is merged with the wildcard list.
var tagWhitelistedAttributes = {
    a: ['href'],
    img: ['alt'],
    '*': ['title', 'placeholder', 'alt', 'summary']
};

module.exports = {
    // Return all whitelisted attribute names for this elementName
    whitelistedAttributeNames: function whitelistedAttributeNames(elementName) {
        return (tagWhitelistedAttributes[elementName] || []).concat(tagWhitelistedAttributes['*']);
    },

    extractableAttributes: function extractableAttributes(element) {
        var _this = this;

        return ast.elementAttributes(element).filter(function (a) {
            return _this.isExtractableAttribute(element, a);
        });
    },

    sanitizedAttributes: function sanitizedAttributes(element) {
        var _this2 = this;

        return element.openingElement.attributes.filter(function (a) {
            return !_this2.isWhitelistedAttribute(element, a);
        });
    },

    isWhitelistedAttribute: function isWhitelistedAttribute(element, attribute) {
        var name = ast.elementName(element);
        var elementWhitelistedAttributes = this.whitelistedAttributeNames(name);
        return elementWhitelistedAttributes.indexOf(ast.attributeName(attribute)) !== -1;
    },

    // Reports if an attribute is both whitelisted and has an extractable value
    // NOTE: Will warn to stderr if it finds a whitelisted attribute with no value
    isExtractableAttribute: function isExtractableAttribute(element, attribute) {
        var value = ast.attributeValue(attribute);
        var attributeIsWhitelisted = this.isWhitelistedAttribute(element, attribute);
        if (attributeIsWhitelisted && !value) {
            console.warn("Ignoring non-literal extractable attribute:", escodegen.generate(attribute));
        }
        return value && attributeIsWhitelisted;
    },

    // Reports if an element has any attributes to be sanitized
    hasUnsafeAttributes: function hasUnsafeAttributes(element) {
        return this.sanitizedAttributes(element).length > 0;
    }
};

