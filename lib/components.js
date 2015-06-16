'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var CONTEXT_TYPES = Object.freeze({
    locale: _react2['default'].PropTypes.string,
    messages: _react2['default'].PropTypes.object
});

var state = {
    messages: {},
    locale: ''
};

function setMessages(messages) {
    state.messages = messages;
}

function setLocale(locale) {
    state.locale = locale;
}

function i18n(original) {
    var translated = state.messages[original];
    return translated ? translated() : original;
}

var I18N = (function (_React$Component) {
    function I18N() {
        _classCallCheck(this, I18N);

        if (_React$Component != null) {
            _React$Component.apply(this, arguments);
        }
    }

    _inherits(I18N, _React$Component);

    _createClass(I18N, [{
        key: 'render',
        value: function render() {
            var renderer = state.messages[this.props.message];
            if (renderer) {
                return renderer.apply(this.props.context, this.props.args);
            }
            return this.props.fallback.call(this.props.context);
        }
    }]);

    return I18N;
})(_react2['default'].Component);

I18N.contextTypes = CONTEXT_TYPES;

exports['default'] = { CONTEXT_TYPES: CONTEXT_TYPES, i18n: i18n, I18N: I18N, setLocale: setLocale, setMessages: setMessages };
module.exports = exports['default'];

