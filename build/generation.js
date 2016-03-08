'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = generate;

var _babelGenerator = require('babel-generator');

var _babelGenerator2 = _interopRequireDefault(_babelGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function generate(ast, opts, code) {
    opts = Object.assign({ comments: false }, opts);
    return (0, _babelGenerator2.default)(ast, opts, code).code;
}

