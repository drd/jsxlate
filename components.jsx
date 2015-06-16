import React from 'react';


const CONTEXT_TYPES = Object.freeze({
    locale: React.PropTypes.string,
    messages: React.PropTypes.object
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

I18N.contextTypes = CONTEXT_TYPES;


export default {CONTEXT_TYPES, i18n, I18N, setLocale, setMessages};