const mocha = require('mocha');
const {expect} = require('chai');
const sinon = require('sinon');

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

        it('warns when it finds non-extractable whitelisted attributes', function() {
            let spy = sinon.spy(console, 'warn');
            extract('<I18N><a href={Router.url("about-us")}>click me</a></I18N>');
            expect(spy.callCount).to.equal(1);
            spy.restore();
        });

        it('throws an error when an element has sanitized attributes but no i18n-id', function() {
            expect(() => extract('<I18N>O, hai, <span className="boop">{name}</span>.</I18N>')).to.throw(Error);
        });

        it('does not require i18n-id on unique components', function() {
            expect(() => extract('<I18N>O, hai, <Component beep="boop">{name}</Component>.</I18N>')).to.not.throw(Error);
        });
    });
});
