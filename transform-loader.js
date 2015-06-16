var translator = require('./lib/jsxlate');

module.exports = function(src) {
    return translator.transformMessageNodes(src);
};