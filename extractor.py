#!/usr/bin/env python
# -*- coding: utf-8 -*-

from collections import defaultdict, namedtuple
from copy import deepcopy
import json
from pprint import pprint
import re
import subprocess

from genshi_message import components_for_genshi_message


def copies_arguments(f):
    def g(*args, **kwargs):
        return f(*[deepcopy(x) for x in args],
                **{k: deepcopy(v) for k, v in kwargs.items()})
    return g


# A tree is an list of nodes and an adjacency list, where the adjacency list is
# a list of tuples (a,b) where a and b are indices into the list of nodes,  and
# where (a,b1) comes before (a,b2) in the adjacency when b1 comes before b2
# amongst a's children.
Tree = namedtuple("Tree", "nodes adjacency")

def tree_from_materialized_expression(expr):
    tree = Tree([],[])
    return tree_by_adding_materialized_expression_to_tree(expr, tree)

@copies_arguments
def tree_by_adding_materialized_expression_to_tree(expr, tree, parent_index=None):
    nodes, adj = tree
    my_index = len(nodes)
    if parent_index is not None: adj.append((parent_index, my_index))
    nodes.append(without_children(expr))
    for child in immediate_subexpressions(expr):
        tree = tree_by_adding_materialized_expression_to_tree(child, tree, my_index)
    return tree

def materialized_expression_from_tree(tree):
    return expression_by_materializing_expression_with_tree(root(tree), tree)

def expression_by_materializing_expression_with_tree(expr, tree):
    expr = deepcopy(expr)
    children = children_of_node_in_tree(expr, tree)
    for c in children:
        mc = expression_by_materializing_expression_with_tree(c, tree)
        expr['arguments'].append(mc) # 1
    return expr
    # 1: The only interesting expressions currently have their children under
    #    'arguments'. This would need to be more flexible if that changes.

def root(tree):
    return tree.nodes[0]

def children_of_node_in_tree(node, tree):
    index = tree.nodes.index(node)
    return [tree.nodes[c] for p, c in tree.adjacency if p == index]


# PARSING/GENERATING:

def parse_file(source_file):
    output = subprocess.Popen(
        ['node', 'node_modules/esprima/bin/esparse.js', source_file],
        stdout=subprocess.PIPE).stdout.read()
    try:
        return json.loads(output)
    except ValueError:
        raise ValueError("Error from esprima when parsing %s:\n%s" % (source_file, output))

def parse_program(javascript):
    process = subprocess.Popen(
        ['node', 'node_modules/esprima/bin/esparse.js', '/dev/stdin'],
        stdin=subprocess.PIPE, stdout=subprocess.PIPE)
    process.stdin.write(javascript)
    return json.load(process.stdout)        

# : string with javascript expression statement -> expression
def parse_fragment(javascript):
    return parse_program(javascript)['body'][0]['expression']

def generate(expression):
    process = subprocess.Popen(
        ['node', 'node_modules/escodegen/bin/esgenerate.js', '/dev/stdin'],
        stdin=subprocess.PIPE, stdout=subprocess.PIPE)
    json.dump(expression, process.stdin)
    return process.stdout.read()


# AST PROCESSING:

def destructively_assign_parent_types_to_ast(ast):
    iterable = ast.values() if hasattr(ast, 'values') else ast
    if not hasattr(iterable, '__iter__'): return
    for child in iterable:
        try:
            child['parent_type'] = ast['type']
        except (KeyError, AttributeError, TypeError):
            pass
        if not isinstance(child, basestring):
            destructively_assign_parent_types_to_ast(child)

def objects_in_ast(ast):
    iterable = ast.values() if hasattr(ast, 'values') else ast
    if not hasattr(iterable, '__iter__'): return
    for child in iterable:
        if isinstance(child, dict):
            yield child
        if not isinstance(child, basestring):
            for x in objects_in_ast(child): yield x


