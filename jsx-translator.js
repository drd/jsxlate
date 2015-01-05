"use strict";

/*
NOTES:

assertion:
list (with rep) of capitalized component names must be the same in original and translated

TODO:
- spread attribute
- namespace names and member names
*/

var esprima = require('esprima-fb');
var escodegen = require('escodegen');
var I = require('immutable');

/*
    These attributes are shown to translators and may be inserted
    and modified by translators:
*/
var allowedAttributesByComponentName = {
    'a': ['href'],
}


// ==================================
// UTILITIES
// ==================================

function identity(x) { return x; }

function isFunction(thing) {
    return typeof thing == 'function' || false;
}

function isString(thing) {
    return typeof thing == 'string' || false;
}

function duplicatedValues(list) {
    var dupes = [];
    var seen = [];
    list.forEach(x => {
        if (~seen.indexOf(x) && !~dupes.indexOf(x)) dupes.push(x);
        else seen.push(x);
    });
    return I.Set(dupes);
}


// ==================================
// AST UTILITIES
// ==================================

function parse(src) {
    return I.fromJS(esprima.parse(src));
}

function parseFragment(src) {
    return parse(src).getIn(['body', 0, 'expression']);
}

function generate(ast) {
    return escodegen.generate(ast.toJS());
}

function generateOpening(jsxExpressionAst) {
    return generate(jsxExpressionAst.get('openingElement'));
}

function makeLiteralExpressionAst(value) {
    return parseFragment(value);
}

function attributeIsSafe(componentName, attributeAst) {
    return (!!~(allowedAttributesByComponentName[componentName] || []).indexOf(attributeName(attributeAst))
        || attributeName(attributeAst) === 'i18n-label');
}

function componentName(ast) {
    return ast.getIn(['openingElement', 'name', 'name']);
}

function attributeName(attributeAst) {
    return attributeAst.getIn(['name', 'name'])
}

function attributeNames(jsxElementAst) {
    return jsxElementAst.getIn(['openingElement', 'attributes']).map(attributeName);
}

function attributeWithName(jsxElementAst, name) {
    return jsxElementAst.getIn(['openingElement', 'attributes']).filter(attrib =>
        attributeName(attrib) === name).first().getIn(['value', 'value']);
}


// ==================================
// SANITIZE
// ==================================

function sanitize(ast) {
    return {
        'Literal': identity,
        'XJSElement': sanitizeJsxElement,
        'XJSExpressionContainer': sanitizeJsxExpressionContainer,
        'XJSEmptyExpression': identity,
    }[ast.get('type')](ast);
}

function sanitizeJsxElement (ast) {
    var name = componentName(ast);
    var attributesKP = ['openingElement', 'attributes'];

    var originalAttributes = ast.getIn(attributesKP);
    var result = ast.updateIn(attributesKP,
        attributes => attributes.filter(
            attrib => attributeIsSafe(name, attrib)));

    if(! I.is(originalAttributes, result.getIn(attributesKP))
        && ! attributeNames(ast).contains('i18n-label')) {
        throw new Error("Element needs an i18n-label attribute: " + generateOpening(ast));
    }

    result = result.update('children', children => children.map(sanitize));

    return result;
}

function sanitizeJsxExpressionContainer (ast) {
    if(matches(ast.get('expression'), namedExpressionPattern)) {
        var [name, expression] = nameAndExpressionForNamedExpression(ast.get('expression'));
        return ast.set('expression', makeLiteralExpressionAst(name));
    } else {
        throw new Error("Message contains a non-named expression.");
    }
}

// Given the ast for __("Hello", expr), return ["Hello", the ast for expr]
function nameAndExpressionForNamedExpression(ast) {
    if(!matches(ast, namedExpressionPattern)) {
        throw new Error("Expected expression of the form __(string, ...) but got " + ast);
    }
    if(!ast.get('arguments') || ast.get('arguments').size !== 2) {
        throw new Error("Named expression has " + ast.get('arguments').size + " arguments, expected 2.");
    }
    var nameArgument = ast.getIn(['arguments', 0]);
    var expressionArgument = ast.getIn(['arguments', 1]);
    if(!matches(nameArgument, stringLiteralPattern)) {
        throw new Error("First argument to __ should be a string literal, but was instead " + nameArgument);
    }
    return [nameArgument.get('value'), expressionArgument];
}


