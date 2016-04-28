import React from 'react';


// TODO: default locale should be empty, not fake-English
var state = {
    messages: {},
    locale: {name: 'en', pluralFn: (c) => c === 1 ? 'one' : 'other'}
};


function setMessages(messages) {
    state.messages = messages;
}

function setLocale(locale) {
    state.locale = locale;
}


function i18n(original) {
    let translated = state.messages[original];
    return translated ? translated() : original;
}


class I18N extends React.Component {
    render() {
        let renderer = state.messages[this.props.message];
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

        let form = state.locale.pluralFn(this.props.on);
        let match = children[this.props.on] || children[form];
        if (!match) {
            throw new Error("Missing plural form: " + form);
        }
        return match;
    }
}


Pluralize.propTypes = {
    on: React.PropTypes.number,
    children: (props, propName, componentName) => {
        let nonTextChildren = props[propName].filter(c => Object.prototype.toString.call(c) !== '[object String]');
        let nonMatchChildren = nonTextChildren.filter(c => !c.type._isMatch);
        if (nonMatchChildren.length) {
            return new Error("Pluralize given children other than a Match: " + nonMatchChildren.map(c => c.type.displayName || c.type.name || c.type));
        }
    }
}


export default {
    i18n,
    I18N,
    setMessages,
    setLocale,
    Pluralize,
    Match,
    Format: ['Pluralize', 'Match']
};
