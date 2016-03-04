'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var babel = require('babel-core');
var babylon = require('babylon');
var syntaxJsx = require('babel-plugin-syntax-jsx');
var transformJsx = require('babel-plugin-transform-react-jsx');
var transformObjectRestSpread = require('babel-plugin-transform-object-rest-spread');

var basePlugins = [syntaxJsx, transformObjectRestSpread];
var jsxTransformPlugins = [transformJsx, transformObjectRestSpread];
var parsePlugins = ['jsx', 'objectRestSpread'];

exports.default = {
    parse: function parse(code) {
        var plugins = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

        return babylon.parse(code, { plugins: parsePlugins.concat(plugins) });
    },
    parseExpression: function parseExpression(code, plugins) {
        return this.parse(code, plugins).program.body[0].expression;
    },
    transform: function transform(code) {
        var plugins = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

        return babel.transform(code, { plugins: basePlugins.concat(plugins) });
    },
    transformJsx: function transformJsx(code) {
        var plugins = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

        return babel.transform(code, { plugins: jsxTransformPlugins.concat(plugins) });
    }
};