// ==================================
// RECONSTITUTE
// ==================================

// Return translatedAst with named expressions and elided
// attributes put back in based on originalAst.
function reconstitute(translatedAst, originalAst) {
    return {
        'Identifier': identity, // FIXME what else should be here? why not in sanitize?
        'Literal': identity,
        'XJSElement': reconstituteJsxElement,
        'XJSExpressionContainer': reconstituteJsxExpressionContainer,
        'XJSEmptyExpression': identity
    }[translatedAst.get('type')](translatedAst, originalAst);
}

function reconstituteJsxElement(translatedAst, originalAst) {
    var name = componentName(originalAst);

    var result = translatedAst;
    if(attributeNames(translatedAst).contains('i18n-label')) {
        var name = attributeWithName(translatedAst, 'i18n-label');
        var definitions = namedExpressionDefinitions(originalAst); // FIXME move out
        if(!definitions.get(name)) {
            throw new Error("Translation contains i18n-label '" + name + "', which is not in the original.")
        }
        result = result.updateIn(['openingElement', 'attributes'], attributes =>
            mergeAttributes(name, attributes, definitions.get(name)));
    } else {
        result = result.updateIn(['openingElement', 'attributes'], attributes =>
            attributes.filter(attrib =>
                attributeIsSafe(name, attrib)))
    }

    return result.update('children', children =>
        children.map(child => reconstitute(child, originalAst)));
}

function reconstituteJsxExpressionContainer(translatedAst, originalAst) {
    var expr = translatedAst.get('expression');
    if (!matches(expr, identifierPattern)) throw new Error("Translated message has JSX expression that isn't a placeholder name: " + translatedAst);
    var name = expr.get('name');
    var definitions = namedExpressionDefinitions(originalAst); // FIXME move out
    return translatedAst.set('expression', definitions.get(name));
}


// ==================================
// NAMED EXPRESSIONS, FINDING DEFINITIONS OF
// ==================================

function namedExpressionDefinitions(ast) {
    var listOfPairs = _namedExpressionDefinitions(ast);
    var names = listOfPairs.map(p => p.first());
    var dupes = duplicatedValues(names);
    if (dupes.size != 0) {
        throw new Error("Message has two named expressions with the same name: " + dupes.join(", "));
    } else {
        return I.Map(listOfPairs.map(x => x.toArray()));
    }
}

function _namedExpressionDefinitions(ast) {
    return {
        'Literal': () => I.List(),
        'XJSElement': namedExpressionDefinitionsInJsxElement,
        'XJSExpressionContainer': namedExpressionDefinitionsInJsxExpressionContainer,
        'XJSEmptyExpression': () => I.List(),
    }[ast.get('type')](ast);    
}

function namedExpressionDefinitionsInJsxElement(ast) {
    var hiddenAttributes = ast
        .getIn(['openingElement', 'attributes'])
        .filterNot(attrib => attributeIsSafe(name, attrib));

    var attributeDefinition;
    if (hiddenAttributes.size == 0) {
        attributeDefinition = I.List();
    } else {
        var name = attributeWithName(ast, 'i18n-label');
        if (!name) throw new Error("Element needs an i18n-label attribute: " + generateOpening(ast));
        attributeDefinition = I.List([I.List([name, hiddenAttributes])]);
    }

    return attributeDefinition.concat(
        ast.get('children').flatMap(_namedExpressionDefinitions));
}

function namedExpressionDefinitionsInJsxExpressionContainer(ast) {
    if(matches(ast.get('expression'), namedExpressionPattern)) {
        var definition = nameAndExpressionForNamedExpression(ast.get('expression'));
        return I.fromJS([definition]);
    } else {
        return I.List();
    }
}


// ==================================
// MERGING ATTRIBUTES
// ==================================

// element name -> List<XJSAttribute> -> List<XJSAttribute> -> List<XJSAttribute>
function mergeAttributes(name, translated, original) {
    // Use the attributes from the original element,
    // overriden by those in the translation which are both
    // safe and present in the original:
    return original.merge(
        translated.filter(attrib =>
            attributeIsSafe(name, attrib) &&
            original.map(attributeName).contains(attributeName(attrib))));
}


// ==================================
// FINDING
// ==================================

