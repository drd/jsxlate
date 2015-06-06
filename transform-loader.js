var translator = require('./lib/jsx-translator');

module.exports = function(src) {
    return translator.transformMessageNodes(src);
};