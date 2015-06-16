var jsxlate = require('./lib/jsxlate');

module.exports = function(src) {
    return jsxlate.transformMessageNodes(src);
};