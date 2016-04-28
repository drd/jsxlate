const {expect} = require('chai');
const I = require('immutable');
import generate from 'babel-generator';

import parsing from '../src/parsing';
import transformation from '../src/transformation';


describe('Message node transformation', function() {

    it('properly handles whitespace and quotes', function() {
        var messagesToBeTransformed = I.List([
            [
                '<I18N>Hello, world. <Component />{foo}<p>{bar.baz}</p></I18N>',
                '<I18N message={"Hello, world. <Component />{foo}<p>{bar.baz}</p>"} context={this} args={[Component, foo, bar]}' +
                  ' fallback={function () {\n  return <span>Hello, world. <Component />{foo}<p>{bar.baz}</p></span>;\n}} />;'
            ],

            // ensure namespaced tags are de-namespaced
            [
                '<I18N>Hello, world. <Component />{foo}<p:beluga data-caviar>{bar.baz}</p:beluga></I18N>',
                '<I18N message={"Hello, world. <Component />{foo}<p:beluga>{bar.baz}</p:beluga>"} context={this} args={[Component, foo, bar]}' +
                  ' fallback={function () {\n  return <span>Hello, world. <Component />{foo}<p data-caviar>{bar.baz}</p></span>;\n}} />;'
            ],

            // this test ensures whitespace is handled properly
            [
                `<I18N>
  <div>Hello, world. <Component.SubComponent i18n-id="comp.sub" snoochie={boochies} />{this.bar.baz}</div>
</I18N>`,
                '<I18N message={"<div>Hello, world. <Component.SubComponent:comp.sub />{this.bar.baz}</div>"} context={this} args={[Component, boochies]}' +
                  ' fallback={function () {\n  return <span>\n  <div>Hello, world. <Component.SubComponent snoochie={boochies} />{this.bar.baz}</div>\n  </span>;\n}} />;'
            ],

            // this test ensures whitespace is handled properly in multi-line extractions
            [
                `<I18N>
  <div>
    Hello, world.
    <Component.SubComponent i18n-id="comp.sub" snoochie={boochies} />
    {this.bar.baz}
  </div>
</I18N>`,
                '<I18N message={"<div>\\n    Hello, world.\\n    <Component.SubComponent:comp.sub />\\n    {this.bar.baz}\\n  </div>"} context={this} args={[Component, boochies]}' +
                  ' fallback={function () {\n  return <span>\n  <div>\n    Hello, world.\n    <Component.SubComponent snoochie={boochies} />\n    {this.bar.baz}\n  </div>\n  </span>;\n}} />;'
            ],

            // Namespaced Component with sanitized attributes:
            [
                '<I18N><Pluralize:items on={this.state.count}><Match when="=0">You have no items in your cart</Match><Match when="one">You have one item in your cart</Match><Match when="other">You have {this.state.count} items in your cart</Match></Pluralize:items></I18N>',
                '<I18N message={"<Pluralize:items><Match when=\\"=0\\">You have no items in your cart</Match><Match when=\\"one\\">You have one item in your cart</Match><Match when=\\"other\\">You have {this.state.count} items in your cart</Match></Pluralize:items>"}' +
                  ' context={this} args={[Pluralize, Match]} fallback={function () {\n  return <span><Pluralize on={this.state.count}><Match when="=0">You have no items in your cart</Match><Match when="one">You have one item in your cart</Match><Match when="other">You have {this.state.count} items in your cart</Match></Pluralize></span>;\n}} />;'
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
                expect(generate(transformedMarker).code).to.equal(transformedMessage);
            } catch(e) {
                console.warn("Encountered error testing", message);
                throw e;
            }
        });
    });
});
