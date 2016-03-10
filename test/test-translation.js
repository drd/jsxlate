const {expect} = require('chai');

import {extractMessages as extract} from '../src/extract';
import translateMessagesToBundle from '../src/translate';


describe('translation', function() {
    it('generates correct translator functions', function() {
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
            '<I18N><SelfClosing {...foo}/></I18N>': 'function(SelfClosing, foo) { return <span>Translated: <SelfClosing {...foo} /></span>; }',
            '<I18N><Member.Name /></I18N>': 'function(Member) { return <span>Translated: <Member.Name /></span>; }',
            '<I18N>Cat: {nested}</I18N>': "function(nested) { return <span>Cat : {nested}</span>; }",
            '<I18N>And now {a.member.expression}</I18N>': 'function(a) { return <span>Ac yn awr {a.member.expression}</span>; }',
            '<I18N>Check out: <Component gnar={3 * shnar}/></I18N>': 'function(Component, shnar) { return <span><Component gnar={3 * shnar} /> "checked" out!</span>; }',
            '<I18N><Re /><Ordering /></I18N>': 'function(Re, Ordering) { return <span><Ordering /><Re /></span>; }',
        };

        Object.entries(expectedResultsForTranslationBundles).forEach(([original, expected]) => {
            const bundle = translateMessagesToBundle(original, translations, {inputFormat: 'js'}).bundle;
            expect(Object.values(bundle)[0]).to.equal(expected);
        });
    });

    it('warns on invalid translations', function() {
        const originalSource = `
        function render () {
            return <p>
                <I18N>Hello, world. <Component />{foo}{bar.baz}</I18N>
            </p>
        }
        `;

        // Translations for above source that should cause errors:
        const invalidTranslations = [
            '<a target="_blank">Unsafe attribute</a> <Component />{foo}{bar.baz}',
            '<a:made-up-id></a:made-up-id><Component />{foo}{bar.baz}',
            '{random + expression + in + placeholder}<Component />{foo}{bar.baz}',
            '{non.existant.name}<Component />{foo}{bar.baz}',
            '<Component /> Duplicated expressions: {foo}{foo}{bar.baz}',
            'Missing component.',
            'Duplicated component. <Component /> <Component />',
        ];
        var correctTranslation = 'Helo, byd. <Component />{foo}{bar.baz}';

        var extraction = extract(originalSource)[0];

        function translateMessage(translation) {
            translateMessagesToBundle(originalSource, {[extraction]: translation}, {inputFormat: 'js'});
        }

        expect(() => translateMessage(correctTranslation)).to.not.throw();

        invalidTranslations.forEach(translation => {
            expect(() => translateMessage(translation)).to.throw();
        });
    });
});
