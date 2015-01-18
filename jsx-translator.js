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


There are five important processes:
* Finding messages within a file
* Sanitizing a message for presenting to the translator
* Reconstituting the sanitized parts of a translated message
* Printing and unprinting JSX elements and string literals
* Translating a whole file


Finding messages:

There are two forms of messages: string literals and JSX elements.
String literals are marked with a special identity function:
    i18n("Hello, world!")
JSX elements are marked with a special React component:
    <I18N>Hello, <em>world!</em></I18N>

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


Translating a message:

To translate a whole file, we first find the keypath of every message in the
file. (A keypath is a sequence of keys and array indices that can be used to
select a node out of the AST.)

/*****************************************************************************

/*
NOTES:

assertion:
list (with rep) of capitalized component names must be the same in original and translated

TODO:
- Bail out if the translation has non-safe attributes; refactor attribute functions.
- spread attribute
- namespace names and member names
- If an expression is just an identifier, then the identifier can be the name by default.
- Let expression names be non-identifiers.
- Mark named expressions with an element?
- Various heuristics for omitting i18n-name.
- bin scripts shouldn't obscure Errors that aren't errors in the input.
- strip leading whitespace?
- Enforce non-direct-nesting of I18N tags.
- Possible alternative syntax to i18n-name: just make up a different tag name:
  So the developer inputs <a i18n-name="myspecialthing">
  and the translator sees <myspecialthing> or maybe <a-myspecialthing>.
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

function InputError(description) {
    return I.Map({
        isInputError: true,
        description: description
    });
}

function isInputError(e) {
    return I.Map.isMap(e) && e.get('isInputError');
}


// ==================================
// AST UTILITIES
// ==================================

function parse(src) {
    return I.fromJS(esprima.parse(src, {loc:true}));
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

function componentName(jsxElementAst) {
    return jsxElementAst.getIn(['openingElement', 'name', 'name']);
}

function attributeMap(attributes) {
    return I.Map(attributes.map(a => [a.get('name'), a.get('value')]));
}

function attributesFromMap(attributes) {
    return I.List(attributes.map((v,k) => I.Map({
        type: 'XJSAttribute',
        name: k,
        value: v
    })).valueSeq());
}

function attributes(jsxElementAst) {
    return jsxElementAst.getIn(['openingElement', 'attributes']);
}

function updateAttributes(jsxElementAst, f) {
    return jsxElementAst.updateIn(['openingElement', 'attributes'], f);
}

function hasUnsafeAttributes(jsxElementAst) {
    var name = componentName(jsxElementAst);
    return attributes(jsxElementAst).some(a => !attributeIsSafe(name, a));
}

function withSafeAttributesOnly(jsxElementAst) {
    var name = componentName(jsxElementAst);
    return updateAttributes(jsxElementAst, attributes =>
        attributes.filter(a => attributeIsSafe(name, a)));
}

function attributeIsSafe(componentName, attributeAst) {
    if (!componentName) { throw new Error("Component name missing."); }
    var forComponent = allowedAttributesByComponentName[componentName] || [];
    return attributeName(attributeAst) === 'i18n-name'
        || -1 != (forComponent).indexOf(attributeName(attributeAst);
}

function attributeName(attributeAst) {
    return attributeAst.getIn(['name', 'name'])
}

function attributeValue(attributeAst) {
    return attributeAst.getIn(['value', 'value']);
}

function attributeWithName(jsxElementAst, name) {
    var a = attributes(jsxElementAst)
        .filter(attrib => attributeName(attrib) === name)
        .first();
    return a && attributeValue(a);
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
    if (hasUnsafeAttributes(ast) && ! attributeWithName(ast, 'i18n-name')) {
        throw new InputError("Element needs an i18n-name attribute: " + generateOpening(ast));        
    }
    return withSafeAttributesOnly(ast)
        .update('children', children => children.map(sanitize));
}

function sanitizeJsxExpressionContainer (ast) {
    if(matches(ast.get('expression'), namedExpressionPattern)) {
        var [name, expression] = nameAndExpressionForNamedExpression(ast.get('expression'));
        return ast.set('expression', makeLiteralExpressionAst(name));
    } else {
        throw new InputError("Message contains a non-named expression: " + generate(ast));
    }
}

// Given the ast for __("Hello", expr), return ["Hello", the ast for expr]
function nameAndExpressionForNamedExpression(ast) {
    if(!matches(ast, namedExpressionPattern)) {
        throw new Error("Expected expression of the form __(string, ...) but got " + generate(ast));
    }
    if(!ast.get('arguments') || ast.get('arguments').size !== 2) {
        throw new InputError("Named expression has " + ast.get('arguments').size + " arguments, expected 2: " + generate(ast));
    }
    var nameArgument = ast.getIn(['arguments', 0]);
    var expressionArgument = ast.getIn(['arguments', 1]);
    if(!matches(nameArgument, stringLiteralPattern)) {
        throw new InputError("First argument to __ should be a string literal, but was instead " + generate(nameArgument));
    }
    return [nameArgument.get('value'), expressionArgument];
}


// ==================================
// RECONSTITUTE
// ==================================

// Return translatedAst with named expressions and elided
// attributes put back in based on originalAst.
function reconstitute(translatedAst, originalAst) {
    return _reconstitute(translatedAst, namedExpressionDefinitions(originalAst));
}

function _reconstitute(translatedAst, definitions) {
    return {
        'Identifier': identity, // FIXME what else should be here? why not in sanitize?
        'Literal': identity,
        'XJSElement': reconstituteJsxElement,
        'XJSExpressionContainer': reconstituteJsxExpressionContainer,
        'XJSEmptyExpression': identity
    }[translatedAst.get('type')](translatedAst, definitions);
}


function reconstituteJsxElement(translatedAst, definitions) {
    if (hasUnsafeAttributes(translatedAst)) {
        throw new InputError("Translation includes unsafe attribute: " + generateOpening(translatedAst));
    }

    var result;
    var name = attributeWithName(translatedAst, 'i18n-name');
    if (name) {
        var originalAttributes = definitions.get(name);
        if (!originalAttributes) { throw new InputError("Translation contains i18n-name '" + name + "', which is not in the original."); }

        result = updateAttributes(translatedAst,
            translationAttributes => attributesFromMap(
                attributeMap(originalAttributes).merge(
                attributeMap(translationAttributes))));
    } else {
        result = translatedAst;
    }

    return result.update('children', children =>
        children.map(child => _reconstitute(child, definitions)));
}

function reconstituteJsxExpressionContainer(translatedAst, definitions) {
    var expr = translatedAst.get('expression');
    if (!matches(expr, identifierPattern)) throw new InputError("Translated message has JSX expression that isn't a placeholder name: " + generate(translatedAst));
    var definition = definitions.get(expr.get('name'));
    if (!definition) throw new InputError("Translated message has a JSX expression whose name doesn't exist in the original: " + generate(translatedAst));
    return translatedAst.set('expression', definition);
}


// ==================================
// NAMED EXPRESSIONS, FINDING DEFINITIONS OF
// ==================================

function namedExpressionDefinitions(ast) {
    var listOfPairs = _namedExpressionDefinitions(ast);
    var names = listOfPairs.map(p => p.first());
    var dupes = duplicatedValues(names);
    if (dupes.size != 0) {
        throw new InputError("Message has two named expressions with the same name: " + dupes.join(", "));
    } else {
        return I.Map(listOfPairs.map(x => x.toArray()));
    }
}

function _namedExpressionDefinitions(ast) {
    return ({
        'XJSElement': namedExpressionDefinitionsInJsxElement,
        'XJSExpressionContainer': namedExpressionDefinitionsInJsxExpressionContainer
    }[ast.get('type')] || () => I.List())(ast);
}

function namedExpressionDefinitionsInJsxElement(ast) {
    var hiddenAttributes = attributes(ast)
        .filterNot(attrib => attributeIsSafe(componentName(ast), attrib));

    var attributeDefinition;
    if (hiddenAttributes.size == 0) {
        attributeDefinition = I.List();
    } else {
        var name = attributeWithName(ast, 'i18n-name');
        if (!name) throw new InputError("Element needs an i18n-name attribute: " + generateOpening(ast));
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
                throw new InputError("Message marker must have exactly one argument: " + generate(messageMarker));
            }
            if ( !matches(messageMarker.getIn(['arguments', 0]), stringLiteralPattern) ) {
                throw new InputError("Message should be a string literal, but was instead: " + generate(messageMarker));
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
            if(!translation) { throw new InputError("Translation missing for:\n" + generateMessage(sanitize(message))); }
            translation = prepareTranslationForParsing(translation, message);
            return ast.setIn(keypath,
                reconstitute(
                    parseFragment(translation),
                    message));
        } catch(e) {
            throw e.set ? e.set('messageAst', message).set('translationString', translation) : e;
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
    /*
        Given a source code string, return an array of message strings.
    */
    extractMessages: function extractMessages(src) {
        var ast = parse(src);
        return keypathsForMessageNodesInAst(ast)
            .map(keypath => ast.getIn(keypath))
            .map(message => {
                try {
                    return generateMessage(sanitize(message))
                } catch (e) {
                    throw e.set ? e.set('messageAst', message) : e;
                }
            })
            .toJS();
    },

    /*
        Given a source code string and a translations dictionary,
        return the source code as a string with the messages translated.
    */
    translateMessages: function translateMessages(src, translations) {
        return generate(translateMessagesInAst(parse(src), translations));
    },

    /*
        If the given error represents an error in the inputted JSX files or
        translations, then return a user-friendly error message without
        a stack trace. If it is any other kind of error, return the basic
        error message and stack trace.
    */
    errorMessageForError: function errorMessageForError(e) {
        if (isInputError(e) && e.get('messageAst') && e.get('translationString')) {
            var ast = e.get('messageAst');
            return (
                "\nOn line " + ast.getIn(['loc', 'start', 'line']) + ", when processing the message... \n\n" +
                generate(ast) + "\n\n" +
                "...and its associated translation... \n\n" +
                e.get('translationString') + "\n\n" +
                "...the following error occured: \n\n" +
                e.get('description') + "\n"
            );
        }
        else if (isInputError(e) && e.get('messageAst')) {
            var ast = e.get('messageAst');
            return (
                "\nOn line " + ast.getIn(['loc', 'start', 'line']) + ", when processing the message... \n\n" +
                generate(ast) + "\n\n" +
                "...the following error occured: \n\n" +
                e.get('description') + "\n"
            );
        }
        else if (isInputError(e)) {
            return e.get('description') + "\n";
        }
        else {
            return e.stack;
        }
    }
}
