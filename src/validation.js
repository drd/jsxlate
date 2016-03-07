/*
 *
 *   Message Validation
 *
 */


import {
    attributeName,
    convertToNamespacedName,
    elementAttributes,
    elementName,
    elementNamespaceOrName,
    i18nId,
    idOrComponentName,
    hasI18nId,
    isComponent,
    isElementMarker,
    isSimpleExpression,
    isTag
} from './ast';
import {assertInput, assertUnique} from './errors';
import generate from './generation';
import {options} from './options';
const whitelisting = require('./whitelisting');


function assertSameCounts(original, translated, msg) {
    Object.keys(original).concat(Object.keys(translated)).forEach(key => {
        if (translated[key] !== original[key]) {
            throw new Error(msg + ` (original[${key}]=${original[key]} translated[${key}]=${translated[key]})`);
        }
    });
}


export function sanitizedAttributesOf(element) {
    return validateMessage(element).componentsToSanitizedAttributes;
}

export function validateTranslation(original, translation) {
    const ogContext = validateMessage(original);
    const trContext = validateMessage(translation);

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
}

export function validateMessage(element) {
    let context = {
        root: element,
        componentsWithoutIds: {},
        componentsToSanitizedAttributes: {},
        i18nIds: {},
        componentCounts: {},
        namedExpressionDefinitions: {},
    };

    validateChildren(element.children, context);
    assertUniqueComponents(context);

    return context;
}

function assertUniqueComponents(context) {
    let duplicated = [];
    Object.keys(context.componentsWithoutIds).forEach(name => {
        if (context.componentsWithoutIds[name] > 1) {
            duplicated.push(name);
        }
    });
    if (duplicated.length) {
        throw new Error("Missing required i18n-id on duplicated component(s) " + duplicated.join(', '));
    }
}

function assertI18nId(element) {
    let openingElement = element.openingElement;
    if (openingElement.name.type !== 'JSXNamespacedName'
        && !i18nId(element)) {
        throw new Error('Element missing required i18n-id: ' + generate(openingElement));
    }
}

function validateJSXElement(element, context) {
    if (isElementMarker(element)) {
        // TODO: unified error handling showing source of exception
        // and context, including line/character positions.
        throw new Error("Found a nested element marker in " + generate(context.root));
    }
    if (whitelisting.hasUnsafeAttributes(element)) {
        if (isTag(element)) {
            assertI18nId(element);
        } else if (isComponent(element)) {
            let componentId = i18nId(element);
            if (!componentId) {
                componentId = elementName(element);
                incrementKey(context.componentsWithoutIds, componentId);
            }
        }
        context.componentsToSanitizedAttributes[idOrComponentName(element)] = whitelisting.sanitizedAttributes(element);
    }

    if (isComponent(element) || i18nId(element)) {
        incrementKey(context.i18nIds, idOrComponentName(element));
    }

    if (isComponent(element)) {
        incrementKey(context.componentCounts, elementNamespaceOrName(element));
    }

    validateChildren(element.children, context);
}

function validateJSXExpressionContainer(container, context) {
    return container.type === 'Identifier'
        || container.type === 'ThisExpression'
        || (container.type === 'MemberExpression'
            && container.computed === false
            && validateJSXExpressionContainer(container.object, context));
}

function validateChildren(children, context) {
    children.forEach(child => {
        switch(child.type) {
            case 'JSXElement':
                validateJSXElement(child, context);
            break;

            case 'JSXExpressionContainer':
                validateJSXExpressionContainer(child, context);
                incrementKey(context.namedExpressionDefinitions, generate(child));
            break;
        }
    });
}






import {whitelist} from './options';

export function validateFunctionMessage(callExpression) {
    assertInput(
        callExpression.arguments.length === 1,
        `Expected exactly 1 argument to ${options.functionMarker}(), but got ${callExpression.arguments.length}`,
        callExpression
    );

    assertInput(
        callExpression.arguments[0].type === 'StringLiteral',
        `Expected a StringLiteral argument to ${options.functionMarker}(), but got ${callExpression.arguments[0].type}`,
        callExpression
    );
}


function incrementKey(map, key) {
    map[key] = (map[key] || 0) + 1;
}


const ExtractionValidationVisitor = {
    JSXElement(path) {
        // prevent nested markers
        assertInput(!isElementMarker(path.node),
            "Found a nested message marker",
            path.node
        );

        const elementName = convertToNamespacedName(path.node);
        if (hasUnsafeAttributes(path.node)) {
            if (isComponent(path.node)) {
                // keep track of custom components to ensure there are no duplicates
                incrementKey(this.validationContext.componentNamesAndIds, elementName);
            } else {
                // tags with sanitized attributes must have an i18n-id or namespace
                assertInput(
                    hasI18nId(path.node),
                    "Found a tag with sanitized attributes with no i18n-id",
                    path.node
                );
            }
        }
    },

    JSXAttribute(path) {
        // technically part of sanitization, but visitors are merged
        // for performance
        if (attributeIsSanitized(path.parentPath.parent, path.node)) {
            path.remove();
        }
    },

    JSXSpreadAttribute(path) {
        path.remove();
    },

    JSXExpressionContainer(path) {
        if (path.parent.type === 'JSXElement') {
            assertInput(isSimpleExpression(path.node.expression),
                "Only identifiers and simple member expressions (foo.bar, " +
                "this.that.other) are allowed in <I18N> tags.",
                path.node
            );
        }
    },
};

export function hasUnsafeAttributes(jsxElement) {
    return elementAttributes(jsxElement).some(a => attributeIsSanitized(jsxElement, a));
}

function attributeIsSanitized(element, attribute) {
    if (attribute.type === 'JSXSpreadAttribute') {
        return true;
    }

    const name = elementNamespaceOrName(element);
    const whitelistedAttributes = whitelist[name] || whitelist['*'];
    return (
        !whitelistedAttributes.includes(attributeName(attribute)) ||
        attribute.value.type !== 'StringLiteral'
    );
}

function validateElementContext(validationContext) {
    assertUnique(
        validationContext.componentsWithSanitizedAttributes,
        'Found the following duplicate elements/components',
        validationContext.root
    );

    assertUnique(
        validationContext.componentNamesAndIds,
        'Found the following duplicate elements/components',
        validationContext.root
    );
}

export function validateAndSanitizeElement(jsxElementPath) {
    // Traverse with state of validationContext
    const validationContext = {
        root: jsxElementPath.node,
        componentNamesAndIds: {},
        componentsWithSanitizedAttributes: {},
    };
    jsxElementPath.traverse(ExtractionValidationVisitor, {validationContext});
    validateElementContext(validationContext);
}
