# jsxlate

[![Build Status](https://travis-ci.org/drd/jsxlate.svg)](https://travis-ci.org/drd/jsxlate)

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

### Extracting messages

A script is included that extracts messages from JSX files:

```
$(npm bin)/extract-messages MyComponent.jsx > messages.json
```

You can operate on directories, and specify the output file:

```
$(npm bin)/extract-messages -o messages.json src/
```

You can also merge with an existing file:

```
$(npm bin)/extract-messages -m messages.json -o messages.json src/module/
```


### Bundling translated messages

Once you get your translations back from the translators (as `messages-fr.json`), you can use the `bundle-messages` script to generate a translations bundle:

```
$(npm bin)/bundle-messages -t messages-fr.json -o i18n/bundle-fr.js src/
```

This module exports an object that has translator functions for the corresponding locale.


### Transforming the source

The developer will mark up messages using the function `i18n()` or the component `<I18N/>`. During development, these will simply pass through their input (`i18n`) or children (`<I18N/>`). However, certain transformations must be made in order to translate the messages at runtime.

The preferred method is to use [webpack](http://webpack.github.io) as your bundling tool and [jsxlate-loader](http://github.com/drd/jsxlate-loader) in your loader pipeline. Setup is shown in `examples/simple`.


We also provide `bin/transform` for integration with other build/bundling setups.

Using `bin/transform`:

```
for f in $(find -name '*.js?'); do $(npm bin)/transform < $f > out/$f; done
```


### Discovering untranslated strings

We provide a tool, `bin/jsxlate-lint`, which will do its best to discover strings that should likely be marked for extraction, but which are currently not. It only looks for strings appearing in JSX elements, because there is no simple heuristic for strings appearing in plain JavaScript source. If anyone wants to contribute a data-flow analyzer to see if strings are interpolated into the markup, that contribution would be welcome ;)

Using `bin/jsxlate-lint`:

```
$(npm bin)/jsxlate-lint src/ -I *bundle*.js -I *untranslated/*.js
```


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

Various examples are provided. `node server.js` will start a webpack dev server for each.

### Simple

Shows how to use `i18n`, `I18N`, `Pluralize`, and `Match`.

### Online

This example shows that all of the translation machinery can be run in-browser, and also
provides a playground for message extraction and translation.

### React Intl

Integrates with React Intl for number and date formatting.
