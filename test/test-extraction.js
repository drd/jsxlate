const mocha = require('mocha');
const {expect} = require('chai');

const {extract} = require('../plugin');


describe('extraction', function() {
    describe('of strings', function() {
        it('extracts a string', function() {
            let messages = extract('i18n("foo")');

            expect(messages).to.eql(['foo']);
        });

        it('extracts multiple strings', function() {
            let messages = extract(`
                let foo = i18n("foo foo foo");
                let bar = i18n("foo, bar, foo");
                let baz = \`\${i18n('this is silly')}\`;
            `);

            expect(messages).to.eql([
                'foo foo foo',
                'foo, bar, foo',
                'this is silly'
            ]);
        })
    });

    describe('of jsx', function() {
        
    })
});
