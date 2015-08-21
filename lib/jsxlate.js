'use strict';

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _Object$entries = require('babel-runtime/core-js/object/entries')['default'];

/*****************************************************************************
This program extracts translateable messages from JSX files,
sanitizes them for showing to translators, reconstitutes the sanitized
translations based on the original input, and generates translation bundles
with the messages replaced with translated ones. Messages can be
not just strings but JSX elements.

Most of the code here is functions on ASTs, which may be of a whole program
or only a single expression. Some of the functions only operate on ASTs
representing particular kinds of expressions, while others work on any AST.
The AST format is documented here:
https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Parser_API
The JSX extensions are documented here:
https://github.com/facebook/jsx/blob/master/AST.md

There are two forms of messages: string literals and JSX elements.
String literals are marked with a special identity function:
    i18n("Hello, world!")
JSX elements are marked with a special React component:
    <I18N>Hello, <em>world!</em></I18N>

Outline:

* Extracting
    - Validating
    - Sanitizing
* Transforming
    - Free variables
* Translating
    - Validating
    - Reconstituting
* Finding definitions of named expressions
* Finding nodes
* Printing and unprinting

*****************************************************************************/

/*
NOTES:

assertion:
Ensure can't go from self-closing to not or vice-versa in translation.
Ensure no tag with id has member expression for tag name.

TODO:
- Bail out if the translation has non-safe attributes; refactor attribute functions.
- spread attribute
- Various heuristics for omitting i18n-id.
    + Only one React Component of a type
- strip leading whitespace? -- rules appear complicated
- Disallow <script>, dangerouslySetInnerHTML, etc.
*/

var _componentsJsx = require('./components.jsx');

Error.stackTraceLimit = Infinity;

try {
    var babel = require('babel');
} catch (e) {
    var babel = require('babel-core/browser');
}
//require('babel/polyfill');
var escodegen = require('escodegen-wallaby');
var I = require('immutable');

/*
    These attributes are shown to translators and may be inserted
    and modified by translators:
*/
var allowedAttributesByElementName = {
    'a': ['href'],
    'Pluralize': ['on'],
    'Match': ['when']
};

/*****************************************************************************

    Extracting messages.

    To extract messages, we find each message marker in the source and then
    pass it through three stages:

    1) Validation -- ensuring the message is valid
    2) Sanitization -- removing things the translator shouldn't see
    3) Printing -- converting the AST to a final string

*****************************************************************************/

/*
    Given a source code string, return an array of message strings.
*/
module.exports.extractMessages = function (src) {
    var ast = parse(src);
    return keypathsForMessageNodesInAst(ast).map(function (keypath) {
        return ast.getIn(keypath);
    }).map(function (message) {
        try {
            return extractMessage(message);
        } catch (e) {
            throw e.set ? e.set('messageAst', message) : e;
        }
    }).toJS();
};

/*
    Given the AST of a message marker, return a message string.
*/
function extractMessage(ast) {
    return printMessage(sanitize(validateMessage(ast)));
}
module.exports._extractMessage = extractMessage;

