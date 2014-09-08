import re

def components_for_genshi_message(msg):
    """Parse a translated message using Genshi mixed content message
    formatting.

    >>> components_for_genshi_message("See [1:Help].")
    [(0, 'See '), (1, 'Help'), (0, '.')]

    >>> components_for_genshi_message("See [1:our [2:Help] page] for details.")
    [(0, 'See '), (1, 'our '), (2, 'Help'), (1, ' page'), (0, ' for details.')]

    >>> components_for_genshi_message("[2:Details] finden Sie in [1:Hilfe].")
    [(2, 'Details'), (0, ' finden Sie in '), (1, 'Hilfe'), (0, '.')]

    >>> components_for_genshi_message("[1:] Bilder pro Seite anzeigen.")
    [(1, ''), (0, ' Bilder pro Seite anzeigen.')]

    The original implementation from genshi had a couple of bugs that we
    fix here. The main one is that adjacent placeholders are handled correctly:

    >>> components_for_genshi_message("See [1:our ][2:Help] for details.")
    [(0, 'See '), (1, 'our '), (0, ''), (2, 'Help'), (0, ' for details.')]

    The presence of the (0, '') token allows you to distinguish this from:

    >>> components_for_genshi_message("See [1:our [2:Help]] for details.")
    [(0, 'See '), (1, 'our '), (2, 'Help'), (0, ' for details.')]

    Also, we now handle escaped closing brackets:

    >>> components_for_genshi_message("See [1:[Help\]]")
    [(0, 'See '), (1, '[Help]'), (0, '')]

    Known bugs:
    Extra closing brackets not associated with an opening bracket will
    cause a NotImplementedError exception.

    :param string: the translated message string
    :return: a list of ``(order, string)`` tuples
    :rtype: `list`
    """
    return list(_take_pairs(_components_for_genshi_message(msg)))


def _components_for_genshi_message(msg):
    tokens = _tokenize(msg)
    stack = [0]
    yield 0
    for token in tokens:
        if isinstance(token, int):
            stack.append(token)
            yield token
        elif token is _END:
            stack.pop()
            try:
                yield stack[-1]
            except IndexError:
                raise NotImplementedError(
                    "Unbalanced brackets (try escaping them) in genshi message: '%s'" % msg)
        else:
            yield token


def _tokenize(msg,
        main_re=re.compile(r'(\[\d+\:)|(?<!\\)(\])'),
        opening_re=re.compile(r'\[(\d+):')):
    """Return a list of tokens for a genshi message. A token is either:
    1) A literal string corresponding to part of the message that isn't
       an opening or closing bracket, with escaped closing brackets unescaped.
    2) An integer representing an opening bracket, e.g. '[1:' -> 1.
    3) The singleton _END representing a closing bracket."""
    def opening(s):
        m = opening_re.search(s)
        if m:
            return int(m.group(1))
    tokens = _remove_nones(main_re.split(msg))
    for t in tokens:
        if t == ']':
            yield _END
        elif opening(t):
            yield opening(t)
        else:
            yield t.replace('\]', ']')


# _END is a token representing the end of a placeholder.
_END = type('_EndType', (object,), {})()


def _take_pairs(L):
    L = L.__iter__()
    try:
        while True:
            yield (L.next(), L.next())
    except StopIteration:
        pass


def _remove_nones(L):
    return filter(lambda x: x is not None, L)
