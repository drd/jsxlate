var babel = require('babel');


let tagExtractableAttributes = {
    a:   ['href'],
    img: ['alt'],
    '*': ['title', 'placeholder', 'alt', 'summary']
};


function extractableAttributes(elementName) {
    return (tagExtractableAttributes[elementName] || []).concat(tagExtractableAttributes['*']);
}


function memberExpressionName(name) {
    let segments = [];
    let iteratee = name;
    while (iteratee.type.endsWith('MemberExpression')) {
        segments.push(iteratee.property.name);
        iteratee = iteratee.object;
    }
    if (iteratee.type === 'ThisExpression') {
        segments.push('this');
    } else {
        segments.push(iteratee.name);
    }
    return segments.reverse().join('.');
}

function elementName(element) {
    let name = element.openingElement.name;

    if (name.type === 'JSXIdentifier') {
        return name.name;
    } else if (name.type === 'JSXMemberExpression') {
        return memberExpressionName(name)
    } else {
        throw new Error("unknown elementName type: " + name.type);
    }
}

function attributeName(attribute) {
    let name = attribute.name;

    if (name.type === 'JSXIdentifier') {
        return name.name;
    } else if (name.type === 'JSXNamespacedName') {
        return `${name.namespace.name}:${name.name.name}`;
    } else {
        throw new Error("unknown attributeName type: " + name.type);
    }
}

function attributeValue(attribute) {
    let value = attribute.value;

    switch (value.type) {
        case 'Literal':
            return value.value;
        break;

        default:
            throw new Error("Extractable attributes must be literals.")
    }
}

function isElementMarker(node) {
    return elementName(node) === 'I18N';
}

function extractElementMessage(node) {
    return node.children.reduce((message, c) => {
        return message + extractChild(c)
    }, '')
}

function extractChild(child) {
    switch (child.type) {
        case 'Literal':
            return child.value;
        break;

        case 'JSXExpressionContainer':
            return extractExpression(child.expression);
        break;

        case 'JSXElement':
            return extractElement(child);
        break;

        default:
            throw new Error("Unexpected child type: " + child.type);
    }
}

function extractExpression(expression) {
    return `{${memberExpressionName(expression)}}`;
}

function extractableAttribute(element, attribute) {
    let name = elementName(element);
    let whitelistedAttributes = extractableAttributes(name);
    return whitelistedAttributes.indexOf(attributeName(attribute)) !== -1;
}

function extractElementAttribute(attribute) {
    return `${attributeName(attribute)}="${attributeValue(attribute)}"`;
}

function extractElementAttributes(element) {
    let extractableAttributes = element.openingElement.attributes.filter(
        a => extractableAttribute(element, a)
    );

    return extractableAttributes.length
        ? ` ${extractableAttributes.map(extractElementAttribute).join(' ')}`
        : '';
}

function extractElement(element) {
    let name = elementName(element);
    let attributes = extractElementAttributes(element);
    return `<${name}${attributes}>${extractElementMessage(element)}</${name}>`;
}


module.exports.extract = function extract(src) {
    const messages = [];
    let inMarker = false;

    function enterMarker() {
        if (inMarker) {
            throw new Error("Nested markers");
        }
        inMarker = true;
    }

    function leaveMarker() {
        inMarker = false;
    }

    let plugin = function({Plugin, t}) {
        return new Plugin('extraction', {
            visitor: {
                CallExpression(node, parent) {
                    if (node.callee.name === 'i18n') {
                        messages.push(node.arguments[0].value);
                    }
                },

                JSXElement: {
                    enter(node, parent) {
                        if (isElementMarker(node)) {  // <I18N>...
                            enterMarker();
                            messages.push(extractElementMessage(node));
                        }
                    },

                    exit(node, parent) {
                        if (isElementMarker(node)) {  // ...</I18N>
                            leaveMarker();
                        }
                    }
                },

                JSXAttribute(node, parent) {
                    if (!inMarker) {
                        if (extractableAttribute(node)) {
                            messages.push(extractAttribute(node))
                        }
                    }
                }
            }
        });
    };

    babel.transform(src, {
        plugins: [plugin]
    });

    return messages;
};
