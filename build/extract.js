'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.generate = generate;
exports.extractFunctionMessage = extractFunctionMessage;
exports.incrementKey = incrementKey;
exports.extractElementMessage = extractElementMessage;
exports.extractElementMessageWithoutSideEffects = extractElementMessageWithoutSideEffects;
exports.extractFromSource = extractFromSource;
exports.default = extractFromPaths;

var _babelGenerator = require('babel-generator');

var _babelGenerator2 = _interopRequireDefault(_babelGenerator);

var _babelTypes = require('babel-types');

var types = _interopRequireWildcard(_babelTypes);

var _parsing = require('./parsing');

var _parsing2 = _interopRequireDefault(_parsing);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var fs = require('fs');

var options = {
    functionMarker: 'i18n',
    elementMarker: 'I18N',
    whitelistedAttributes: {
        a: ['href'],
        img: ['alt'],
        '*': ['title', 'placeholder', 'alt', 'summary', 'i18n-id'],
        'Pluralize': ['on'],
        'Match': ['when']
    }
};

var whitelist = function (wl) {
    var shared = wl['*'];
    return Object.keys(wl).reduce(function (whitelist, name) {
        var attrs = wl[name];
        if (name !== '*') {
            wl[name] = attrs.concat(shared);
        }
        return wl;
    }, { '*': shared });
}(options.whitelistedAttributes);

// Error types

var InputError = function (_Error) {
    _inherits(InputError, _Error);

    function InputError(description, node) {
        _classCallCheck(this, InputError);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(InputError).call(this, description));

        Object.assign(_this, {
            description: description,
            node: node,
            inputError: true
        });
        return _this;
    }

    return InputError;
}(Error);

function assertInput(condition, description, node) {
    if (!condition) {
        throw new InputError(description, node);
    }
}

function assertUnique(map, description, node) {
    var dupes = Object.entries(map).filter(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2);

        var _ = _ref2[0];
        var value = _ref2[1];
        return value > 1;
    } // eslint-disable-line no-unused-vars
    );
    assertInput(dupes.length === 0, description + ': ' + dupes, node);
}

// Code generation

function generate(ast) {
    return (0, _babelGenerator2.default)(ast, { comments: false }).code;
}

// Function messages: i18n("Foo all the bars.")

function isFunctionMarker(callExpression) {
    return callExpression.callee.name === options.functionMarker;
}

function validateFunctionMessage(callExpression) {
    assertInput(callExpression.arguments.length === 1, 'Expected exactly 1 argument to ' + options.functionMarker + '(), but got ' + callExpression.arguments.length, callExpression);

    assertInput(callExpression.arguments[0].type === 'StringLiteral', 'Expected a StringLiteral argument to ' + options.functionMarker + '(), but got ' + callExpression.arguments[0].type, callExpression);
}

function extractFunctionMessage(callExpression) {
    return callExpression.arguments[0].value;
}

// Element messages: <I18N>Foo <span>all the</span> bars.</I18N>

function nodeName(node) {
    return node.name && generate(node.name);
}

function elementName(jsxElement) {
    return nodeName(jsxElement.openingElement);
}

function elementNamespaceOrName(jsxElement) {
    if (hasNamespacedName(jsxElement)) {
        return jsxElement.openingElement.name.namespace.name;
    } else {
        return elementName(jsxElement);
    }
}

function elementAttributes(jsxElement) {
    return jsxElement.openingElement.attributes;
}

function isElementMarker(jsxElement) {
    return elementName(jsxElement) === 'I18N';
}

function isTag(jsxElement) {
    return (/^[a-z]|\-/.test(elementName(jsxElement))
    );
}

function isComponent(jsxElement) {
    return !isTag(jsxElement);
}

function isSimpleExpression(expression) {
    if (expression.type === 'Identifier') {
        return true;
    } else if (expression.type === 'ThisExpression') {
        return true;
    } else if (expression.type === 'MemberExpression') {
        return !expression.computed && isSimpleExpression(expression.object);
    } else {
        return false;
    }
}

function hasNamespacedName(jsxElement) {
    return jsxElement.openingElement.name.type === 'JSXNamespacedName';
}

function hasI18nId(jsxElement) {
    return hasNamespacedName(jsxElement) || hasI18nIdAttribute(jsxElement);
}

function hasI18nIdAttribute(jsxElement) {
    return elementAttributes(jsxElement).map(attributeName).includes('i18n-id');
}

function hasUnsafeAttributes(jsxElement) {
    return elementAttributes(jsxElement).some(function (a) {
        return attributeIsSanitized(jsxElement, a);
    });
}

function filterAttributes(jsxElement, condition) {
    jsxElement.openingElement.attributes = jsxElement.openingElement.attributes.filter(function (a) {
        return condition(jsxElement, a);
    });
}

function i18nId(jsxElement) {
    if (hasNamespacedName(jsxElement)) {
        // It's names all the way down
        return jsxElement.openingElement.name.name.name;
    } else {
        var attr = elementAttributes(jsxElement).find(function (a) {
            return attributeName(a) === 'i18n-id';
        });
        if (attr) {
            assertInput(attr.value.type === 'StringLiteral', "i18n-id attribute found with non-StringLiteral value", jsxElement);
            return attr.value.value;
        }
    }
}

