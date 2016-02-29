const babylon = require('babylon');
const mocha = require('mocha');
const {expect} = require('chai');
const sinon = require('sinon');

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
    };

    Object.entries(examples).forEach(([src, expectedVariables]) => {
        it(`in ${src}`, function() {
            const expression = babylon.parse(src, {plugins: ['jsx']}).program.body[0].expression;
            const variables = freeVariablesInMessage(expression);
            expect(variables).to.have.members(expectedVariables);
        });
    });
});
