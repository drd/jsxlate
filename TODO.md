# TODO

- glossary of terms
-- message (unit)
-- marker
-- bundle
- rename `i18n-designation` attribute to `i18n-id`
- tests and validation for multiple React components of same type within same marker
-- will require `i18n-id` attributes if multiple
- investigate `i18n-msg` attribute to mark non-`<I18N>` components as message units
- “translator mode” support
- restructuring/splitting of jsx-translator.js
- optimization
-- express transform-loader as a babel plugin?
-- look into ways of not using allKeypathsInAst
