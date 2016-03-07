'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isFunctionMarker = isFunctionMarker;
exports.nodeName = nodeName;
exports.elementName = elementName;
exports.attributeName = attributeName;
exports.elementNamespaceOrName = elementNamespaceOrName;
exports.elementAttributes = elementAttributes;
exports.isElementMarker = isElementMarker;
exports.isElement = isElement;
exports.isTag = isTag;
exports.isComponent = isComponent;
exports.isSimpleExpression = isSimpleExpression;
exports.hasNamespacedName = hasNamespacedName;
exports.hasI18nId = hasI18nId;
exports.hasI18nIdAttribute = hasI18nIdAttribute;
exports.filterAttributes = filterAttributes;
exports.i18nId = i18nId;
exports.removeIdAttribute = removeIdAttribute;
exports.stripI18nId = stripI18nId;
exports.convertToNamespacedName = convertToNamespacedName;
exports.convertNamespacedNameToIdAttribute = convertNamespacedNameToIdAttribute;
exports.idOrComponentName = idOrComponentName;

var _errors = require('./errors');

var _generation = require('./generation');

var _generation2 = _interopRequireDefault(_generation);

var _options = require('./options');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 *
 *   AST Manipulation
 *
 */

var types = require('babel-types');

// does this callExpression node represent a call to `i18n()`
function isFunctionMarker(callExpression) {
    return callExpression.callee.name === _options.options.functionMarker;
}

// Element markers (`<I18N> ... </I18N>`)

function nodeName(node) {
    return node.name && (0, _generation2.default)(node.name);
}

function elementName(jsxElement) {
    return nodeName(jsxElement.openingElement);
}

function attributeName(jsxAttribute) {
    return nodeName(jsxAttribute);
}

function elementNamespaceOrName(jsxElement) {
    if (hasNamespacedName(jsxElement)) {
        return jsxElement.openingElement.name.namespace.name;
    } else {
        return elementName(jsxElement);
    }
}

function elementAttributes(jsxElement) {
    return jsxElement.openingElement.attributes;
}

function isElementMarker(jsxElement) {
    return isElement(jsxElement) && elementName(jsxElement) === _options.options.elementMarker;
}

function isElement(node) {
    return node.type === 'JSXElement';
}

function isTag(jsxElement) {
    return (/^[a-z]|\-/.test(elementName(jsxElement))
    );
}

function isComponent(jsxElement) {
    return !isTag(jsxElement);
}

function isSimpleExpression(expression) {
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

function hasNamespacedName(jsxElement) {
    return jsxElement.openingElement.name.type === 'JSXNamespacedName';
}

function hasI18nId(jsxElement) {
    return hasNamespacedName(jsxElement) || hasI18nIdAttribute(jsxElement);
}

function hasI18nIdAttribute(jsxElement) {
    return elementAttributes(jsxElement).map(attributeName).includes('i18n-id');
}

function filterAttributes(jsxElement, condition) {
    jsxElement.openingElement.attributes = jsxElement.openingElement.attributes.filter(function (a) {
        return condition(jsxElement, a);
    });
}

function i18nId(jsxElement) {
    if (hasNamespacedName(jsxElement)) {
        // It's names all the way down
        return jsxElement.openingElement.name.name.name;
    } else {
        var attr = elementAttributes(jsxElement).find(function (a) {
            return attributeName(a) === 'i18n-id';
        });
        if (attr) {
            (0, _errors.assertInput)(attr.value.type === 'StringLiteral', "i18n-id attribute found with non-StringLiteral value", jsxElement);
            return attr.value.value;
        }
    }
}

function removeIdAttribute(jsxElement) {
    filterAttributes(jsxElement, function (_, a) {
        return attributeName(a) !== 'i18n-id';
    });
}

function stripI18nId(jsxElement) {
    if (jsxElement.openingElement.name.type === 'JSXNamespacedName') {
        var newName = jsxElement.openingElement.name.namespace.name;
        jsxElement.openingElement.name.type = 'JSXIdentifier';
        jsxElement.openingElement.name.name = newName;
        delete jsxElement.openingElement.name.object;

        if (jsxElement.closingElement) {
            jsxElement.closingElement.name.type = 'JSXIdentifier';
            jsxElement.closingElement.name.name = newName;
            delete jsxElement.closingElement.name.object;
        }
    } else {
        removeIdAttribute(jsxElement);
    }
}

function convertToNamespacedName(jsxElement) {
    if (!hasNamespacedName(jsxElement)) {
        var name = elementName(jsxElement);
        var id = i18nId(jsxElement);
        if (id) {
            removeIdAttribute(jsxElement);
            var nameAst = types.JSXNamespacedName(types.JSXIdentifier(name), types.JSXIdentifier(id));
            jsxElement.openingElement.name = nameAst;
            if (jsxElement.closingElement) {
                jsxElement.closingElement.name = nameAst;
            }
        }
    }

    return elementName(jsxElement);
}

function convertNamespacedNameToIdAttribute(jsxElement) {
    if (jsxElement.openingElement.name.type === 'JSXNamespacedName') {
        var _i18nId = jsxElement.openingElement.name.name.name;
        stripI18nId(jsxElement);

        jsxElement.openingElement.attributes.push(types.JSXAttribute(types.JSXIdentifier('i18n-id'), types.StringLiteral(_i18nId)));
    }
}

function idOrComponentName(jsxElement) {
    var id = i18nId(jsxElement);
    if (!id && isComponent(jsxElement)) {
        id = elementName(jsxElement);
    }
    return id;
};

