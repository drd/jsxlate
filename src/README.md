# Implementation notes

This document is intended to discuss, at a high-level, how the pieces of jsxlate
work together from an internal perspective.

## The parts:

- [Extraction](#extraction)
- [Transformation](#transform-plugin)
- [Translation](#translation)

---

## Extraction

The general goal of the extraction plugin is to:

- find marked strings/elements for extraction
- validate the strings/elements
- sanitize elements with unsafe attributes

This is achieved by processing the source through Babel, identifying AST nodes
corresponding to `i18n()` or `<I18N>...</I18N>` and extracting their contents.

### Extracting i18n()

For `i18n()` the process is currently simple: assert that there is exactly one
argument to the function and that it is a `StringLiteral`. All other cases fail.
The single argument will be extracted verbatim.

### Extracting &lt;I18N&gt;

#### Validation

The first step of extraction is to validate the source string. The following
constraints are checked for each message:

- No nesting of `<I18N>` messages is allowed
- Any element with unsafe attributes must have an `i18n-id`
- Multiple `<ReactComponent>`s of the same type must have (distinct) `i18n-id`s
- Only `Identifier` and simple `MemberExpression` nodes are allowed inside
  `JSXExpressionContainer`s

These checks are enforced via a `babel-traverse` path which maintains a context
in order to track all of the names/ids of React Components encountered.

#### Sanitization

By default, the following attributes are whitelisted (tag: [attributes]):

```javascript
whitelistedAttributes: {
    a:   ['href'],
    img: ['alt'],
    '*': ['title', 'placeholder', 'alt', 'summary'],
    'Pluralize': ['on'],
    'Match': ['when'],
},
```

Any attributes for `*` will be merged with attributes for a specific tag or
component. It [should be possible](#extract-todo) to specify these via the
`.babelrc` [plugin options](https://babeljs.io/docs/plugins/#plugin-options),
but this is not yet implemented.

Any attribute not present in the whitelist will be removed.

### Message Output

Finally, `babel-generator` is used on each message AST node after validation
and sanitization. Comments are stripped during this phase. Messages are
collected per source file in `extractFromSource()` and merged across files
in `extractFromPaths()`.

---

## Transform plugin

The transform plugin is intended to be used directly in the babel compilation
chain, unlike the rest of the jsxlate plugins. It is expected to be specified in
the user's `.babelrc`. Its purpose is to identify `<I18N>` components and
transform them into message lookup sites. When authoring with jsxlate,
messages are wrapped in `<I18N>...</I18N>` components, but when executed,
these are actually turned into self-closing `<I18N/>` components, which have
props of `message`, `context`, `arguments`, and `fallback`.

### The transformation process

The transform plugin has a single-node-type visitor which looks only at
`JSXElement` nodes. If the node is an `I18N` component, and one which has children,
yet been transformed, then it will be transformed. (It may not have children if
it is the node that was just transformed -- babel immediately re-visits paths
after they are replaced.)

The transformation process itself consists of a few steps:

- determine the free variables present in the message
- extracting the message
- constructing a fallback renderer
- assembling these into the new `I18N` callsite

#### Determining the free variables

Given the following message:

```js
<I18N>{name} sold me a ${this.props.amount} potato.</I18N>
```

The free variables are `name` and `this`: Their definition is not present within
the message itself, and so must be supplied as arguments to the render function.
The transformed source would be:

```js
<I18N msg="{name} sold me a ${this.props.amount} potato."
      context={this}
      args={[name]}
      fallback={() => <span>{name} sold me a ${this.props.amount} potato.</span>}
      />
```


#### Extracting the message

The extraction is performed as before, with One Weird Trick: because the
extraction process actually mutates the AST by removing sanitized attributes,
it cannot be used on the same AST that is going to be used by the transformation
process. Thus, the code is generated to string and then re-parsed with the
extraction plugin, in a hacky form of immutability :)


#### Constructing a fallback

The fallback is a render function that is unchanged from the original source,
and is what is generally used in the original language deployment. (Note: it
is possible to translate the original-language strings by adding bundled
messages to that language, but it is not recommended.)

There are 2 steps to construct the fallback:

- change the container element to a `<span>`
- strip all i18n-ids, either in namespace or attribute form.

The first is accomplished with direct AST manipulation, and the 2nd is
performed using `babel-traverse` with a visitor that calls `stripI18nId` on
each `JSXElement` node.


#### Assembling the new &lt;I18N&gt; callsite

The final step is to take all these pieces and glue them together. This is
accomplished using the excellent `babel-template` library. `babel-template`
allows you to interpolate AST variables into a string template, saving a bunch
of time and boilerplate. From `transformation.js`, here is how it is used:

```
const transformElementMarker = template(`
    <I18N message={MESSAGE} context={this} args={ARGS} fallback={function() { return FALLBACK; }}/>
`, {plugins: ['jsx']});
```

This creates a function named `transformElementMarker` which will accept an
object parameter containing the keys `MESSAGE`, `ARGS`, and `FALLBACK`. Each of
the corresponding values will be interpolated into the AST of the parsed
template. (See the git history of `src/transform.js` to see the full glory of
the pre-`babel-template` version).

---

## Translation

The goal of the translation process is to construct a bundle of functions, keyed
on the extracted messages of the source code, which will render that message in
a given language.
