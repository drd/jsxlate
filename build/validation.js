'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.sanitizedAttributesOf = sanitizedAttributesOf;
exports.validateTranslation = validateTranslation;
exports.validateMessage = validateMessage;
exports.validateFunctionMessage = validateFunctionMessage;
exports.hasUnsafeAttributes = hasUnsafeAttributes;
exports.validateAndSanitizeElement = validateAndSanitizeElement;

var _ast = require('./ast');

var _errors = require('./errors');

var _generation = require('./generation');

var _generation2 = _interopRequireDefault(_generation);

var _options = require('./options');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 *
 *   Message Validation
 *
 */

var whitelisting = require('./whitelisting');

function assertSameCounts(original, translated, msg) {
    Object.keys(original).concat(Object.keys(translated)).forEach(function (key) {
        if (translated[key] !== original[key]) {
            throw new Error(msg + (' (original[' + key + ']=' + original[key] + ' translated[' + key + ']=' + translated[key] + ')'));
        }
    });
}

function sanitizedAttributesOf(element) {
    return validateMessage(element).componentsToSanitizedAttributes;
}

function validateTranslation(original, translation) {
    var ogContext = validateMessage(original);
    var trContext = validateMessage(translation);

    assertSameCounts(ogContext.componentCounts, trContext.componentCounts, "Found a differing number of components in translation from original");

    assertSameCounts(ogContext.i18nIds, trContext.i18nIds, "Found a differing number of components with same i18n-id in translation from original");

    assertSameCounts(ogContext.namedExpressionDefinitions, trContext.namedExpressionDefinitions, "Found a differing number of named expressions in translation from original");
}

function validateMessage(element) {
    var context = {
        root: element,
        componentsWithoutIds: {},
        componentsToSanitizedAttributes: {},
        i18nIds: {},
        componentCounts: {},
        namedExpressionDefinitions: {}
    };

    validateChildren(element.children, context);
    assertUniqueComponents(context);

    return context;
}

function assertUniqueComponents(context) {
    var duplicated = [];
    Object.keys(context.componentsWithoutIds).forEach(function (name) {
        if (context.componentsWithoutIds[name] > 1) {
            duplicated.push(name);
        }
    });
    if (duplicated.length) {
        throw new Error("Missing required i18n-id on duplicated component(s) " + duplicated.join(', '));
    }
}

function assertI18nId(element) {
    var openingElement = element.openingElement;
    if (openingElement.name.type !== 'JSXNamespacedName' && !(0, _ast.i18nId)(element)) {
        throw new Error('Element missing required i18n-id: ' + (0, _generation2.default)(openingElement));
    }
}

function validateJSXElement(element, context) {
    if ((0, _ast.isElementMarker)(element)) {
        // TODO: unified error handling showing source of exception
        // and context, including line/character positions.
        throw new Error("Found a nested element marker in " + (0, _generation2.default)(context.root));
    }
    if (whitelisting.hasUnsafeAttributes(element)) {
        if ((0, _ast.isTag)(element)) {
            assertI18nId(element);
        } else if ((0, _ast.isComponent)(element)) {
            var componentId = (0, _ast.i18nId)(element);
            if (!componentId) {
                componentId = (0, _ast.elementName)(element);
                incrementKey(context.componentsWithoutIds, componentId);
            }
        }
        context.componentsToSanitizedAttributes[(0, _ast.idOrComponentName)(element)] = whitelisting.sanitizedAttributes(element);
    }

    if ((0, _ast.isComponent)(element) || (0, _ast.i18nId)(element)) {
        incrementKey(context.i18nIds, (0, _ast.idOrComponentName)(element));
    }

    if ((0, _ast.isComponent)(element)) {
        incrementKey(context.componentCounts, (0, _ast.elementNamespaceOrName)(element));
    }

    validateChildren(element.children, context);
}

function validateJSXExpressionContainer(container, context) {
    return container.type === 'Identifier' || container.type === 'ThisExpression' || container.type === 'MemberExpression' && container.computed === false && validateJSXExpressionContainer(container.object, context);
}

function validateChildren(children, context) {
    children.forEach(function (child) {
        switch (child.type) {
            case 'JSXElement':
                validateJSXElement(child, context);
                break;

            case 'JSXExpressionContainer':
                validateJSXExpressionContainer(child, context);
                incrementKey(context.namedExpressionDefinitions, (0, _generation2.default)(child));
                break;
        }
    });
}

function validateFunctionMessage(callExpression) {
    (0, _errors.assertInput)(callExpression.arguments.length === 1, 'Expected exactly 1 argument to ' + _options.options.functionMarker + '(), but got ' + callExpression.arguments.length, callExpression);

    (0, _errors.assertInput)(callExpression.arguments[0].type === 'StringLiteral', 'Expected a StringLiteral argument to ' + _options.options.functionMarker + '(), but got ' + callExpression.arguments[0].type, callExpression);
}

function incrementKey(map, key) {
    map[key] = (map[key] || 0) + 1;
}

var ExtractionValidationVisitor = {
    JSXElement: function JSXElement(path) {
        // prevent nested markers
        (0, _errors.assertInput)(!(0, _ast.isElementMarker)(path.node), "Found a nested message marker", path.node);

        var elementName = (0, _ast.convertToNamespacedName)(path.node);
        if (hasUnsafeAttributes(path.node)) {
            if ((0, _ast.isComponent)(path.node)) {
                // keep track of custom components to ensure there are no duplicates
                incrementKey(this.validationContext.componentNamesAndIds, elementName);
            } else {
                // tags with sanitized attributes must have an i18n-id or namespace
                (0, _errors.assertInput)((0, _ast.hasI18nId)(path.node), "Found a tag with sanitized attributes with no i18n-id", path.node);
            }
        }
    },
    JSXAttribute: function JSXAttribute(path) {
        // technically part of sanitization, but visitors are merged
        // for performance
        if (attributeIsSanitized(path.parentPath.parent, path.node)) {
            path.remove();
        }
    },
    JSXSpreadAttribute: function JSXSpreadAttribute(path) {
        path.remove();
    },
    JSXExpressionContainer: function JSXExpressionContainer(path) {
        if (path.parent.type === 'JSXElement') {
            (0, _errors.assertInput)((0, _ast.isSimpleExpression)(path.node.expression), "Only identifiers and simple member expressions (foo.bar, " + "this.that.other) are allowed in <I18N> tags.", path.node);
        }
    }
};

function hasUnsafeAttributes(jsxElement) {
    return (0, _ast.elementAttributes)(jsxElement).some(function (a) {
        return attributeIsSanitized(jsxElement, a);
    });
}

function attributeIsSanitized(element, attribute) {
    if (attribute.type === 'JSXSpreadAttribute') {
        return true;
    }

    var name = (0, _ast.elementNamespaceOrName)(element);
    var whitelistedAttributes = _options.whitelist[name] || _options.whitelist['*'];
    return !(whitelistedAttributes.indexOf((0, _ast.attributeName)(attribute)) !== -1) || attribute.value.type !== 'StringLiteral';
}

function validateElementContext(validationContext) {
    (0, _errors.assertUnique)(validationContext.componentNamesAndIds, 'Found the following duplicate elements/components', validationContext.root);
}

function validateAndSanitizeElement(jsxElementPath) {
    // Traverse with state of validationContext
    var validationContext = {
        root: jsxElementPath.node,
        componentNamesAndIds: {}
    };
    jsxElementPath.traverse(ExtractionValidationVisitor, { validationContext: validationContext });
    validateElementContext(validationContext);
}

