/*
 *
 *   Attribute whitelisting
 *
 */


import ast from './ast';
import generate from './generation';
import {whitelist as tagWhitelistedAttributes} from './options';


module.exports = {
    // Return all whitelisted attribute names for this elementName
    whitelistedAttributeNames: function(elementName) {
        return tagWhitelistedAttributes[elementName] || [];
    },


    extractableAttributes: function(element) {
        return ast.elementAttributes(element).filter(
            a => this.isExtractableAttribute(element, a)
        );
    },


    sanitizedAttributes: function(element) {
        return element.openingElement.attributes.filter(
            a => !this.isWhitelistedAttribute(element, a)
        );
    },


    isWhitelistedAttribute: function(element, attribute) {
        let name = ast.unNamespacedElementName(element);
        let elementWhitelistedAttributes = this.whitelistedAttributeNames(name);
        return elementWhitelistedAttributes.indexOf(ast.attributeName(attribute)) !== -1;
    },


    // Reports if an attribute is both whitelisted and has an extractable value
    // NOTE: Will warn to stderr if it finds a whitelisted attribute with no value
    isExtractableAttribute: function(element, attribute) {
        let value = ast.attributeValue(attribute);
        let attributeIsWhitelisted = this.isWhitelistedAttribute(element, attribute);
        if (attributeIsWhitelisted && !value) {
            console.warn("Ignoring non-literal extractable attribute:", generate(attribute).code);
        }
        return attributeIsWhitelisted;
    },


    // Reports if an element has any attributes to be sanitized
    hasUnsafeAttributes: function(element) {
        return this.sanitizedAttributes(element).length > 0;
    },
};
