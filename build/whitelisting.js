'use strict';

var _ast = require('./ast');

var _generation = require('./generation');

var _generation2 = _interopRequireDefault(_generation);

var _options = require('./options');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
    // Return all whitelisted attribute names for this elementName
    whitelistedAttributeNames: function whitelistedAttributeNames(elementName) {
        return _options.whitelist[elementName] || [];
    },

    extractableAttributes: function extractableAttributes(element) {
        var _this = this;

        return (0, _ast.elementAttributes)(element).filter(function (a) {
            return _this.isExtractableAttribute(element, a);
        });
    },

    sanitizedAttributes: function sanitizedAttributes(element) {
        var _this2 = this;

        return (0, _ast.elementAttributes)(element).filter(function (a) {
            return !_this2.isWhitelistedAttribute(element, a);
        });
    },

    isWhitelistedAttribute: function isWhitelistedAttribute(element, attribute) {
        var name = (0, _ast.elementNamespaceOrName)(element);
        var elementWhitelistedAttributes = this.whitelistedAttributeNames(name);
        return elementWhitelistedAttributes.indexOf((0, _ast.attributeName)(attribute)) !== -1;
    },

    // Reports if an attribute is both whitelisted and has an extractable value
    // NOTE: Will warn to stderr if it finds a whitelisted attribute with no value
    isExtractableAttribute: function isExtractableAttribute(element, attribute) {
        var value = (0, _ast.attributeValue)(attribute);
        var attributeIsWhitelisted = this.isWhitelistedAttribute(element, attribute);
        if (attributeIsWhitelisted && !value) {
            console.warn("Ignoring non-literal extractable attribute:", (0, _generation2.default)(attribute).code);
        }
        return attributeIsWhitelisted;
    },

    // Reports if an element has any attributes to be sanitized
    hasUnsafeAttributes: function hasUnsafeAttributes(element) {
        return this.sanitizedAttributes(element).length > 0;
    }
}; /*
    *
    *   Attribute whitelisting
    *
    */