def matches(obj, pat):
    if isinstance(pat, dict) and isinstance(obj, dict):
        return all(matches(obj[k], v) if obj.has_key(k) else False
            for k, v in pat.items())
    elif isinstance(pat, type(lambda x:x)):
        return pat(obj)
    else:
        return obj == pat


expression_types = [
    'Property', # an honorary expression type
    'ArrayExpression', 'ArrowExpression', 'AssignmentExpression',
    'BinaryExpression', 'CallExpression', 'ComprehensionExpression',
    'ConditionalExpression', 'FunctionExpression', 'GeneratorExpression',
    'GraphExpression', 'GraphIndexExpression', 'Identifier', 'LetExpression',
    'Literal', 'LogicalExpression', 'MemberExpression', 'NewExpression',
    'ObjectExpression', 'SequenceExpression', 'ThisExpression',
    'UnaryExpression', 'UpdateExpression', 'YieldExpression',
]
top_level_expression_pattern = {
    'type': lambda v: v in expression_types,
    'parent_type': lambda v: v not in expression_types
}
def top_level_expressions_in_ast(ast):
    for o in objects_in_ast(ast):
        if matches(o, top_level_expression_pattern):
            yield o
def is_top_level_expression(ast):
    return matches(ast, top_level_expression_pattern)

string_literal_pattern = {
    'type': 'Literal',
    'value': lambda v: isinstance(v, basestring)
}
def string_literals_in_ast(ast):
    for o in objects_in_ast(ast):
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
def message_expressions_in_ast(ast):
    for o in objects_in_ast(ast):
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
#     if expression['type'] in ('NewExpression', 'CallExpression'):
#         return expression['arguments'][1:]
#     else:
#         return []


def singles(struct, *names):
    return [(name, struct['name'])
        for name in names
        if struct['name']]

def multi(struct, name):
    return [(name, x) for x in struct['name']]



{
    'Program':             ('', 'body'),
    'Function':            ('defaults', 'body'),
    'FunctionDeclaration': ('defaults', 'body'),
    'FunctionExprssion':   ('defaults', 'body'),
    'ArrowExpression':     ('defaults', 'body'),
    'ExpressionStatement': ('expression', ''),
    'IfStatement':         ('test consequent alternate', ''),
    'LabeledStatement':    ('body', ''),
    'WithStatement':       ('object body', ''),
    'SwitchStatement':     ('discriminant', 'cases'),
    'ReturnStatement':     ('argument', ''),
    'ThrowStatement':      ('argument', ''),
    'TryStatement':        ('block handler finalizer', 'guardedHandlers'),
    'WhileStatement':      ('test body', ''),
    'DoWhileStatement':    ('test body', ''),
    'ForStatement':        ('init test update body', ''),
    'ForInStatement':      ('left right body', ''),
    'ForOfStatement':      ('left right body', ''),
    'LetStatement':        ('body', 'head'),
    'LetExpression':       ('body', 'head'),
    'VariableDeclaration': ('', 'declarations'),
    'VariableDeclarator':  ('init', ''),
    'ArrayExpression':     ('', 'elements'),
    'ObjectExpression':    ('', 'properties'),
    'Property':            ('key value', ''),
    'SequenceExpression':  ('', 'expressions'),
    'UnaryExpression':     ('argument', ''),
    'UpdateExpression':    ('argument', ''),
    'YieldExpression':     ('argument', ''),
    'AssignmentExpression': ('left right', ''),
    'BinaryExpression':    ('left right', ''),
    'LogicalExpression':   ('left right', ''),
    'ConditionalExpression': ('test alternate consequent', ''),
    'NewExpression':       ('callee', 'arguments'),
    'CallExpression':      ('callee', 'arguments'),
    'MemberExpression':    ('object property'),
    'ComprehensionExpression': ('body filter', 'blocks'),
    'GeneratorExpression': ('body filter', 'blocks'),
    'SwitchCase':          ('test', 'consequent'),
    'CatchClause':         ('guard body', ''),
    'ComprehensionBlock':  ('', 'right'),
}

