const ast = require('./ast');


module.exports = {
    freeVariablesInMessage(element) {
        const variables = new Set();
        this.freeVariablesInChildren(element.children, variables);
        variables.delete('this');
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
        this.freeVariablesInElementName(element.openingElement.name, variables);
        this.freeVariablesInAttributes(element.openingElement.attributes, variables);
        this.freeVariablesInChildren(element.children, variables);
    },

    freeVariablesInElementName(name, variables) {
        if (name.type === 'JSXIdentifier') {
            if (name.name.toLowerCase() !== name.name) {
                variables.add(name.name);
            }
        } else if (name.type === 'JSXMemberExpression') {
            // FIXME
            variables.add(ast.memberExpressionName(name).split('.')[0]);
        }
    },

    freeVariablesInAttributes(attributes, variables) {
        attributes.forEach(a => this.freeVariablesInAttribute(a, variables));
    },

    freeVariablesInAttribute(attribute, variables) {
        if (attribute.value.type === 'JSXExpressionContainer') {
            this.freeVariablesInExpression(attribute.value.expression, variables);
        }
    },

    freeVariablesInObjectExpression(expression, variables) {
        expression.properties.forEach(property => {
            this.freeVariablesInExpression(property.value, variables);
            if (property.computed) {
                this.freeVariablesInExpression(property.key, variables);
            }
        })
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
                this.freeVariablesInExpression(expression.callee, variables);
            break;

            case 'BinaryExpression':
                this.freeVariablesInExpression(expression.left, variables);
                this.freeVariablesInExpression(expression.right, variables);
            break;

            case 'ObjectExpression':
                this.freeVariablesInObjectExpression(expression, variables);
            break;

            case 'Literal':
            case 'StringLiteral':
            case 'NumericLiteral':
                // noop
            break;

            default:
                console.log(expression);
        }
    }
}
