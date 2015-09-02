var babel = require('babel');

var codes = `
let translated = i18n("derp");

let Component = React.createClass({
    render() {
        return <I18N>Oh hello there, {this.props.name}.</I18N>;
    }
})
`;


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
    return element.openingElement.name;

    if (name.type === 'JSXIdentifier') {
        return name.name;
    } else if (name.type === 'JSXMemberExpression') {
        return memberExpressionName(name)
    }
}

function isElementMarker(node) {
    return elementName(node.openingElement.name) === 'I18N';
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
            return `{${extractExpression(child.expression)}}`;
        break;

        default:
            throw new Error("Unexpected child type: " + child.type);
    }
}

function extractExpression(expression) {
    return memberExpressionName(expression);
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
        return new Plugin('jsxlate', {
            visitor: {
                CallExpression(node, parent) {
                    if (node.callee.name === 'i18n') {
                        messages.push(node.arguments[0].value);
                    }
                },

                JSXElement(node, parent) {
                    if (isElementMarker(node)) {
                        enterMarker();
                        messages.push(extractElementMessage(node));
                        leaveMarker();
                    }
                },

                JSXAttribute(node, parent) {
                    if (extractableAttribute(node)) {
                        messages.push(extractAttribute(node))
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
