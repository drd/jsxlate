'use strict';

var ast = require('./ast');

module.exports = {
    freeVariablesInMessage: function freeVariablesInMessage(element) {
        var variables = new Set();
        this.freeVariablesInChildren(element.children, variables);
        variables.delete('this');
        return variables.toJSON();
    },
    freeVariablesInChildren: function freeVariablesInChildren(children, variables) {
        var _this = this;

        children.forEach(function (child) {
            switch (child.type) {
                case 'JSXElement':
                    _this.freeVariablesInElement(child, variables);
                    break;

                case 'JSXExpressionContainer':
                    _this.freeVariablesInExpression(child.expression, variables);
                    break;
            }
        });
    },
    freeVariablesInElement: function freeVariablesInElement(element, variables) {
        this.freeVariablesInElementName(element.openingElement.name, variables);
        this.freeVariablesInAttributes(element.openingElement.attributes, variables);
        this.freeVariablesInChildren(element.children, variables);
    },
    freeVariablesInElementName: function freeVariablesInElementName(name, variables) {
        if (name.type === 'JSXIdentifier') {
            if (name.name.toLowerCase() !== name.name) {
                variables.add(name.name);
            }
        } else if (name.type === 'JSXMemberExpression') {
            // FIXME
            variables.add(ast.memberExpressionName(name).split('.')[0]);
        }
    },
    freeVariablesInAttributes: function freeVariablesInAttributes(attributes, variables) {
        var _this2 = this;

        attributes.forEach(function (a) {
            return _this2.freeVariablesInAttribute(a, variables);
        });
    },
    freeVariablesInAttribute: function freeVariablesInAttribute(attribute, variables) {
        if (attribute.value.type === 'JSXExpressionContainer') {
            this.freeVariablesInExpression(attribute.value.expression, variables);
        }
    },
    freeVariablesInObjectExpression: function freeVariablesInObjectExpression(expression, variables) {
        var _this3 = this;

        expression.properties.forEach(function (property) {
            _this3.freeVariablesInExpression(property.value, variables);
            if (property.computed) {
                _this3.freeVariablesInExpression(property.key, variables);
            }
        });
    },
    freeVariablesInExpression: function freeVariablesInExpression(expression, variables) {
        switch (expression.type) {
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
};

