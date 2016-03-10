'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var I18N = function (_React$Component) {
    _inherits(I18N, _React$Component);

    function I18N() {
        _classCallCheck(this, I18N);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(I18N).apply(this, arguments));
    }

    _createClass(I18N, [{
        key: 'render',
        value: function render() {
            var renderer = state.messages[this.props.message];
            if (renderer) {
                var rendered = renderer.apply(this.props.context, this.props.args);
                console.log("rendered", rendered);
                // TODO: this check would be unnecessary if collisions between
                // source and react child strings were impossible.
                if (Object.prototype.toString.call(rendered) === '[object String]') {
                    return _react2.default.createElement(
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
}(_react2.default.Component);

var Match = function (_React$Component2) {
    _inherits(Match, _React$Component2);

    function Match() {
        _classCallCheck(this, Match);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Match).apply(this, arguments));
    }

    _createClass(Match, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'span',
                null,
                this.props.children
            );
        }
    }]);

    return Match;
}(_react2.default.Component);

Match._isMatch = true;
Match.propTypes = {
    when: _react2.default.PropTypes.string
};

var Pluralize = function (_React$Component3) {
    _inherits(Pluralize, _React$Component3);

    function Pluralize() {
        _classCallCheck(this, Pluralize);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Pluralize).apply(this, arguments));
    }

    _createClass(Pluralize, [{
        key: 'classifyMatch',
        value: function classifyMatch(match) {
            if (match && match.startsWith('=')) {
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
            _react2.default.Children.forEach(this.props.children, function (c) {
                return children.push(c);
            });
            children = children.reduce(this.classifyMatches.bind(this), {});

            var form = state.locale.pluralFn(this.props.on);
            var match = children[this.props.on] || children[form];
            if (!match) {
                throw new Error("Missing plural form: " + form);
            }
            return match;
        }
    }]);

    return Pluralize;
}(_react2.default.Component);

Pluralize.propTypes = {
    on: _react2.default.PropTypes.number,
    children: function children(props, propName, componentName) {
        var nonTextChildren = props[propName].filter(function (c) {
            return Object.prototype.toString.call(c) !== '[object String]';
        });
        var nonMatchChildren = nonTextChildren.filter(function (c) {
            return !c.type._isMatch;
        });
        if (nonMatchChildren.length) {
            return new Error("Pluralize given children other than a Match: " + nonMatchChildren.map(function (c) {
                return c.type.displayName || c.type.name || c.type;
            }));
        }
    }
};

exports.default = {
    i18n: i18n,
    I18N: I18N,
    setMessages: setMessages,
    setLocale: setLocale,
    Pluralize: Pluralize,
    Match: Match,
    Format: ['Pluralize', 'Match']
};

