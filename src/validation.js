/*
 *
 *   Message Validation
 *
 */

import generate from 'babel-generator';

const ast = require('./ast');
import {incrementKey} from './extract';
const whitelisting = require('./whitelisting');


function assertSameCounts(original, translated, msg) {
    Object.keys(original).concat(Object.keys(translated)).forEach(key => {
        if (translated[key] !== original[key]) {
            throw new Error(msg + ` (original[${key}]=${original[key]}, translated[${key}]=${translated[key]})`);
        }
    })
}

module.exports = {
    sanitizedAttributesOf(element) {
        return this.validateMessage(element).componentsToSanitizedAttributes;
    },

    validateTranslation(original, translation) {
        const ogContext = this.validateMessage(original);
        const trContext = this.validateMessage(translation);

        assertSameCounts(
            ogContext.componentCounts,
            trContext.componentCounts,
            "Found a differing number of components in translation from original"
        );

        assertSameCounts(
            ogContext.i18nIds,
            trContext.i18nIds,
            "Found a differing number of components with same i18n-id in translation from original"
        );

        assertSameCounts(
            ogContext.namedExpressionDefinitions,
            trContext.namedExpressionDefinitions,
            "Found a differing number of named expressions in translation from original"
        );
    },

    validateMessage: function(element) {
        let context = {
            root: element,
            componentsWithoutIds: {},
            componentsToSanitizedAttributes: {},
            i18nIds: {},
            componentCounts: {},
            namedExpressionDefinitions: {},
        };

        this.validateChildren(element.children, context);
        this.assertUniqueComponents(context);

        return context;
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
            && !ast.findIdAttribute(element)) {
            throw new Error('Element missing required i18n-id: ' + generate(openingElement));
        }
    },

    validateJSXElement: function(element, context) {
        if (ast.isElementMarker(element)) {
            // TODO: unified error handling showing source of exception
            // and context, including line/character positions.
            throw new Error("Found a nested element marker in " + generate(context.root));
        }
        if (whitelisting.hasUnsafeAttributes(element)) {
            if (ast.isTag(element)) {
                this.assertI18nId(element);
            } else if (ast.isComponent(element)) {
                let componentId = ast.findIdAttribute(element)
                if (!componentId) {
                    componentId = ast.elementName(element);
                    incrementKey(context.componentsWithoutIds, componentId);
                }
            }
            context.componentsToSanitizedAttributes[ast.idOrComponentName(element)] = whitelisting.sanitizedAttributes(element);
        }

        if (ast.isComponent(element) || ast.findIdAttribute(element)) {
            incrementKey(context.i18nIds, ast.idOrComponentName(element));
        }

        if (ast.isComponent(element)) {
            incrementKey(context.componentCounts, ast.unNamespacedElementName(element));
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
                    incrementKey(context.namedExpressionDefinitions, ast.memberExpressionName(child));
                break;
            }
        })
    }
};
