const mocha = require('mocha');
const {expect, assert} = require('chai');
const sinon = require('sinon');
const I = require('immutable');
import generate from 'babel-generator';

const {extract} = require('../src/extract');
import parsing from '../src/parsing';
const transform = require('../src/transform');
import transformation from '../src/transformation';
import translate from '../src/translate';


describe('extraction', function() {
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
        'var {nested, ...rested} = i18n("hatters"); <I18N>Cat: {nested}</I18N>': ['hatters', 'Cat: {nested}'],
        '<p><I18N>1: {same.name.different.message}</I18N> <I18N>2: {same.name.different.message}</I18N></p>': ['1: {same.name.different.message}', '2: {same.name.different.message}'],
        '<I18N><Pluralize on={count}><Match when="zero">You have no items</Match><Match when="one">You have one item</Match><Match when="other">You have {count} items</Match></Pluralize></I18N>': [
            '<Pluralize on={count}><Match when="zero">You have no items</Match><Match when="one">You have one item</Match><Match when="other">You have {count} items</Match></Pluralize>']
    }

    it('extracts expected strings', function() {
        Object.keys(extractions).forEach(input => {
            try { extract(input) } catch(e) { console.error(e); }
            assert(I.is(I.fromJS(extractions[input]), I.fromJS(extract(input))),
                     `
                     Incorrect extraction for input
                     ${input}
                     Expected
                     ${extractions[input]}
                     but got
                     ${extract(input)}
                     `);
        });
    });

    it('warns on unextractable messages', function() {
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
        ];

        shouldNotBeExtractable.forEach(msg => {
            expect(() => extract(msg)).to.throw;
        })
    });
});


describe('translation', function() {
    it('works', function() {
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
            'Check out: <Component />': '<Component/> "checked" out!',
            '<span:stat><ReactIntl.FormattedNumber /></span:stat>opportunities': '<span:stat><ReactIntl.FormattedNumber /></span:stat>oportunidades'
        };

        var expectedResultsForTranslationBundles = {
            '<I18N>Hello</I18N>': 'function() { return <span>Helo</span>; }',
            'i18n("world")': 'function() { return "byd"; }',
            '<I18N><a href="foo">tag with only safe attributes</a></I18N>': 'function() { return <span><a href="bar">Mae tag sydd <span>wedi</span> dim ond priodoleddau sy\'n ddiogel</a></span>; }',
            '<I18N><a:link href="foo" target="_blank">tag with unsafe attributes</a:link></I18N>': 'function() { return <span><a href="bar" target="_blank">tag gyda phriodoleddau anniogel</a></span>; }',
            '<I18N><a href="foo" target="_blank" i18n-id="link">tag with unsafe attributes</a></I18N>': 'function() { return <span><a href="bar" target="_blank">tag gyda phriodoleddau anniogel</a></span>; }',
            '<I18N><SelfClosing i18n-id="foo" attr="attr" /></I18N>': 'function(SelfClosing) { return <span>Translated: <SelfClosing attr="attr" /></span>; }',
            '<I18N><SelfClosing /></I18N>': 'function(SelfClosing) { return <span>Translated: <SelfClosing /></span>; }',
            '<I18N><Member.Name /></I18N>': 'function(Member) { return <span>Translated: <Member.Name /></span>; }',
            '<I18N>Cat: {nested}</I18N>': "function(nested) { return <span>Cat : {nested}</span>; }",
            '<I18N>And now {a.member.expression}</I18N>': 'function(a) { return <span>Ac yn awr {a.member.expression}</span>; }',
            '<I18N>Check out: <Component gnar={3 * shnar}/></I18N>': 'function(Component, shnar) { return <span><Component gnar={3 * shnar} /> "checked" out!</span>; }',
            '<I18N><Re /><Ordering /></I18N>': 'function(Re, Ordering) { return <span><Ordering /><Re /></span>; }',
        };

        Object.entries(expectedResultsForTranslationBundles).forEach(([original, expected]) => {
            const bundle = translate.translateMessagesToBundle(original, translations);
            expect(Object.values(bundle)[0]).to.equal(expected);
        });
    });

    it('bundles', function() {

    });

    it('warns on invalid translations', function() {

    });

    it('properly handles whitespace and quotes', function() {
        var messagesToBeTransformed = I.List([
            [
                '<I18N>Hello, world. <Component />{foo}<p>{bar.baz}</p></I18N>',
                '<I18N message={"Hello, world. <Component />{foo}<p>{bar.baz}</p>"} context={this} args={[Component, foo, bar]}' +
                  ' fallback={function () {\n  return <span>Hello, world. <Component />{foo}<p>{bar.baz}</p></span>;\n}} />;'
            ],

            // this test ensures whitespace is handled properly
            [
                `<I18N>
  <div>Hello, world. <Component.SubComponent i18n-id="comp.sub" snoochie={boochies} />{this.bar.baz}</div>
</I18N>`,
                '<I18N message={"<div>Hello, world. <Component.SubComponent:comp.sub />{this.bar.baz}</div>"} context={this} args={[Component, boochies]}' +
                  ' fallback={function () {\n  return <span>\n  <div>Hello, world. <Component.SubComponent snoochie={boochies} />{this.bar.baz}</div>\n  </span>;\n}} />;'
            ],

            // whitespace + escaping quotes
            [
                '<I18N>Hello, \n"world".</I18N>',
                '<I18N message={"Hello, \\n\\\"world\\\"."} context={this} args={[]}' +
                  ' fallback={function () {\n  return <span>Hello, \n"world".</span>;\n}} />;'
            ],

            [
                "i18n('Well golly gee')",
                "i18n('Well golly gee')"
            ],

            [
                "i18n('Well \"golly\" gee')",
                "i18n('Well \"golly\" gee')"
            ],

            [
                "i18n('Well \\'golly\\' gee')",
                "i18n('Well \\'golly\\' gee')"
            ]
        ]);

        messagesToBeTransformed.forEach(([message, transformedMessage]) => {
            try {
                const ast = parsing.parseExpression(message);
                const transformedMarker = transformation.transformMarker(ast);
                expect(transformedMessage).to.equal(generate(transformedMarker).code);
            } catch(e) {
                console.warn("Encountered error testing", message);
                throw e;
            }
        });
    });
});


describe('freeVariables', function() {

})