function convertToNamespacedName(jsxElement) {
    if (!hasNamespacedName(jsxElement)) {
        var name = elementName(jsxElement);
        var id = i18nId(jsxElement);
        if (id) {
            filterAttributes(jsxElement, function (_, a) {
                return attributeName(a) !== 'i18n-id';
            });
            var nameAst = types.JSXNamespacedName(types.JSXIdentifier(name), types.JSXIdentifier(id));
            jsxElement.openingElement.name = nameAst;
            if (jsxElement.closingElement) {
                jsxElement.closingElement.name = nameAst;
            }
        }
    }

    return elementName(jsxElement);
}

function incrementKey(map, key) {
    map[key] = (map[key] || 0) + 1;
}

var ExtractionValidationVisitor = {
    JSXElement: function JSXElement(path) {
        // prevent nested markers
        assertInput(!isElementMarker(path.node), "Found a nested message marker", path.node);

        var elementName = convertToNamespacedName(path.node);
        if (hasUnsafeAttributes(path.node)) {
            if (isComponent(path.node)) {
                // keep track of custom components to ensure there are no duplicates
                incrementKey(this.validationContext.componentNamesAndIds, elementName);
            } else {
                // tags with sanitized attributes must have an i18n-id or namespace
                assertInput(hasI18nId(path.node), "Found a tag with sanitized attributes with no i18n-id", path.node);
            }
        }
    },
    JSXAttribute: function JSXAttribute(path) {
        // technically part of sanitization, but visitors are merged
        // for performance
        if (attributeIsSanitized(path.parentPath.parent, path.node)) {
            path.remove();
        }
    },
    JSXSpreadAttribute: function JSXSpreadAttribute(path) {
        path.remove();
    },
    JSXExpressionContainer: function JSXExpressionContainer(path) {
        if (path.parent.type === 'JSXElement') {
            assertInput(isSimpleExpression(path.node.expression), "Only identifiers and simple member expressions (foo.bar, " + "this.that.other) are allowed in <I18N> tags.", path.node);
        }
    }
};

function attributeName(jsxAttribute) {
    return nodeName(jsxAttribute);
}

function attributeIsSanitized(element, attribute) {
    if (attribute.type === 'JSXSpreadAttribute') {
        return true;
    }

    var name = elementNamespaceOrName(element);
    var whitelistedAttributes = whitelist[name] || whitelist['*'];
    return !whitelistedAttributes.includes(attributeName(attribute)) || attribute.value.type !== 'StringLiteral';
}

function validateAndSanitizeElement(jsxElementPath) {
    // Traverse with state of validationContext
    var validationContext = {
        root: jsxElementPath.node,
        componentNamesAndIds: {},
        componentsWithSanitizedAttributes: {}
    };
    jsxElementPath.traverse(ExtractionValidationVisitor, { validationContext: validationContext });
    validateElementContext(validationContext);
}

function extractElementMessage(jsxElementPath) {
    validateAndSanitizeElement(jsxElementPath);
    var messageWithContainer = generate(jsxElementPath.node);
    // TODO: is there a better way to handle whitespace of jsxChildren ?
    // thought: possibly by re-situating them as the children of a Block?
    return (/<I18N>([\s\S]+?)<\/I18N>/.exec(messageWithContainer)[1].trim()
    );
}

// TODO: is there a more elegant approach?
function extractElementMessageWithoutSideEffects(jsxElement) {
    assertInput(isElementMarker(jsxElement), "Attempted to extract message from non-marker", jsxElement);
    return extractFromSource(generate(jsxElement))[0];
}

function validateElementContext(validationContext) {
    assertUnique(validationContext.componentsWithSanitizedAttributes, 'Found the following duplicate elements/components', validationContext.root);

    assertUnique(validationContext.componentNamesAndIds, 'Found the following duplicate elements/components', validationContext.root);
}

function extractFromSource(src) {
    var messages = [];

    var plugin = function plugin(_ref3) {
        var t = _ref3.types;

        var _ref4 = arguments.length <= 1 || arguments[1] === undefined ? { opts: {} } : arguments[1];

        var opts = _ref4.opts;

        Object.assign(options, opts);
        return {
            visitor: {
                CallExpression: function CallExpression(_ref5) {
                    var callExpression = _ref5.node;

                    if (isFunctionMarker(callExpression)) {
                        validateFunctionMessage(callExpression);
                        messages.push(extractFunctionMessage(callExpression));
                    }
                },
                JSXElement: function JSXElement(path) {
                    if (isElementMarker(path.node)) {
                        messages.push(extractElementMessage(path));
                    }
                }
            }
        };
    };

    _parsing2.default.transform(src, plugin);
    return messages;
}

function extractFromPaths(paths) {
    var messages = {};
    var ffmp = require('../bin/filesFromMixedPaths');

    ffmp(paths).forEach(function (path) {
        var src = fs.readFileSync(path, "utf-8");
        try {
            extractFromSource(src).forEach(function (msg) {
                return messages[msg] = msg;
            });
        } catch (e) {
            console.error(path, e);
            if (e.stack) {
                console.error(e.stack);
            }
            if (e.node) {
                console.error("Error at", e.node.loc, generate(e.node));
            }
        }
    });

    return messages;
}

