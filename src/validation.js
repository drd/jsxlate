/*
 *
 *   Message Validation
 *
 */

const ast = require('./ast');
const whitelisting = require('./whitelisting');


module.exports = {
    validateMessage: function(element) {
        let context = {
            root: element,
            componentsWithoutIds: {}
        };

        this.validateChildren(element.children, context);

        this.assertUniqueComponents(context);
    },

    assertUniqueComponents: function(context) {
        let duplicated = [];
        Object.keys(context.componentsWithoutIds).forEach(name => {
            if (context.componentsWithoutIds[name] > 1) {
                duplicated.push(name);
            }
        })
        if (duplicated.length) {
            throw new Error("Missing required i18n-id on duplicated component(s) " + duplicated.join(', '));
        }
    },

    assertI18nId: function(element) {
        let openingElement = element.openingElement;
        if (openingElement.name.type !== 'JSXNamespacedName'
            && !openingElement.attributes.map(ast.attributeName).includes('i18n-id')) {
            throw new Error('Element missing required i18n-id: ' + escodegen(openingElement));
        }
    },

    validateJSXElement: function(element, context) {
        if (ast.isElementMarker(element)) {
            // TODO: unified error handling showing source of exception
            // and context, including line/character positions.
            throw new Error("Found a nested element marker in " + escodegen.generate(context.root));
        }
        if (ast.isTag(element) && whitelisting.hasUnsafeAttributes(element)) {
            this.assertI18nId(element);
        } else if (ast.isComponent(element)) {
            let name = ast.elementName(element);
            let count = context.componentsWithoutIds[name];
            if (count === undefined) {
                context.componentsWithoutIds[name] = 0;
            }
            context.componentsWithoutIds[name]++;
        }

        this.validateChildren(element.children, context);
    },

    validateJSXExpressionContainer: function(container, context) {
        return container.type === 'Identifier'
            || container.type === 'ThisExpression'
            || (container.type === 'MemberExpression'
                && container.computed === false
                && this.validateJSXExpressionContainer(container.object, context));
    },

    validateChildren: function(children, context) {
        children.forEach(child => {
            switch(child.type) {
                case 'JSXElement':
                    this.validateJSXElement(child, context);
                break;

                case 'JSXExpressionContainer':
                    this.validateJSXExpressionContainer(child, context);
                break;
            }
        })
    }
};
