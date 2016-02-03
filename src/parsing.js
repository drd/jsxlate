const babel = require('babel-core');
const babylon = require('babylon');
const syntaxJsx = require('babel-plugin-syntax-jsx');
const transformJsx = require('babel-plugin-transform-react-jsx');
const transformObjectRestSpread = require('babel-plugin-transform-object-rest-spread');


const basePlugins = [syntaxJsx, transformObjectRestSpread];
const jsxTransformPlugins = [transformJsx, transformObjectRestSpread];
const parsePlugins = ['jsx', 'objectRestSpread'];

export default {
    parse(code, plugins = []) {
        return babylon.parse(code, {plugins: parsePlugins.concat(plugins)});
    },

    parseExpression(code, plugins) {
        return this.parse(code, plugins).program.body[0].expression;
    },

    transform(code, plugins = []) {
        return babel.transform(code, {plugins: basePlugins.concat(plugins)});
    },

    transformJsx(code, plugins = []) {
        return babel.transform(code, {plugins: jsxTransformPlugins.concat(plugins)});
    },
};
