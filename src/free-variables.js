const ast = require('./ast');


export default function freeVariablesInMessage(node) {
    if (!ast.isElement(node)) {
        return [];
    }
    const variables = new Set();
    freeVariablesInChildren(node.children, variables);
    variables.delete('this');
    return variables.toJSON();
}

function freeVariablesInChildren(children, variables) {
    children.forEach(child => {
        switch(child.type) {
            case 'JSXElement':
                freeVariablesInElement(child, variables);
            break;

            case 'JSXExpressionContainer':
                freeVariablesInExpression(child.expression, variables);
            break;
        }
    });
}

function freeVariablesInElement(element, variables) {
    freeVariablesInElementName(element.openingElement.name, variables);
    freeVariablesInAttributes(element.openingElement.attributes, variables);
    freeVariablesInChildren(element.children, variables);
}

function freeVariablesInElementName(name, variables) {
    if (name.type === 'JSXIdentifier') {
        if (name.name.toLowerCase() !== name.name) {
            variables.add(name.name);
        }
    } else if (name.type === 'JSXMemberExpression') {
        // FIXME
        variables.add(ast.memberExpressionName(name).split('.')[0]);
    }
}

function freeVariablesInAttributes(attributes, variables) {
    attributes.forEach(a => freeVariablesInAttribute(a, variables));
}

function freeVariablesInAttribute(attribute, variables) {
    if (attribute.value.type === 'JSXExpressionContainer') {
        freeVariablesInExpression(attribute.value.expression, variables);
    }
}

function freeVariablesInObjectExpression(expression, variables) {
    expression.properties.forEach(property => {
        freeVariablesInExpression(property.value, variables);
        if (property.computed) {
            freeVariablesInExpression(property.key, variables);
        }
    })
}

function freeVariablesInExpression(expression, variables) {
    switch(expression.type) {
        case 'Identifier':
            variables.add(expression.name);
        break;

        case 'MemberExpression':
            // FIXME
            variables.add(ast.memberExpressionName(expression).split('.')[0]);
        break;

        case 'CallExpression':
            freeVariablesInExpression(expression.callee, variables);
        break;

        case 'BinaryExpression':
            freeVariablesInExpression(expression.left, variables);
            freeVariablesInExpression(expression.right, variables);
        break;

        case 'ObjectExpression':
            freeVariablesInObjectExpression(expression, variables);
        break;

        case 'Literal':
        case 'StringLiteral':
        case 'NumericLiteral':
        case 'JSXEmptyExpression':
            // noop
        break;

        default:
            console.log(expression);
    }
}
