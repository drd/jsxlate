var translator = require('./jsx-translator');

module.exports = function(src) {
    return translator.transformMessageNodes(src);
};