import React from 'react';
import {I18N, i18n, CONTEXT_TYPES} from '../../components';

import spanish from './bundle-es';
import french from './bundle-fr';


const messages = {
    es: spanish,
    fr: french,
    en: {}
};


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {locale: 'en'};
    }

    getChildContext() {
        i18n.messages = messages[this.state.locale];
        return {
            locale: this.state.locale,
            messages: messages[this.state.locale]
        }
    }

    localeChanged(event) {
        this.setState({locale: event.target.value});
    }

    render() {
        var thing = i18n('awesome?');
        return <div>
            <header>
                <h1><I18N>Translated {thing} Application</I18N></h1>
                <I18N>Choose locale:</I18N> <select onChange={this.localeChanged.bind(this)}>
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                </select>
            </header>
            <main>
                <Page />
            </main>
        </div>
    }
}

App.childContextTypes = CONTEXT_TYPES;


class Stupid extends React.Component {
    render() {
        return <I18N>STUPID</I18N>;
    }
}


class Page extends React.Component {
    render() {
        return <I18N>Hello, <Stupid /> world!</I18N>;
    }
}


React.render(<App/>, document.getElementById('root'));