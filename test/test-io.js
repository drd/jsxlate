import {expect} from 'chai';
import PO from 'pofile';

import io from '../src/io';


describe('input/output library', function() {
    const outputFixture = {
        "message1": [
            {sourceFile: 'src1.js', line: 3, node: 'node1'},
        ],
        "message2": [
            {sourceFile: 'src2.js', line: 15, node: 'node2'},
            {sourceFile: 'src2.js', line: 31, node: 'node3'},
        ],
    };

    describe('json', function() {
        describe('output', function() {
            it('outputs JSON with format {key: key}', function() {
                const json = io.json.out(outputFixture);
                const parsed = JSON.parse(json);
                expect(Object.keys(parsed)).to.eql(Object.keys(outputFixture));
                expect(Object.values(parsed)).to.eql(Object.keys(outputFixture));
            });
        });

        describe('input', function() {
            it('parses JSON', function() {
                const json = '{"One": "Uno", "Two": "Dos"}';
                const messages = io.json.in(json);
                expect(messages.One).to.equal("Uno");
                expect(messages.Two).to.equal("Dos");
            });
        });
    });

    describe('po', function() {
        describe('output', function() {
            it('outputs po files with source references', function() {
                const poSrc = io.po.out(outputFixture);
                const parsed = PO.parse(poSrc);
                parsed.items.forEach(item => {
                    const fixture = outputFixture[item.msgid];
                    expect(fixture.length).to.equal(item.references.length);
                    expect(item.references).to.eql(
                        fixture.map(({sourceFile, line}) => `${sourceFile}:${line}`)
                    );
                });
            });
        });

        describe('input', function() {
            const po = `
msgid ""
msgstr ""

msgid "One"
msgstr "Uno"

msgid "Two"
msgstr "Dos"
            `;
            it('converts po files to msgid: msgstr format', function() {
                const messages = io.po.in(po);
                expect(messages.One).to.equal("Uno");
                expect(messages.Two).to.equal("Dos");
            });
        });
    });

    describe('js', function() {
        describe('output', function() {
            it('is a passthru', function() {
                expect(io.js.out(outputFixture)).to.eql(outputFixture);
            });
        });

        describe('input', function() {
            it('is a passthru', function() {
                expect(io.js.in(outputFixture)).to.eql(outputFixture);
            });
        });
    });
});
