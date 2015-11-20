/*
 *
 *   Message Validation
 *
 */

'use strict';

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var ast = require('./ast');
var whitelisting = require('./whitelisting');

module.exports = {
    validateMessage: function validateMessage(element) {
        var context = {
            root: element,
            componentsWithoutIds: {}
        };

        this.validateChildren(element.children, context);

        this.assertUniqueComponents(context);
    },

    assertUniqueComponents: function assertUniqueComponents(context) {
        var duplicated = [];
        _Object$keys(context.componentsWithoutIds).forEach(function (name) {
            if (context.componentsWithoutIds[name] > 1) {
                duplicated.push(name);
            }
        });
        if (duplicated.length) {
            throw new Error('Missing required i18n-id on duplicated component(s) ' + duplicated.join(', '));
        }
    },

    assertI18nId: function assertI18nId(element) {
        var openingElement = element.openingElement;
        if (openingElement.name.type !== 'JSXNamespacedName' && !openingElement.attributes.map(ast.attributeName).includes('i18n-id')) {
            throw new Error('Element missing required i18n-id: ' + escodegen(openingElement));
        }
    },

    validateJSXElement: function validateJSXElement(element, context) {
        if (ast.isElementMarker(element)) {
            // TODO: unified error handling showing source of exception
            // and context, including line/character positions.
            throw new Error('Found a nested element marker in ' + escodegen.generate(context.root));
        }
        if (ast.isTag(element) && whitelisting.hasUnsafeAttributes(element)) {
            this.assertI18nId(element);
        } else if (ast.isComponent(element)) {
            var _name = ast.elementName(element);
            var count = context.componentsWithoutIds[_name];
            if (count === undefined) {
                context.componentsWithoutIds[_name] = 0;
            }
            context.componentsWithoutIds[_name]++;
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

