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
                            <I18N>O, hai, <span className="boop">{name}</span>.</I18N>
                            <I18N>You look <a href="#nice">nice</a> today, <strong>{this.props.subject}</strong>!</I18N>
                        </div>;
                    }
                })
            `);

            expect(messages).to.eql([
                'O, hai, <span>{name}</span>.',
                'You look <a href="#nice">nice</a> today, <strong>{this.props.subject}</strong>!'
            ]);
        });

    })
});
