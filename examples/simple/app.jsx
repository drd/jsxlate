import React from 'react';
import {I18N, i18n, setLocale, setMessages} from '../../components';

import spanish from './bundle-es';
import french from './bundle-fr';


const messages = {
    es: spanish,
    fr: french,
    en: {}
};


class App extends React.Component {

    componentWillUpdate(nextProps, nextState) {
        if (nextProps.locale !== this.props.locale) {
            this.setLocale(nextProps.locale);
        }
    }

    setLocale(locale) {
        setLocale(locale);
        setMessages(messages[locale]);
        this.setState({locale})
    }

    render(thing = {}) {
        var thing = i18n('awesome?');
        return <div>
            <header>
                <h1><I18N>Translated <span:hello className="hello">{thing}</span:hello> Application</I18N></h1>
                <I18N>Choose locale:</I18N> <select onChange={this.props.setLocale}>
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


class Awesome extends React.Component {
    render() {
        return <I18N>AWESOME</I18N>;
    }
}


class Page extends React.Component {
    render() {
        return <I18N>Hello, <Awesome foo="bar" bar={{foo: 'bar'}}/> world!</I18N>;
    }
}

class Wrap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {locale: 'en'};
    }
    setLocale(e) {
        this.setState({locale: e.target.value});
    }
    render() {
        return <App locale={this.state.locale} setLocale={this.setLocale.bind(this)} />
    }
}


React.render(<Wrap/>, document.getElementById('root'));

export default {App, Awesome, Page};