function matches(ast, pattern) {
    if ( I.Map.isMap(ast) && I.Map.isMap(pattern) ) {
        return pattern.every((v,k) => matches(ast.get(k), v));
    } else if (isFunction(pattern)) {
        return pattern(ast);
    } else {
        return I.is(pattern, ast);
    }
}

var namedExpressionPattern = I.fromJS({
    type: "CallExpression",
    callee: {
        type: "Identifier",
        name: "__"
    }
});

var messageMarkerPattern = I.fromJS({
    type: "CallExpression",
    callee: {
        type: "Identifier",
        name: "i18n"
    }
});

var stringLiteralPattern = I.fromJS({
    type: "Literal",
    value: isString
});

var jsxElementPattern = I.fromJS({
    type: "XJSElement"
});

var identifierPattern = I.fromJS({
    type: "Identifier"
});

function allKeypathsInAst(ast) {
    var keypaths = [];
    function f(node, keypath) {
        node.forEach((child, key) => {
            var childKeypath = keypath.concat([key]);
            keypaths.push(childKeypath);
            if (child && child.forEach) {
                f(child, childKeypath);
            }
        });
    }
    f(ast, []);
    return I.fromJS(keypaths);
}

/*
    Return the keypath for each message in the given ast,
    and (important) returns them with ancestors coming before descendents.
*/
function keypathsForMessageNodesInAst(ast) {
    var keypaths = allKeypathsInAst(ast)
        .filter(keypath => matches(ast.getIn(keypath), messageMarkerPattern));

    // Ensure each marker has exactly one argument, either a string or JSX element:
    keypaths.forEach(keypath => {
        var messageMarker = ast.getIn(keypath);
        if (!messageMarker.get('arguments').size == 1) {
            throw new Error("Message marker must have exactly one argument: " + generate(messageMarker));
        }
        var firstArg = messageMarker.getIn(['arguments', 0]);
        if (! matches(firstArg, stringLiteralPattern)
            && ! matches(firstArg, jsxElementPattern)) {
            throw new Error("Message should be a string literal or JSX expression, but was instead: " + generate(firstArg));
        }
    });

    // We got ourselves the keypaths of message *markers* so that we could
    // error-check the arguments list, but we actually return the keypaths
    // of the messages themselves within the markers:
    return keypaths.map(kp => kp.concat(['arguments', 0]));
}

function translateMessages(ast, translations) {
    // Substitute at a single keypath based on translations:
    function substitute(ast, keypath) {
        var message = ast.getIn(keypath);
        var translation = translations[generate(sanitize(message))];
        return ast.setIn(keypath, reconstitute(parseFragment(translation), message));
    }
    var keypaths = keypathsForMessageNodesInAst(ast);
    return keypaths.reduceRight(substitute, ast); // *

    // * We must substitute inner messages before outer messages,
    //   or else the substitution of the outer message will clobber
    //   the substituted inner message. Hence the reduceRight.
}



var original = parseFragment(
    '<Hello world="!" foo="bar" i18n-label="Hello">{__("number", 1+1)}<a href="example.com" target="_blank" i18n-label="link">blah {__("letter", a)}</a></Hello>'
);
var translated = parseFragment(
    '<Hello world="?" foo="bår" i18n-label="Hello">{number}<a href="example.fr" target="_blank">blá <i>{letter}</i></a><b>Nebraska!</b></Hello>'
);
console.log(
    "Definitions:",
    namedExpressionDefinitions(original).toJS()
);
console.log(
    "Sanitized:",
    generate(sanitize(original))
);
console.log(
    "Reconstituted:",
    generate(reconstitute(translated, original))
);

var fullSrc = parse("function render() { return <a>{i18n(<b>And the winner is: {__('name', winners.map(x => i18n(<b>Name: {__('blah', x)}</b>)))}</b>)}</a> }");

var translations = {
    '<b>And the winner is: {name}</b>': '<b><i href="FIXME">{name}</i> is the name of the winner!</b>',
    '<b>Name: {blah}</b>': '<b>Nomme: {blah}</b>'
}
console.log("translated:", generate(translateMessages(fullSrc, translations)));


// ==================================
// EXPORTS
// ==================================

function extractMessages(src) {
    var ast = parse(src);
    return keypathsForMessageNodesInAst(ast).map(keypath =>
        generate(sanitize(ast.getIn(keypath)))).toJS();
}

module.exports = {
    extractMessages: extractMessages
}
