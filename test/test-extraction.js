const I = require('immutable');
const {expect, assert} = require('chai');
require('babel-polyfill');

import {extractMessages as extract, InputError} from '../src/extract';


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
        });
    });

    describe('of jsx', function() {
        it('extracts simple strings', function() {
            let messages = extract(`
                React.createClass({
                    render() {
                        return <div>
                            <I18N>O, hai.</I18N>
                            <I18N>You look nice today!</I18N>
                        </div>;
                    }
                })
            `);

            expect(messages).to.eql([
                'O, hai.',
                'You look nice today!'
            ]);
        });

        it('extracts strings with expressions', function() {
            let messages = extract(`
                React.createClass({
                    render() {
                        let name = this.props.name;
                        return <div>
                            <I18N>O, hai, {name}.</I18N>
                            <I18N>You look nice today, {this.props.subject}!</I18N>
                        </div>;
                    }
                })
            `);

            expect(messages).to.eql([
                'O, hai, {name}.',
                'You look nice today, {this.props.subject}!'
            ]);
        });

        it('extracts strings with nested components', function() {
            let messages = extract(`
                React.createClass({
                    render() {
                        let name = this.props.name;
                        return <div>
                            <I18N>O, hai, <span>{name}</span>.</I18N>
                            <I18N>You look <em>nice</em> today, <strong>{this.props.subject}</strong>!</I18N>
                        </div>;
                    }
                })
            `);

            expect(messages).to.eql([
                'O, hai, <span>{name}</span>.',
                'You look <em>nice</em> today, <strong>{this.props.subject}</strong>!'
            ]);
        });

        it('extracts strings with nested components with attributes', function() {
            let messages = extract(`
                React.createClass({
                    render() {
                        let name = this.props.name;
                        return <div>
                            <I18N>O, hai, <span title="boop">{name}</span>.</I18N>
                            <I18N>You look <a href="#nice">nice</a> today, <strong>{this.props.subject}</strong>!</I18N>
                        </div>;
                    }
                })
            `);

            expect(messages).to.eql([
                'O, hai, <span title="boop">{name}</span>.',
                'You look <a href="#nice">nice</a> today, <strong>{this.props.subject}</strong>!'
            ]);
        });

        it('extracts strings with nested components with i18n-id attributes', function() {
            let messages = extract(`
                React.createClass({
                    render() {
                        let name = this.props.name;
                        return <div>
                            <I18N><span i18n-id="step-2" className="step-text">Step 2: </span>Add your organization to Idealist</I18N>
                        </div>;
                    }
                })
            `);

            expect(messages).to.eql([
                '<span:step-2>Step 2: </span:step-2>Add your organization to Idealist'
            ]);
        });

        it('extracts strings with nested components with namespaced i18n-id', function() {
            let messages = extract(`
                React.createClass({
                    render() {
                        let name = this.props.name;
                        return <div>
                            <I18N><span:step-2 className="step-text">Step 2: </span:step-2>Add your organization to Idealist</I18N>
                        </div>;
                    }
                })
            `);

            expect(messages).to.eql([
                '<span:step-2>Step 2: </span:step-2>Add your organization to Idealist'
            ]);
        });

        it('extracts strings with nested components with no children', function() {
            let messages = extract(`
                React.createClass({
                    render() {
                        let name = this.props.name;
                        return <div>
                            <I18N>Line, <br title="boop"/>Break.</I18N>
                            <I18N>React <Components/>, am I right?</I18N>
                        </div>;
                    }
                })
            `);

            expect(messages).to.eql([
                'Line, <br title="boop" />Break.',
                'React <Components />, am I right?'
            ]);
        });

        it('does not assume an i18n-id is present when there are unsafe attributes', function() {
            let messages = extract(`
                <li><I18N><span i18n-id="stat" className="stat"><ReactIntl.FormattedNumber value={dailyVisitors}/></span>daily visitors</I18N></li>
            `);

            expect(messages).to.eql([
                '<span:stat><ReactIntl.FormattedNumber /></span:stat>daily visitors'
            ]);
        });

        it('deals correctly with whitespace', function() {
            let messages = extract(`<p id="are-we-eligible" className="in-form-link">
                <I18N>
                    <a href="/info/Help/Organizations#Eligibility">Are we eligible?</a>
                </I18N>
            </p>`);

            expect(messages).to.eql([
                '<a href="/info/Help/Organizations#Eligibility">Are we eligible?</a>'
            ]);
        });

        describe('of various strings', function() {
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
                '<I18N><Pluralize:count on={count}><Match when="zero">You have no items</Match><Match when="one">You have one item</Match><Match when="other">You have {count} items</Match></Pluralize:count></I18N>': [
                    '<Pluralize:count><Match when="zero">You have no items</Match><Match when="one">You have one item</Match><Match when="other">You have {count} items</Match></Pluralize:count>'],
            };

            it('extracts expected strings', function() {
                Object.keys(extractions).forEach(input => {
                    try { extract(input); } catch(e) { console.error(e); }
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
        });
    });

    describe('errors and warnings', function() {
        it('throws an error when an element has sanitized attributes but no i18n-id', function() {
            expect(() => extract('<I18N>O, hai, <span className="boop">{name}</span>.</I18N>')).to.throw(InputError);
        });

        it('does not require i18n-id on unique components', function() {
            expect(() => extract('<I18N>O, hai, <Component beep="boop">{name}</Component>.</I18N>')).to.not.throw(InputError);
        });

        it('requires i18n-id on duplicated components', function() {
            expect(() => extract('<I18N>O, hai, <C beep="boop">{name}</C>, <C beep="boöp">{game}</C>.</I18N>')).to.throw(InputError);
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
            });
        });
    });
});
