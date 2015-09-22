const ast = require('./ast');


module.exports = {
    freeVariablesInMessage(element) {
        const variables = new Set();
        this.freeVariablesInChildren(element.children, variables);
        return variables.toJSON();
    },

    freeVariablesInChildren(children, variables) {
        children.forEach(child => {
            switch(child.type) {
                case 'JSXElement':
                    this.freeVariablesInElement(child, variables);
                break;

                case 'JSXExpressionContainer':
                    this.freeVariablesInExpression(child.expression, variables);
                break;
            }
        });
    },

    freeVariablesInElement(element, variables) {
        this.freeVariablesInAttributes(element.openingElement.attributes, variables);
        this.freeVariablesInChildren(element.children, variables);
    },

    freeVariablesInAttributes(attributes, variables) {
        attributes.forEach(a => this.freeVariablesInAttribute(a, variables));
    },

    freeVariablesInAttribute(attribute, variables) {
        if (attribute.value.type === 'JSXExpressionContainer') {
            this.freeVariablesInExpression(attribute.value.expression, variables);
        }
    },

    freeVariablesInExpression(expression, variables) {
        switch(expression.type) {
            case 'Identifier':
                variables.add(expression.name);
            break;

            case 'MemberExpression':
                // FIXME
                variables.add(ast.memberExpressionName(expression).split('.')[0]);
            break;

            case 'CallExpression':
                variables.add(expression.callee.name);
            break;

            case 'BinaryExpression':
                this.freeVariablesInExpression(expression.left, variables);
                this.freeVariablesInExpression(expression.right, variables);
            break;

            case 'ObjectExpression':
                // TODO
            break;

            default:
                console.log(expression);
        }
    }
}
