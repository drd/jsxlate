#!/usr/bin/env python
# -*- coding: utf-8 -*-

from collections import namedtuple
import json
from pprint import pprint
import subprocess


def parse_file(source_file):
    json_ast = subprocess.Popen(
        ['node', './node_modules/esprima/bin/esparse.js', '--loc', source_file],
        stdout=subprocess.PIPE).stdout
    return json.load(json_ast)


def objects_in_tree(tree):
    iterable = tree.values() if hasattr(tree, 'values') else tree
    if not hasattr(iterable, '__iter__'): return
    for child in iterable:
        if isinstance(child, dict):
            yield child
        if not isinstance(child, basestring):
            for x in objects_in_tree(child): yield x


def matches(obj, pat):
    if isinstance(pat, dict):
        return all(matches(obj[k], v) if obj.has_key(k) else False
            for k, v in pat.items())
    elif isinstance(pat, type(lambda x:x)):
        return pat(obj)
    else:
        return obj == pat


string_literal_pattern = {
    'type': 'Literal',
    'value': lambda v: isinstance(v, basestring)
}
def string_literals_in_tree(tree):
    for o in objects_in_tree(tree):
        if matches(o, string_literal_pattern):
            yield o
def is_string_literal(expression):
    return matches(expression, string_literal_pattern)

message_pattern = {
    'type': 'CallExpression',
    'callee': {
        'type': 'Identifier',
        'name': 'i18n'
    }
}
def message_expressions_in_tree(tree):
    for o in objects_in_tree(tree):
        if matches(o, message_pattern):
            if not len(o['arguments']) == 1:
                raise ValueError("i18n function must have exactly one argument: line %(line)s column %(column)s" % o['loc']['start'])
            yield o

dom_node_pattern = {
    "type": "CallExpression",
    "callee": {
        "type": "MemberExpression",
        "object": {
            "type": "MemberExpression",
            "object": {
                "type": "Identifier",
                "name": "React"
            },
            "property": {
                "type": "Identifier",
                "name": "DOM"
            }
        },
        "property": {
            "type": "Identifier",
        }
    }
}
def is_dom_node(expression):
    return matches(expression, dom_node_pattern)


class Struct(object):
    def __init__(self, entries):
        self.__dict__.update(entries)


# def immediate_subexpressions(expression):
#     e = Struct(expression)
#     type = e.type
#     if type in ('ThisExpression', 'FunctionExpression', 'ArrowExpression', 'GraphExpression', 'GraphIndexExpression', 'Literal', 'Identifier'):
#         return []
#     elif type == 'ArrayExpression':
#         return e.elements
#     elif type == 'ObjectExpression':
#         return [property['value'] for property in e.properties]
#     elif type == 'SequenceExpression':
#         return e.expressions
#     elif type in ('UnaryExpression', 'UpdateExpression'):
#         return [e.argument]
#     elif type in ('BinaryExpression', 'AssignmentExpression', 'LogicalExpression'):
#         return [e.left, e.right]
#     elif type == 'ConditionalExpression':
#         return [e.test, e.alternate, e.consequent]
#     elif type in ('NewExpression', 'CallExpression'):
#         return [e.callee] + e.arguments
#     elif type == 'MemberExpression':
#         return [e.object, e.property] if e.computed else [e.object]
#     elif type == 'YieldExpression':
#         return [e.argument] if e.argument else []
#     elif type in ('ComprehensionExpression', 'GeneratorExpression'):
#         return [e.body] + [block.right for block in e.blocks] + ([e.filter] if e.filter else [])
#     elif type == 'LetExpression':
#         return sum([[head.init] if head.init else [] for head in e.head], [e.body])


def immediate_subexpressions(expression):
    e = Struct(expression)
    type = e.type
    if type in ('ThisExpression', 'FunctionExpression', 'ArrowExpression', 'GraphExpression', 'GraphIndexExpression', 'Literal', 'Identifier'):
        return []
    elif type == 'ArrayExpression':
        return []
    elif type == 'ObjectExpression':
        return []
    elif type == 'SequenceExpression':
        return []
    elif type in ('UnaryExpression', 'UpdateExpression'):
        return []
    elif type in ('BinaryExpression', 'AssignmentExpression', 'LogicalExpression'):
        return []
    elif type == 'ConditionalExpression':
        return []
    elif type in ('NewExpression', 'CallExpression'):
        return e.arguments[1:]
    elif type == 'MemberExpression':
        return []
    elif type == 'YieldExpression':
        return []
    elif type in ('ComprehensionExpression', 'GeneratorExpression'):
        return []
    elif type == 'LetExpression':
        return []


def contains_string_literals(expression):
    return any(is_string_literal(e) for e in objects_in_tree(expression))

def is_always_interesting(expression):
    return is_string_literal(expression)

def is_inherently_interesting(expression):
    return (is_always_interesting(expression) or
        is_dom_node(expression))

def is_interesting(expression):
    return (is_always_interesting(expression)
        or (is_inherently_interesting(expression)
            and any(is_interesting(child) for child in immediate_subexpressions(expression))))

def tree_with_property(expression, property, depth=0):
    yield "    "*depth + str(expression.get(property))
    if is_interesting(expression):
        for subexpr in immediate_subexpressions(expression):
            for x in tree_with_property(subexpr, property, depth+1): yield x

def expanded_babel_message_for_expression(expression, depth=1):
    if is_string_literal(expression):
        return expression['value'][:20]
    elif not is_interesting(expression):
        return "[%s:]" % expression.get('number')
    else:
        indent = "\n" + "    "*depth
        subs = [expanded_babel_message_for_expression(subexpr, depth+1) for subexpr in immediate_subexpressions(expression)]
        first_indent = indent if len(subs) else ""
        braces = "[]" if is_interesting(expression) else "<>"
        return "%s%s:%s%s%s" % (braces[0], expression.get('number'), first_indent, indent.join(subs), braces[1])

def babel_message_for_expression(expression):
    if is_string_literal(expression):
        return expression['value']
    elif not is_interesting(expression):
        return "[%s:]" % expression.get('number')
    else:
        subs = [babel_message_for_expression(subexpr) for subexpr in immediate_subexpressions(expression)]
        if expression.get('number') == 0:
            return "".join(subs)
        else:
            return "[%s:%s]" % (expression.get('number'), "".join(subs))

def is_numberable(expression):
    return expression['type'] == 'CallExpression'

def destructively_number_expression(expression, count=0):
    if is_numberable(expression):
        expression['number'] = count
        count = count + 1
    if is_interesting(expression):
        for subexpr in immediate_subexpressions(expression):
            count = destructively_number_expression(subexpr, count)
    return count


output = Struct({'babel':[], 'type': []})

program = parse_file('/Users/david/code/app-ido-i3/var/out/green-1/js/org-intake.js')
expr = list(message_expressions_in_tree(program))[-1]['arguments'][0]
destructively_number_expression(expr)
output.type = list(tree_with_property(expr, 'number'))
output.babel = expanded_babel_message_for_expression(expr).split('\n')

data = list(zip(*output.__dict__.values()))
padding = 2
col_width = max(len(word) for row in data for word in row) + padding
for row in data:
    print "".join(word.ljust(col_width) for word in row)

print babel_message_for_expression(expr)
