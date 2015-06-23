import React from 'react';


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
            return renderer.apply(this.props.context, this.props.args);
        }
        return this.props.fallback.call(this.props.context);
    }
}


class Match extends React.Component {
    constructor(props) {
        super(props);
        this._isMatch = true;
    }

    render() {
        return <span>{this.props.children}</span>;
    }
}

Match.propTypes = {
    when: React.PropTypes.string
};


class Pluralize extends React.Component {

    classifyMatch(match) {
        if (match.startsWith('=')) {
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
        let nonTextChildren = props[propName].filter(c => toString.call(c) === '[object String]');
        let nonMatchChildren = nonTextChildren.filter(c => c._isMatch);
        if (nonMatchChildren.length) {
            return new Error("Pluralize given children other than a Match: " + nonMatchChildren);
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
