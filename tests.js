"use strict";

var jsxlate = require('./jsxlate');
var I = require('immutable');

var extractions = {
    'Hello': [],
    '<I18N>Hello</I18N>': ['Hello'],
    'i18n("world")': ['world'],
    '<I18N><a href="foo">tag with only safe attributes</a></I18N>': ['<a href="foo">tag with only safe attributes</a>'],
    '<I18N><a:link href="foo" target="_blank">tag with unsafe attributes</a:link></I18N>': ['<a:link href="foo">tag with unsafe attributes</a:link>'],
    '<I18N><a href="foo" target="_blank" i18n-id="link">tag with unsafe attributes</a></I18N>': ['<a:link href="foo">tag with unsafe attributes</a:link>'],
    '<I18N><SelfClosing i18n-id="foo" attr="attr" /></I18N>': ['<SelfClosing:foo />'],
    '<I18N><SelfClosing /></I18N>': ['<SelfClosing />'],
    '<I18N><SelfClosing:a /><SelfClosing:b /></I18N>': ['<SelfClosing:a /><SelfClosing:b />'],
    '<I18N><Member.Name /></I18N>': ['<Member.Name />'],
    '<I18N><a><b><i>Deeply nested</i> nested <i>nested</i> nested</b> tags</a></I18N>': ['<a><b><i>Deeply nested</i> nested <i>nested</i> nested</b> tags</a>'],
    '<I18N>Cat: {hat}</I18N>': ['Cat: {hat}'],
    '<I18N>And now {a.member.expression}</I18N>': ['And now {a.member.expression}'],
    'var nested = i18n("hatters"); <I18N>Cat: {nested}</I18N>': ['hatters', 'Cat: {nested}'],
    '<p><I18N>1: {same.name.different.message}</I18N> <I18N>2: {same.name.different.message}</I18N></p>': ['1: {same.name.different.message}', '2: {same.name.different.message}'],
    '<I18N><Pluralize on={count}><Match when="zero">You have no items</Match><Match when="one">You have one item</Match><Match when="other">You have {count} items</Match></Pluralize></I18N>': [
        '<Pluralize on={count}><Match when="zero">You have no items</Match><Match when="one">You have one item</Match><Match when="other">You have {count} items</Match></Pluralize>']
}

exports.testExtraction = function (test) {
    Object.keys(extractions).forEach(input => {
        test.ok(
            I.is(I.fromJS(extractions[input]),
                 I.fromJS(jsxlate.extractMessages(input))),
                 `
                 Incorrect extraction for input
                 ${input}
                 Expected
                 ${extractions[input]}
                 but got
                 ${jsxlate.extractMessages(input)}
                 `);
    });
    test.done();
};

var translations = {
    'Hello': 'Helo',
    'world': 'byd',
    '<a href="foo">tag with only safe attributes</a>': '<a href="bar">Mae tag sydd <span>wedi</span> dim ond priodoleddau sy\'n ddiogel</a>',
    '<a:link href="foo">tag with unsafe attributes</a:link>': '<a:link href="bar">tag gyda phriodoleddau anniogel</a:link>',
    '<SelfClosing />': 'Translated: <SelfClosing />',
    '<SelfClosing:foo />': 'Translated: <SelfClosing:foo />',
    '<Member.Name />': 'Translated: <Member.Name />',
    'Cat: {nested}': 'Cat : {nested}',
    'hatters': 'hetwyr',
    'And now {a.member.expression}': 'Ac yn awr {a.member.expression}',
    '<Re /><Ordering />': '<Ordering /><Re />',
}

var expectedResultsFromTranslation = {
    '<I18N>Hello</I18N>': '<I18N>Helo</I18N>;',
    'i18n("world")': "'byd';",
    '<I18N><a href="foo">tag with only safe attributes</a></I18N>': '<I18N><a href="bar">Mae tag sydd <span>wedi</span> dim ond priodoleddau sy\'n ddiogel</a></I18N>;',
    '<I18N><a:link href="foo" target="_blank">tag with unsafe attributes</a:link></I18N>': '<I18N><a target="_blank" href="bar">tag gyda phriodoleddau anniogel</a></I18N>;',
    '<I18N><a href="foo" target="_blank" i18n-id="link">tag with unsafe attributes</a></I18N>': '<I18N><a target="_blank" href="bar">tag gyda phriodoleddau anniogel</a></I18N>;',
    '<I18N><SelfClosing i18n-id="foo" attr="attr" /></I18N>': '<I18N>Translated: <SelfClosing attr="attr" /></I18N>;',
    '<I18N><SelfClosing /></I18N>': '<I18N>Translated: <SelfClosing /></I18N>;',
    '<I18N><Member.Name /></I18N>': '<I18N>Translated: <Member.Name /></I18N>;',
    '<I18N>Cat: {nested}</I18N>': "<I18N>Cat : {nested}</I18N>;",
    '<I18N>And now {a.member.expression}</I18N>': '<I18N>Ac yn awr {a.member.expression}</I18N>;',
    'var nested = i18n("hatters"); <I18N>Cat: {nested}</I18N>': "var nested = 'hetwyr';\n<I18N>Cat : {nested}</I18N>;",
    '<I18N><Re /><Ordering /></I18N>': '<I18N><Ordering /><Re /></I18N>;',
}

