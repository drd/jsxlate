# TODO

- glossary of terms
-- message (unit)
-- marker
-- bundle
- support ICU MessageFormat syntax for:
-- pluralization
-- gender
-- ordinal
- add i18n-comment, i18n-context, i18n-domain supporting attributes
-- and output to .po files
- “translator mode” support
- investigate `i18n-msg` attribute to mark non-`<I18N>` components as message units
- restructuring/splitting of jsx-translator.js
- optimization
-- express transform-loader as a babel plugin?
-- look into ways of not using allKeypathsInAst

# DONE

- rename `i18n-designation` attribute to `i18n-id`
- tests and validation for multiple React components of same type within same marker
-- will require `i18n-id` attributes if multiple
