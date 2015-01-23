# JSX Translator

This program aids in internationalizing React applications by extracting messages from JSX sources and then rewriting the sources with translated messages. The advantage of this approach is that translators can be shown full sentences, rich in context.

Translators are presented with a sanitized version of JSX that allows them to rearrange markup but prevents them from seeing anything irrelevant or modifying anything dangerous. The develop can allow translators to change certain HTML tag attributes, if, for example, links needs to be changed to point to language-specific resources. Translators can also change add or remove simple HTML tags in case, for instance, a single italicized phrase in the source language becomes two italicized phrases in the destination language.

## Messages

Messages take one of two forms: string literals or JSX elements. 

1. String messages are marked with a specially-named identity function: `i18n(“Hello!”)`
2. JSX messages are marked with a specially-named React component: `<I18N>Hello, <em>world!</em></I18N>`

## Extracting messages

A script is included that extracts messages from JSX files:

```
bin/extract MyComponent.jsx > messages.json
```

The resulting JSON file can be merged with existing translations using the [json](http://trentm.com/json/) utility, and then given to translators using a tool such as Transifex. 

## Translating JSX sources

Once you get your translations back from the translators, you can use the second included script to translate your sources:

```
bin/translate -t messages.json < MyComponent.jsx > fr/MyComponent.jsx
```

## Sanitizing and reconstituting JSX messages

We sanitize two aspects of JSX messages: JavaScript expressions, and attributes.

In order to make sure that messages are friendly for translators, only variables and properties are allowed in JavaScript expressions:

```
<I18N>My name is {name}</I18N>
<I18N>My favorite color is {favorites.color}</I18N>
```

Now, attributes that aren't relevant to translators are removed. But when we remove attributes, we need to know where to put them back. Since translators can add and remove tags, we must give a special *designation* to the tag whose attributes were removed:

```
<I18N><a:_my-link_ href="example.com" target="_blank">Example</a:_my-link_></I18N>
```

This produces the following extracted message:

```
<a:my-link href="example.com">Example</a:my-link>
```

Note that `target="_blank"` is missing. Now the translator can rearrange at will:

```
<i>Cliquez sur-moi: <a:my-link href="example.fr">Exemple</a:my-link></i>
```

When we translate the sources using this translation, we get the get the following:

```
<I18N><i>Cliquez sur-moi: <a href="example.fr" target="_blank">Exemple</a></i>
```

There is an alternative syntax if you want your untranslated sources to be
executable, since the syntax used above would interfere with that. You can say:

```
<a i18n-designation="foo"></a>
```

And this will be shown to translators as:

```
<a:foo></a:foo>
```

