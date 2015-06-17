import React from 'react';
import {I18N, i18n, CONTEXT_TYPES, setLocale, setMessages} from '../../components';
import jsxlate from '../../jsxlate';


class App extends React.Component {
    constructor(props) {
        super(props);
        let input = "<I18N>You look nice today</I18N>";
        this.state = this.extractMessages(input);
    }

    extractMessages(input) {
        let inputError = undefined;
        let messages = [];
        try {
            messages = jsxlate.extractMessages(input);
        } catch (e) {
            inputError = e;
        }
        return {inputError, input, messages, translations: messages.reduce((ms, m) => { ms[m] = m; return ms }, {})};
    }

    inputChanged(e) {
        let input = e.target.value;
        this.setState(this.extractMessages(input));
    }

    translationsChanged(translations) {
        this.setState({translations});
    }

    render(thing = {}) {
        return <div>
            <header>
                <h1>Online Translation!</h1>
            </header>
            <main>
                <MessageExtractor input={this.state.input}
                                  onChange={this.inputChanged.bind(this)}
                                  messages={this.state.messages}
                                  error={this.state.inputError} />
                <MessageTranslator input={this.state.input}
                                   onChange={this.translationsChanged.bind(this)}
                                   translations={this.state.translations}
                                   error={this.state.translationsError} />
            </main>
        </div>
    }
}


class MessageExtractor extends React.Component {
    render() {
        return <div id="extractions">
            <h2>Input</h2>
            <textarea ref='input' onChange={this.props.onChange} value={this.props.input}/>

            <h2>Extracted Messages</h2>
            {this.props.error
                ?
                <p className="error"><strong>Error:</strong> {this.props.error.toString()}</p>
                :
                <ul>
                    {this.props.messages.map(m => <li key={m}>{m}</li>)}
                </ul>
            }
        </div>;
    }
}


class MessageTranslator extends React.Component {
    translationChanged(message) {
        return e => {
            this.props.translations[message] = e.target.value;
            this.props.onChange(this.props.translations);
        }
    }

    render() {
        let bundle = {}, transformed, bundleError, transformError;

        try {
            bundle = jsxlate.translateMessagesToBundle(this.props.input, this.props.translations);
        } catch(e) {
            bundleError = e;
        }

        try {
            transformed = jsxlate.transformMessageNodes(this.props.input);
        } catch(e) {
            transformError = e;
        }

        return <div id="translations">
            <h2>Output</h2>
            <h3>Transformed source</h3>
            <div>
                <pre>{transformed}</pre>
                {transformError && <p className="error">{transformError.toString()}</p>}
            </div>
            <h3>Translations</h3>
            <ul>{Object.keys(this.props.translations).map(
                message => <input key={message}
                                  value={this.props.translations[message]}
                                  onChange={this.translationChanged(message)}/>)}
            </ul>
            <h3>Bundled translations</h3>
            <div>
                <pre>{
                    '{\n' +
                    Object.keys(bundle).map(k => `  "${k}":\n    ${bundle[k]}`).join(',\n') +
                    '}'}
                </pre>
                {bundleError && <p className="error">{bundleError.toString()}</p>}
            </div>
        </div>;
    }
}

React.render(<App/>, document.getElementById('root'));

export default {App, MessageTranslator, MessageExtractor};