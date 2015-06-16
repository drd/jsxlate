# jsxlate

## goals

- power
- happiness


## power

### to the translators

- translators can
-- add additional tags when necessary
-- rearrange and nest/de-nest existing tags
-- alter whitelisted attributes on tags

### to the developers

- developers can
-- build their app the way they want
-- get live feedback from translations (example with webpack/hmr)


## happiness

### for the translators

- translators get
-- intelligible units of text
-- sufficient context to do their job well

### for the developers

- developers get
-- a nice and simple set of tools to internationalize their app
-- to write their app without worrying (too much!) about i18n


## how it works

- mark the messages
- extract messages & send to translators
- create localized bundles of messages
- supply a locale & messages to the app
- transform the app source

### mark up the messages

- i18n() and <I18N/>
- <Plural><Match>..</Match></Plural>

### extract messages and give to translators

- `$ node_modules/.bin/extract-messages $(find src/ -name '*.js?') > messages.json`
- send messages to e.g. transifex

### create localized bundles of messages

- `$ node_modules/.bin/bundle-messages -t translations-es.json $(find src/ -name '*.js?') > bundle-es.js`
- `$ node_modules/.bin/bundle-messages -t translations-fr.json $(find src/ -name '*.js?') > bundle-fr.js`

### supply a locale and messages

- `let locale = require('./i18n/bundle-' + locale);`
- use `componentWillMount`, `setMessages`, `setLocale`

### use `transform` or `transform-loader`

- the call sites of `i18n()` and `<I18N>` must be transformed to hook into the translations
- show webpack config
- show terminal usage


## competitive survey

- react-intl & format.js
-- built by Yahoo
-- supports ICU MessageFormat
-- expects synthetic keys
-- no automated extraction of messages
--- requires separate json structure
--- obscures the text to be shown, and any dependencies the text has

- react-translate-component
-- has nested/explicit locales
-- also lacks extraction of messages

- jsx-i18n
-- khan academy
-- simple wrapper around babel
-- does support extraction
-- does not support messages that contain nested tags

- react-i18n
-- works with Rails, i18n-js
-- nonexistant documentation

- any other known tools for react i18n?


## Work to be done

- integration with react-intl/format-js for ICU messageformat
-- pluralization/ordinalization, gender
-- extract messageformat syntax from related React tags
-- [ example ]

- speed!
-- express transform-loader as a babel plugin?
-- many optimizations possible throughout the codebase
-- ugh, seriously, node profiling tools :(

- more examples
-- gulp/grunt
-- browserify
-- react native

- flexible syntax/attribute support

- locale fallback for messages:
-- if request a message for en-GB, try en

- online translator support
-- probably a different package
-- would allow on-the-fly translation with hooks to integrate into your app


## thanks

- Dave McCabe
- Format.js / React-Intl
- Idealist
