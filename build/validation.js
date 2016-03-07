'use strict';

var _babelGenerator = require('babel-generator');

var _babelGenerator2 = _interopRequireDefault(_babelGenerator);

var _extract = require('./extract');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ast = require('./ast'); /*
                             *
                             *   Message Validation
                             *
                             */

var whitelisting = require('./whitelisting');

function assertSameCounts(original, translated, msg) {
    Object.keys(original).concat(Object.keys(translated)).forEach(function (key) {
        if (translated[key] !== original[key]) {
            throw new Error(msg + (' (original[' + key + ']=' + original[key] + ', translated[' + key + ']=' + translated[key] + ')'));
        }
    });
}

module.exports = {
    sanitizedAttributesOf: function sanitizedAttributesOf(element) {
        return this.validateMessage(element).componentsToSanitizedAttributes;
    },
    validateTranslation: function validateTranslation(original, translation) {
        var ogContext = this.validateMessage(original);
        var trContext = this.validateMessage(translation);

        assertSameCounts(ogContext.componentCounts, trContext.componentCounts, "Found a differing number of components in translation from original");

        assertSameCounts(ogContext.i18nIds, trContext.i18nIds, "Found a differing number of components with same i18n-id in translation from original");

        assertSameCounts(ogContext.namedExpressionDefinitions, trContext.namedExpressionDefinitions, "Found a differing number of named expressions in translation from original");
    },

    validateMessage: function validateMessage(element) {
        var context = {
            root: element,
            componentsWithoutIds: {},
            componentsToSanitizedAttributes: {},
            i18nIds: {},
            componentCounts: {},
            namedExpressionDefinitions: {}
        };

        this.validateChildren(element.children, context);
        this.assertUniqueComponents(context);

        return context;
    },

    assertUniqueComponents: function assertUniqueComponents(context) {
        var duplicated = [];
        Object.keys(context.componentsWithoutIds).forEach(function (name) {
            if (context.componentsWithoutIds[name] > 1) {
                duplicated.push(name);
            }
        });
        if (duplicated.length) {
            throw new Error("Missing required i18n-id on duplicated component(s) " + duplicated.join(', '));
        }
    },

    assertI18nId: function assertI18nId(element) {
        var openingElement = element.openingElement;
        if (openingElement.name.type !== 'JSXNamespacedName' && !ast.findIdAttribute(element)) {
            throw new Error('Element missing required i18n-id: ' + (0, _babelGenerator2.default)(openingElement));
        }
    },

    validateJSXElement: function validateJSXElement(element, context) {
        if (ast.isElementMarker(element)) {
            // TODO: unified error handling showing source of exception
            // and context, including line/character positions.
            throw new Error("Found a nested element marker in " + (0, _babelGenerator2.default)(context.root));
        }
        if (whitelisting.hasUnsafeAttributes(element)) {
            if (ast.isTag(element)) {
                this.assertI18nId(element);
            } else if (ast.isComponent(element)) {
                var componentId = ast.findIdAttribute(element);
                if (!componentId) {
                    componentId = ast.elementName(element);
                    (0, _extract.incrementKey)(context.componentsWithoutIds, componentId);
                }
            }
            context.componentsToSanitizedAttributes[ast.idOrComponentName(element)] = whitelisting.sanitizedAttributes(element);
        }

        if (ast.isComponent(element) || ast.findIdAttribute(element)) {
            (0, _extract.incrementKey)(context.i18nIds, ast.idOrComponentName(element));
        }

        if (ast.isComponent(element)) {
            (0, _extract.incrementKey)(context.componentCounts, ast.unNamespacedElementName(element));
        }

        this.validateChildren(element.children, context);
    },

    validateJSXExpressionContainer: function validateJSXExpressionContainer(container, context) {
        return container.type === 'Identifier' || container.type === 'ThisExpression' || container.type === 'MemberExpression' && container.computed === false && this.validateJSXExpressionContainer(container.object, context);
    },

    validateChildren: function validateChildren(children, context) {
        var _this = this;

        children.forEach(function (child) {
            switch (child.type) {
                case 'JSXElement':
                    _this.validateJSXElement(child, context);
                    break;

                case 'JSXExpressionContainer':
                    _this.validateJSXExpressionContainer(child, context);
                    (0, _extract.incrementKey)(context.namedExpressionDefinitions, ast.memberExpressionName(child));
                    break;
            }
        });
    }
};

