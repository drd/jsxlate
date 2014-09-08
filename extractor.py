#!/usr/bin/env python
# -*- coding: utf-8 -*-

from collections import defaultdict, namedtuple
import copy
import json
from pprint import pprint
import re
import subprocess

from genshi_message import components_for_genshi_message

blank_re = re.compile('^[\s\xa0]*$')
def is_present(string):
    return string and not re.match(blank_re, string)

def parse_file(source_file):
    return json.load(subprocess.Popen(
        ['node', 'node_modules/esprima/bin/esparse.js', source_file],
        stdout=subprocess.PIPE).stdout)

# : string with javascript expression statement -> expression
def parse_fragment(javascript):
    process = subprocess.Popen(
        ['node', 'node_modules/esprima/bin/esparse.js', '/dev/stdin'],
        stdin=subprocess.PIPE, stdout=subprocess.PIPE)
    process.stdin.write(javascript)
    return json.load(process.stdout)['body'][0]['expression']

def generate(expression):
    process = subprocess.Popen(
        ['node', 'node_modules/escodegen/bin/esgenerate.js', '/dev/stdin'],
        stdin=subprocess.PIPE, stdout=subprocess.PIPE)
    json.dump(expression, process.stdin)
    return process.stdout.read()


def objects_in_tree(tree):
    iterable = tree.values() if hasattr(tree, 'values') else tree
    if not hasattr(iterable, '__iter__'): return
    for child in iterable:
        if isinstance(child, dict):
            yield child
        if not isinstance(child, basestring):
            for x in objects_in_tree(child): yield x


def matches(obj, pat):
    if isinstance(pat, dict) and isinstance(obj, dict):
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

def literal_expression_for_jsonifyable(jsonifyable):
    return parse_fragment(json.dumps(jsonifyable))

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

def visit_numbers_upon_expressions(expression, visitor, count=0):
    if is_numberable(expression):
        visitor(expression, count)
        count = count + 1
    if is_interesting(expression):
        for subexpr in immediate_subexpressions(expression):
            count = visit_numbers_upon_expressions(subexpr, visitor, count)
    return count

def copies_arguments(f):
    def g(*args, **kwargs):
        return f(*[copy.deepcopy(x) for x in args],
                **{k: copy.deepcopy(v) for k, v in kwargs.items()})
    return g

# : expression -> (expression with numbers w/o children, expressions by number)
@copies_arguments
def understand(expression):
    expressions_by_number = {}

    def visitor(subexpr, count):
        subexpr['number'] = count
        expressions_by_number[count] = subexpr
    visit_numbers_upon_expressions(expression, visitor)

    for k, v in expressions_by_number.items():
        if is_interesting(v):
            expressions_by_number[k] = without_children(v)

    return expression, expressions_by_number

@copies_arguments
def without_children(expression):
    assert is_dom_node(expression)
    expression['arguments'] = expression['arguments'][:1]
    return expression

@copies_arguments
def with_added_child(expression, child):
    assert is_dom_node(expression)
    expression['arguments'].append(child)
    return expression


def debug(expr):
    output = Struct({'babel':[], 'type': []})
    output.type = list(tree_with_property(expr, 'number'))
    output.babel = expanded_babel_message_for_expression(expr).split('\n')

    data = list(zip(*output.__dict__.values()))
    padding = 2
    col_width = max(len(word) for row in data for word in row) + padding
    for row in data:
        print "".join(word.ljust(col_width) for word in row)

translated = """
[1:There's a hole in my bucket]
[2:Dear [3:] Liza [4:]:]
[5:]
[6:There's a hole in my bucket]
[7:Dear Liza do-day]
"""

@copies_arguments
def filled_out(root, expressions_by_number, children_by_number):
    if is_dom_node(root):
        for x in children_by_number[root['number']]:
            root = with_added_child(root,
                filled_out(x, expressions_by_number, children_by_number))
    return root

def children_by_number(tokens, expressions_by_number):
    children_by_number = defaultdict(list)
    numbers_seen = {0}
    context = 0
    for number, text in tokens:
        node = expressions_by_number[number]
        if not number in numbers_seen:
            children_by_number[context].append(node)
            numbers_seen.add(number)
        context = number
        if is_present(text):
            children_by_number[context].append(
                literal_expression_for_jsonifyable(text))
    return children_by_number

if __name__ == '__main__':
    program = parse_file('/Users/david/code/app-ido-i3/var/out/green-1/js/org-intake.js')
    expr = list(message_expressions_in_tree(program))[-1]['arguments'][0]
    expr, expressions_by_number = understand(expr)
    orig_message = babel_message_for_expression(expr)
    print "------"
    children_by_number = children_by_number(components_for_genshi_message(translated), expressions_by_number)
    recon = filled_out(expressions_by_number[0], expressions_by_number, children_by_number)
    # debug(recon)
    print generate(recon)
    print generate(expr)
