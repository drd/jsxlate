"use strict";

/*****************************************************************************
This program extracts translateable messages from JSX files,
sanitizes them for showing to translators, reconstitutes the sanitized
translations based on the original input, and generates JSX files
with the messages replaced with translated ones. Messages can be
not just strings but JSX elements.

Most of the code here is functions on ASTs, which may be of a whole program
or only a single expression. Some of the functions only operate on ASTs
representing particular kinds of expressions, while others work on any AST.
The AST format is documented here:
https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Parser_API
The JSX extensions are not documented; they just come from esprima-fb.

There are two forms of messages: string literals and JSX elements.

String literals are marked with a special identity function:
    i18n("Hello, world!")

JSX elements are marked with a special React component:
    <I18N>Hello, <em>world!</em></I18N>


There are five important processes:
* Sanitizing a message for presenting to the translator
* Reconstituting the sanitized parts of a translated message
* Printing and unprinting JSX elements and string literals
* Finding messages within a file
* Translating a whole file


Sanitizing:

We want translators to see some markup, so that they can make necessary
changes, but other sorts of markup are confusing and irrelevant to them,
and dangerous for them to edit. And they certainly shouldn't see JavaScript
expressions inside curly-braces. Therefore:
Sanitization replaces JSX expressions in curly-braces with their names.
Sanitization removes attributes not listed in allowedAttributesByComponentName.

This process imposes a requirement on messages: Anything hidden must be named.
JSX expressions are named using the __ function, which takes two arguments
and returns its second argument. The first argument is the name of the
expression, and will be shown to the translator. For instance, this JSX

<I18N>Hello, {__('name', someExpression)}!</I18N>

will produce this message:

Hello, {name}!

The expression has been replaced with its name.

Similarly, when we elide unsafe attributes from an element, we need to know
which element in the translation to re-attach those attributes to. Since
translators can add and remove elements, the only general way to know where to
put the attributes is to name that element:

<I18N><a href="example.com" target="_blank" i18n-name="my-link">Example</a></I18N>
                                            ^^^^^^^^^^^^^^^^^^^
This produces the message:

<a href="example.com" i18n-name="my-link">Example</a>

Note that target="_blank" is missing. Now the translator can rearrange at will:

<i>Click me: <a href="example.fr" i18n-name="my-link">Example</a></i>

Under reconstitution, the elided attribute is put back in:

<I18N><i>Click me: <a href="example.fr" target="_blank">Example</a></i></I18N>


Reconstituting:

Reconstituting is the process of putting back what was taken away during
sanitization. The process starts with the translator's translation and pulls
out details from the original; thus, the translator's version determines the
structure of the markup, while the original only determines the values of
expressions and elided attributes. During reconstitution, checks can be
performed to make sure that the translator hasn't deviated too much from
the original.


Printing and unprinting:

Most of the process works on ASTs, but we need to turn those ASTs into strings
to show the translator, and parse the translation back into an AST. However,
the strings we want to show the translator are not exactly the generated code
of any single AST node, so we have to do a small extra step when generating
and parsing.

For string messages, we want to show them unquoted, and so we must also requote
them before parsing.

For JSX messages, we don't want to show the outer <I18N> tag, so we generate
each of the message's children and concatenate them. During parsing, we
surround the string with <I18N> tags and then parse it.


Finding messages:

Messages nested inside other messages will be found and processed correctly,
provided that the inner message is within a named expression.
For example, the following...

<I18N>
    Energy reharmonization is priced as follows:
    {__("priceList", crystals.map(crystal => <p><I18N>
        {__("crystalName", crystal.name)}: ${__("crystalPrice", crystal.price)}
    </I18N></p>))}
</I18N>

...will result in two messages:

    Energy reharmonization is priced as follows: {priceList}

    {crystalName}: ${crystalPrice}

However, you are forbidden from directly nesting I18N tags:

<I18N>Hello, <I18N>world!</I18N></I18N>

/*****************************************************************************

/*
NOTES:

assertion:
list (with rep) of capitalized component names must be the same in original and translated

TODO:
- spread attribute
- namespace names and member names
- If an expression is just an identifier, then the identifier can be the name by default.
- Let expression names be non-identifiers.
- Mark named expressions with an element?
- Various heuristics for omitting i18n-name.
- bin scripts should return error codes.
- strip leading whitespace?
- Enforce non-direct-nesting of I18N tags.
*/

Error.stackTraceLimit = Infinity;

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
        || attributeName(attributeAst) === 'i18n-name');
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
    return jsxElementAst.getIn(['openingElement', 'attributes'])
        .filter(attrib => attributeName(attrib) === name)
        .first().getIn(['value', 'value']);
}


// ==================================
// SANITIZE
// ==================================

function sanitize(ast) {
    return {
        'Literal': identity,
        'CallExpression': sanitizeCallExpression,
        'XJSElement': sanitizeJsxElement,
        'XJSExpressionContainer': sanitizeJsxExpressionContainer,
        'XJSEmptyExpression': identity,
    }[ast.get('type')](ast);
}

function sanitizeCallExpression (ast) {
    // The only valid call expression is the outer message marker,
    // so verify that's what we're dealing with and return it unchanged if so.
    if (matches(ast, stringMarkerPattern)) {
        return ast;
    } else {
        throw new Error("Internal error: tried to sanitize call expression: " + generate(ast));
    }
}

