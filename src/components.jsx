import React from 'react';
import _ from 'lodash';

let contextTypes = {
    _i18n: React.PropTypes.func.isRequired,
    messages: React.PropTypes.object.isRequired,
    locale: React.PropTypes.shape({
        name: React.PropTypes.string.isRequired,
        pluralFn: React.PropTypes.func.isRequired
    }).isRequired
};

class I18NContainer extends React.Component {

    getChildContext() {
        return {
            _i18n: function(original) {
                let translated = this.props.messages[original];
                return translated ? translated() : original;
            }.bind(this),
            messages: this.props.messages,
            locale: this.props.locale
        };
    }

    render() {
        return this.props.children;
    }
}

I18NContainer.propTypes = {
    messages: React.PropTypes.object,
    locale: React.PropTypes.shape({
        name: React.PropTypes.string.isRequired,
        pluralFn: React.PropTypes.func.isRequired
    })
};

I18NContainer.defaultProps = {
    messages: {},
    // TODO: default locale should be empty, not fake-English
    locale: {
        name: 'en',
        pluralFn: (c) => c === 1 ? 'one' : 'other'
    }
};

I18NContainer.childContextTypes = contextTypes;

class I18N extends React.Component {
    render() {
        let renderer = this.context.messages[this.props.message];
        if (renderer) {
            let rendered = renderer.apply(this.props.context, this.props.args);
            // TODO: this check would be unnecessary if collisions between
            // source and react child strings were impossible.
            if (Object.prototype.toString.call(rendered) === '[object String]') {
                return <span>{rendered}</span>;
            } else {
                return rendered;
            }
        }
        return this.props.fallback.call(this.props.context);
    }
}

I18N.contextTypes = contextTypes;

class Match extends React.Component {
    render() {
        return <span>{this.props.children}</span>;
    }
}

Match._isMatch = true;
Match.propTypes = {
    when: React.PropTypes.string
};

class Pluralize extends React.Component {

    classifyMatch(match) {
        if (match && match.startsWith('=')) {
            return parseInt(match.slice(1), 10);
        } else {
            return match;
        }
    }

    classifyMatches(matches, match) {
        matches[this.classifyMatch(match.props.when)] = match;
        return matches;
    }

    render() {
        // TODO: this probably should happen in componentWillMount,
        // it is not likely useful to allow for dynamic children of Pluralize.
        let children = [];
        React.Children.forEach(this.props.children, c => children.push(c));
        children = children.reduce(this.classifyMatches.bind(this), {});

        let form = this.context.locale.pluralFn(this.props.on);
        let match = children[this.props.on] || children[form];
        if (!match) {
            throw new Error("Missing plural form: " + form);
        }
        return match;
    }
}

Pluralize.contextTypes = contextTypes;

Pluralize.propTypes = {
    on: React.PropTypes.number,
    children: (props, propName, componentName) => {
        let nonTextChildren = props[propName].filter(c => Object.prototype.toString.call(c) !== '[object String]');
        let nonMatchChildren = nonTextChildren.filter(c => !c.type._isMatch);
        if (nonMatchChildren.length) {
            return new Error("Pluralize given children other than a Match: " + nonMatchChildren.map(c => c.type.displayName || c.type.name || c.type));
        }
    }
};

function translated(componentClass) {
    componentClass.contextTypes = _.merge({}, componentClass.contextTypes, contextTypes);
    return componentClass;
}

export default {
    translated,
    I18N,
    I18NContainer,
    Pluralize,
    Match,
    Format: ['Pluralize', 'Match']
};