def ast_children(ast_node):
    type = n['type']
    if type in ('Program', 'BlockStatement'):
        return multi(n, 'body')
    if type in ('Function', 'FunctionDeclaration', 'FunctionExprssion', 'ArrowExpression'):
        singles(n,'defaults') + multi(n, 'body')
    if type == 'ExpressionStatement':
        return singles(n, 'expression')
    if type == 'IfStatement':
        return singles(n, 'test', 'consequent', 'alternate')
    if type == 'LabeledStatement':
        return singles(n, 'body')
    if type == 'WithStatement':
        return singles(n, 'object', 'body')
    if type == 'SwitchStatement':
        return singles(n, 'discriminant') + multi(n, 'cases')
    if type in ('ReturnStatement', 'ThrowStatement'):
        return singles(n, 'argument')
    if type == 'TryStatement':
        return singles(n, 'block', 'handler', 'finalizer') + multi(n, guardedHandlers)
    if type in ('WhileStatement', 'DoWhileStatement'):
        return singles(n, 'test', 'body')
    if type == 'ForStatement':
        return singles(n, 'init', 'test', 'update', 'body')
    if type in ('ForInStatement', 'ForOfStatement'):
        return singles(n, 'left', 'right', 'body')
    if type in ('LetStatement', 'LetExpression'):
        return singles(n, 'body') + multi(n, 'head')
    if type == 'VariableDeclaration':
        return multi(n, 'declarations')
    if type == 'VariableDeclarator':
        return singles(n, 'init')
    if type == 'ArrayExpression':
        return multi(n, 'elements')
    if type == 'ObjectExpression':
        return multi(n, 'properties')
    if type == 'Property':
        return singles(n, 'key', 'value')
    if type == 'SequenceExpression':
        return multi(n, 'expressions')
    if type in ('UnaryExpression', 'UpdateExpression', 'YieldExpression'):
        return singles(n, 'argument')
    if type in ('AssignmentExpression', 'BinaryExpression', 'LogicalExpression'):
        return singles(n, 'left', 'right')
    if type == 'ConditionalExpression':
        return singles(n, 'test', 'alternate', 'consequent')
    if type in ('NewExpression', 'CallExpression'):
        return singles(n, 'callee') + multi(n, 'arguments')
    if type == 'MemberExpression':
        return singles(n, 'object', 'property')
    if type in ('ComprehensionExpression', 'GeneratorExpression'):
        return singles(n, 'body', 'filter') + multi(n, 'blocks')
    if type == 'SwitchCase':
        return singles(n, 'test') + multi(n, 'consequent')
    if type == 'CatchClause':
        return singles(n, 'guard', 'body')
    if type == 'ComprehensionBlock':
        return singles(n, 'right')


def immediate_subexpressions(expression):
    e = Struct(expression)
    type = e.type
    if type in ('ThisExpression', 'FunctionExprssion', 'ArrowExpression', 'GraphExpression', 'GraphIndexExpression', 'Literal', 'Identifier'):
        return []
    elif type == 'ArrayExpression':
        return e.elements
    elif type == 'ObjectExpression':
        return [property['value'] for property in e.properties]
    elif type == 'SequenceExpression':
        return e.expressions
    elif type in ('UnaryExpression', 'UpdateExpression'):
        return [e.argument]
    elif type in ('BinaryExpression', 'AssignmentExpression', 'LogicalExpression'):
        return [e.left, e.right]
    elif type == 'ConditionalExpression':
        return [e.test, e.alternate, e.consequent]
    elif type in ('NewExpression', 'CallExpression'):
        return expression['arguments'][1:] # XXX
    elif type == 'MemberExpression':
        return [e.object, e.property] if e.computed else [e.object]
    elif type == 'YieldExpression':
        return [e.argument] if e.argument else []
    elif type in ('ComprehensionExpression', 'GeneratorExpression'):
        return [e.body] + [block.right for block in e.blocks] + ([e.filter] if e.filter else [])
    elif type == 'LetExpression':
        return sum([[head.init] if head.init else [] for head in e.head], [e.body])


