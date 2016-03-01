const babylon = require('babylon');
const {expect} = require('chai');

import freeVariablesInMessage from '../src/free-variables';


describe('freeVariables', function() {
    const examples = {
        '<I18N>{foo}</I18N>': ['foo'],
        '<I18N>{this.foo}</I18N>': [],
        '<I18N>{this.foo()}</I18N>': [],
        '<I18N><span foo={bar}>{foo}</span></I18N>': ['foo', 'bar'],
        '<I18N><span foo={{one: 1, [two]: three}}>{foo}</span></I18N>': ['foo', 'two', 'three'],
        '<I18N><span i18n-id="stat" className="stat"><ReactIntl.FormattedNumber value={dailyVisitors}/></span>daily visitors</I18N>':
            ['ReactIntl', 'dailyVisitors'],
        '<I18N>Hello, world. {/* no variables here bruh */}<Component />{foo}<p>{bar.baz}</p></I18N>':
            ['Component', 'foo', 'bar'],
        '<I18N>Hello, world. <Component.SubComponent snoochie={boochies} />{this.bar.baz}</I18N>':
            ['Component', 'boochies'],
        '<I18N>Hello, world. <Component.SubComponent snoochie={{boochie: poochies, [foo]: bar}} />{this.bar.baz}</I18N>':
            ['Component', 'poochies', 'foo', 'bar'],
    };

    Object.entries(examples).forEach(([src, expectedVariables]) => {
        it(`in ${src}`, function() {
            const expression = babylon.parse(src, {plugins: ['jsx']}).program.body[0].expression;
            const variables = freeVariablesInMessage(expression);
            expect(variables).to.have.members(expectedVariables);
        });
    });
});
