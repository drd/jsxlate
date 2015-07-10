# TODO

- turn this into issues
- documentation
-- HOWTO
--- mark messages
--- extract messages
--- (example of transifex?)
--- create bundles
--- transform the source
-- syntax of messages
--- show examples of valid/invalid messages
-- integrate with React Intl
- configuration
-- for e.g. translator-accessible attributes
-- change name of marker function/component
- support ICU MessageFormat syntax for:
-- pluralization
--- syntax validation
----- Pluralize contains Match
----- all necessary forms are present
--- extraction
-- gender
-- ordinal
- add tagName prop to <I18N> component to handle tricky situations like <option>
- add i18n-comment, i18n-context, i18n-domain supporting attributes
-- and output to .po files
- “translator mode” support
- investigate `i18n-msg` attribute to mark non-`<I18N>` components as message units
- restructuring/splitting of jsx-translator.js
-- clean up exports
- optimization
-- express transform-loader as a babel plugin?
-- look into ways of not using allKeypathsInAst
- prevent collisions between source/react child strings by bucketing messages


# DONE

- pluralization
-- <Pluralize> / <Match> shown to translators, no ICU MessageFormat
- rename `i18n-designation` attribute to `i18n-id`
- tests and validation for multiple React components of same type within same marker
-- will require `i18n-id` attributes if multiple
- documentation
-- glossary of terms
--- message (unit)
--- marker
--- bundle