# INTERESTINGNESS

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
    if is_dom_node(expression):
        expression['arguments'] = expression['arguments'][:1]
    return expression    

@copies_arguments
def with_added_children(expression, children):
    assert is_dom_node(expression)
    for c in children:
        expression['arguments'].append(c)
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
[6:There's a hole in my bucket]
[5:]
[7:Dear Liza a hole]
"""

@copies_arguments
def filled_out(root, expressions_by_number, children_by_number):
    if is_dom_node(root):
        root = with_added_children(root, [
            filled_out(child, expressions_by_number, children_by_number)
                for child in children_by_number[root['number']]])
    return root


blank_re = re.compile('^[\s\xa0]*$')
def is_present(string):
    return string and not re.match(blank_re, string)

def number_children(tokens, expressions_by_number):
    result = defaultdict(list)
    numbers_seen = {0}
    context = 0
    for number, text in tokens:
        node = expressions_by_number[number]
        if not number in numbers_seen:
            result[context].append(node)
            numbers_seen.add(number)
        context = number
        if is_present(text):
            result[context].append(
                literal_expression_for_jsonifyable(text))
    return result

def expression_translated_by_message(expression, message):
    expr, expressions_by_number = understand(expression)
    children_by_number = number_children(components_for_genshi_message(message), expressions_by_number)
    return filled_out(expressions_by_number[0], expressions_by_number, children_by_number)


def extract(fileobj, keywords, comment_tags, options):
    """
    Pybabel entrypoint for extracting strings from a given file.
    Return a sequence of 4-tuples (lineno, funcname, messages, comments).
    """
    program = parse_program(fileobj.read())
    for message_expression in message_expressions_in_tree(program):
        inner_expression = message_expression['arguments'][0]
        message = babel_message_for_expression(understand(inner_expression)[0])
        yield (message_expression['loc']['start']['line'],
            '',
            message,
            '')


def message_from_node_in_tree(node, tree):
    expr = expression_by_materializing_expression_with_tree(node, tree)
    return babel_message_for_expression(understand(expr)[0])

def extract_messages_from_tree(tree, index=0):
    node = tree.nodes[index]
    if is_string_literal(node) or is_dom_node(node):
        yield message_from_node_in_tree(node, tree)
    else:
        for p, c in tree.adjacency:
            if p == index:
                for x in extract_messages_from_tree(tree, c):
                    yield x


if __name__ == '__main__':
    program = parse_file('test.js')
    print ast_children(program)
    # destructively_assign_parent_types_to_ast(program)
    # tree = tree_from_materialized_expression(program)
    # assert materialized_expression_from_tree(tree) == program
    # print tree.nodes


    # expressions = list(top_level_expressions_in_ast(program))
    # trees = [tree_from_materialized_expression(e) for e in expressions]
    # roots = map(root, trees)
    # # pprint([generate(r) for r in roots])
    # # print len(roots)
    # # print "----"
    # pprint([generate(materialized_expression_from_tree(t)) for t in trees])
    # pprint([list(extract_messages_from_tree(t)) for t in trees])

    # for e in expressions:
    #     assert e == materialized_expression_from_tree(tree_from_materialized_expression(e))


    # pprint(set(x['value'] for x in string_literals_in_ast(program)))

    # expr = list(message_expressions_in_ast(program))[-1]['arguments'][0]

    # orig_message = babel_message_for_expression(understand(expr)[0])
    # print orig_message
    # ident = expression_translated_by_message(expr, orig_message)
    # print "--------"
    # print "Original expression:"
    # recon = expression_translated_by_message(expr, translated)
    # print generate(expr)
    # print "--------"
    # print "Translated by '%s':" % translated
    # print generate(recon)
    # print "Does the identity hold?", generate(ident) == generate(expr)