exports.testTranslation = function (test) {
    Object.keys(expectedResultsFromTranslation).forEach(original => {
        try { jsxlate.translateMessages(original, translations) } catch (e) {console.error(e)};
        test.ok(
            I.is(I.fromJS(expectedResultsFromTranslation[original]),
                 I.fromJS(jsxlate.translateMessages(original, translations))),
                 `
                 Incorrect translation for original
                 ${original}
                 Expected
                 ${expectedResultsFromTranslation[original]}
                 but got
                 ${jsxlate.translateMessages(original, translations)}
                 `);
    })
    test.done();
}

var expectedResultsForTranslationBundles = {
    '<I18N>Hello</I18N>': 'function() { return <span>Helo</span>; }',
    'i18n("world")': "function() { return 'byd'; }",
    '<I18N><a href="foo">tag with only safe attributes</a></I18N>': 'function() { return <span><a href="bar">Mae tag sydd <span>wedi</span> dim ond priodoleddau sy\'n ddiogel</a></span>; }',
    '<I18N><a:link href="foo" target="_blank">tag with unsafe attributes</a:link></I18N>': 'function() { return <span><a target="_blank" href="bar">tag gyda phriodoleddau anniogel</a></span>; }',
    '<I18N><a href="foo" target="_blank" i18n-id="link">tag with unsafe attributes</a></I18N>': 'function() { return <span><a target="_blank" href="bar">tag gyda phriodoleddau anniogel</a></span>; }',
    '<I18N><SelfClosing i18n-id="foo" attr="attr" /></I18N>': 'function(SelfClosing) { return <span>Translated: <SelfClosing attr="attr" /></span>; }',
    '<I18N><SelfClosing /></I18N>': 'function(SelfClosing) { return <span>Translated: <SelfClosing /></span>; }',
    '<I18N><Member.Name /></I18N>': 'function(Member) { return <span>Translated: <Member.Name /></span>; }',
    '<I18N>Cat: {nested}</I18N>': "function(nested) { return <span>Cat : {nested}</span>; }",
    '<I18N>And now {a.member.expression}</I18N>': 'function(a) { return <span>Ac yn awr {a.member.expression}</span>; }',
    '<I18N><Re /><Ordering /></I18N>': 'function(Re, Ordering) { return <span><Ordering /><Re /></span>; }',
}

exports.testTranslationToRenderer = function (test) {
    debugger;
    Object.keys(expectedResultsForTranslationBundles).forEach(original => {
        var messageAst = jsxlate._parseExpression(original);
        var message = jsxlate._extractMessage(messageAst);
        try { jsxlate.translatedRendererForMessage(messageAst, translations[message]) } catch (e) {console.error(e)};
        test.ok(
            (expectedResultsForTranslationBundles[original] ==
                jsxlate.translatedRendererForMessage(messageAst, translations[message])),
                 `
                 Incorrect translation function for original
                 ${original}
                 Expected
                 ${expectedResultsForTranslationBundles[original]}
                 but got
                 ${jsxlate.translatedRendererForMessage(messageAst, translations[message])}
                 `);
    })
    test.done();
}

var shouldNotBeExtractable = [
    '<I18N>Nested <I18N>message markers.</I18N></I18N>',
    'i18n("Not" + "just a string" + "literal")',
    'i18n()',
    'i18n("Too many", "arguments")',
    '<I18N><a target="_blank">Unsafe attributes but no id.</a></I18N>',
    '<I18N><Doubled/>two of the same Component type without ids<Doubled/></I18N>',
    '<I18N><Doubled:doubled/>two of the same Component type with the same ids<Doubled:doubled/></I18N>',
    '<I18N>{"string literal"}</I18N>',
    '<I18N>{arbitrary.expression()}</I18N>',
    '<I18N>{("non"+"simple").memberExpression}</I18N>',
    '<I18N>{computed["memberExpression"]}</I18N>'
]

