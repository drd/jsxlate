'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

// TODO: default locale should be empty, not fake-English
var state = {
    messages: {},
    locale: { name: 'en', pluralFn: function pluralFn(c) {
            return c === 1 ? 'one' : 'other';
        } }
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
    _inherits(I18N, _React$Component);

    function I18N() {
        _classCallCheck(this, I18N);

        _get(Object.getPrototypeOf(I18N.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(I18N, [{
        key: 'render',
        value: function render() {
            var renderer = state.messages[this.props.message];
            if (renderer) {
                var rendered = renderer.apply(this.props.context, this.props.args);
                // TODO: this check would be unnecessary if collisions between
                // source and react child strings were impossible.
                if (toString.call(rendered) === '[object String]') {
                    return _react2['default'].createElement(
                        'span',
                        null,
                        rendered
                    );
                } else {
                    return rendered;
                }
            }
            return this.props.fallback.call(this.props.context);
        }
    }]);

    return I18N;
})(_react2['default'].Component);

var Match = (function (_React$Component2) {
    _inherits(Match, _React$Component2);

    function Match() {
        _classCallCheck(this, Match);

        _get(Object.getPrototypeOf(Match.prototype), 'constructor', this).apply(this, arguments);

        this._isMatch = true;
    }

    _createClass(Match, [{
        key: 'render',
        value: function render() {
            return _react2['default'].createElement(
                'span',
                null,
                this.props.children
            );
        }
    }]);

    return Match;
})(_react2['default'].Component);

Match.propTypes = {
    when: _react2['default'].PropTypes.string
};

var Pluralize = (function (_React$Component3) {
    _inherits(Pluralize, _React$Component3);

    function Pluralize() {
        _classCallCheck(this, Pluralize);

        _get(Object.getPrototypeOf(Pluralize.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(Pluralize, [{
        key: 'classifyMatch',
        value: function classifyMatch(match) {
            if (match.startsWith('=')) {
                return parseInt(match.slice(1), 10);
            } else {
                return match;
            }
        }
    }, {
        key: 'classifyMatches',
        value: function classifyMatches(matches, match) {
            matches[this.classifyMatch(match.props.when)] = match;
            return matches;
        }
    }, {
        key: 'render',
        value: function render() {
            // TODO: this probably should happen in componentWillMount,
            // it is not likely useful to allow for dynamic children of Pluralize.
            var children = [];
            _react2['default'].Children.forEach(this.props.children, function (c) {
                return children.push(c);
            });
            children = children.reduce(this.classifyMatches.bind(this), {});

            var form = state.locale.pluralFn(this.props.on);
            var match = children[this.props.on] || children[form];
            if (!match) {
                throw new Error('Missing plural form: ' + form);
            }
            return match;
        }
    }]);

    return Pluralize;
})(_react2['default'].Component);

Pluralize.propTypes = {
    on: _react2['default'].PropTypes.number,
    children: function children(props, propName, componentName) {
        var nonTextChildren = props[propName].filter(function (c) {
            return toString.call(c) === '[object String]';
        });
        var nonMatchChildren = nonTextChildren.filter(function (c) {
            return c._isMatch;
        });
        if (nonMatchChildren.length) {
            return new Error('Pluralize given children other than a Match: ' + nonMatchChildren);
        }
    }
};

exports['default'] = {
    i18n: i18n,
    I18N: I18N,
    setMessages: setMessages,
    setLocale: setLocale,
    Pluralize: Pluralize,
    Match: Match,
    Format: ['Pluralize', 'Match']
};
module.exports = exports['default'];