function sanitizeJsxElement (ast) {
    var name = componentName(ast);
    var attributesKP = ['openingElement', 'attributes'];

    var originalAttributes = ast.getIn(attributesKP);
    var result = ast.updateIn(attributesKP,
        attributes => attributes.filter(
            attrib => attributeIsSafe(name, attrib)));

    if(! I.is(originalAttributes, result.getIn(attributesKP))
        && ! attributeNames(ast).contains('i18n-name')) {
        throw new Error("Element needs an i18n-name attribute: " + generateOpening(ast));
    }

    return result.update('children', children => children.map(sanitize));
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
    if(attributeNames(translatedAst).contains('i18n-name')) {
        var name = attributeWithName(translatedAst, 'i18n-name');
        var definitions = namedExpressionDefinitions(originalAst); // FIXME move out
        if(!definitions.get(name)) {
            throw new Error("Translation contains i18n-name '" + name + "', which is not in the original.")
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
        var name = attributeWithName(ast, 'i18n-name');
        if (!name) throw new Error("Element needs an i18n-name attribute: " + generateOpening(ast));
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

var stringMarkerPattern = I.fromJS({
    type: "CallExpression",
    callee: {
        type: "Identifier",
        name: "i18n"
    }
});

var elementMarkerPattern = I.fromJS({
    type: "XJSElement",
    openingElement: {
        type: "XJSOpeningElement",
        selfClosing: false,
        name: {
            type: "XJSIdentifier",
            name: "I18N"
        }
    }    
})

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

// This would be a great place for laziness.
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
    and (important) return them with ancestors coming before descendents
    and earlier messages in the source coming before later messages.
*/
function keypathsForMessageNodesInAst(ast) {
    var keypaths = allKeypathsInAst(ast)
        .filter(keypath => matches(ast.getIn(keypath), stringMarkerPattern)
                        || matches(ast.getIn(keypath), elementMarkerPattern));

    // Validate arguments of string markers:
    keypaths.forEach(keypath => {
        var messageMarker = ast.getIn(keypath);        
        if (matches(messageMarker, stringMarkerPattern)) {
            if ( !messageMarker.get('arguments').size == 1 ) {
                throw new Error("Message marker must have exactly one argument: " + generate(messageMarker));
            }
            if ( !matches(messageMarker.getIn(['arguments', 0]), stringLiteralPattern) ) {
                throw new Error("Message should be a string literal, but was instead: " + generate(messageMarker));
            }
        }
    });

    return keypaths;
}

function translateMessagesInAst(ast, translations) {
    // Substitute at a single keypath based on translations:
    function substitute(ast, keypath) {
        try {
            var message = ast.getIn(keypath);
            var translation = translations[generateMessage(sanitize(message))];
            if(!translation) { throw new Error("Translation missing for message: " + generate(message)); }
            console.log("what is my translation?", translation);
            translation = prepareTranslationForParsing(translation, message);
            return ast.setIn(keypath, reconstitute(parseFragment(translation), message));
        } catch(e) {
            e.message = "When processing the message... \n\n" +
                generate(message) + "\n\n" +
                "...the following error was encountered: \n\n" +
                e.message;
            throw e;
        }
    }
    // Note that the message is pulled from the partially reduced AST; in this
    // way, already-translated inner messages are used when processing outer
    // messages, so they don't get clobbered.

    // Perform this substitution for all message keypaths, starting
    // at the bottom of the document, and processing inner nested messages
    // before outer messages. This ensures that no operation will invalidate
    // the keypath of another operation, either by changing array indices
    // or relocating an inner message within an outer one:
    var keypaths = keypathsForMessageNodesInAst(ast);
    return keypaths.reduceRight(substitute, ast);
}



// ==================================
// PRINTING AND UNPRINTING
// ==================================

function generateMessage(ast) {
    if (matches(ast, stringMarkerPattern)) {
        return ast.getIn(['arguments', 0, 'value']);
    }
    else if (matches(ast, elementMarkerPattern)) {
        return ast.get('children').map(generateJsxChild).join('');
    }
    else {
        throw new Error("Internal error: message is not string literal or JSX element: " + generate(ast));
    }
}

function generateJsxChild (ast) {
    if (matches(ast, stringLiteralPattern)) {
        return ast.get('value')
    } else {
        return generate(ast);
    }
}

function prepareTranslationForParsing (translationString, originalAst) {
    if (matches(originalAst, stringMarkerPattern)) {
        return JSON.stringify(translationString);
    }
    else if (matches(originalAst, elementMarkerPattern)) {
        return "<I18N>" + translationString + "</I18N>";
    }
    else {
        throw new Error("Internal error: message is not string literal or JSX element: " + generate(ast));
    }
}


// ==================================
// EXPORTS
// ==================================

module.exports = {
    extractMessages: function extractMessages(src) {
        var ast = parse(src);
        return keypathsForMessageNodesInAst(ast).map(keypath =>
            generateMessage(sanitize(ast.getIn(keypath)))).toJS();
    },

    translateMessages: function translateMessages(src, translations) {
        var ast = parse(src);
        return generate(translateMessagesInAst(ast, translations));
    }
}