exports.testErrorsInExtraction = function (test) {
    shouldNotBeExtractable.forEach(message => {
        test.throws(() => jsxlate.extractMessages(message), message);
    });
    test.done();
}


var toBeTranslated = `
function render () {
    return <p>
        <I18N>Hello, world. <Component />{foo}{bar.baz}</I18N>
    </p>
}
`

// Translations for above source that should cause errors:
var invalidTranslations = [
    '<a target="_blank">Unsafe attribute</a> <Component />{foo}{bar.baz}',
    '<a:made-up-id></a:made-up-id><Component />{foo}{bar.baz}',
    '{random + expression + in + placeholder}<Component />{foo}{bar.baz}',
    '{non.existant.name}<Component />{foo}{bar.baz}',
    '<Component /> Duplicated expressions: {foo}{foo}{bar.baz}',
    'Missing component. {foo}{foo}{bar.baz}',
    'Duplicated component. <Component /> <Component /> {foo}{foo}{bar.baz}',
];
var correctTranslation = 'Helo, byd. <Component />{foo}{bar.baz}';

exports.testErrorsInTranslation = function (test) {
    var extraction = jsxlate.extractMessages(toBeTranslated)[0];

    function translate(translation) {
        jsxlate.translateMessages(toBeTranslated, {[extraction]: translation})
    }

    test.doesNotThrow(() => translate(correctTranslation),
        "Correct translation couldn't be translated.");

    invalidTranslations.forEach(translation => {
        test.throws(() => translate(translation), translation);
    });
    test.done();
}


var messagesWithFreeVariables = I.List([
    [
        '<I18N>Hello, world. {/* no variables here bruh */}<Component />{foo}<p>{bar.baz}</p></I18N>',
        I.Set(['Component', 'foo', 'bar'])
    ],

    [
        '<I18N>Hello, world. <Component.SubComponent snoochie={boochies} />{this.bar.baz}</I18N>',
        I.Set(['Component', 'boochies'])
    ]
]);

exports.testDetectFreeVariables = function(test) {
    messagesWithFreeVariables.forEach(([message, variables]) => {
        var ast = jsxlate._parse(message);
        var keypaths = jsxlate._keypathsForMessageNodesInAst(ast);
        keypaths.forEach((keypath) => {
            var messageAst = ast.getIn(keypath);
            test.ok(
                I.is(
                    jsxlate.freeVariablesInMessageAst(messageAst),
                    variables),
                    `${jsxlate.freeVariablesInMessageAst(messageAst)} did not equal ${variables}.`
                );
        });
    })
    test.done();
};


var messagesToBeTransformed = I.List([
    [
        '<I18N>Hello, world. <Component />{foo}<p>{bar.baz}</p></I18N>',
        '<I18N message={"Hello, world. <Component />{foo}<p>{bar.baz}</p>"} context={this} args={[Component, foo, bar]}' +
          ' fallback={function() { return <span>Hello, world. <Component />{foo}<p>{bar.baz}</p></span>; }}/>'
    ],

    // this test ensures whitespace is handled properly
    [
        `<I18N>
            <div>Hello, world. <Component.SubComponent i18n-id="comp.sub" snoochie={boochies} />{this.bar.baz}</div>
        </I18N>`,
        '<I18N message={"<div>Hello, world. <Component.SubComponent:comp.sub />{this.bar.baz}</div>"} context={this} args={[Component, boochies]}' +
          ' fallback={function() { return <span>\n            <div>Hello, world. <Component.SubComponent snoochie={boochies} />{this.bar.baz}</div>\n        </span>; }}/>'
    ],

    // whitespace + escaping quotes
    [
        '<I18N>Hello, \n"world".</I18N>',
        '<I18N message={"Hello, \\n\\\"world\\\"."} context={this} args={[]}' +
          ' fallback={function() { return <span>Hello, \n"world".</span>; }}/>'
    ],

    [
        "i18n('Well golly gee')",
        "i18n('Well golly gee')"
    ],

    [
        "i18n('Well \"golly\" gee')",
        "i18n('Well \"golly\" gee')"
    ]
]);

exports.testMessageNodeTransformation = function(test) {
    messagesToBeTransformed.forEach(([message, transformed]) => {
        var ast = jsxlate._parse(message);
        var keypaths = jsxlate._keypathsForMessageNodesInAst(ast);
        keypaths.forEach((keypath) => {
            test.ok(transformed === jsxlate._transformMessageNode(ast.getIn(keypath)),
            `${jsxlate._transformMessageNode(ast.getIn(keypath))} did not equal ${transformed}.`);
        });
    });
    test.done();
};
