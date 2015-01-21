"use strict";

var translator = require('./jsx-translator');
var I = require('immutable');

var extractions = {
    'Hello': [],
    '<I18N>Hello</I18N>': ['Hello'],
    'i18n("world")': ['world'],
    '<I18N><a href="foo">tag with only safe attributes</a></I18N>': ['<a href="foo">tag with only safe attributes</a>'],
    '<I18N><a href="foo" target="_blank" i18n-name="link">tag with unsafe attributes</a></I18N>': ['<a href="foo" i18n-name="link">tag with unsafe attributes</a>'],
    '<I18N>Cat: {__("hat", hat)}</I18N>': ['Cat: {hat}'],
    '<I18N>Cat: {__("hat", i18n("hatters"))}</I18N>': ['Cat: {hat}', 'hatters'],
}

exports.testExtraction = function (test) {
    Object.keys(extractions).forEach(input => {
        test.ok(
            I.is(I.fromJS(extractions[input]),
                 I.fromJS(translator.extractMessages(input))),
                 `
                 Incorrect extraction for input
                 ${input}
                 Expected
                 ${extractions[input]}
                 but got
                 ${translator.extractMessages(input)}
                 `);
    });
    test.done();
};

var translations = {
    'Hello': 'Helo',
    'world': 'byd',
    '<a href="foo">tag with only safe attributes</a>': '<a href="bar">Mae tag sydd wedi dim ond priodoleddau sy\'n ddiogel</a>',
    '<a href="foo" i18n-name="link">tag with unsafe attributes</a>': '<a href="bar" i18n-name="link">tag gyda phriodoleddau anniogel</a>',
    'Cat: {hat}': 'Cat : {hat}',
    'hatters': 'hetwyr'
}

var expectedResultsFromTranslation = {
    '<I18N>Hello</I18N>': '<I18N>Helo</I18N>;',
    'i18n("world")': "'byd';",
    '<I18N><a href="foo">tag with only safe attributes</a></I18N>': '<I18N><a href="bar">Mae tag sydd wedi dim ond priodoleddau sy\'n ddiogel</a></I18N>;',
    '<I18N><a href="foo" target="_blank" i18n-name="link">tag with unsafe attributes</a></I18N>': '<I18N><a target="_blank" href="bar" i18n-name="link">tag gyda phriodoleddau anniogel</a></I18N>;',
    '<I18N>Cat: {__("hat", hat)}</I18N>': "<I18N>Cat : {hat}</I18N>;",
    '<I18N>Cat: {__("hat", i18n("hatters"))}</I18N>': "<I18N>Cat : {'hetwyr'}</I18N>;",
}

exports.testTranslation = function (test) {
    Object.keys(expectedResultsFromTranslation).forEach(original => {
        test.ok(
            I.is(I.fromJS(expectedResultsFromTranslation[original]),
                 I.fromJS(translator.translateMessages(original, translations))),
                 `
                 Incorrect translation for original
                 ${original}
                 Expected
                 ${expectedResultsFromTranslation[original]}
                 but got
                 ${translator.translateMessages(original, translations)}
                 `);
    })
    test.done();
}

var shouldNotBeExtractable = [
    '<I18N>Nested <I18N>message markers.</I18N></I18N>',
    'i18n("Not" + "just a string" + "literal")',
    'i18n()',
    'i18n("Too many", "arguments")',
    '<I18N><a target="_blank">Unsafe attributes but no i18n-name.</a></I18N>',
    '<I18N>{"non-named expression"}</I18N>',
    '<I18N>{__(42, "expression name is not a string literal")}</I18N>',
    '<I18N>{__("only one argument")}</I18N>',
    '<I18N>{__("too", "many", "arguments")</I18N>',
    '<I18N>{__("same-name", 0)}{__("same-name", 1)}</I18N>',
    '<I18N>{__("same-name", 0)}<a target="_blank" i18n-name="same-name"></a></I18N>',
]

exports.testErrorsInExtraction = function (test) {
    shouldNotBeExtractable.forEach(message => {
        test.throws(() => translator.extractMessages(message), message);
    });
    test.done();
}


