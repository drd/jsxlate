'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = version;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function version() {
    return JSON.parse(_fs2.default.readFileSync(__dirname + '/../package.json', 'utf-8')).version;
}

