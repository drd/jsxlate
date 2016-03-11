# jsxlate

[![Build Status](https://travis-ci.org/drd/jsxlate.svg)](https://travis-ci.org/drd/jsxlate)
[![Coverage Status](https://coveralls.io/repos/github/drd/jsxlate/badge.svg?branch=master)](https://coveralls.io/github/drd/jsxlate?branch=master)

This program aids in internationalizing React applications by extracting messages from JSX sources and then rewriting the messages into bundles of translatable units. The advantage of this approach is that translators can be shown full sentences, rich in context.

Translators are presented with a sanitized version of JSX that allows them to rearrange markup but prevents them from seeing anything irrelevant or modifying anything dangerous. The developer can allow translators to change certain HTML tag attributes, if, for example, links needs to be changed to point to language-specific resources. Translators can also change add or remove simple HTML tags in case, for instance, a single italicized phrase in the source language becomes two italicized phrases in the destination language.


## A brief glossary of terms

*Message*: A user-visible, translateable unit of text, possibly containing nested tags and React components.

*Marker*: A JavaScript function (`i18n`) or React Component (`<I18N>`) that is used to demarcate _messages_.

*Bundle*: A mapping of _message_ to translation for a given locale. Each translation is a function that returns either a _string_ or _React DOM_.


## Messages

Messages take one of two forms: string literals or JSX elements.

1. String messages are marked with a specially-named identity function: `i18n("Hello!")`
2. JSX messages are marked with a specially-named React component: `<I18N>Hello, <em>world!</em></I18N>`


## Provided Tools

### Transforming the source

The `main` export from the `jsxlate` module is a [babel plugin](https://babeljs.io/docs/plugins/) which will  turn <I18N> marker components into <I18N> lookups. To enable it, add jsxlate to your `.babelrc` plugins list like so:

```json
{
  "presets": ["es2015", "react"],
  "plugins": ["jsxlate"]
}
```

To understand what the transformation does, consider this component:

```js
function FishAppraiser(props) {
  return <I18N>The {props.fish} looks good!</I18N>;
}
```

The transform plugin will convert it to this form:

```js
function FishAppraiser(props) {
  return <I18N message="The {props.fish} looks good!"
               context={this}
               args={[props]}
               fallback={(props) => <span>The {props.fish} looks good!</span>}/>;
}
```

Because jsxlate uses an optional namespace syntax for marking tags with sanitized attributes to translators, any use of these must be compiled with the transform plugin. Example:

```js
function FishAppraiser(props) {
  return <I18N>The <span:fishy className="fishy">{props.fish}</span:fishy> looks good!</I18N>;
}
```

Is turned into:

```js
function FishAppraiser(props) {
  return <I18N message="The <span:fishy>{props.fish}</span:fishy> looks good!"
               context={this}
               args={[props]}
               fallback={(props) => <span>The
                 <span className="fishy">{props.fish}</span>
               looks good!</span>}/>;
}
```

It is also possible to only use the `i18n-id` attribute to mark components with sanitized attributes, in which case you will not need to specify `jsxlate` as a plugin in your `.babelrc` during development. The performance overhead is small, but on a very large site it may be preferable. However, if you do not use the plugin you will not be able to preview your translations.


### Extracting messages

A script is included that extracts messages from JSX files:

```
$(npm bin)/extract-messages MyComponent.jsx > messages.po
```

You can operate on directories, and specify the output file:

```
$(npm bin)/extract-messages -o messages.po src/
```

You can also merge with an existing file:

```
$(npm bin)/extract-messages -m messages.po -o messages.po src/module/
```

The default output format is [`gettext` PO](https://www.gnu.org/software/gettext/manual/html_node/PO-Files.html), but you can also output JSON using the option `-f json`.


### Bundling translated messages

Once you get your translations back from the translators (as `messages-fr.po`), you can use the `bundle-messages` script to generate a translations bundle:

```
$(npm bin)/bundle-messages -t messages-fr.po -o i18n/bundle-fr.js src/
```

This module exports an object that has translator functions for the corresponding locale.

The default input format is determined by the file extension of the input file.


## Integrating with your App

See the simple example app included. Expect the API to change, and more documentation to come!

## Sanitizing and reconstituting JSX messages

We sanitize two aspects of JSX messages: JavaScript expressions, and attributes.

In order to make sure that messages are friendly for translators, only variables and properties are allowed in JavaScript expressions:

```js
let {I18N} = require('jsxlate').components;

<I18N>My name is {name}</I18N>
<I18N>My favorite color is {favorites.color}</I18N>
```

Now, attributes that aren't relevant to translators are removed. But when we remove attributes, we need to know where to put them back. Since translators can add and remove tags, we must give a special *id* to the tag whose attributes were removed:

```js
<I18N><a:my-link href="example.com" target="_blank">Example</a:my-link></I18N>
        ^^^^^^^^                                              ^^^^^^^^
```

This produces the following extracted message:

```js
<a:my-link href="example.com">Example</a:my-link>
```

Note that `target="_blank"` is missing. Now the translator can rearrange at will:

```js
<i>Cliquez sur-moi: <a:my-link href="example.fr">Exemple</a:my-link></i>
```

When we translate the sources using this translation, we get the following:

```js
<I18N><i>Cliquez sur-moi: <a href="example.fr" target="_blank">Exemple</a></i>
```

There is an alternative syntax if you want your untranslated sources to be
executable, since the syntax used above would interfere with that. You can say:

```js
<a i18n-id="foo"></a>
```

And this will be shown to translators as:

```js
<a:foo></a:foo>
```

This is also useful if your React Component is a property of a module:

```js
<I18N><label>Full name: <Form.Input i18n-id="full-name" name="fullName"/></label></I18N>
```

This will be shown to translators as:

```js
<I18N><label>Full name: <Form.Input:full-name/></label></I18N>
```

## Pluralization

Introduce pluralization on a variable with the `<Pluralize>` component, and match ICU MessageFormat
plural forms with the `<Match>` component:

```js
let {I18N, Pluralize, Match} = require('jsxlate').components;

<I18N><Pluralize on={this.state.count}>
    <Match when="one">You have one!</Match>
    <Match when="other">You have {this.state.count}!</Match>
</Pluralize></I18N>
```

If you want to match specific numbers, you can do that as well:

```
<I18N><Pluralize on={this.state.count}>
    <Match when="=0">You have zilch!</Match>
    <Match when="one">You have one!</Match>
    <Match when="other">You have {this.state.count}!</Match>
</Pluralize></I18N>
```

## Examples

Various examples are provided in the [jsxlate-loader repository](http://github.com/drd/jsxlate-loader). `node server.js` will start a webpack dev server for each.

### Simple

Shows how to use `i18n`, `I18N`, `Pluralize`, and `Match`.

### Online

This example shows that all of the translation machinery can be run in-browser, and also
provides a playground for message extraction and translation.

### React Intl

Integrates with React Intl for number and date formatting.
