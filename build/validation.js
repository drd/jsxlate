'use strict';

var _babelGenerator = require('babel-generator');

var _babelGenerator2 = _interopRequireDefault(_babelGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ast = require('./ast'); /*
                             *
                             *   Message Validation
                             *
                             */

var whitelisting = require('./whitelisting');

module.exports = {
    sanitizedAttributesOf: function sanitizedAttributesOf(element) {
        return this.validateMessage(element).componentsToSanitizedAttributes;
    },

    validateMessage: function validateMessage(element) {
        var context = {
            root: element,
            componentsWithoutIds: {},
            componentsToSanitizedAttributes: {}
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
        if (openingElement.name.type !== 'JSXNamespacedName' && !openingElement.attributes.map(ast.attributeName).includes('i18n-id')) {
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
                    var count = context.componentsWithoutIds[componentId];
                    if (count === undefined) {
                        context.componentsWithoutIds[componentId] = 0;
                    }
                    context.componentsWithoutIds[componentId]++;
                }
            }
            context.componentsToSanitizedAttributes[ast.idOrComponentName(element)] = whitelisting.sanitizedAttributes(element);
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
                    break;
            }
        });
    }
};