function escape(str) {
    return str.replace(/\n/g, '\\n').replace(/"/g, '\\"');
}

/*****************************************************************************
    Validating messages during extraction
*****************************************************************************/

function validateMessage(ast) {
    var _ = (({
        'CallExpression': validateCallExpression,
        'JSXElement': validateJsxElement,
        'JSXExpressionContainer': validateJsxExpressionContainer
    })[ast.get('type')] || identity)(ast);
    return ast;
}

function validateCallExpression(ast) {
    // The only valid call expression is the outer message marker:
    if (!isStringMarker(ast)) {
        throw new Error('Internal error: tried to sanitize call expression: ' + generate(ast));
    }
}

function validateJsxElement(ast) {
    // Throws if definitions are duplicated:
    namedExpressionDefinitions(ast);

    // Throws if component type/id is duplicated
    reactComponentsByNameAndId(ast);

    if (hasUnsafeAttributes(ast) && !elementId(ast) && !isReactComponent(ast)) {
        throw new InputError('Element needs a id: ' + generateOpening(ast));
    }

    // Disallow direct nesting of message marker tags:
    if (isElementMarker(ast) && ast.get('children').some(isElementMarker)) {
        throw new InputError('Message has nested <I18N> tags: ' + generate(ast));
    }

    ast.get('children').forEach(validateMessage);
}

function validateJsxExpressionContainer(ast) {
    if (!isValidExpressionContainer(ast)) {
        throw new InputError('Message contains a non-named expression: ' + generate(ast));
    }
}

/****************************************************************************
    Sanitizing messages during extraction.
    Sanitization makes a message presentable for translators. Currently,
    that means removing unsafe attributes, and making sure element ids
    are written with the namespace syntax and not the attribute syntax.
*****************************************************************************/

function sanitize(ast) {
    return (({
        'JSXElement': sanitizeJsxElement
    })[ast.get('type')] || identity)(ast);
}

function sanitizeJsxElement(ast) {
    return withSafeAttributesOnly(rewriteIdToNamespaceSyntax(ast)).update('children', function (children) {
        return children.map(sanitize);
    });
}

function withSafeAttributesOnly(jsxElementAst) {
    var name = elementName(jsxElementAst);
    return updateAttributes(jsxElementAst, function (attributes) {
        return attributes.filter(function (a) {
            return attributeIsSafe(name, a);
        });
    });
}

function rewriteIdToNamespaceSyntax(jsxElementAst) {
    var name = elementName(jsxElementAst);
    var id = attributeWithName(jsxElementAst, 'i18n-id');
    if (id) {
        var withNamespace = setJsxElementName(jsxElementAst, makeNamespaceAst(name, id));
        return removeAttributeWithName(withNamespace, 'i18n-id');
    } else {
        return jsxElementAst;
    }
}

/****************************************************************************
    Linting strings
    Find strings in files that likely should be marked for translation but
    which are not currently wrapped in <I18N> tags.
    Currently this includes any literal child of a JSX element, or any
    JSX attribute which has been whitelisted for translators.
*****************************************************************************/

function allPrefixes(list) {
    return list.butLast().reduce(function (prefixes, entry) {
        return prefixes.push(prefixes.last().push(entry));
    }, I.fromJS([[]]));
}

function hasMarkerAncestor(path, ast) {
    return allPrefixes(path).reverse().some(function (p) {
        return isElementMarker(ast.getIn(p));
    });
}

function hasElementAncestor(path, ast) {
    return allPrefixes(path).reverse().some(function (p) {
        return isJsxElement(ast.getIn(p));
    });
}

function isImmediateChild(path, ast) {
    // path is of the form [..., 'children', <index>, <node> ]
    return path.get(-2) === 'children';
}

function isValueOfSafeAttribute(path, ast) {
    if (path.size < 4) {
        return false;
    }

    // path = [ ..., element, openingElement, attributes, index, node, literal]
    var prefixes = allPrefixes(path);
    var elementAst = ast.getIn(prefixes.get(-4));
    if (!isElement(elementAst)) {
        return false;
    }

    var attributeAst = ast.getIn(prefixes.get(-1));
    var name = elementName(elementAst);
    return attributeIsSafe(name, attributeAst);
}

function isInterestingString(path, ast) {
    return isImmediateChild(path, ast) || isValueOfSafeAttribute(path, ast);
}

module.exports.findUntranslatedStrings = function findUntranslatedStrings(src) {
    var ast = parse(src);
    return allKeypathsInAst(ast).filter(function (path) {
        return isNonWhitespaceStringLiteral(ast.getIn(path));
    }).filter(function (path) {
        return isInterestingString(path, ast);
    }).filter(function (path) {
        return hasElementAncestor(path, ast);
    }).filterNot(function (path) {
        return hasMarkerAncestor(path, ast);
    }).map(function (path) {
        return ast.getIn(path);
    });
};

/****************************************************************************

    Message node transformation

    This is the process of converting a message node in the source file
    to a message node capable of retrieving the correct translation for its
    message. It is used by jsxlate-loader.

    To wit,
    render() {
        var name = this.props.user.firstName;
        return <div><I18N>Hello, {name}, you handsome devil!</I18N></div>;
    }

    is transformed to (with whitespace reformatted):
    render() {
        var name = this.props.user.firstName;
        return <div>
            <I18N message="Hello, {name}, you handsome devil"
                  context={this}
                  args={[name]}
                  fallback={() => <I18N>Hello, {name}, you handsome devil!</I18N>}
                  />
        </div>;
    }

    The I18N component looks up the translation for the current
    locale, and if that is not available, still renders the original (fallback).

****************************************************************************/

function transformMessageNode(ast) {
    var message = extractMessage(ast);
    var escapedMessage = escape(message);
    if (isElementMarker(ast)) {
        var freeVariables = freeVariablesInMessageAst(ast).toJS().join(', ');
        var fallbackSpan = ast.setIn(['openingElement', 'name', 'name'], 'span').setIn(['closingElement', 'name', 'name'], 'span');
        var keypaths = allKeypathsInAst(fallbackSpan);
        fallbackSpan = keypaths.reduce(function (ast, keypath) {
            var node = fallbackSpan.getIn(keypath);
            if (isElement(node)) {
                ast = ast.updateIn(keypath, function () {
                    return removeId(node);
                });
            }
            return ast;
        }, fallbackSpan);
        var fallback = 'function() { return ' + generate(fallbackSpan) + '; }';
        return '<I18N message={"' + escapedMessage + '"} context={this} args={[' + freeVariables + ']} fallback={' + fallback + '}/>';
    } else {
        return 'i18n(\'' + message.replace(/'/g, '\\\'') + '\')';
    }
}
module.exports._transformMessageNode = transformMessageNode;

module.exports.transformMessageNodes = function transformMessageNodes(src) {
    function transform(ast, keypath) {
        var message = ast.getIn(keypath);
        return ast.setIn(keypath, parseExpression(transformMessageNode(message)));
    }

    var ast = parse(src);
    var keypaths = keypathsForMessageNodesInAst(ast);
    return generate(keypaths.reduceRight(transform, ast));
};

/****************************************************************************

    Free variables

    It is necessary to find all free variables in the message node, because
    the bundle modules can not have the same lexical closure without them
    being passed in.

*****************************************************************************/

function variableNameForReactComponent(componentAst) {
    return ({
        'JSXMemberExpression': variableNameForMemberExpression,
        'JSXNamespacedName': variableNameForNamespacedName,
        'JSXIdentifier': variableNameForIdentifier
    })[componentAst.getIn(['openingElement', 'name', 'type'])](componentAst.getIn(['openingElement', 'name']));
}

function variableNameForIdentifier(identifierAst) {
    return identifierAst.get('name');
}

function variableNameForNamespacedName(namespacedNameAst) {
    return namespacedNameAst.getIn(['namespace', 'name']);
}

function variableNameForMemberExpression(memberExpressionAst) {
    var node = memberExpressionAst;
    while (!(isIdentifierOrJSXIdentifier(node) || isThisExpression(node))) {
        node = node.get('object');
    }
    // if a node is an Identifier or JSXIdentifier will always have a name
    // so assume it is a thisExpression elsewise and return undefined, which
    // will be omitted.
    return node.get('name');
}

function variableNameForCallExpression(callExpressionAst) {
    return callExpressionAst.getIn(['callee', 'name']);
}

function variableNameForSubExpression(subExpressionAst) {
    return (({
        'Identifier': variableNameForIdentifier,
        'MemberExpression': variableNameForMemberExpression,
        'CallExpression': variableNameForCallExpression,
        'BinaryExpression': variableNamesForBinaryExpression
    })[subExpressionAst.get('type')] || empty)(subExpressionAst);
}

function variableNamesForBinaryExpression(binaryExpressionAst) {
    return I.List([variableNameForSubExpression(binaryExpressionAst.get('left')), variableNameForSubExpression(binaryExpressionAst.get('right'))]);
}

function variableNamesForObjectExpression(objectExpressionAst) {
    var valueNames = objectExpressionAst.get('properties').map(function (p) {
        return variableNameForSubExpression(p.get('value'));
    });
    var keyNames = objectExpressionAst.get('properties').map(function (p) {
        return p.get('computed') && variableNameForSubExpression(p.get('key'));
    });
    return valueNames.concat(keyNames);
}

function variableNameForJsxExpressionContainer(expressionContainerAst) {
    var expressionAst = expressionContainerAst.get('expression');
    return (({
        'Identifier': variableNameForIdentifier,
        'MemberExpression': variableNameForMemberExpression,
        'CallExpression': variableNameForCallExpression,
        'BinaryExpression': variableNamesForBinaryExpression,
        'ObjectExpression': variableNamesForObjectExpression
    })[expressionAst.get('type')] || empty)(expressionAst);
}

function variableNameForNode(nodeAst) {
    return ({
        'JSXElement': variableNameForReactComponent,
        'JSXExpressionContainer': variableNameForJsxExpressionContainer
    })[nodeAst.get('type')](nodeAst);
}

function freeVariablesInMessageAst(messageAst) {
    var keypaths = keypathsForFreeVariablesInAst(messageAst);
    return keypaths.map(function (keypath) {
        return variableNameForNode(messageAst.getIn(keypath));
    }).flatten().filter(identity).toSet();
}
module.exports.freeVariablesInMessageAst = freeVariablesInMessageAst;

/*****************************************************************************

    Translating sources with a translations dictionary.

    We again find all the message markers in the source.

    To translate a message, we first extract it and look up that extraction
    in the translations dictionary. Having found the transation, we:

    1) Unprint and parse it
    2) Validate it to make sure the translator hasn't done something naughty
    3) Reconstitute what was removed when sanitizing during extraction

    Translation may produce either a bundle of translated messages to be
    looked up by the <I18N> component (translateMessagesToBundle), or emit
    an entirely translated JSX file (translateMessages).

*****************************************************************************/

/*
    Given a source code string and a translations dictionary,
    return a mapping of messages to translation functions.
*/

module.exports.translateMessagesToBundle = function (src, translations) {
    var bundle = I.Map();

    function substitute(bundle, keypath) {
        try {
            var messageAst = ast.getIn(keypath);
            var translationString = findTranslation(messageAst, translations);
            return bundle.set(extractMessage(messageAst), translatedRendererForMessage(messageAst, translationString));
        } catch (e) {
            throw e.set ? e.set('messageAst', messageAst).set('translationString', translationString) : e;
        }
    }

    var ast = parse(src);
    var keypaths = keypathsForMessageNodesInAst(ast);
    return keypaths.reduceRight(substitute, bundle).toJS();
};

/*
    Given a source code string and a translations dictionary,
    return the source code as a string with the messages translated.
*/

module.exports.translateMessages = function (src, translations) {
    // Substitute at a single keypath based on translations:
    function substitute(ast, keypath) {
        try {
            var message = ast.getIn(keypath);
            var translationString = findTranslation(message, translations);
            return ast.setIn(keypath, translateMessage(message, translationString));
        } catch (e) {
            throw e.set ? e.set('messageAst', message).set('translationString', translationString) : e;
        }
    }

    // Note that the message is pulled from the partially reduced AST; in this
    // way, already-translated inner messages are used when processing outer
    // messages, so they don't get clobbered.

    // Perform this substitution for all message keypaths, starting
    // at the bottom of the document, and processing inner nested messages
    // before outer messages. This ensures that no operation will invalidate
    // the keypath of another operation, either by changing array indices
    // or relocating an inner message within an outer one:
    var ast = parse(src);
    var keypaths = keypathsForMessageNodesInAst(ast);
    return generate(keypaths.reduceRight(substitute, ast));
};

/*
    Given a message AST and translation string,
    return a translated message AST.
*/
function translateMessage(message, translationString) {
    var translation = parseExpression(unprintTranslation(translationString, message));
    return validateTranslation(reconstitute(translation, message), message);
}

/*
    Given a message AST and translation string,
    return a function that will emit translated DOM.
*/
function translatedRendererForMessage(message, translationString) {
    var renderExpression;
    var unprinted = unprintTranslation(translationString, message);
    if (isStringMarker(message)) {
        renderExpression = unprinted;
    } else {
        try {
            var translation = parseExpression(unprinted);
        } catch (e) {
            throw InputError('Invalid translation: ' + JSON.stringify(translationString));
        }
        var reconstituted = validateTranslation(reconstitute(translation, message), message);
        var reconstitutedAsSpan = reconstituted.setIn(['openingElement', 'name', 'name'], 'span').setIn(['closingElement', 'name', 'name'], 'span');
        var renderExpression = generate(reconstitutedAsSpan);
    }
    var freeVariables = freeVariablesInMessageAst(message);
    var wrapped = 'function(' + freeVariables.join(', ') + ') { return ' + renderExpression + '; }';
    return wrapped;
}
module.exports.translatedRendererForMessage = translatedRendererForMessage;

/*
    Given a message AST and dictionary, return the translation string.
*/
function findTranslation(messageAst, translations) {
    var translation = translations[extractMessage(messageAst)];
    if (!translation) {
        throw new InputError('Translation missing for:\n' + extractMessage(messageAst));
    }
    return translation;
}

/*****************************************************************************
    Validating translations
*****************************************************************************/

function validateTranslation(translation, original) {
    if (!I.is(countOfReactComponentsByName(translation), countOfReactComponentsByName(original))) {
        throw new InputError('The translation has a different set of React components than the original.');
    }
    if (!I.is(countOfNamedExpressionsByName(translation), countOfNamedExpressionsByName(original))) {
        throw new InputError('The translation has a different set of expressions than the original.');
    }

    return translation;
}

function countOfReactComponentsByName(ast) {
    var names = allKeypathsInAst(ast).map(function (keypath) {
        return ast.getIn(keypath);
    }).filter(isReactComponent).map(elementName);
    return countOfItemsByItem(names);
}

function countOfReactComponentsByNameAndId(ast) {
    var namesAndIds = allKeypathsInAst(ast).map(function (keypath) {
        return ast.getIn(keypath);
    }).filter(isReactComponent).map(elementNameAndId);
    return countOfItemsByItem(namesAndIds);
}

function countOfNamedExpressionsByName(ast) {
    var names = allKeypathsInAst(ast).map(function (keypath) {
        return ast.getIn(keypath);
    }).filter(isValidExpressionContainer).map(function (ast) {
        return ast.get('expression');
    }).map(generate);
    return countOfItemsByItem(names);
}

/****************************************************************************
    Reconstituting.
    Reconstituting is the process of putting back what was taken away during
    sanitization. The process starts with the translator's translation and
    pulls out details from the original; thus, the translator's version
    determines the structure of the markup, while the original only
    determines the values of elided attributes.
*****************************************************************************/

function reconstitute(translatedAst, originalAst) {
    return _reconstitute(translatedAst, namedExpressionDefinitions(originalAst));
}

function _reconstitute(translatedAst, definitions) {
    return (({
        'JSXElement': reconstituteJsxElement,
        'JSXExpressionContainer': reconstituteJsxExpressionContainer
    })[translatedAst.get('type')] || identity)(translatedAst, definitions);
}

function reconstituteJsxElement(translatedAst, definitions) {
    if (hasUnsafeAttributes(translatedAst)) {
        throw new InputError('Translation includes unsafe attribute: ' + generateOpening(translatedAst));
    }
    var result;
    var id = elementId(translatedAst);
    if (id) {
        var originalAttributes = definitions.get(id);
        if (!originalAttributes) {
            throw new InputError('Translation contains id \'' + id + '\', which is not in the original.');
        }

        result = updateAttributes(translatedAst, function (translationAttributes) {
            return attributesFromMap(attributeMap(originalAttributes).merge(attributeMap(translationAttributes)));
        });

        result = removeId(result);
    } else {
        result = translatedAst;
    }

    return result.update('children', function (children) {
        return children.map(function (child) {
            return _reconstitute(child, definitions);
        });
    });
}

function reconstituteJsxExpressionContainer(translatedAst, definitions) {
    if (!isValidExpressionContainer(translatedAst)) throw new InputError('Translation has an expression that isn\'t just an identifier or member expression: ' + generate(translatedAst));
    var definition = definitions.get(generate(translatedAst.get('expression')));
    if (!definition) throw new InputError('Translated message has a JSX expression whose name doesn\'t exist in the original: ' + generate(translatedAst));
    return translatedAst.set('expression', definition);
}

/****************************************************************************
    Finding definitions of expressions
*****************************************************************************/

function namedExpressionDefinitions(ast) {
    var listOfPairs = _namedExpressionDefinitions(ast);
    var names = listOfPairs.map(function (p) {
        return p.first();
    });
    var dupes = duplicatedValues(names.filter(identity));
    if (!dupes.isEmpty()) {
        throw new InputError('Message has two named expressions with the same name: ' + dupes.join(', '));
    } else {
        return I.Map(listOfPairs.map(function (x) {
            return x.toArray();
        }));
    }
}

function _namedExpressionDefinitions(ast) {
    return (({
        'JSXElement': namedExpressionDefinitionsInJsxElement,
        'JSXExpressionContainer': namedExpressionDefinitionsInJsxExpressionContainer
    })[ast.get('type')] || function () {
        return I.List();
    })(ast);
}

function namedExpressionDefinitionsInJsxElement(ast) {
    var hiddenAttributes = attributes(ast).filterNot(function (attrib) {
        return attributeIsSafe(elementName(ast), attrib);
    });
    var id = elementId(ast);
    var attributeDefinition = I.List([I.List([id, hiddenAttributes])]);

    return attributeDefinition.concat(ast.get('children').flatMap(_namedExpressionDefinitions));
}

function namedExpressionDefinitionsInJsxExpressionContainer(ast) {
    if (isValidExpressionContainer(ast)) {
        var definition = nameAndExpressionForNamedExpression(ast.get('expression'));
        return I.fromJS([definition]);
    } else {
        return I.List();
    }
}

function nameAndExpressionForNamedExpression(ast) {
    return [generate(ast), ast];
}

function reactComponentsByNameAndId(ast) {
    var invalidComponents = I.Map(countOfReactComponentsByNameAndId(ast)).filter(function (v, k) {
        return v > 1;
    })
    // Exclude Format components
    // TODO: a more sane way of handling this
    .filter(function (v, k) {
        return _componentsJsx.Format.indexOf(k.split(':')[0]) === -1;
    }).map(function (v, k) {
        var _k$split = k.split(':');

        var _k$split2 = _slicedToArray(_k$split, 2);

        var type = _k$split2[0];
        var id = _k$split2[1];

        if (id === undefined) {
            return v + ' instances of ' + type + ' without an id';
        } else {
            return v + ' instances of ' + type + ' with the id "' + id + '"';
        }
    });
    if (invalidComponents.count()) {
        throw new InputError('There are ' + invalidComponents.join(', ') + ': ' + generate(ast));
    }
}

/****************************************************************************
    Finding nodes
*****************************************************************************/

function matches(ast, pattern) {
    if (I.Map.isMap(ast) && I.Map.isMap(pattern)) {
        return pattern.every(function (v, k) {
            return matches(ast.get(k), v);
        });
    } else if (isFunction(pattern)) {
        return pattern(ast);
    } else {
        return I.is(pattern, ast);
    }
}

function matcher(pattern) {
    var Ipattern = I.fromJS(pattern);
    return function (value) {
        return matches(value, Ipattern);
    };
}

var isStringMarker = matcher({
    type: 'CallExpression',
    callee: {
        type: 'Identifier',
        name: 'i18n'
    }
});

var isElementMarker = matcher({
    type: 'JSXElement',
    openingElement: {
        type: 'JSXOpeningElement',
        selfClosing: false,
        name: {
            type: 'JSXIdentifier',
            name: 'I18N'
        }
    }
});

function isMarker(ast) {
    return isStringMarker(ast) || isElementMarker(ast);
}

var isStringLiteral = matcher({
    type: 'Literal',
    value: isString
});

var isNonWhitespaceStringLiteral = matcher({
    type: 'Literal',
    value: function value(s) {
        return isString(s) && !/^\s+$/m.test(s);
    }
});

var isJsxExpressionContainer = matcher({
    type: 'JSXExpressionContainer'
});

var isJsxElement = matcher({
    type: 'JSXElement'
});

var isIdentifier = matcher({
    type: 'Identifier'
});

var isSimpleMemberExpression = matcher({
    type: 'MemberExpression',
    computed: false,
    object: function object(ast) {
        return isIdentifier(ast) || isThisExpression(ast) || isSimpleMemberExpression(ast);
    },
    property: isIdentifier
});

function isValidExpressionContainer(ast) {
    if (!isJsxExpressionContainer(ast)) return false;
    var expression = ast.get('expression');
    return isIdentifier(expression) || isSimpleMemberExpression(expression);
}

var isElement = matcher({
    type: 'JSXElement'
});

function isIdentifierOrJSXIdentifier(ast) {
    return I.Set(['Identifier', 'JSXIdentifier']).contains(ast.get('type'));
}

function isThisExpression(ast) {
    return ast.get('type') === 'ThisExpression';
}

function isReactComponent(ast) {
    return isElement(ast) && !isTag(ast);
}

function isObjectExpression(ast) {
    return ast.get('type') === 'ObjectExpression';
}

function isFreeVariable(ast) {
    return isReactComponent(ast) || isJsxExpressionContainer(ast);
}

/*
    Return true if the given element is an html tag rather than a React component.
    The rule is taken from https://github.com/facebook/react/blob/e8e79472aabcbcaa70ad8cd901722cad2dbbd709/vendor/fbtransform/transforms/react.js
*/
function isTag(ast) {
    return isElement(ast) && /^[a-z]|\-/.test(elementName(ast));
}

function allKeypathsInAst(ast) {
    var keypaths = [];
    function f(node, keypath) {
        node.forEach(function (child, key) {
            var childKeypath = keypath.concat([key]);
            keypaths.push(childKeypath);
            if (child && child.forEach) {
                f(child, childKeypath);
            }
        });
    }
    f(ast, []);
    return I.fromJS(keypaths);
}

/*
    Return the keypath for each free variable in the given ast.
*/
function keypathsForFreeVariablesInAst(ast) {
    var keypaths = allKeypathsInAst(ast).filter(function (keypath) {
        return isFreeVariable(ast.getIn(keypath));
    });
    return keypaths;
}

/*
    Return the keypath for each message in the given ast,
    and (important) return them with ancestors coming before descendents
    and earlier messages in the source coming before later messages.
*/
function keypathsForMessageNodesInAst(ast) {
    var keypaths = allKeypathsInAst(ast).filter(function (keypath) {
        return isMarker(ast.getIn(keypath));
    });

    // Validate arguments of string markers:
    keypaths.forEach(function (keypath) {
        var messageMarker = ast.getIn(keypath);
        if (isStringMarker(messageMarker)) {
            if (messageMarker.get('arguments').size !== 1) {
                throw new InputError('Message marker must have exactly one argument: ' + generate(messageMarker));
            }
            if (!isStringLiteral(messageMarker.getIn(['arguments', 0]))) {
                throw new InputError('Message should be a string literal, but was instead: ' + generate(messageMarker));
            }
        }
    });

    return keypaths;
}
module.exports._keypathsForMessageNodesInAst = keypathsForMessageNodesInAst;

/****************************************************************************

    Printing and unprinting.

    Most of the process works on ASTs, but we need to turn those ASTs into
    strings to show the translator, and parse the translation back into an
    AST. However, the strings we want to show the translator are not exactly
    the generated code of any single AST node, so we have to do a small extra
    step when generating and parsing.

    For string messages, we want to show them unquoted, and so we must also requote
    them before parsing.

    For JSX messages, we don't want to show the outer <I18N> tag, so we generate
    each of the message's children and concatenate them. During parsing, we
    surround the string with <I18N> tags and then parse it.

*****************************************************************************/

function printMessage(ast) {
    if (isStringMarker(ast)) {
        return ast.getIn(['arguments', 0, 'value']);
    } else if (isElementMarker(ast)) {
        return ast.get('children').map(printJsxChild).join('').trim();
    } else {
        throw new Error('Internal error: message is not string literal or JSX element: ' + generate(ast));
    }
}

function printJsxChild(ast) {
    if (isStringLiteral(ast)) {
        return ast.get('value');
    } else {
        return generate(ast);
    }
}

function unprintTranslation(translationString, originalAst) {
    if (isStringMarker(originalAst)) {
        return JSON.stringify(translationString);
    } else if (isElementMarker(originalAst)) {
        return '<I18N>' + translationString + '</I18N>';
    } else {
        throw new Error('Internal error: message is not string literal or JSX element: ' + generate(ast));
    }
}

/*****************************************************************************

    Error handling.

    We define a type, InputError, for errors in the JSX sources or in the
    translations. These errors are given friendly error messages and are
    printed without stack traces. The top-level extraction and transation
    functions assign to InputErrors extra properties showing the message
    and translation which caused the error.

*****************************************************************************/

function InputError(description) {
    return I.Map({
        isInputError: true,
        description: description
    });
}

function isInputError(e) {
    return I.Map.isMap(e) && e.get('isInputError');
}

/*
    If the given error represents an error in the inputted JSX files or
    translations, then return a user-friendly error message without
    a stack trace. If it is any other kind of error, return the basic
    error message and stack trace.
*/
module.exports.errorMessageForError = function errorMessageForError(e) {
    if (isInputError(e) && e.get('messageAst') && e.get('translationString')) {
        var ast = e.get('messageAst');
        return '\nOn line ' + ast.getIn(['loc', 'start', 'line']) + ', when processing the message... \n\n' + generate(ast) + '\n\n' + '...and its associated translation... \n\n' + e.get('translationString') + '\n\n' + '...the following error occured: \n\n' + e.get('description') + '\n';
    } else if (isInputError(e) && e.get('messageAst')) {
        var ast = e.get('messageAst');
        return '\nOn line ' + ast.getIn(['loc', 'start', 'line']) + ', when processing the message... \n\n' + generate(ast) + '\n\n' + '...the following error occured: \n\n' + e.get('description') + '\n';
    } else if (isInputError(e)) {
        return e.get('description') + '\n';
    } else {
        return e.stack;
    }
};

/****************************************************************************
    Utilities
*****************************************************************************/

function identity(x) {
    return x;
}

function empty(x) {
    return undefined;
}

function isFunction(thing) {
    return typeof thing == 'function' || false;
}

function isString(thing) {
    return typeof thing == 'string' || false;
}

// I.List([a, b, a]) => I.Map({a: 2, b: 1})
function countOfItemsByItem(list) {
    return list.groupBy(identity).toMap().map(function (l) {
        return l.size;
    });
}

// The set of elements from the given list that appear more than once.
function duplicatedValues(list) {
    return I.Set(countOfItemsByItem(list).filter(function (c) {
        return c > 1;
    }).keys());
}

/****************************************************************************
    Ast utilities
*****************************************************************************/

function _convert(key, sequence) {
    if (this[key].constructor === babel.acorn.Node) {
        return I.Map(this[key]);
    }
    return Array.isArray(this[key]) ? sequence.toList() : sequence.toOrderedMap();
}

module.exports.acornAstToNestedObjects = acornAstToNestedObjects;
function acornAstToNestedObjects(ast, p) {
    // This is sadly necessary because Immutable does not support
    // converting objects with non-Object constructors in fromJS().
    // Acorn's parser generates objects with prototypes of
    // Node, SourceLocation, and Position, so this ensures that all
    // ast nodes are POJSOs.
    if (ast === null || ast === undefined || ast.constructor === Number || ast.constructor === String || ast.constructor === RegExp || ast.constructor === Boolean) {
        return ast;
    } else if (ast.constructor === Array) {
        return ast.map(acornAstToNestedObjects);
    } else if (ast.constructor === babel.acorn.Node || ast.constructor === Object) {
        return _Object$entries(ast).reduce(function (acc, _ref) {
            var _ref2 = _slicedToArray(_ref, 2);

            var key = _ref2[0];
            var value = _ref2[1];

            if (!key.startsWith('__')) {
                acc[key] = acornAstToNestedObjects(value, ast);
            }
            return acc;
        }, {});
    } else if (ast.constructor === babel.acorn.SourceLocation) {
        return {
            start: {
                line: ast.start.line,
                column: ast.start.column
            },
            end: {
                line: ast.end.line,
                column: ast.end.column
            }
        };
    } else {
        throw new Error('Unexpected input: ' + ast.constructor + ' ' + JSON.stringify(ast) + ' ' + JSON.stringify(p));
    }
}

function parse(src) {
    var parsed = babel.parse(src, {
        ecmaVersion: 6,
        sourceType: 'module',
        plugins: { jsx: true },
        locations: true
    });
    return I.fromJS(acornAstToNestedObjects(parsed));
}
module.exports._parse = parse;

function parseExpression(src) {
    return parse(src).getIn(['body', 0, 'expression']);
}
module.exports._parseExpression = parseExpression;

function generate(ast) {
    return escodegen.generate(ast.toJS()).trim();
}

function generateOpening(jsxExpressionAst) {
    return generate(jsxExpressionAst.get('openingElement'));
}

function makeLiteralExpressionAst(value) {
    return parseExpression(value);
}

function makeNamespaceAst(namespace, name) {
    return I.fromJS({
        type: 'JSXNamespacedName',
        name: {
            type: 'JSXIdentifier',
            name: name
        },
        namespace: {
            type: 'JSXIdentifier',
            name: namespace
        }
    });
}

function elementNameAst(jsxElementAst) {
    var nameAst = jsxElementAst.getIn(['openingElement', 'name']);
    var type = nameAst.get('type');

    if (type === 'JSXNamespacedName') {
        // The element is of the form <name:id>
        return nameAst.get('namespace');
    } else if (type === 'JSXIdentifier' || type === 'JSXMemberExpression') {
        // The element is of the form <name> or <namey.mcnamerson>
        return nameAst;
    } else {
        throw new Error('Unknown element name type ' + type + ' for element ' + generateOpening(jsxElementAst));
    }
}

function elementName(jsxElementAst) {
    return generate(elementNameAst(jsxElementAst));
}

function elementId(jsxElementAst) {
    var nameAst = jsxElementAst.getIn(['openingElement', 'name']);
    var type = nameAst.get('type');

    var id;

    if (type === 'JSXNamespacedName') {
        // The element is of the form <name:id>
        id = generate(nameAst.get('name'));
    } else {
        // The element has an i18n-id attribute or else has no id.
        id = attributeWithName(jsxElementAst, 'i18n-id');
    }
    // if there is no explicit i18n-id, generate an appropriate one in certain situations:
    if (!id && nameAst.get('name') === 'Match') {
        // <Match when=""/>
        var whenAttr = attributeWithName(jsxElementAst, 'when');
        if (whenAttr) {
            id = 'Match:' + whenAttr;
        }
    }
    if (!id && isReactComponent(jsxElementAst) && !isElementMarker(jsxElementAst)) {
        // A unique, non-Marker React Component may also have sanitized attributes
        id = elementName(jsxElementAst);
    }
    return id;
}

function elementNameAndId(jsxElementAst) {
    var id = elementId(jsxElementAst),
        name = elementName(jsxElementAst);
    return id ? name + ':' + id : name;
}

function removeId(jsxElementAst) {
    var renamed = setJsxElementName(jsxElementAst, elementNameAst(jsxElementAst));
    return removeAttributeWithName(renamed, 'i18n-id');
}

function setJsxElementName(jsxElementAst, nameAst) {
    if (jsxElementAst.getIn(['openingElement', 'selfClosing'])) {
        return jsxElementAst.setIn(['openingElement', 'name'], nameAst);
    } else {
        return jsxElementAst.setIn(['openingElement', 'name'], nameAst).setIn(['closingElement', 'name'], nameAst);
    }
}

function attributeMap(attributes) {
    return I.Map(attributes.map(function (a) {
        return [a.get('name'), a.get('value')];
    }));
}

function attributesFromMap(attributes) {
    return I.List(attributes.map(function (v, k) {
        return I.Map({
            type: 'JSXAttribute',
            name: k,
            value: v
        });
    }).valueSeq());
}

function attributes(jsxElementAst) {
    return jsxElementAst.getIn(['openingElement', 'attributes']);
}

function updateAttributes(jsxElementAst, f) {
    return jsxElementAst.updateIn(['openingElement', 'attributes'], f);
}

function hasUnsafeAttributes(jsxElementAst) {
    var name = elementName(jsxElementAst);
    return attributes(jsxElementAst).some(function (a) {
        return !attributeIsSafe(name, a);
    });
}

function attributeIsSafe(elementName, attributeAst) {
    if (!elementName) {
        throw new Error('Element name missing.');
    }
    var forElement = allowedAttributesByElementName[elementName] || [];
    return -1 !== forElement.indexOf(attributeName(attributeAst));
}

function attributeName(attributeAst) {
    return attributeAst.getIn(['name', 'name']);
}

function attributeValue(attributeAst) {
    return attributeAst.getIn(['value', 'value']);
}

function attributeWithName(jsxElementAst, name) {
    var a = attributes(jsxElementAst).filter(function (attrib) {
        return attributeName(attrib) === name;
    }).first();
    return a && attributeValue(a);
}

function removeAttributeWithName(jsxElementAst, name) {
    return jsxElementAst.updateIn(['openingElement', 'attributes'], function (attributes) {
        return attributes.filterNot(function (attrib) {
            return attributeName(attrib) === name;
        });
    });
}

