#!/usr/bin/env python
# -*- coding: utf-8 -*-

import itertools

program = {
    "type": "Program",
    "body": [
        {
            "type": "VariableDeclaration",
            "declarations": [
                {
                    "type": "VariableDeclarator",
                    "id": {
                        "type": "Identifier",
                        "name": "FormModel"
                    },
                    "init": {
                        "type": "FunctionExpression",
                        "id": None,
                        "params": [
                            {
                                "type": "Identifier",
                                "name": "initialFieldValues"
                            },
                            {
                                "type": "Identifier",
                                "name": "constants"
                            }
                        ],
                        "defaults": [],
                        "body": {
                            "type": "BlockStatement",
                            "body": [
                                {
                                    "type": "VariableDeclaration",
                                    "declarations": [
                                        {
                                            "type": "VariableDeclarator",
                                            "id": {
                                                "type": "Identifier",
                                                "name": "orgDefaults"
                                            },
                                            "init": {
                                                "type": "ObjectExpression",
                                                "properties": [
                                                    {
                                                        "type": "Property",
                                                        "key": {
                                                            "type": "Identifier",
                                                            "name": "address"
                                                        },
                                                        "value": {
                                                            "type": "ObjectExpression",
                                                            "properties": [
                                                                {
                                                                    "type": "Property",
                                                                    "key": {
                                                                        "type": "Identifier",
                                                                        "name": "location"
                                                                    },
                                                                    "value": {
                                                                        "type": "Literal",
                                                                        "value": "",
                                                                        "raw": "''"
                                                                    },
                                                                    "kind": "init"
                                                                },
                                                                {
                                                                    "type": "Property",
                                                                    "key": {
                                                                        "type": "Identifier",
                                                                        "name": "geoid"
                                                                    },
                                                                    "value": {
                                                                        "type": "Literal",
                                                                        "value": None,
                                                                        "raw": "null"
                                                                    },
                                                                    "kind": "init"
                                                                },
                                                                {
                                                                    "type": "Property",
                                                                    "key": {
                                                                        "type": "Identifier",
                                                                        "name": "city"
                                                                    },
                                                                    "value": {
                                                                        "type": "Literal",
                                                                        "value": "",
                                                                        "raw": "''"
                                                                    },
                                                                    "kind": "init"
                                                                },
                                                                {
                                                                    "type": "Property",
                                                                    "key": {
                                                                        "type": "Identifier",
                                                                        "name": "state"
                                                                    },
                                                                    "value": {
                                                                        "type": "Literal",
                                                                        "value": "",
                                                                        "raw": "''"
                                                                    },
                                                                    "kind": "init"
                                                                },
                                                                {
                                                                    "type": "Property",
                                                                    "key": {
                                                                        "type": "Identifier",
                                                                        "name": "country"
                                                                    },
                                                                    "value": {
                                                                        "type": "Literal",
                                                                        "value": "",
                                                                        "raw": "''"
                                                                    },
                                                                    "kind": "init"
                                                                }
                                                            ]
                                                        },
                                                        "kind": "init"
                                                    },
                                                    {
                                                        "type": "Property",
                                                        "key": {
                                                            "type": "Identifier",
                                                            "name": "keywords"
                                                        },
                                                        "value": {
                                                            "type": "ArrayExpression",
                                                            "elements": []
                                                        },
                                                        "kind": "init"
                                                    },
                                                    {
                                                        "type": "Property",
                                                        "key": {
                                                            "type": "Identifier",
                                                            "name": "ein"
                                                        },
                                                        "value": {
                                                            "type": "Literal",
                                                            "value": "",
                                                            "raw": "''"
                                                        },
                                                        "kind": "init"
                                                    },
                                                    {
                                                        "type": "Property",
                                                        "key": {
                                                            "type": "Identifier",
                                                            "name": "mission"
                                                        },
                                                        "value": {
                                                            "type": "Literal",
                                                            "value": "",
                                                            "raw": "''"
                                                        },
                                                        "kind": "init"
                                                    },
                                                    {
                                                        "type": "Property",
                                                        "key": {
                                                            "type": "Identifier",
                                                            "name": "name"
                                                        },
                                                        "value": {
                                                            "type": "Literal",
                                                            "value": "",
                                                            "raw": "''"
                                                        },
                                                        "kind": "init"
                                                    },
                                                    {
                                                        "type": "Property",
                                                        "key": {
                                                            "type": "Identifier",
                                                            "name": "short_name"
                                                        },
                                                        "value": {
                                                            "type": "Literal",
                                                            "value": "",
                                                            "raw": "''"
                                                        },
                                                        "kind": "init"
                                                    },
                                                    {
                                                        "type": "Property",
                                                        "key": {
                                                            "type": "Identifier",
                                                            "name": "org_type"
                                                        },
                                                        "value": {
                                                            "type": "Literal",
                                                            "value": "Nonprofit",
                                                            "raw": "\"Nonprofit\""
                                                        },
                                                        "kind": "init"
                                                    },
                                                    {
                                                        "type": "Property",
                                                        "key": {
                                                            "type": "Identifier",
                                                            "name": "website"
                                                        },
                                                        "value": {
                                                            "type": "Literal",
                                                            "value": "",
                                                            "raw": "''"
                                                        },
                                                        "kind": "init"
                                                    }
                                                ]
                                            }
                                        }
                                    ],
                                    "kind": "var"
                                },
                                {
                                    "type": "IfStatement",
                                    "test": {
                                        "type": "CallExpression",
                                        "callee": {
                                            "type": "MemberExpression",
                                            "computed": False,
                                            "object": {
                                                "type": "Identifier",
                                                "name": "localStorage"
                                            },
                                            "property": {
                                                "type": "Identifier",
                                                "name": "getItem"
                                            }
                                        },
                                        "arguments": [
                                            {
                                                "type": "Literal",
                                                "value": "OrgIntake",
                                                "raw": "'OrgIntake'"
                                            }
                                        ]
                                    },
                                    "consequent": {
                                        "type": "BlockStatement",
                                        "body": [
                                            {
                                                "type": "ExpressionStatement",
                                                "expression": {
                                                    "type": "AssignmentExpression",
                                                    "operator": "=",
                                                    "left": {
                                                        "type": "Identifier",
                                                        "name": "orgDefaults"
                                                    },
                                                    "right": {
                                                        "type": "CallExpression",
                                                        "callee": {
                                                            "type": "MemberExpression",
                                                            "computed": False,
                                                            "object": {
                                                                "type": "Identifier",
                                                                "name": "JSON"
                                                            },
                                                            "property": {
                                                                "type": "Identifier",
                                                                "name": "parse"
                                                            }
                                                        },
                                                        "arguments": [
                                                            {
                                                                "type": "CallExpression",
                                                                "callee": {
                                                                    "type": "MemberExpression",
                                                                    "computed": False,
                                                                    "object": {
                                                                        "type": "Identifier",
                                                                        "name": "localStorage"
                                                                    },
                                                                    "property": {
                                                                        "type": "Identifier",
                                                                        "name": "getItem"
                                                                    }
                                                                },
                                                                "arguments": [
                                                                    {
                                                                        "type": "Literal",
                                                                        "value": "OrgIntake",
                                                                        "raw": "'OrgIntake'"
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                }
                                            }
                                        ]
                                    },
                                    "alternate": None
                                },
                                {
                                    "type": "ExpressionStatement",
                                    "expression": {
                                        "type": "AssignmentExpression",
                                        "operator": "=",
                                        "left": {
                                            "type": "MemberExpression",
                                            "computed": False,
                                            "object": {
                                                "type": "ThisExpression"
                                            },
                                            "property": {
                                                "type": "Identifier",
                                                "name": "_fieldValues"
                                            }
                                        },
                                        "right": {
                                            "type": "CallExpression",
                                            "callee": {
                                                "type": "MemberExpression",
                                                "computed": False,
                                                "object": {
                                                    "type": "Identifier",
                                                    "name": "_"
                                                },
                                                "property": {
                                                    "type": "Identifier",
                                                    "name": "defaults"
                                                }
                                            },
                                            "arguments": [
                                                {
                                                    "type": "Identifier",
                                                    "name": "initialFieldValues"
                                                },
                                                {
                                                    "type": "Identifier",
                                                    "name": "orgDefaults"
                                                }
                                            ]
                                        }
                                    }
                                },
                                {
                                    "type": "ExpressionStatement",
                                    "expression": {
                                        "type": "AssignmentExpression",
                                        "operator": "=",
                                        "left": {
                                            "type": "MemberExpression",
                                            "computed": False,
                                            "object": {
                                                "type": "ThisExpression"
                                            },
                                            "property": {
                                                "type": "Identifier",
                                                "name": "constants"
                                            }
                                        },
                                        "right": {
                                            "type": "CallExpression",
                                            "callee": {
                                                "type": "MemberExpression",
                                                "computed": False,
                                                "object": {
                                                    "type": "Identifier",
                                                    "name": "DEF"
                                                },
                                                "property": {
                                                    "type": "Identifier",
                                                    "name": "immutableCopy"
                                                }
                                            },
                                            "arguments": [
                                                {
                                                    "type": "Identifier",
                                                    "name": "constants"
                                                }
                                            ]
                                        }
                                    }
                                },
                                {
                                    "type": "ExpressionStatement",
                                    "expression": {
                                        "type": "AssignmentExpression",
                                        "operator": "=",
                                        "left": {
                                            "type": "MemberExpression",
                                            "computed": False,
                                            "object": {
                                                "type": "ThisExpression"
                                            },
                                            "property": {
                                                "type": "Identifier",
                                                "name": "_fieldErrorMessages"
                                            }
                                        },
                                        "right": {
                                            "type": "ObjectExpression",
                                            "properties": []
                                        }
                                    }
                                },
                                {
                                    "type": "ExpressionStatement",
                                    "expression": {
                                        "type": "AssignmentExpression",
                                        "operator": "=",
                                        "left": {
                                            "type": "MemberExpression",
                                            "computed": False,
                                            "object": {
                                                "type": "ThisExpression"
                                            },
                                            "property": {
                                                "type": "Identifier",
                                                "name": "_submissionErrorMessage"
                                            }
                                        },
                                        "right": {
                                            "type": "Literal",
                                            "value": "",
                                            "raw": "''"
                                        }
                                    }
                                },
                                {
                                    "type": "ExpressionStatement",
                                    "expression": {
                                        "type": "AssignmentExpression",
                                        "operator": "=",
                                        "left": {
                                            "type": "MemberExpression",
                                            "computed": False,
                                            "object": {
                                                "type": "ThisExpression"
                                            },
                                            "property": {
                                                "type": "Identifier",
                                                "name": "_submissionState"
                                            }
                                        },
                                        "right": {
                                            "type": "Literal",
                                            "value": "editable",
                                            "raw": "'editable'"
                                        }
                                    }
                                },
                                {
                                    "type": "ExpressionStatement",
                                    "expression": {
                                        "type": "AssignmentExpression",
                                        "operator": "=",
                                        "left": {
                                            "type": "MemberExpression",
                                            "computed": False,
                                            "object": {
                                                "type": "ThisExpression"
                                            },
                                            "property": {
                                                "type": "Identifier",
                                                "name": "_knownExistingOrgsByName"
                                            }
                                        },
                                        "right": {
                                            "type": "ObjectExpression",
                                            "properties": []
                                        }
                                    }
                                },
                                {
                                    "type": "ExpressionStatement",
                                    "expression": {
                                        "type": "CallExpression",
                                        "callee": {
                                            "type": "MemberExpression",
                                            "computed": False,
                                            "object": {
                                                "type": "MemberExpression",
                                                "computed": False,
                                                "object": {
                                                    "type": "Identifier",
                                                    "name": "_"
                                                },
                                                "property": {
                                                    "type": "Identifier",
                                                    "name": "bindAll"
                                                }
                                            },
                                            "property": {
                                                "type": "Identifier",
                                                "name": "apply"
                                            }
                                        },
                                        "arguments": [
                                            {
                                                "type": "Identifier",
                                                "name": "_"
                                            },
                                            {
                                                "type": "CallExpression",
                                                "callee": {
                                                    "type": "MemberExpression",
                                                    "computed": False,
                                                    "object": {
                                                        "type": "ArrayExpression",
                                                        "elements": [
                                                            {
                                                                "type": "ThisExpression"
                                                            }
                                                        ]
                                                    },
                                                    "property": {
                                                        "type": "Identifier",
                                                        "name": "concat"
                                                    }
                                                },
                                                "arguments": [
                                                    {
                                                        "type": "CallExpression",
                                                        "callee": {
                                                            "type": "MemberExpression",
                                                            "computed": False,
                                                            "object": {
                                                                "type": "Identifier",
                                                                "name": "_"
                                                            },
                                                            "property": {
                                                                "type": "Identifier",
                                                                "name": "functions"
                                                            }
                                                        },
                                                        "arguments": [
                                                            {
                                                                "type": "ThisExpression"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        "rest": None,
                        "generator": False,
                        "expression": False
                    }
                }
            ],
            "kind": "var"
        },
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "CallExpression",
                "callee": {
                    "type": "MemberExpression",
                    "computed": False,
                    "object": {
                        "type": "Identifier",
                        "name": "_"
                    },
                    "property": {
                        "type": "Identifier",
                        "name": "extend"
                    }
                },
                "arguments": [
                    {
                        "type": "MemberExpression",
                        "computed": False,
                        "object": {
                            "type": "Identifier",
                            "name": "FormModel"
                        },
                        "property": {
                            "type": "Identifier",
                            "name": "prototype"
                        }
                    },
                    {
                        "type": "MemberExpression",
                        "computed": False,
                        "object": {
                            "type": "Identifier",
                            "name": "ABC"
                        },
                        "property": {
                            "type": "Identifier",
                            "name": "Observable"
                        }
                    }
                ]
            }
        },
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "AssignmentExpression",
                "operator": "=",
                "left": {
                    "type": "MemberExpression",
                    "computed": False,
                    "object": {
                        "type": "MemberExpression",
                        "computed": False,
                        "object": {
                            "type": "Identifier",
                            "name": "FormModel"
                        },
                        "property": {
                            "type": "Identifier",
                            "name": "prototype"
                        }
                    },
                    "property": {
                        "type": "Identifier",
                        "name": "errorMessageForFieldNamed"
                    }
                },
                "right": {
                    "type": "FunctionExpression",
                    "id": None,
                    "params": [
                        {
                            "type": "Identifier",
                            "name": "name"
                        }
                    ],
                    "defaults": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ReturnStatement",
                                "argument": {
                                    "type": "CallExpression",
                                    "callee": {
                                        "type": "MemberExpression",
                                        "computed": False,
                                        "object": {
                                            "type": "Identifier",
                                            "name": "DEF"
                                        },
                                        "property": {
                                            "type": "Identifier",
                                            "name": "immutableCopy"
                                        }
                                    },
                                    "arguments": [
                                        {
                                            "type": "MemberExpression",
                                            "computed": True,
                                            "object": {
                                                "type": "MemberExpression",
                                                "computed": False,
                                                "object": {
                                                    "type": "ThisExpression"
                                                },
                                                "property": {
                                                    "type": "Identifier",
                                                    "name": "_fieldErrorMessages"
                                                }
                                            },
                                            "property": {
                                                "type": "Identifier",
                                                "name": "name"
                                            }
                                        }
                                    ]
                                }
                            }
                        ]
                    },
                    "rest": None,
                    "generator": False,
                    "expression": False
                }
            }
        },
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "AssignmentExpression",
                "operator": "=",
                "left": {
                    "type": "MemberExpression",
                    "computed": False,
                    "object": {
                        "type": "MemberExpression",
                        "computed": False,
                        "object": {
                            "type": "Identifier",
                            "name": "FormModel"
                        },
                        "property": {
                            "type": "Identifier",
                            "name": "prototype"
                        }
                    },
                    "property": {
                        "type": "Identifier",
                        "name": "valueForFieldNamed"
                    }
                },
                "right": {
                    "type": "FunctionExpression",
                    "id": None,
                    "params": [
                        {
                            "type": "Identifier",
                            "name": "name"
                        }
                    ],
                    "defaults": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ReturnStatement",
                                "argument": {
                                    "type": "CallExpression",
                                    "callee": {
                                        "type": "MemberExpression",
                                        "computed": False,
                                        "object": {
                                            "type": "Identifier",
                                            "name": "DEF"
                                        },
                                        "property": {
                                            "type": "Identifier",
                                            "name": "immutableCopy"
                                        }
                                    },
                                    "arguments": [
                                        {
                                            "type": "MemberExpression",
                                            "computed": True,
                                            "object": {
                                                "type": "MemberExpression",
                                                "computed": False,
                                                "object": {
                                                    "type": "ThisExpression"
                                                },
                                                "property": {
                                                    "type": "Identifier",
                                                    "name": "_fieldValues"
                                                }
                                            },
                                            "property": {
                                                "type": "Identifier",
                                                "name": "name"
                                            }
                                        }
                                    ]
                                }
                            }
                        ]
                    },
                    "rest": None,
                    "generator": False,
                    "expression": False
                }
            }
        },
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "AssignmentExpression",
                "operator": "=",
                "left": {
                    "type": "MemberExpression",
                    "computed": False,
                    "object": {
                        "type": "MemberExpression",
                        "computed": False,
                        "object": {
                            "type": "Identifier",
                            "name": "FormModel"
                        },
                        "property": {
                            "type": "Identifier",
                            "name": "prototype"
                        }
                    },
                    "property": {
                        "type": "Identifier",
                        "name": "setValueForField"
                    }
                },
                "right": {
                    "type": "FunctionExpression",
                    "id": None,
                    "params": [
                        {
                            "type": "Identifier",
                            "name": "name"
                        },
                        {
                            "type": "Identifier",
                            "name": "value"
                        }
                    ],
                    "defaults": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ExpressionStatement",
                                "expression": {
                                    "type": "AssignmentExpression",
                                    "operator": "=",
                                    "left": {
                                        "type": "MemberExpression",
                                        "computed": False,
                                        "object": {
                                            "type": "ThisExpression"
                                        },
                                        "property": {
                                            "type": "Identifier",
                                            "name": "_fieldValues"
                                        }
                                    },
                                    "right": {
                                        "type": "CallExpression",
                                        "callee": {
                                            "type": "MemberExpression",
                                            "computed": False,
                                            "object": {
                                                "type": "Identifier",
                                                "name": "_"
                                            },
                                            "property": {
                                                "type": "Identifier",
                                                "name": "defaults"
                                            }
                                        },
                                        "arguments": [
                                            {
                                                "type": "CallExpression",
                                                "callee": {
                                                    "type": "MemberExpression",
                                                    "computed": False,
                                                    "object": {
                                                        "type": "Identifier",
                                                        "name": "DEF"
                                                    },
                                                    "property": {
                                                        "type": "Identifier",
                                                        "name": "objectWithPair"
                                                    }
                                                },
                                                "arguments": [
                                                    {
                                                        "type": "Identifier",
                                                        "name": "name"
                                                    },
                                                    {
                                                        "type": "Identifier",
                                                        "name": "value"
                                                    }
                                                ]
                                            },
                                            {
                                                "type": "MemberExpression",
                                                "computed": False,
                                                "object": {
                                                    "type": "ThisExpression"
                                                },
                                                "property": {
                                                    "type": "Identifier",
                                                    "name": "_fieldValues"
                                                }
                                            }
                                        ]
                                    }
                                }
                            },
                            {
                                "type": "IfStatement",
                                "test": {
                                    "type": "CallExpression",
                                    "callee": {
                                        "type": "MemberExpression",
                                        "computed": False,
                                        "object": {
                                            "type": "Identifier",
                                            "name": "_"
                                        },
                                        "property": {
                                            "type": "Identifier",
                                            "name": "contains"
                                        }
                                    },
                                    "arguments": [
                                        {
                                            "type": "ArrayExpression",
                                            "elements": [
                                                {
                                                    "type": "Literal",
                                                    "value": "org_type",
                                                    "raw": "'org_type'"
                                                },
                                                {
                                                    "type": "Literal",
                                                    "value": "address",
                                                    "raw": "'address'"
                                                }
                                            ]
                                        },
                                        {
                                            "type": "Identifier",
                                            "name": "name"
                                        }
                                    ]
                                },
                                "consequent": {
                                    "type": "BlockStatement",
                                    "body": [
                                        {
                                            "type": "ExpressionStatement",
                                            "expression": {
                                                "type": "CallExpression",
                                                "callee": {
                                                    "type": "MemberExpression",
                                                    "computed": False,
                                                    "object": {
                                                        "type": "Identifier",
                                                        "name": "localStorage"
                                                    },
                                                    "property": {
                                                        "type": "Identifier",
                                                        "name": "setItem"
                                                    }
                                                },
                                                "arguments": [
                                                    {
                                                        "type": "Literal",
                                                        "value": "OrgIntake",
                                                        "raw": "'OrgIntake'"
                                                    },
                                                    {
                                                        "type": "CallExpression",
                                                        "callee": {
                                                            "type": "MemberExpression",
                                                            "computed": False,
                                                            "object": {
                                                                "type": "Identifier",
                                                                "name": "JSON"
                                                            },
                                                            "property": {
                                                                "type": "Identifier",
                                                                "name": "stringify"
                                                            }
                                                        },
                                                        "arguments": [
                                                            {
                                                                "type": "CallExpression",
                                                                "callee": {
                                                                    "type": "MemberExpression",
                                                                    "computed": False,
                                                                    "object": {
                                                                        "type": "Identifier",
                                                                        "name": "_"
                                                                    },
                                                                    "property": {
                                                                        "type": "Identifier",
                                                                        "name": "pick"
                                                                    }
                                                                },
                                                                "arguments": [
                                                                    {
                                                                        "type": "MemberExpression",
                                                                        "computed": False,
                                                                        "object": {
                                                                            "type": "ThisExpression"
                                                                        },
                                                                        "property": {
                                                                            "type": "Identifier",
                                                                            "name": "_fieldValues"
                                                                        }
                                                                    },
                                                                    {
                                                                        "type": "ArrayExpression",
                                                                        "elements": [
                                                                            {
                                                                                "type": "Literal",
                                                                                "value": "org_type",
                                                                                "raw": "'org_type'"
                                                                            },
                                                                            {
                                                                                "type": "Literal",
                                                                                "value": "address",
                                                                                "raw": "'address'"
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                },
                                "alternate": None
                            },
                            {
                                "type": "ExpressionStatement",
                                "expression": {
                                    "type": "CallExpression",
                                    "callee": {
                                        "type": "MemberExpression",
                                        "computed": False,
                                        "object": {
                                            "type": "ThisExpression"
                                        },
                                        "property": {
                                            "type": "Identifier",
                                            "name": "notifyObserversOfChange"
                                        }
                                    },
                                    "arguments": []
                                }
                            }
                        ]
                    },
                    "rest": None,
                    "generator": False,
                    "expression": False
                }
            }
        },
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "AssignmentExpression",
                "operator": "=",
                "left": {
                    "type": "MemberExpression",
                    "computed": False,
                    "object": {
                        "type": "MemberExpression",
                        "computed": False,
                        "object": {
                            "type": "Identifier",
                            "name": "FormModel"
                        },
                        "property": {
                            "type": "Identifier",
                            "name": "prototype"
                        }
                    },
                    "property": {
                        "type": "Identifier",
                        "name": "pricingMarkup"
                    }
                },
                "right": {
                    "type": "FunctionExpression",
                    "id": None,
                    "params": [],
                    "defaults": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "IfStatement",
                                "test": {
                                    "type": "BinaryExpression",
                                    "operator": "===",
                                    "left": {
                                        "type": "MemberExpression",
                                        "computed": False,
                                        "object": {
                                            "type": "ThisExpression"
                                        },
                                        "property": {
                                            "type": "Identifier",
                                            "name": "_lastRetrievedPricingMarkup"
                                        }
                                    },
                                    "right": {
                                        "type": "Identifier",
                                        "name": "undefined"
                                    }
                                },
                                "consequent": {
                                    "type": "BlockStatement",
                                    "body": [
                                        {
                                            "type": "ExpressionStatement",
                                            "expression": {
                                                "type": "AssignmentExpression",
                                                "operator": "=",
                                                "left": {
                                                    "type": "MemberExpression",
                                                    "computed": False,
                                                    "object": {
                                                        "type": "ThisExpression"
                                                    },
                                                    "property": {
                                                        "type": "Identifier",
                                                        "name": "_lastRetrievedPricingMarkup"
                                                    }
                                                },
                                                "right": {
                                                    "type": "Literal",
                                                    "value": "",
                                                    "raw": "\"\""
                                                }
                                            }
                                        }
                                    ]
                                },
                                "alternate": None
                            },
                            {
                                "type": "ExpressionStatement",
                                "expression": {
                                    "type": "CallExpression",
                                    "callee": {
                                        "type": "MemberExpression",
                                        "computed": False,
                                        "object": {
                                            "type": "CallExpression",
                                            "callee": {
                                                "type": "MemberExpression",
                                                "computed": False,
                                                "object": {
                                                    "type": "Identifier",
                                                    "name": "DEF"
                                                },
                                                "property": {
                                                    "type": "Identifier",
                                                    "name": "cachedGet"
                                                }
                                            },
                                            "arguments": [
                                                {
                                                    "type": "Literal",
                                                    "value": "org-pricing-summary",
                                                    "raw": "'org-pricing-summary'"
                                                },
                                                {
                                                    "type": "ObjectExpression",
                                                    "properties": []
                                                },
                                                {
                                                    "type": "ObjectExpression",
                                                    "properties": [
                                                        {
                                                            "type": "Property",
                                                            "key": {
                                                                "type": "Identifier",
                                                                "name": "query"
                                                            },
                                                            "value": {
                                                                "type": "ObjectExpression",
                                                                "properties": [
                                                                    {
                                                                        "type": "Property",
                                                                        "key": {
                                                                            "type": "Identifier",
                                                                            "name": "country_code"
                                                                        },
                                                                        "value": {
                                                                            "type": "CallExpression",
                                                                            "callee": {
                                                                                "type": "MemberExpression",
                                                                                "computed": False,
                                                                                "object": {
                                                                                    "type": "ThisExpression"
                                                                                },
                                                                                "property": {
                                                                                    "type": "Identifier",
                                                                                    "name": "countryCode"
                                                                                }
                                                                            },
                                                                            "arguments": []
                                                                        },
                                                                        "kind": "init"
                                                                    },
                                                                    {
                                                                        "type": "Property",
                                                                        "key": {
                                                                            "type": "Identifier",
                                                                            "name": "language_code"
                                                                        },
                                                                        "value": {
                                                                            "type": "MemberExpression",
                                                                            "computed": False,
                                                                            "object": {
                                                                                "type": "MemberExpression",
                                                                                "computed": False,
                                                                                "object": {
                                                                                    "type": "ThisExpression"
                                                                                },
                                                                                "property": {
                                                                                    "type": "Identifier",
                                                                                    "name": "constants"
                                                                                }
                                                                            },
                                                                            "property": {
                                                                                "type": "Identifier",
                                                                                "name": "languageCode"
                                                                            }
                                                                        },
                                                                        "kind": "init"
                                                                    },
                                                                    {
                                                                        "type": "Property",
                                                                        "key": {
                                                                            "type": "Identifier",
                                                                            "name": "org_type"
                                                                        },
                                                                        "value": {
                                                                            "type": "MemberExpression",
                                                                            "computed": False,
                                                                            "object": {
                                                                                "type": "CallExpression",
                                                                                "callee": {
                                                                                    "type": "MemberExpression",
                                                                                    "computed": False,
                                                                                    "object": {
                                                                                        "type": "ThisExpression"
                                                                                    },
                                                                                    "property": {
                                                                                        "type": "Identifier",
                                                                                        "name": "orgType"
                                                                                    }
                                                                                },
                                                                                "arguments": []
                                                                            },
                                                                            "property": {
                                                                                "type": "Identifier",
                                                                                "name": "name"
                                                                            }
                                                                        },
                                                                        "kind": "init"
                                                                    }
                                                                ]
                                                            },
                                                            "kind": "init"
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        "property": {
                                            "type": "Identifier",
                                            "name": "then"
                                        }
                                    },
                                    "arguments": [
                                        {
                                            "type": "CallExpression",
                                            "callee": {
                                                "type": "MemberExpression",
                                                "computed": False,
                                                "object": {
                                                    "type": "FunctionExpression",
                                                    "id": None,
                                                    "params": [
                                                        {
                                                            "type": "Identifier",
                                                            "name": "res"
                                                        }
                                                    ],
                                                    "defaults": [],
                                                    "body": {
                                                        "type": "BlockStatement",
                                                        "body": [
                                                            {
                                                                "type": "IfStatement",
                                                                "test": {
                                                                    "type": "BinaryExpression",
                                                                    "operator": "===",
                                                                    "left": {
                                                                        "type": "MemberExpression",
                                                                        "computed": False,
                                                                        "object": {
                                                                            "type": "Identifier",
                                                                            "name": "res"
                                                                        },
                                                                        "property": {
                                                                            "type": "Identifier",
                                                                            "name": "status"
                                                                        }
                                                                    },
                                                                    "right": {
                                                                        "type": "Literal",
                                                                        "value": 200,
                                                                        "raw": "200"
                                                                    }
                                                                },
                                                                "consequent": {
                                                                    "type": "BlockStatement",
                                                                    "body": [
                                                                        {
                                                                            "type": "IfStatement",
                                                                            "test": {
                                                                                "type": "BinaryExpression",
                                                                                "operator": "!==",
                                                                                "left": {
                                                                                    "type": "MemberExpression",
                                                                                    "computed": False,
                                                                                    "object": {
                                                                                        "type": "Identifier",
                                                                                        "name": "res"
                                                                                    },
                                                                                    "property": {
                                                                                        "type": "Identifier",
                                                                                        "name": "text"
                                                                                    }
                                                                                },
                                                                                "right": {
                                                                                    "type": "MemberExpression",
                                                                                    "computed": False,
                                                                                    "object": {
                                                                                        "type": "ThisExpression"
                                                                                    },
                                                                                    "property": {
                                                                                        "type": "Identifier",
                                                                                        "name": "_lastRetrievedPricingMarkup"
                                                                                    }
                                                                                }
                                                                            },
                                                                            "consequent": {
                                                                                "type": "BlockStatement",
                                                                                "body": [
                                                                                    {
                                                                                        "type": "ExpressionStatement",
                                                                                        "expression": {
                                                                                            "type": "AssignmentExpression",
                                                                                            "operator": "=",
                                                                                            "left": {
                                                                                                "type": "MemberExpression",
                                                                                                "computed": False,
                                                                                                "object": {
                                                                                                    "type": "ThisExpression"
                                                                                                },
                                                                                                "property": {
                                                                                                    "type": "Identifier",
                                                                                                    "name": "_lastRetrievedPricingMarkup"
                                                                                                }
                                                                                            },
                                                                                            "right": {
                                                                                                "type": "MemberExpression",
                                                                                                "computed": False,
                                                                                                "object": {
                                                                                                    "type": "Identifier",
                                                                                                    "name": "res"
                                                                                                },
                                                                                                "property": {
                                                                                                    "type": "Identifier",
                                                                                                    "name": "text"
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    },
                                                                                    {
                                                                                        "type": "ExpressionStatement",
                                                                                        "expression": {
                                                                                            "type": "CallExpression",
                                                                                            "callee": {
                                                                                                "type": "MemberExpression",
                                                                                                "computed": False,
                                                                                                "object": {
                                                                                                    "type": "Identifier",
                                                                                                    "name": "_"
                                                                                                },
                                                                                                "property": {
                                                                                                    "type": "Identifier",
                                                                                                    "name": "defer"
                                                                                                }
                                                                                            },
                                                                                            "arguments": [
                                                                                                {
                                                                                                    "type": "MemberExpression",
                                                                                                    "computed": False,
                                                                                                    "object": {
                                                                                                        "type": "ThisExpression"
                                                                                                    },
                                                                                                    "property": {
                                                                                                        "type": "Identifier",
                                                                                                        "name": "notifyObserversOfChange"
                                                                                                    }
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "alternate": None
                                                                        }
                                                                    ]
                                                                },
                                                                "alternate": None
                                                            }
                                                        ]
                                                    },
                                                    "rest": None,
                                                    "generator": False,
                                                    "expression": False
                                                },
                                                "property": {
                                                    "type": "Identifier",
                                                    "name": "bind"
                                                }
                                            },
                                            "arguments": [
                                                {
                                                    "type": "ThisExpression"
                                                }
                                            ]
                                        }
                                    ]
                                }
                            },
                            {
                                "type": "ReturnStatement",
                                "argument": {
                                    "type": "MemberExpression",
                                    "computed": False,
                                    "object": {
                                        "type": "ThisExpression"
                                    },
                                    "property": {
                                        "type": "Identifier",
                                        "name": "_lastRetrievedPricingMarkup"
                                    }
                                }
                            }
                        ]
                    },
                    "rest": None,
                    "generator": False,
                    "expression": False
                }
            }
        },
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "AssignmentExpression",
                "operator": "=",
                "left": {
                    "type": "MemberExpression",
                    "computed": False,
                    "object": {
                        "type": "MemberExpression",
                        "computed": False,
                        "object": {
                            "type": "Identifier",
                            "name": "FormModel"
                        },
                        "property": {
                            "type": "Identifier",
                            "name": "prototype"
                        }
                    },
                    "property": {
                        "type": "Identifier",
                        "name": "orgsWereSeen"
                    }
                },
                "right": {
                    "type": "FunctionExpression",
                    "id": None,
                    "params": [
                        {
                            "type": "Identifier",
                            "name": "orgs"
                        }
                    ],
                    "defaults": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ExpressionStatement",
                                "expression": {
                                    "type": "CallExpression",
                                    "callee": {
                                        "type": "MemberExpression",
                                        "computed": False,
                                        "object": {
                                            "type": "Identifier",
                                            "name": "orgs"
                                        },
                                        "property": {
                                            "type": "Identifier",
                                            "name": "forEach"
                                        }
                                    },
                                    "arguments": [
                                        {
                                            "type": "FunctionExpression",
                                            "id": None,
                                            "params": [
                                                {
                                                    "type": "Identifier",
                                                    "name": "org"
                                                }
                                            ],
                                            "defaults": [],
                                            "body": {
                                                "type": "BlockStatement",
                                                "body": [
                                                    {
                                                        "type": "ExpressionStatement",
                                                        "expression": {
                                                            "type": "AssignmentExpression",
                                                            "operator": "=",
                                                            "left": {
                                                                "type": "MemberExpression",
                                                                "computed": True,
                                                                "object": {
                                                                    "type": "MemberExpression",
                                                                    "computed": False,
                                                                    "object": {
                                                                        "type": "ThisExpression"
                                                                    },
                                                                    "property": {
                                                                        "type": "Identifier",
                                                                        "name": "_knownExistingOrgsByName"
                                                                    }
                                                                },
                                                                "property": {
                                                                    "type": "MemberExpression",
                                                                    "computed": False,
                                                                    "object": {
                                                                        "type": "Identifier",
                                                                        "name": "org"
                                                                    },
                                                                    "property": {
                                                                        "type": "Identifier",
                                                                        "name": "name"
                                                                    }
                                                                }
                                                            },
                                                            "right": {
                                                                "type": "Identifier",
                                                                "name": "org"
                                                            }
                                                        }
                                                    }
                                                ]
                                            },
                                            "rest": None,
                                            "generator": False,
                                            "expression": False
                                        },
                                        {
                                            "type": "ThisExpression"
                                        }
                                    ]
                                }
                            }
                        ]
                    },
                    "rest": None,
                    "generator": False,
                    "expression": False
                }
            }
        },
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "AssignmentExpression",
                "operator": "=",
                "left": {
                    "type": "MemberExpression",
                    "computed": False,
                    "object": {
                        "type": "MemberExpression",
                        "computed": False,
                        "object": {
                            "type": "Identifier",
                            "name": "FormModel"
                        },
                        "property": {
                            "type": "Identifier",
                            "name": "prototype"
                        }
                    },
                    "property": {
                        "type": "Identifier",
                        "name": "existingOrgIsSelected"
                    }
                },
                "right": {
                    "type": "FunctionExpression",
                    "id": None,
                    "params": [],
                    "defaults": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ReturnStatement",
                                "argument": {
                                    "type": "CallExpression",
                                    "callee": {
                                        "type": "MemberExpression",
                                        "computed": False,
                                        "object": {
                                            "type": "Identifier",
                                            "name": "_"
                                        },
                                        "property": {
                                            "type": "Identifier",
                                            "name": "has"
                                        }
                                    },
                                    "arguments": [
                                        {
                                            "type": "MemberExpression",
                                            "computed": False,
                                            "object": {
                                                "type": "ThisExpression"
                                            },
                                            "property": {
                                                "type": "Identifier",
                                                "name": "_knownExistingOrgsByName"
                                            }
                                        },
                                        {
                                            "type": "CallExpression",
                                            "callee": {
                                                "type": "MemberExpression",
                                                "computed": False,
                                                "object": {
                                                    "type": "ThisExpression"
                                                },
                                                "property": {
                                                    "type": "Identifier",
                                                    "name": "valueForFieldNamed"
                                                }
                                            },
                                            "arguments": [
                                                {
                                                    "type": "Literal",
                                                    "value": "name",
                                                    "raw": "'name'"
                                                }
                                            ]
                                        }
                                    ]
                                }
                            }
                        ]
                    },
                    "rest": None,
                    "generator": False,
                    "expression": False
                }
            }
        },
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "AssignmentExpression",
                "operator": "=",
                "left": {
                    "type": "MemberExpression",
                    "computed": False,
                    "object": {
                        "type": "MemberExpression",
                        "computed": False,
                        "object": {
                            "type": "Identifier",
                            "name": "FormModel"
                        },
                        "property": {
                            "type": "Identifier",
                            "name": "prototype"
                        }
                    },
                    "property": {
                        "type": "Identifier",
                        "name": "selectedExistingOrg"
                    }
                },
                "right": {
                    "type": "FunctionExpression",
                    "id": None,
                    "params": [],
                    "defaults": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ReturnStatement",
                                "argument": {
                                    "type": "MemberExpression",
                                    "computed": True,
                                    "object": {
                                        "type": "MemberExpression",
                                        "computed": False,
                                        "object": {
                                            "type": "ThisExpression"
                                        },
                                        "property": {
                                            "type": "Identifier",
                                            "name": "_knownExistingOrgsByName"
                                        }
                                    },
                                    "property": {
                                        "type": "CallExpression",
                                        "callee": {
                                            "type": "MemberExpression",
                                            "computed": False,
                                            "object": {
                                                "type": "ThisExpression"
                                            },
                                            "property": {
                                                "type": "Identifier",
                                                "name": "valueForFieldNamed"
                                            }
                                        },
                                        "arguments": [
                                            {
                                                "type": "Literal",
                                                "value": "name",
                                                "raw": "'name'"
                                            }
                                        ]
                                    }
                                }
                            }
                        ]
                    },
                    "rest": None,
                    "generator": False,
                    "expression": False
                }
            }
        },
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "AssignmentExpression",
                "operator": "=",
                "left": {
                    "type": "MemberExpression",
                    "computed": False,
                    "object": {
                        "type": "MemberExpression",
                        "computed": False,
                        "object": {
                            "type": "Identifier",
                            "name": "FormModel"
                        },
                        "property": {
                            "type": "Identifier",
                            "name": "prototype"
                        }
                    },
                    "property": {
                        "type": "Identifier",
                        "name": "countryCode"
                    }
                },
                "right": {
                    "type": "FunctionExpression",
                    "id": None,
                    "params": [],
                    "defaults": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ReturnStatement",
                                "argument": {
                                    "type": "LogicalExpression",
                                    "operator": "||",
                                    "left": {
                                        "type": "MemberExpression",
                                        "computed": False,
                                        "object": {
                                            "type": "CallExpression",
                                            "callee": {
                                                "type": "MemberExpression",
                                                "computed": False,
                                                "object": {
                                                    "type": "ThisExpression"
                                                },
                                                "property": {
                                                    "type": "Identifier",
                                                    "name": "valueForFieldNamed"
                                                }
                                            },
                                            "arguments": [
                                                {
                                                    "type": "Literal",
                                                    "value": "address",
                                                    "raw": "'address'"
                                                }
                                            ]
                                        },
                                        "property": {
                                            "type": "Identifier",
                                            "name": "country"
                                        }
                                    },
                                    "right": {
                                        "type": "MemberExpression",
                                        "computed": False,
                                        "object": {
                                            "type": "MemberExpression",
                                            "computed": False,
                                            "object": {
                                                "type": "ThisExpression"
                                            },
                                            "property": {
                                                "type": "Identifier",
                                                "name": "constants"
                                            }
                                        },
                                        "property": {
                                            "type": "Identifier",
                                            "name": "countryCodeGuess"
                                        }
                                    }
                                }
                            }
                        ]
                    },
                    "rest": None,
                    "generator": False,
                    "expression": False
                }
            }
        },
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "AssignmentExpression",
                "operator": "=",
                "left": {
                    "type": "MemberExpression",
                    "computed": False,
                    "object": {
                        "type": "MemberExpression",
                        "computed": False,
                        "object": {
                            "type": "Identifier",
                            "name": "FormModel"
                        },
                        "property": {
                            "type": "Identifier",
                            "name": "prototype"
                        }
                    },
                    "property": {
                        "type": "Identifier",
                        "name": "countryName"
                    }
                },
                "right": {
                    "type": "FunctionExpression",
                    "id": None,
                    "params": [],
                    "defaults": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ReturnStatement",
                                "argument": {
                                    "type": "MemberExpression",
                                    "computed": False,
                                    "object": {
                                        "type": "CallExpression",
                                        "callee": {
                                            "type": "MemberExpression",
                                            "computed": False,
                                            "object": {
                                                "type": "ThisExpression"
                                            },
                                            "property": {
                                                "type": "Identifier",
                                                "name": "valueForFieldNamed"
                                            }
                                        },
                                        "arguments": [
                                            {
                                                "type": "Literal",
                                                "value": "address",
                                                "raw": "'address'"
                                            }
                                        ]
                                    },
                                    "property": {
                                        "type": "Identifier",
                                        "name": "country_name"
                                    }
                                }
                            }
                        ]
                    },
                    "rest": None,
                    "generator": False,
                    "expression": False
                }
            }
        },
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "AssignmentExpression",
                "operator": "=",
                "left": {
                    "type": "MemberExpression",
                    "computed": False,
                    "object": {
                        "type": "MemberExpression",
                        "computed": False,
                        "object": {
                            "type": "Identifier",
                            "name": "FormModel"
                        },
                        "property": {
                            "type": "Identifier",
                            "name": "prototype"
                        }
                    },
                    "property": {
                        "type": "Identifier",
                        "name": "address"
                    }
                },
                "right": {
                    "type": "FunctionExpression",
                    "id": None,
                    "params": [],
                    "defaults": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ReturnStatement",
                                "argument": {
                                    "type": "CallExpression",
                                    "callee": {
                                        "type": "MemberExpression",
                                        "computed": False,
                                        "object": {
                                            "type": "ThisExpression"
                                        },
                                        "property": {
                                            "type": "Identifier",
                                            "name": "valueForFieldNamed"
                                        }
                                    },
                                    "arguments": [
                                        {
                                            "type": "Literal",
                                            "value": "address",
                                            "raw": "'address'"
                                        }
                                    ]
                                }
                            }
                        ]
                    },
                    "rest": None,
                    "generator": False,
                    "expression": False
                }
            }
        },
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "AssignmentExpression",
                "operator": "=",
                "left": {
                    "type": "MemberExpression",
                    "computed": False,
                    "object": {
                        "type": "MemberExpression",
                        "computed": False,
                        "object": {
                            "type": "Identifier",
                            "name": "FormModel"
                        },
                        "property": {
                            "type": "Identifier",
                            "name": "prototype"
                        }
                    },
                    "property": {
                        "type": "Identifier",
                        "name": "postRepresentation"
                    }
                },
                "right": {
                    "type": "FunctionExpression",
                    "id": None,
                    "params": [],
                    "defaults": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "VariableDeclaration",
                                "declarations": [
                                    {
                                        "type": "VariableDeclarator",
                                        "id": {
                                            "type": "Identifier",
                                            "name": "renames"
                                        },
                                        "init": {
                                            "type": "ObjectExpression",
                                            "properties": [
                                                {
                                                    "type": "Property",
                                                    "key": {
                                                        "type": "Literal",
                                                        "value": "location",
                                                        "raw": "'location'"
                                                    },
                                                    "value": {
                                                        "type": "Literal",
                                                        "value": "geo_autocomplete_location",
                                                        "raw": "'geo_autocomplete_location'"
                                                    },
                                                    "kind": "init"
                                                },
                                                {
                                                    "type": "Property",
                                                    "key": {
                                                        "type": "Literal",
                                                        "value": "geoid",
                                                        "raw": "'geoid'"
                                                    },
                                                    "value": {
                                                        "type": "Literal",
                                                        "value": "geo_autocomplete_geoid",
                                                        "raw": "'geo_autocomplete_geoid'"
                                                    },
                                                    "kind": "init"
                                                },
                                                {
                                                    "type": "Property",
                                                    "key": {
                                                        "type": "Literal",
                                                        "value": "city",
                                                        "raw": "'city'"
                                                    },
                                                    "value": {
                                                        "type": "Literal",
                                                        "value": "geo_fallback_city",
                                                        "raw": "'geo_fallback_city'"
                                                    },
                                                    "kind": "init"
                                                },
                                                {
                                                    "type": "Property",
                                                    "key": {
                                                        "type": "Literal",
                                                        "value": "state",
                                                        "raw": "'state'"
                                                    },
                                                    "value": {
                                                        "type": "Literal",
                                                        "value": "geo_fallback_state",
                                                        "raw": "'geo_fallback_state'"
                                                    },
                                                    "kind": "init"
                                                },
                                                {
                                                    "type": "Property",
                                                    "key": {
                                                        "type": "Literal",
                                                        "value": "country",
                                                        "raw": "'country'"
                                                    },
                                                    "value": {
                                                        "type": "Literal",
                                                        "value": "geo_fallback_country",
                                                        "raw": "'geo_fallback_country'"
                                                    },
                                                    "kind": "init"
                                                },
                                                {
                                                    "type": "Property",
                                                    "key": {
                                                        "type": "Literal",
                                                        "value": "mode",
                                                        "raw": "'mode'"
                                                    },
                                                    "value": {
                                                        "type": "Literal",
                                                        "value": "geo_mode",
                                                        "raw": "'geo_mode'"
                                                    },
                                                    "kind": "init"
                                                }
                                            ]
                                        }
                                    }
                                ],
                                "kind": "var"
                            },
                            {
                                "type": "FunctionDeclaration",
                                "id": {
                                    "type": "Identifier",
                                    "name": "renamed_key"
                                },
                                "params": [
                                    {
                                        "type": "Identifier",
                                        "name": "key"
                                    }
                                ],
                                "defaults": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [
                                        {
                                            "type": "ReturnStatement",
                                            "argument": {
                                                "type": "LogicalExpression",
                                                "operator": "||",
                                                "left": {
                                                    "type": "MemberExpression",
                                                    "computed": True,
                                                    "object": {
                                                        "type": "Identifier",
                                                        "name": "renames"
                                                    },
                                                    "property": {
                                                        "type": "Identifier",
                                                        "name": "key"
                                                    }
                                                },
                                                "right": {
                                                    "type": "Identifier",
                                                    "name": "key"
                                                }
                                            }
                                        }
                                    ]
                                },
                                "rest": None,
                                "generator": False,
                                "expression": False
                            },
                            {
                                "type": "VariableDeclaration",
                                "declarations": [
                                    {
                                        "type": "VariableDeclarator",
                                        "id": {
                                            "type": "Identifier",
                                            "name": "rep"
                                        },
                                        "init": {
                                            "type": "CallExpression",
                                            "callee": {
                                                "type": "MemberExpression",
                                                "computed": False,
                                                "object": {
                                                    "type": "Identifier",
                                                    "name": "_"
                                                },
                                                "property": {
                                                    "type": "Identifier",
                                                    "name": "clone"
                                                }
                                            },
                                            "arguments": [
                                                {
                                                    "type": "MemberExpression",
                                                    "computed": False,
                                                    "object": {
                                                        "type": "ThisExpression"
                                                    },
                                                    "property": {
                                                        "type": "Identifier",
                                                        "name": "_fieldValues"
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                ],
                                "kind": "var"
                            },
                            {
                                "type": "ExpressionStatement",
                                "expression": {
                                    "type": "CallExpression",
                                    "callee": {
                                        "type": "MemberExpression",
                                        "computed": False,
                                        "object": {
                                            "type": "Identifier",
                                            "name": "_"
                                        },
                                        "property": {
                                            "type": "Identifier",
                                            "name": "each"
                                        }
                                    },
                                    "arguments": [
                                        {
                                            "type": "MemberExpression",
                                            "computed": False,
                                            "object": {
                                                "type": "Identifier",
                                                "name": "rep"
                                            },
                                            "property": {
                                                "type": "Identifier",
                                                "name": "address"
                                            }
                                        },
                                        {
                                            "type": "CallExpression",
                                            "callee": {
                                                "type": "MemberExpression",
                                                "computed": False,
                                                "object": {
                                                    "type": "FunctionExpression",
                                                    "id": None,
                                                    "params": [
                                                        {
                                                            "type": "Identifier",
                                                            "name": "value"
                                                        },
                                                        {
                                                            "type": "Identifier",
                                                            "name": "key"
                                                        }
                                                    ],
                                                    "defaults": [],
                                                    "body": {
                                                        "type": "BlockStatement",
                                                        "body": [
                                                            {
                                                                "type": "ReturnStatement",
                                                                "argument": {
                                                                    "type": "AssignmentExpression",
                                                                    "operator": "=",
                                                                    "left": {
                                                                        "type": "MemberExpression",
                                                                        "computed": True,
                                                                        "object": {
                                                                            "type": "Identifier",
                                                                            "name": "rep"
                                                                        },
                                                                        "property": {
                                                                            "type": "BinaryExpression",
                                                                            "operator": "+",
                                                                            "left": {
                                                                                "type": "Literal",
                                                                                "value": "address_",
                                                                                "raw": "'address_'"
                                                                            },
                                                                            "right": {
                                                                                "type": "CallExpression",
                                                                                "callee": {
                                                                                    "type": "Identifier",
                                                                                    "name": "renamed_key"
                                                                                },
                                                                                "arguments": [
                                                                                    {
                                                                                        "type": "Identifier",
                                                                                        "name": "key"
                                                                                    }
                                                                                ]
                                                                            }
                                                                        }
                                                                    },
                                                                    "right": {
                                                                        "type": "Identifier",
                                                                        "name": "value"
                                                                    }
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    "rest": None,
                                                    "generator": False,
                                                    "expression": False
                                                },
                                                "property": {
                                                    "type": "Identifier",
                                                    "name": "bind"
                                                }
                                            },
                                            "arguments": [
                                                {
                                                    "type": "ThisExpression"
                                                }
                                            ]
                                        }
                                    ]
                                }
                            },
                            {
                                "type": "ExpressionStatement",
                                "expression": {
                                    "type": "UnaryExpression",
                                    "operator": "delete",
                                    "argument": {
                                        "type": "MemberExpression",
                                        "computed": True,
                                        "object": {
                                            "type": "Identifier",
                                            "name": "rep"
                                        },
                                        "property": {
                                            "type": "Literal",
                                            "value": "address",
                                            "raw": "'address'"
                                        }
                                    },
                                    "prefix": True
                                }
                            },
                            {
                                "type": "ReturnStatement",
                                "argument": {
                                    "type": "Identifier",
                                    "name": "rep"
                                }
                            }
                        ]
                    },
                    "rest": None,
                    "generator": False,
                    "expression": False
                }
            }
        },
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "AssignmentExpression",
                "operator": "=",
                "left": {
                    "type": "MemberExpression",
                    "computed": False,
                    "object": {
                        "type": "MemberExpression",
                        "computed": False,
                        "object": {
                            "type": "Identifier",
                            "name": "FormModel"
                        },
                        "property": {
                            "type": "Identifier",
                            "name": "prototype"
                        }
                    },
                    "property": {
                        "type": "Identifier",
                        "name": "orgType"
                    }
                },
                "right": {
                    "type": "FunctionExpression",
                    "id": None,
                    "params": [],
                    "defaults": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ReturnStatement",
                                "argument": {
                                    "type": "CallExpression",
                                    "callee": {
                                        "type": "MemberExpression",
                                        "computed": False,
                                        "object": {
                                            "type": "Identifier",
                                            "name": "_"
                                        },
                                        "property": {
                                            "type": "Identifier",
                                            "name": "findWhere"
                                        }
                                    },
                                    "arguments": [
                                        {
                                            "type": "MemberExpression",
                                            "computed": False,
                                            "object": {
                                                "type": "MemberExpression",
                                                "computed": False,
                                                "object": {
                                                    "type": "ThisExpression"
                                                },
                                                "property": {
                                                    "type": "Identifier",
                                                    "name": "constants"
                                                }
                                            },
                                            "property": {
                                                "type": "Identifier",
                                                "name": "orgTypes"
                                            }
                                        },
                                        {
                                            "type": "ObjectExpression",
                                            "properties": [
                                                {
                                                    "type": "Property",
                                                    "key": {
                                                        "type": "Identifier",
                                                        "name": "name"
                                                    },
                                                    "value": {
                                                        "type": "CallExpression",
                                                        "callee": {
                                                            "type": "MemberExpression",
                                                            "computed": False,
                                                            "object": {
                                                                "type": "ThisExpression"
                                                            },
                                                            "property": {
                                                                "type": "Identifier",
                                                                "name": "valueForFieldNamed"
                                                            }
                                                        },
                                                        "arguments": [
                                                            {
                                                                "type": "Literal",
                                                                "value": "org_type",
                                                                "raw": "'org_type'"
                                                            }
                                                        ]
                                                    },
                                                    "kind": "init"
                                                }
                                            ]
                                        }
                                    ]
                                }
                            }
                        ]
                    },
                    "rest": None,
                    "generator": False,
                    "expression": False
                }
            }
        },
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "AssignmentExpression",
                "operator": "=",
                "left": {
                    "type": "MemberExpression",
                    "computed": False,
                    "object": {
                        "type": "MemberExpression",
                        "computed": False,
                        "object": {
                            "type": "Identifier",
                            "name": "FormModel"
                        },
                        "property": {
                            "type": "Identifier",
                            "name": "prototype"
                        }
                    },
                    "property": {
                        "type": "Identifier",
                        "name": "allowsEditing"
                    }
                },
                "right": {
                    "type": "FunctionExpression",
                    "id": None,
                    "params": [],
                    "defaults": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ReturnStatement",
                                "argument": {
                                    "type": "BinaryExpression",
                                    "operator": "===",
                                    "left": {
                                        "type": "MemberExpression",
                                        "computed": False,
                                        "object": {
                                            "type": "ThisExpression"
                                        },
                                        "property": {
                                            "type": "Identifier",
                                            "name": "_submissionState"
                                        }
                                    },
                                    "right": {
                                        "type": "Literal",
                                        "value": "editable",
                                        "raw": "'editable'"
                                    }
                                }
                            }
                        ]
                    },
                    "rest": None,
                    "generator": False,
                    "expression": False
                }
            }
        },
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "AssignmentExpression",
                "operator": "=",
                "left": {
                    "type": "MemberExpression",
                    "computed": False,
                    "object": {
                        "type": "MemberExpression",
                        "computed": False,
                        "object": {
                            "type": "Identifier",
                            "name": "FormModel"
                        },
                        "property": {
                            "type": "Identifier",
                            "name": "prototype"
                        }
                    },
                    "property": {
                        "type": "Identifier",
                        "name": "submissionErrorMessage"
                    }
                },
                "right": {
                    "type": "FunctionExpression",
                    "id": None,
                    "params": [],
                    "defaults": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ReturnStatement",
                                "argument": {
                                    "type": "MemberExpression",
                                    "computed": False,
                                    "object": {
                                        "type": "ThisExpression"
                                    },
                                    "property": {
                                        "type": "Identifier",
                                        "name": "_submissionErrorMessage"
                                    }
                                }
                            }
                        ]
                    },
                    "rest": None,
                    "generator": False,
                    "expression": False
                }
            }
        },
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "AssignmentExpression",
                "operator": "=",
                "left": {
                    "type": "MemberExpression",
                    "computed": False,
                    "object": {
                        "type": "MemberExpression",
                        "computed": False,
                        "object": {
                            "type": "Identifier",
                            "name": "FormModel"
                        },
                        "property": {
                            "type": "Identifier",
                            "name": "prototype"
                        }
                    },
                    "property": {
                        "type": "Identifier",
                        "name": "orgDedupeResultsForTerm"
                    }
                },
                "right": {
                    "type": "FunctionExpression",
                    "id": None,
                    "params": [
                        {
                            "type": "Identifier",
                            "name": "term"
                        },
                        {
                            "type": "Identifier",
                            "name": "callback"
                        }
                    ],
                    "defaults": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ExpressionStatement",
                                "expression": {
                                    "type": "CallExpression",
                                    "callee": {
                                        "type": "MemberExpression",
                                        "computed": False,
                                        "object": {
                                            "type": "CallExpression",
                                            "callee": {
                                                "type": "MemberExpression",
                                                "computed": False,
                                                "object": {
                                                    "type": "Identifier",
                                                    "name": "DEF"
                                                },
                                                "property": {
                                                    "type": "Identifier",
                                                    "name": "buildUrl"
                                                }
                                            },
                                            "arguments": [
                                                {
                                                    "type": "Literal",
                                                    "value": "_data/org-intake-lookup",
                                                    "raw": "'_data/org-intake-lookup'"
                                                }
                                            ]
                                        },
                                        "property": {
                                            "type": "Identifier",
                                            "name": "then"
                                        }
                                    },
                                    "arguments": [
                                        {
                                            "type": "CallExpression",
                                            "callee": {
                                                "type": "MemberExpression",
                                                "computed": False,
                                                "object": {
                                                    "type": "FunctionExpression",
                                                    "id": None,
                                                    "params": [
                                                        {
                                                            "type": "Identifier",
                                                            "name": "url"
                                                        }
                                                    ],
                                                    "defaults": [],
                                                    "body": {
                                                        "type": "BlockStatement",
                                                        "body": [
                                                            {
                                                                "type": "ExpressionStatement",
                                                                "expression": {
                                                                    "type": "CallExpression",
                                                                    "callee": {
                                                                        "type": "MemberExpression",
                                                                        "computed": False,
                                                                        "object": {
                                                                            "type": "CallExpression",
                                                                            "callee": {
                                                                                "type": "MemberExpression",
                                                                                "computed": False,
                                                                                "object": {
                                                                                    "type": "CallExpression",
                                                                                    "callee": {
                                                                                        "type": "MemberExpression",
                                                                                        "computed": False,
                                                                                        "object": {
                                                                                            "type": "CallExpression",
                                                                                            "callee": {
                                                                                                "type": "MemberExpression",
                                                                                                "computed": False,
                                                                                                "object": {
                                                                                                    "type": "Identifier",
                                                                                                    "name": "superagent"
                                                                                                },
                                                                                                "property": {
                                                                                                    "type": "Identifier",
                                                                                                    "name": "get"
                                                                                                }
                                                                                            },
                                                                                            "arguments": [
                                                                                                {
                                                                                                    "type": "Identifier",
                                                                                                    "name": "url"
                                                                                                }
                                                                                            ]
                                                                                        },
                                                                                        "property": {
                                                                                            "type": "Identifier",
                                                                                            "name": "timeout"
                                                                                        }
                                                                                    },
                                                                                    "arguments": [
                                                                                        {
                                                                                            "type": "Literal",
                                                                                            "value": 10000,
                                                                                            "raw": "10000"
                                                                                        }
                                                                                    ]
                                                                                },
                                                                                "property": {
                                                                                    "type": "Identifier",
                                                                                    "name": "query"
                                                                                }
                                                                            },
                                                                            "arguments": [
                                                                                {
                                                                                    "type": "ObjectExpression",
                                                                                    "properties": [
                                                                                        {
                                                                                            "type": "Property",
                                                                                            "key": {
                                                                                                "type": "Identifier",
                                                                                                "name": "q"
                                                                                            },
                                                                                            "value": {
                                                                                                "type": "Identifier",
                                                                                                "name": "term"
                                                                                            },
                                                                                            "kind": "init"
                                                                                        },
                                                                                        {
                                                                                            "type": "Property",
                                                                                            "key": {
                                                                                                "type": "Identifier",
                                                                                                "name": "geoid"
                                                                                            },
                                                                                            "value": {
                                                                                                "type": "MemberExpression",
                                                                                                "computed": False,
                                                                                                "object": {
                                                                                                    "type": "CallExpression",
                                                                                                    "callee": {
                                                                                                        "type": "MemberExpression",
                                                                                                        "computed": False,
                                                                                                        "object": {
                                                                                                            "type": "ThisExpression"
                                                                                                        },
                                                                                                        "property": {
                                                                                                            "type": "Identifier",
                                                                                                            "name": "address"
                                                                                                        }
                                                                                                    },
                                                                                                    "arguments": []
                                                                                                },
                                                                                                "property": {
                                                                                                    "type": "Identifier",
                                                                                                    "name": "geoid"
                                                                                                }
                                                                                            },
                                                                                            "kind": "init"
                                                                                        },
                                                                                        {
                                                                                            "type": "Property",
                                                                                            "key": {
                                                                                                "type": "Identifier",
                                                                                                "name": "location_string"
                                                                                            },
                                                                                            "value": {
                                                                                                "type": "MemberExpression",
                                                                                                "computed": False,
                                                                                                "object": {
                                                                                                    "type": "CallExpression",
                                                                                                    "callee": {
                                                                                                        "type": "MemberExpression",
                                                                                                        "computed": False,
                                                                                                        "object": {
                                                                                                            "type": "ThisExpression"
                                                                                                        },
                                                                                                        "property": {
                                                                                                            "type": "Identifier",
                                                                                                            "name": "address"
                                                                                                        }
                                                                                                    },
                                                                                                    "arguments": []
                                                                                                },
                                                                                                "property": {
                                                                                                    "type": "Identifier",
                                                                                                    "name": "location"
                                                                                                }
                                                                                            },
                                                                                            "kind": "init"
                                                                                        },
                                                                                        {
                                                                                            "type": "Property",
                                                                                            "key": {
                                                                                                "type": "Identifier",
                                                                                                "name": "org_type"
                                                                                            },
                                                                                            "value": {
                                                                                                "type": "MemberExpression",
                                                                                                "computed": False,
                                                                                                "object": {
                                                                                                    "type": "CallExpression",
                                                                                                    "callee": {
                                                                                                        "type": "MemberExpression",
                                                                                                        "computed": False,
                                                                                                        "object": {
                                                                                                            "type": "ThisExpression"
                                                                                                        },
                                                                                                        "property": {
                                                                                                            "type": "Identifier",
                                                                                                            "name": "orgType"
                                                                                                        }
                                                                                                    },
                                                                                                    "arguments": []
                                                                                                },
                                                                                                "property": {
                                                                                                    "type": "Identifier",
                                                                                                    "name": "name"
                                                                                                }
                                                                                            },
                                                                                            "kind": "init"
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        },
                                                                        "property": {
                                                                            "type": "Identifier",
                                                                            "name": "end"
                                                                        }
                                                                    },
                                                                    "arguments": [
                                                                        {
                                                                            "type": "CallExpression",
                                                                            "callee": {
                                                                                "type": "MemberExpression",
                                                                                "computed": False,
                                                                                "object": {
                                                                                    "type": "FunctionExpression",
                                                                                    "id": None,
                                                                                    "params": [
                                                                                        {
                                                                                            "type": "Identifier",
                                                                                            "name": "res"
                                                                                        }
                                                                                    ],
                                                                                    "defaults": [],
                                                                                    "body": {
                                                                                        "type": "BlockStatement",
                                                                                        "body": [
                                                                                            {
                                                                                                "type": "IfStatement",
                                                                                                "test": {
                                                                                                    "type": "BinaryExpression",
                                                                                                    "operator": "===",
                                                                                                    "left": {
                                                                                                        "type": "MemberExpression",
                                                                                                        "computed": False,
                                                                                                        "object": {
                                                                                                            "type": "Identifier",
                                                                                                            "name": "res"
                                                                                                        },
                                                                                                        "property": {
                                                                                                            "type": "Identifier",
                                                                                                            "name": "status"
                                                                                                        }
                                                                                                    },
                                                                                                    "right": {
                                                                                                        "type": "Literal",
                                                                                                        "value": 200,
                                                                                                        "raw": "200"
                                                                                                    }
                                                                                                },
                                                                                                "consequent": {
                                                                                                    "type": "BlockStatement",
                                                                                                    "body": [
                                                                                                        {
                                                                                                            "type": "ExpressionStatement",
                                                                                                            "expression": {
                                                                                                                "type": "CallExpression",
                                                                                                                "callee": {
                                                                                                                    "type": "MemberExpression",
                                                                                                                    "computed": False,
                                                                                                                    "object": {
                                                                                                                        "type": "ThisExpression"
                                                                                                                    },
                                                                                                                    "property": {
                                                                                                                        "type": "Identifier",
                                                                                                                        "name": "orgsWereSeen"
                                                                                                                    }
                                                                                                                },
                                                                                                                "arguments": [
                                                                                                                    {
                                                                                                                        "type": "MemberExpression",
                                                                                                                        "computed": False,
                                                                                                                        "object": {
                                                                                                                            "type": "Identifier",
                                                                                                                            "name": "res"
                                                                                                                        },
                                                                                                                        "property": {
                                                                                                                            "type": "Identifier",
                                                                                                                            "name": "body"
                                                                                                                        }
                                                                                                                    }
                                                                                                                ]
                                                                                                            }
                                                                                                        },
                                                                                                        {
                                                                                                            "type": "ExpressionStatement",
                                                                                                            "expression": {
                                                                                                                "type": "CallExpression",
                                                                                                                "callee": {
                                                                                                                    "type": "Identifier",
                                                                                                                    "name": "callback"
                                                                                                                },
                                                                                                                "arguments": [
                                                                                                                    {
                                                                                                                        "type": "MemberExpression",
                                                                                                                        "computed": False,
                                                                                                                        "object": {
                                                                                                                            "type": "Identifier",
                                                                                                                            "name": "res"
                                                                                                                        },
                                                                                                                        "property": {
                                                                                                                            "type": "Identifier",
                                                                                                                            "name": "body"
                                                                                                                        }
                                                                                                                    }
                                                                                                                ]
                                                                                                            }
                                                                                                        }
                                                                                                    ]
                                                                                                },
                                                                                                "alternate": {
                                                                                                    "type": "BlockStatement",
                                                                                                    "body": [
                                                                                                        {
                                                                                                            "type": "ExpressionStatement",
                                                                                                            "expression": {
                                                                                                                "type": "CallExpression",
                                                                                                                "callee": {
                                                                                                                    "type": "Identifier",
                                                                                                                    "name": "callback"
                                                                                                                },
                                                                                                                "arguments": [
                                                                                                                    {
                                                                                                                        "type": "ArrayExpression",
                                                                                                                        "elements": []
                                                                                                                    }
                                                                                                                ]
                                                                                                            }
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            }
                                                                                        ]
                                                                                    },
                                                                                    "rest": None,
                                                                                    "generator": False,
                                                                                    "expression": False
                                                                                },
                                                                                "property": {
                                                                                    "type": "Identifier",
                                                                                    "name": "bind"
                                                                                }
                                                                            },
                                                                            "arguments": [
                                                                                {
                                                                                    "type": "ThisExpression"
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    "rest": None,
                                                    "generator": False,
                                                    "expression": False
                                                },
                                                "property": {
                                                    "type": "Identifier",
                                                    "name": "bind"
                                                }
                                            },
                                            "arguments": [
                                                {
                                                    "type": "ThisExpression"
                                                }
                                            ]
                                        }
                                    ]
                                }
                            }
                        ]
                    },
                    "rest": None,
                    "generator": False,
                    "expression": False
                }
            }
        },
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "AssignmentExpression",
                "operator": "=",
                "left": {
                    "type": "MemberExpression",
                    "computed": False,
                    "object": {
                        "type": "MemberExpression",
                        "computed": False,
                        "object": {
                            "type": "Identifier",
                            "name": "FormModel"
                        },
                        "property": {
                            "type": "Identifier",
                            "name": "prototype"
                        }
                    },
                    "property": {
                        "type": "Identifier",
                        "name": "submit"
                    }
                },
                "right": {
                    "type": "FunctionExpression",
                    "id": None,
                    "params": [],
                    "defaults": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "IfStatement",
                                "test": {
                                    "type": "BinaryExpression",
                                    "operator": "==",
                                    "left": {
                                        "type": "MemberExpression",
                                        "computed": False,
                                        "object": {
                                            "type": "ThisExpression"
                                        },
                                        "property": {
                                            "type": "Identifier",
                                            "name": "_submissionState"
                                        }
                                    },
                                    "right": {
                                        "type": "Literal",
                                        "value": "editable",
                                        "raw": "'editable'"
                                    }
                                },
                                "consequent": {
                                    "type": "BlockStatement",
                                    "body": [
                                        {
                                            "type": "ExpressionStatement",
                                            "expression": {
                                                "type": "AssignmentExpression",
                                                "operator": "=",
                                                "left": {
                                                    "type": "MemberExpression",
                                                    "computed": False,
                                                    "object": {
                                                        "type": "ThisExpression"
                                                    },
                                                    "property": {
                                                        "type": "Identifier",
                                                        "name": "_submissionErrorMessage"
                                                    }
                                                },
                                                "right": {
                                                    "type": "Literal",
                                                    "value": "",
                                                    "raw": "''"
                                                }
                                            }
                                        },
                                        {
                                            "type": "ExpressionStatement",
                                            "expression": {
                                                "type": "AssignmentExpression",
                                                "operator": "=",
                                                "left": {
                                                    "type": "MemberExpression",
                                                    "computed": False,
                                                    "object": {
                                                        "type": "ThisExpression"
                                                    },
                                                    "property": {
                                                        "type": "Identifier",
                                                        "name": "_submissionState"
                                                    }
                                                },
                                                "right": {
                                                    "type": "Literal",
                                                    "value": "submitting",
                                                    "raw": "'submitting'"
                                                }
                                            }
                                        },
                                        {
                                            "type": "ExpressionStatement",
                                            "expression": {
                                                "type": "CallExpression",
                                                "callee": {
                                                    "type": "MemberExpression",
                                                    "computed": False,
                                                    "object": {
                                                        "type": "ThisExpression"
                                                    },
                                                    "property": {
                                                        "type": "Identifier",
                                                        "name": "notifyObserversOfChange"
                                                    }
                                                },
                                                "arguments": []
                                            }
                                        },
                                        {
                                            "type": "ExpressionStatement",
                                            "expression": {
                                                "type": "CallExpression",
                                                "callee": {
                                                    "type": "MemberExpression",
                                                    "computed": False,
                                                    "object": {
                                                        "type": "CallExpression",
                                                        "callee": {
                                                            "type": "MemberExpression",
                                                            "computed": False,
                                                            "object": {
                                                                "type": "Identifier",
                                                                "name": "DEF"
                                                            },
                                                            "property": {
                                                                "type": "Identifier",
                                                                "name": "buildUrl"
                                                            }
                                                        },
                                                        "arguments": [
                                                            {
                                                                "type": "Literal",
                                                                "value": "api/v2/orgs/create",
                                                                "raw": "'api/v2/orgs/create'"
                                                            },
                                                            {
                                                                "type": "ObjectExpression",
                                                                "properties": []
                                                            }
                                                        ]
                                                    },
                                                    "property": {
                                                        "type": "Identifier",
                                                        "name": "then"
                                                    }
                                                },
                                                "arguments": [
                                                    {
                                                        "type": "CallExpression",
                                                        "callee": {
                                                            "type": "MemberExpression",
                                                            "computed": False,
                                                            "object": {
                                                                "type": "FunctionExpression",
                                                                "id": None,
                                                                "params": [
                                                                    {
                                                                        "type": "Identifier",
                                                                        "name": "url"
                                                                    }
                                                                ],
                                                                "defaults": [],
                                                                "body": {
                                                                    "type": "BlockStatement",
                                                                    "body": [
                                                                        {
                                                                            "type": "VariableDeclaration",
                                                                            "declarations": [
                                                                                {
                                                                                    "type": "VariableDeclarator",
                                                                                    "id": {
                                                                                        "type": "Identifier",
                                                                                        "name": "values"
                                                                                    },
                                                                                    "init": {
                                                                                        "type": "CallExpression",
                                                                                        "callee": {
                                                                                            "type": "MemberExpression",
                                                                                            "computed": False,
                                                                                            "object": {
                                                                                                "type": "ThisExpression"
                                                                                            },
                                                                                            "property": {
                                                                                                "type": "Identifier",
                                                                                                "name": "postRepresentation"
                                                                                            }
                                                                                        },
                                                                                        "arguments": []
                                                                                    }
                                                                                }
                                                                            ],
                                                                            "kind": "var"
                                                                        },
                                                                        {
                                                                            "type": "ExpressionStatement",
                                                                            "expression": {
                                                                                "type": "CallExpression",
                                                                                "callee": {
                                                                                    "type": "MemberExpression",
                                                                                    "computed": False,
                                                                                    "object": {
                                                                                        "type": "CallExpression",
                                                                                        "callee": {
                                                                                            "type": "MemberExpression",
                                                                                            "computed": False,
                                                                                            "object": {
                                                                                                "type": "CallExpression",
                                                                                                "callee": {
                                                                                                    "type": "MemberExpression",
                                                                                                    "computed": False,
                                                                                                    "object": {
                                                                                                        "type": "CallExpression",
                                                                                                        "callee": {
                                                                                                            "type": "MemberExpression",
                                                                                                            "computed": False,
                                                                                                            "object": {
                                                                                                                "type": "CallExpression",
                                                                                                                "callee": {
                                                                                                                    "type": "MemberExpression",
                                                                                                                    "computed": False,
                                                                                                                    "object": {
                                                                                                                        "type": "Identifier",
                                                                                                                        "name": "superagent"
                                                                                                                    },
                                                                                                                    "property": {
                                                                                                                        "type": "Identifier",
                                                                                                                        "name": "post"
                                                                                                                    }
                                                                                                                },
                                                                                                                "arguments": [
                                                                                                                    {
                                                                                                                        "type": "Identifier",
                                                                                                                        "name": "url"
                                                                                                                    }
                                                                                                                ]
                                                                                                            },
                                                                                                            "property": {
                                                                                                                "type": "Identifier",
                                                                                                                "name": "type"
                                                                                                            }
                                                                                                        },
                                                                                                        "arguments": [
                                                                                                            {
                                                                                                                "type": "Literal",
                                                                                                                "value": "form",
                                                                                                                "raw": "'form'"
                                                                                                            }
                                                                                                        ]
                                                                                                    },
                                                                                                    "property": {
                                                                                                        "type": "Identifier",
                                                                                                        "name": "send"
                                                                                                    }
                                                                                                },
                                                                                                "arguments": [
                                                                                                    {
                                                                                                        "type": "Identifier",
                                                                                                        "name": "values"
                                                                                                    }
                                                                                                ]
                                                                                            },
                                                                                            "property": {
                                                                                                "type": "Identifier",
                                                                                                "name": "timeout"
                                                                                            }
                                                                                        },
                                                                                        "arguments": [
                                                                                            {
                                                                                                "type": "Literal",
                                                                                                "value": 10000,
                                                                                                "raw": "10000"
                                                                                            }
                                                                                        ]
                                                                                    },
                                                                                    "property": {
                                                                                        "type": "Identifier",
                                                                                        "name": "end"
                                                                                    }
                                                                                },
                                                                                "arguments": [
                                                                                    {
                                                                                        "type": "CallExpression",
                                                                                        "callee": {
                                                                                            "type": "MemberExpression",
                                                                                            "computed": False,
                                                                                            "object": {
                                                                                                "type": "FunctionExpression",
                                                                                                "id": None,
                                                                                                "params": [
                                                                                                    {
                                                                                                        "type": "Identifier",
                                                                                                        "name": "res"
                                                                                                    }
                                                                                                ],
                                                                                                "defaults": [],
                                                                                                "body": {
                                                                                                    "type": "BlockStatement",
                                                                                                    "body": [
                                                                                                        {
                                                                                                            "type": "IfStatement",
                                                                                                            "test": {
                                                                                                                "type": "BinaryExpression",
                                                                                                                "operator": "===",
                                                                                                                "left": {
                                                                                                                    "type": "MemberExpression",
                                                                                                                    "computed": False,
                                                                                                                    "object": {
                                                                                                                        "type": "Identifier",
                                                                                                                        "name": "res"
                                                                                                                    },
                                                                                                                    "property": {
                                                                                                                        "type": "Identifier",
                                                                                                                        "name": "status"
                                                                                                                    }
                                                                                                                },
                                                                                                                "right": {
                                                                                                                    "type": "Literal",
                                                                                                                    "value": 201,
                                                                                                                    "raw": "201"
                                                                                                                }
                                                                                                            },
                                                                                                            "consequent": {
                                                                                                                "type": "BlockStatement",
                                                                                                                "body": [
                                                                                                                    {
                                                                                                                        "type": "ExpressionStatement",
                                                                                                                        "expression": {
                                                                                                                            "type": "CallExpression",
                                                                                                                            "callee": {
                                                                                                                                "type": "MemberExpression",
                                                                                                                                "computed": False,
                                                                                                                                "object": {
                                                                                                                                    "type": "Identifier",
                                                                                                                                    "name": "localStorage"
                                                                                                                                },
                                                                                                                                "property": {
                                                                                                                                    "type": "Identifier",
                                                                                                                                    "name": "removeItem"
                                                                                                                                }
                                                                                                                            },
                                                                                                                            "arguments": [
                                                                                                                                {
                                                                                                                                    "type": "Literal",
                                                                                                                                    "value": "OrgIntake",
                                                                                                                                    "raw": "'OrgIntake'"
                                                                                                                                }
                                                                                                                            ]
                                                                                                                        }
                                                                                                                    },
                                                                                                                    {
                                                                                                                        "type": "ExpressionStatement",
                                                                                                                        "expression": {
                                                                                                                            "type": "AssignmentExpression",
                                                                                                                            "operator": "=",
                                                                                                                            "left": {
                                                                                                                                "type": "MemberExpression",
                                                                                                                                "computed": False,
                                                                                                                                "object": {
                                                                                                                                    "type": "Identifier",
                                                                                                                                    "name": "document"
                                                                                                                                },
                                                                                                                                "property": {
                                                                                                                                    "type": "Identifier",
                                                                                                                                    "name": "location"
                                                                                                                                }
                                                                                                                            },
                                                                                                                            "right": {
                                                                                                                                "type": "MemberExpression",
                                                                                                                                "computed": False,
                                                                                                                                "object": {
                                                                                                                                    "type": "MemberExpression",
                                                                                                                                    "computed": False,
                                                                                                                                    "object": {
                                                                                                                                        "type": "Identifier",
                                                                                                                                        "name": "res"
                                                                                                                                    },
                                                                                                                                    "property": {
                                                                                                                                        "type": "Identifier",
                                                                                                                                        "name": "header"
                                                                                                                                    }
                                                                                                                                },
                                                                                                                                "property": {
                                                                                                                                    "type": "Identifier",
                                                                                                                                    "name": "location"
                                                                                                                                }
                                                                                                                            }
                                                                                                                        }
                                                                                                                    }
                                                                                                                ]
                                                                                                            },
                                                                                                            "alternate": {
                                                                                                                "type": "IfStatement",
                                                                                                                "test": {
                                                                                                                    "type": "BinaryExpression",
                                                                                                                    "operator": "===",
                                                                                                                    "left": {
                                                                                                                        "type": "MemberExpression",
                                                                                                                        "computed": False,
                                                                                                                        "object": {
                                                                                                                            "type": "Identifier",
                                                                                                                            "name": "res"
                                                                                                                        },
                                                                                                                        "property": {
                                                                                                                            "type": "Identifier",
                                                                                                                            "name": "status"
                                                                                                                        }
                                                                                                                    },
                                                                                                                    "right": {
                                                                                                                        "type": "Literal",
                                                                                                                        "value": 400,
                                                                                                                        "raw": "400"
                                                                                                                    }
                                                                                                                },
                                                                                                                "consequent": {
                                                                                                                    "type": "BlockStatement",
                                                                                                                    "body": [
                                                                                                                        {
                                                                                                                            "type": "ExpressionStatement",
                                                                                                                            "expression": {
                                                                                                                                "type": "AssignmentExpression",
                                                                                                                                "operator": "=",
                                                                                                                                "left": {
                                                                                                                                    "type": "MemberExpression",
                                                                                                                                    "computed": False,
                                                                                                                                    "object": {
                                                                                                                                        "type": "ThisExpression"
                                                                                                                                    },
                                                                                                                                    "property": {
                                                                                                                                        "type": "Identifier",
                                                                                                                                        "name": "_fieldErrorMessages"
                                                                                                                                    }
                                                                                                                                },
                                                                                                                                "right": {
                                                                                                                                    "type": "MemberExpression",
                                                                                                                                    "computed": False,
                                                                                                                                    "object": {
                                                                                                                                        "type": "MemberExpression",
                                                                                                                                        "computed": False,
                                                                                                                                        "object": {
                                                                                                                                            "type": "Identifier",
                                                                                                                                            "name": "res"
                                                                                                                                        },
                                                                                                                                        "property": {
                                                                                                                                            "type": "Identifier",
                                                                                                                                            "name": "body"
                                                                                                                                        }
                                                                                                                                    },
                                                                                                                                    "property": {
                                                                                                                                        "type": "Identifier",
                                                                                                                                        "name": "fieldErrors"
                                                                                                                                    }
                                                                                                                                }
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                },
                                                                                                                "alternate": {
                                                                                                                    "type": "IfStatement",
                                                                                                                    "test": {
                                                                                                                        "type": "BinaryExpression",
                                                                                                                        "operator": "===",
                                                                                                                        "left": {
                                                                                                                            "type": "MemberExpression",
                                                                                                                            "computed": False,
                                                                                                                            "object": {
                                                                                                                                "type": "Identifier",
                                                                                                                                "name": "res"
                                                                                                                            },
                                                                                                                            "property": {
                                                                                                                                "type": "Identifier",
                                                                                                                                "name": "status"
                                                                                                                            }
                                                                                                                        },
                                                                                                                        "right": {
                                                                                                                            "type": "Literal",
                                                                                                                            "value": 401,
                                                                                                                            "raw": "401"
                                                                                                                        }
                                                                                                                    },
                                                                                                                    "consequent": {
                                                                                                                        "type": "BlockStatement",
                                                                                                                        "body": [
                                                                                                                            {
                                                                                                                                "type": "ExpressionStatement",
                                                                                                                                "expression": {
                                                                                                                                    "type": "AssignmentExpression",
                                                                                                                                    "operator": "=",
                                                                                                                                    "left": {
                                                                                                                                        "type": "MemberExpression",
                                                                                                                                        "computed": False,
                                                                                                                                        "object": {
                                                                                                                                            "type": "ThisExpression"
                                                                                                                                        },
                                                                                                                                        "property": {
                                                                                                                                            "type": "Identifier",
                                                                                                                                            "name": "_submissionErrorMessage"
                                                                                                                                        }
                                                                                                                                    },
                                                                                                                                    "right": {
                                                                                                                                        "type": "Literal",
                                                                                                                                        "value": "Please log in before continuing.",
                                                                                                                                        "raw": "'Please log in before continuing.'"
                                                                                                                                    }
                                                                                                                                }
                                                                                                                            }
                                                                                                                        ]
                                                                                                                    },
                                                                                                                    "alternate": {
                                                                                                                        "type": "BlockStatement",
                                                                                                                        "body": [
                                                                                                                            {
                                                                                                                                "type": "ExpressionStatement",
                                                                                                                                "expression": {
                                                                                                                                    "type": "AssignmentExpression",
                                                                                                                                    "operator": "=",
                                                                                                                                    "left": {
                                                                                                                                        "type": "MemberExpression",
                                                                                                                                        "computed": False,
                                                                                                                                        "object": {
                                                                                                                                            "type": "ThisExpression"
                                                                                                                                        },
                                                                                                                                        "property": {
                                                                                                                                            "type": "Identifier",
                                                                                                                                            "name": "_submissionErrorMessage"
                                                                                                                                        }
                                                                                                                                    },
                                                                                                                                    "right": {
                                                                                                                                        "type": "Literal",
                                                                                                                                        "value": "Something went wrong. Please try again.",
                                                                                                                                        "raw": "'Something went wrong. Please try again.'"
                                                                                                                                    }
                                                                                                                                }
                                                                                                                            }
                                                                                                                        ]
                                                                                                                    }
                                                                                                                }
                                                                                                            }
                                                                                                        },
                                                                                                        {
                                                                                                            "type": "ExpressionStatement",
                                                                                                            "expression": {
                                                                                                                "type": "AssignmentExpression",
                                                                                                                "operator": "=",
                                                                                                                "left": {
                                                                                                                    "type": "MemberExpression",
                                                                                                                    "computed": False,
                                                                                                                    "object": {
                                                                                                                        "type": "ThisExpression"
                                                                                                                    },
                                                                                                                    "property": {
                                                                                                                        "type": "Identifier",
                                                                                                                        "name": "_submissionState"
                                                                                                                    }
                                                                                                                },
                                                                                                                "right": {
                                                                                                                    "type": "Literal",
                                                                                                                    "value": "editable",
                                                                                                                    "raw": "'editable'"
                                                                                                                }
                                                                                                            }
                                                                                                        },
                                                                                                        {
                                                                                                            "type": "ExpressionStatement",
                                                                                                            "expression": {
                                                                                                                "type": "CallExpression",
                                                                                                                "callee": {
                                                                                                                    "type": "MemberExpression",
                                                                                                                    "computed": False,
                                                                                                                    "object": {
                                                                                                                        "type": "ThisExpression"
                                                                                                                    },
                                                                                                                    "property": {
                                                                                                                        "type": "Identifier",
                                                                                                                        "name": "notifyObserversOfChange"
                                                                                                                    }
                                                                                                                },
                                                                                                                "arguments": []
                                                                                                            }
                                                                                                        }
                                                                                                    ]
                                                                                                },
                                                                                                "rest": None,
                                                                                                "generator": False,
                                                                                                "expression": False
                                                                                            },
                                                                                            "property": {
                                                                                                "type": "Identifier",
                                                                                                "name": "bind"
                                                                                            }
                                                                                        },
                                                                                        "arguments": [
                                                                                            {
                                                                                                "type": "ThisExpression"
                                                                                            }
                                                                                        ]
                                                                                    }
                                                                                ]
                                                                            }
                                                                        }
                                                                    ]
                                                                },
                                                                "rest": None,
                                                                "generator": False,
                                                                "expression": False
                                                            },
                                                            "property": {
                                                                "type": "Identifier",
                                                                "name": "bind"
                                                            }
                                                        },
                                                        "arguments": [
                                                            {
                                                                "type": "ThisExpression"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                },
                                "alternate": None
                            }
                        ]
                    },
                    "rest": None,
                    "generator": False,
                    "expression": False
                }
            }
        },
        {
            "type": "VariableDeclaration",
            "declarations": [
                {
                    "type": "VariableDeclarator",
                    "id": {
                        "type": "Identifier",
                        "name": "OrgIntakeLocationModel"
                    },
                    "init": {
                        "type": "CallExpression",
                        "callee": {
                            "type": "MemberExpression",
                            "computed": False,
                            "object": {
                                "type": "MemberExpression",
                                "computed": False,
                                "object": {
                                    "type": "Identifier",
                                    "name": "ABC"
                                },
                                "property": {
                                    "type": "Identifier",
                                    "name": "CheapModel"
                                }
                            },
                            "property": {
                                "type": "Identifier",
                                "name": "extend"
                            }
                        },
                        "arguments": [
                            {
                                "type": "ObjectExpression",
                                "properties": [
                                    {
                                        "type": "Property",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "initialize"
                                        },
                                        "value": {
                                            "type": "FunctionExpression",
                                            "id": None,
                                            "params": [
                                                {
                                                    "type": "Identifier",
                                                    "name": "options"
                                                }
                                            ],
                                            "defaults": [],
                                            "body": {
                                                "type": "BlockStatement",
                                                "body": [
                                                    {
                                                        "type": "ExpressionStatement",
                                                        "expression": {
                                                            "type": "CallExpression",
                                                            "callee": {
                                                                "type": "MemberExpression",
                                                                "computed": False,
                                                                "object": {
                                                                    "type": "MemberExpression",
                                                                    "computed": False,
                                                                    "object": {
                                                                        "type": "MemberExpression",
                                                                        "computed": False,
                                                                        "object": {
                                                                            "type": "MemberExpression",
                                                                            "computed": False,
                                                                            "object": {
                                                                                "type": "Identifier",
                                                                                "name": "ABC"
                                                                            },
                                                                            "property": {
                                                                                "type": "Identifier",
                                                                                "name": "CheapModel"
                                                                            }
                                                                        },
                                                                        "property": {
                                                                            "type": "Identifier",
                                                                            "name": "prototype"
                                                                        }
                                                                    },
                                                                    "property": {
                                                                        "type": "Identifier",
                                                                        "name": "initialize"
                                                                    }
                                                                },
                                                                "property": {
                                                                    "type": "Identifier",
                                                                    "name": "apply"
                                                                }
                                                            },
                                                            "arguments": [
                                                                {
                                                                    "type": "ThisExpression"
                                                                },
                                                                {
                                                                    "type": "Identifier",
                                                                    "name": "arguments"
                                                                }
                                                            ]
                                                        }
                                                    },
                                                    {
                                                        "type": "VariableDeclaration",
                                                        "declarations": [
                                                            {
                                                                "type": "VariableDeclarator",
                                                                "id": {
                                                                    "type": "Identifier",
                                                                    "name": "self"
                                                                },
                                                                "init": {
                                                                    "type": "ThisExpression"
                                                                }
                                                            }
                                                        ],
                                                        "kind": "var"
                                                    },
                                                    {
                                                        "type": "ExpressionStatement",
                                                        "expression": {
                                                            "type": "CallExpression",
                                                            "callee": {
                                                                "type": "MemberExpression",
                                                                "computed": False,
                                                                "object": {
                                                                    "type": "Identifier",
                                                                    "name": "self"
                                                                },
                                                                "property": {
                                                                    "type": "Identifier",
                                                                    "name": "on"
                                                                }
                                                            },
                                                            "arguments": [
                                                                {
                                                                    "type": "Literal",
                                                                    "value": "change",
                                                                    "raw": "'change'"
                                                                },
                                                                {
                                                                    "type": "FunctionExpression",
                                                                    "id": None,
                                                                    "params": [],
                                                                    "defaults": [],
                                                                    "body": {
                                                                        "type": "BlockStatement",
                                                                        "body": [
                                                                            {
                                                                                "type": "VariableDeclaration",
                                                                                "declarations": [
                                                                                    {
                                                                                        "type": "VariableDeclarator",
                                                                                        "id": {
                                                                                            "type": "Identifier",
                                                                                            "name": "formModel"
                                                                                        },
                                                                                        "init": {
                                                                                            "type": "CallExpression",
                                                                                            "callee": {
                                                                                                "type": "MemberExpression",
                                                                                                "computed": False,
                                                                                                "object": {
                                                                                                    "type": "Identifier",
                                                                                                    "name": "self"
                                                                                                },
                                                                                                "property": {
                                                                                                    "type": "Identifier",
                                                                                                    "name": "get"
                                                                                                }
                                                                                            },
                                                                                            "arguments": [
                                                                                                {
                                                                                                    "type": "Literal",
                                                                                                    "value": "formModel",
                                                                                                    "raw": "'formModel'"
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    }
                                                                                ],
                                                                                "kind": "var"
                                                                            },
                                                                            {
                                                                                "type": "ExpressionStatement",
                                                                                "expression": {
                                                                                    "type": "CallExpression",
                                                                                    "callee": {
                                                                                        "type": "MemberExpression",
                                                                                        "computed": False,
                                                                                        "object": {
                                                                                            "type": "Identifier",
                                                                                            "name": "formModel"
                                                                                        },
                                                                                        "property": {
                                                                                            "type": "Identifier",
                                                                                            "name": "setValueForField"
                                                                                        }
                                                                                    },
                                                                                    "arguments": [
                                                                                        {
                                                                                            "type": "Literal",
                                                                                            "value": "address",
                                                                                            "raw": "'address'"
                                                                                        },
                                                                                        {
                                                                                            "type": "CallExpression",
                                                                                            "callee": {
                                                                                                "type": "MemberExpression",
                                                                                                "computed": False,
                                                                                                "object": {
                                                                                                    "type": "Identifier",
                                                                                                    "name": "_"
                                                                                                },
                                                                                                "property": {
                                                                                                    "type": "Identifier",
                                                                                                    "name": "defaults"
                                                                                                }
                                                                                            },
                                                                                            "arguments": [
                                                                                                {
                                                                                                    "type": "CallExpression",
                                                                                                    "callee": {
                                                                                                        "type": "MemberExpression",
                                                                                                        "computed": False,
                                                                                                        "object": {
                                                                                                            "type": "Identifier",
                                                                                                            "name": "_"
                                                                                                        },
                                                                                                        "property": {
                                                                                                            "type": "Identifier",
                                                                                                            "name": "pick"
                                                                                                        }
                                                                                                    },
                                                                                                    "arguments": [
                                                                                                        {
                                                                                                            "type": "MemberExpression",
                                                                                                            "computed": False,
                                                                                                            "object": {
                                                                                                                "type": "Identifier",
                                                                                                                "name": "self"
                                                                                                            },
                                                                                                            "property": {
                                                                                                                "type": "Identifier",
                                                                                                                "name": "attributes"
                                                                                                            }
                                                                                                        },
                                                                                                        {
                                                                                                            "type": "ArrayExpression",
                                                                                                            "elements": [
                                                                                                                {
                                                                                                                    "type": "Literal",
                                                                                                                    "value": "location",
                                                                                                                    "raw": "'location'"
                                                                                                                },
                                                                                                                {
                                                                                                                    "type": "Literal",
                                                                                                                    "value": "geoid",
                                                                                                                    "raw": "'geoid'"
                                                                                                                },
                                                                                                                {
                                                                                                                    "type": "Literal",
                                                                                                                    "value": "city",
                                                                                                                    "raw": "'city'"
                                                                                                                },
                                                                                                                {
                                                                                                                    "type": "Literal",
                                                                                                                    "value": "state",
                                                                                                                    "raw": "'state'"
                                                                                                                },
                                                                                                                {
                                                                                                                    "type": "Literal",
                                                                                                                    "value": "country",
                                                                                                                    "raw": "'country'"
                                                                                                                },
                                                                                                                {
                                                                                                                    "type": "Literal",
                                                                                                                    "value": "country_name",
                                                                                                                    "raw": "'country_name'"
                                                                                                                },
                                                                                                                {
                                                                                                                    "type": "Literal",
                                                                                                                    "value": "mode",
                                                                                                                    "raw": "'mode'"
                                                                                                                }
                                                                                                            ]
                                                                                                        }
                                                                                                    ]
                                                                                                },
                                                                                                {
                                                                                                    "type": "MemberExpression",
                                                                                                    "computed": False,
                                                                                                    "object": {
                                                                                                        "type": "MemberExpression",
                                                                                                        "computed": False,
                                                                                                        "object": {
                                                                                                            "type": "Identifier",
                                                                                                            "name": "formModel"
                                                                                                        },
                                                                                                        "property": {
                                                                                                            "type": "Identifier",
                                                                                                            "name": "_fieldValues"
                                                                                                        }
                                                                                                    },
                                                                                                    "property": {
                                                                                                        "type": "Identifier",
                                                                                                        "name": "address"
                                                                                                    }
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    "rest": None,
                                                                    "generator": False,
                                                                    "expression": False
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ]
                                            },
                                            "rest": None,
                                            "generator": False,
                                            "expression": False
                                        },
                                        "kind": "init"
                                    },
                                    {
                                        "type": "Property",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "valid"
                                        },
                                        "value": {
                                            "type": "FunctionExpression",
                                            "id": None,
                                            "params": [],
                                            "defaults": [],
                                            "body": {
                                                "type": "BlockStatement",
                                                "body": [
                                                    {
                                                        "type": "IfStatement",
                                                        "test": {
                                                            "type": "BinaryExpression",
                                                            "operator": "!==",
                                                            "left": {
                                                                "type": "CallExpression",
                                                                "callee": {
                                                                    "type": "MemberExpression",
                                                                    "computed": False,
                                                                    "object": {
                                                                        "type": "ThisExpression"
                                                                    },
                                                                    "property": {
                                                                        "type": "Identifier",
                                                                        "name": "get"
                                                                    }
                                                                },
                                                                "arguments": [
                                                                    {
                                                                        "type": "Literal",
                                                                        "value": "mode",
                                                                        "raw": "'mode'"
                                                                    }
                                                                ]
                                                            },
                                                            "right": {
                                                                "type": "Literal",
                                                                "value": "fallback",
                                                                "raw": "'fallback'"
                                                            }
                                                        },
                                                        "consequent": {
                                                            "type": "BlockStatement",
                                                            "body": [
                                                                {
                                                                    "type": "ReturnStatement",
                                                                    "argument": {
                                                                        "type": "LogicalExpression",
                                                                        "operator": "&&",
                                                                        "left": {
                                                                            "type": "MemberExpression",
                                                                            "computed": False,
                                                                            "object": {
                                                                                "type": "CallExpression",
                                                                                "callee": {
                                                                                    "type": "MemberExpression",
                                                                                    "computed": False,
                                                                                    "object": {
                                                                                        "type": "Identifier",
                                                                                        "name": "$"
                                                                                    },
                                                                                    "property": {
                                                                                        "type": "Identifier",
                                                                                        "name": "trim"
                                                                                    }
                                                                                },
                                                                                "arguments": [
                                                                                    {
                                                                                        "type": "CallExpression",
                                                                                        "callee": {
                                                                                            "type": "MemberExpression",
                                                                                            "computed": False,
                                                                                            "object": {
                                                                                                "type": "ThisExpression"
                                                                                            },
                                                                                            "property": {
                                                                                                "type": "Identifier",
                                                                                                "name": "get"
                                                                                            }
                                                                                        },
                                                                                        "arguments": [
                                                                                            {
                                                                                                "type": "Literal",
                                                                                                "value": "location",
                                                                                                "raw": "'location'"
                                                                                            }
                                                                                        ]
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "property": {
                                                                                "type": "Identifier",
                                                                                "name": "length"
                                                                            }
                                                                        },
                                                                        "right": {
                                                                            "type": "BinaryExpression",
                                                                            "operator": "!==",
                                                                            "left": {
                                                                                "type": "CallExpression",
                                                                                "callee": {
                                                                                    "type": "MemberExpression",
                                                                                    "computed": False,
                                                                                    "object": {
                                                                                        "type": "ThisExpression"
                                                                                    },
                                                                                    "property": {
                                                                                        "type": "Identifier",
                                                                                        "name": "get"
                                                                                    }
                                                                                },
                                                                                "arguments": [
                                                                                    {
                                                                                        "type": "Literal",
                                                                                        "value": "mode",
                                                                                        "raw": "'mode'"
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "right": {
                                                                                "type": "Literal",
                                                                                "value": "unrecognized_location",
                                                                                "raw": "'unrecognized_location'"
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            ]
                                                        },
                                                        "alternate": None
                                                    },
                                                    {
                                                        "type": "ReturnStatement",
                                                        "argument": {
                                                            "type": "LogicalExpression",
                                                            "operator": "&&",
                                                            "left": {
                                                                "type": "LogicalExpression",
                                                                "operator": "&&",
                                                                "left": {
                                                                    "type": "UnaryExpression",
                                                                    "operator": "!",
                                                                    "argument": {
                                                                        "type": "UnaryExpression",
                                                                        "operator": "!",
                                                                        "argument": {
                                                                            "type": "CallExpression",
                                                                            "callee": {
                                                                                "type": "MemberExpression",
                                                                                "computed": False,
                                                                                "object": {
                                                                                    "type": "ThisExpression"
                                                                                },
                                                                                "property": {
                                                                                    "type": "Identifier",
                                                                                    "name": "get"
                                                                                }
                                                                            },
                                                                            "arguments": [
                                                                                {
                                                                                    "type": "Literal",
                                                                                    "value": "country",
                                                                                    "raw": "'country'"
                                                                                }
                                                                            ]
                                                                        },
                                                                        "prefix": True
                                                                    },
                                                                    "prefix": True
                                                                },
                                                                "right": {
                                                                    "type": "UnaryExpression",
                                                                    "operator": "!",
                                                                    "argument": {
                                                                        "type": "UnaryExpression",
                                                                        "operator": "!",
                                                                        "argument": {
                                                                            "type": "CallExpression",
                                                                            "callee": {
                                                                                "type": "MemberExpression",
                                                                                "computed": False,
                                                                                "object": {
                                                                                    "type": "ThisExpression"
                                                                                },
                                                                                "property": {
                                                                                    "type": "Identifier",
                                                                                    "name": "get"
                                                                                }
                                                                            },
                                                                            "arguments": [
                                                                                {
                                                                                    "type": "Literal",
                                                                                    "value": "state",
                                                                                    "raw": "'state'"
                                                                                }
                                                                            ]
                                                                        },
                                                                        "prefix": True
                                                                    },
                                                                    "prefix": True
                                                                }
                                                            },
                                                            "right": {
                                                                "type": "MemberExpression",
                                                                "computed": False,
                                                                "object": {
                                                                    "type": "CallExpression",
                                                                    "callee": {
                                                                        "type": "MemberExpression",
                                                                        "computed": False,
                                                                        "object": {
                                                                            "type": "Identifier",
                                                                            "name": "$"
                                                                        },
                                                                        "property": {
                                                                            "type": "Identifier",
                                                                            "name": "trim"
                                                                        }
                                                                    },
                                                                    "arguments": [
                                                                        {
                                                                            "type": "CallExpression",
                                                                            "callee": {
                                                                                "type": "MemberExpression",
                                                                                "computed": False,
                                                                                "object": {
                                                                                    "type": "ThisExpression"
                                                                                },
                                                                                "property": {
                                                                                    "type": "Identifier",
                                                                                    "name": "get"
                                                                                }
                                                                            },
                                                                            "arguments": [
                                                                                {
                                                                                    "type": "Literal",
                                                                                    "value": "city",
                                                                                    "raw": "'city'"
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                "property": {
                                                                    "type": "Identifier",
                                                                    "name": "length"
                                                                }
                                                            }
                                                        }
                                                    }
                                                ]
                                            },
                                            "rest": None,
                                            "generator": False,
                                            "expression": False
                                        },
                                        "kind": "init"
                                    }
                                ]
                            }
                        ]
                    }
                }
            ],
            "kind": "var"
        },
        {
            "type": "VariableDeclaration",
            "declarations": [
                {
                    "type": "VariableDeclarator",
                    "id": {
                        "type": "Identifier",
                        "name": "FormField"
                    },
                    "init": {
                        "type": "CallExpression",
                        "callee": {
                            "type": "MemberExpression",
                            "computed": False,
                            "object": {
                                "type": "Identifier",
                                "name": "React"
                            },
                            "property": {
                                "type": "Identifier",
                                "name": "createClass"
                            }
                        },
                        "arguments": [
                            {
                                "type": "ObjectExpression",
                                "properties": [
                                    {
                                        "type": "Property",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "displayName"
                                        },
                                        "value": {
                                            "type": "Literal",
                                            "value": "FormField",
                                            "raw": "'FormField'"
                                        },
                                        "kind": "init"
                                    },
                                    {
                                        "type": "Property",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "errorFor"
                                        },
                                        "value": {
                                            "type": "FunctionExpression",
                                            "id": None,
                                            "params": [
                                                {
                                                    "type": "Identifier",
                                                    "name": "name"
                                                }
                                            ],
                                            "defaults": [],
                                            "body": {
                                                "type": "BlockStatement",
                                                "body": [
                                                    {
                                                        "type": "VariableDeclaration",
                                                        "declarations": [
                                                            {
                                                                "type": "VariableDeclarator",
                                                                "id": {
                                                                    "type": "Identifier",
                                                                    "name": "error"
                                                                },
                                                                "init": {
                                                                    "type": "CallExpression",
                                                                    "callee": {
                                                                        "type": "MemberExpression",
                                                                        "computed": False,
                                                                        "object": {
                                                                            "type": "MemberExpression",
                                                                            "computed": False,
                                                                            "object": {
                                                                                "type": "MemberExpression",
                                                                                "computed": False,
                                                                                "object": {
                                                                                    "type": "ThisExpression"
                                                                                },
                                                                                "property": {
                                                                                    "type": "Identifier",
                                                                                    "name": "props"
                                                                                }
                                                                            },
                                                                            "property": {
                                                                                "type": "Identifier",
                                                                                "name": "model"
                                                                            }
                                                                        },
                                                                        "property": {
                                                                            "type": "Identifier",
                                                                            "name": "errorMessageForFieldNamed"
                                                                        }
                                                                    },
                                                                    "arguments": [
                                                                        {
                                                                            "type": "Identifier",
                                                                            "name": "name"
                                                                        }
                                                                    ]
                                                                }
                                                            }
                                                        ],
                                                        "kind": "var"
                                                    },
                                                    {
                                                        "type": "ReturnStatement",
                                                        "argument": {
                                                            "type": "LogicalExpression",
                                                            "operator": "&&",
                                                            "left": {
                                                                "type": "Identifier",
                                                                "name": "error"
                                                            },
                                                            "right": {
                                                                "type": "CallExpression",
                                                                "callee": {
                                                                    "type": "MemberExpression",
                                                                    "computed": False,
                                                                    "object": {
                                                                        "type": "MemberExpression",
                                                                        "computed": False,
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
                                                                        "name": "span"
                                                                    }
                                                                },
                                                                "arguments": [
                                                                    {
                                                                        "type": "Literal",
                                                                        "value": None,
                                                                        "raw": "null"
                                                                    },
                                                                    {
                                                                        "type": "Identifier",
                                                                        "name": "error"
                                                                    }
                                                                ]
                                                            }
                                                        }
                                                    }
                                                ]
                                            },
                                            "rest": None,
                                            "generator": False,
                                            "expression": False
                                        },
                                        "kind": "init"
                                    },
                                    {
                                        "type": "Property",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "fieldWasChanged"
                                        },
                                        "value": {
                                            "type": "FunctionExpression",
                                            "id": None,
                                            "params": [
                                                {
                                                    "type": "Identifier",
                                                    "name": "event"
                                                }
                                            ],
                                            "defaults": [],
                                            "body": {
                                                "type": "BlockStatement",
                                                "body": [
                                                    {
                                                        "type": "ExpressionStatement",
                                                        "expression": {
                                                            "type": "CallExpression",
                                                            "callee": {
                                                                "type": "MemberExpression",
                                                                "computed": False,
                                                                "object": {
                                                                    "type": "MemberExpression",
                                                                    "computed": False,
                                                                    "object": {
                                                                        "type": "MemberExpression",
                                                                        "computed": False,
                                                                        "object": {
                                                                            "type": "ThisExpression"
                                                                        },
                                                                        "property": {
                                                                            "type": "Identifier",
                                                                            "name": "props"
                                                                        }
                                                                    },
                                                                    "property": {
                                                                        "type": "Identifier",
                                                                        "name": "model"
                                                                    }
                                                                },
                                                                "property": {
                                                                    "type": "Identifier",
                                                                    "name": "setValueForField"
                                                                }
                                                            },
                                                            "arguments": [
                                                                {
                                                                    "type": "MemberExpression",
                                                                    "computed": False,
                                                                    "object": {
                                                                        "type": "MemberExpression",
                                                                        "computed": False,
                                                                        "object": {
                                                                            "type": "Identifier",
                                                                            "name": "event"
                                                                        },
                                                                        "property": {
                                                                            "type": "Identifier",
                                                                            "name": "target"
                                                                        }
                                                                    },
                                                                    "property": {
                                                                        "type": "Identifier",
                                                                        "name": "name"
                                                                    }
                                                                },
                                                                {
                                                                    "type": "MemberExpression",
                                                                    "computed": False,
                                                                    "object": {
                                                                        "type": "MemberExpression",
                                                                        "computed": False,
                                                                        "object": {
                                                                            "type": "Identifier",
                                                                            "name": "event"
                                                                        },
                                                                        "property": {
                                                                            "type": "Identifier",
                                                                            "name": "target"
                                                                        }
                                                                    },
                                                                    "property": {
                                                                        "type": "Identifier",
                                                                        "name": "value"
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ]
                                            },
                                            "rest": None,
                                            "generator": False,
                                            "expression": False
                                        },
                                        "kind": "init"
                                    },
                                    {
                                        "type": "Property",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "render"
                                        },
                                        "value": {
                                            "type": "FunctionExpression",
                                            "id": None,
                                            "params": [],
                                            "defaults": [],
                                            "body": {
                                                "type": "BlockStatement",
                                                "body": [
                                                    {
                                                        "type": "VariableDeclaration",
                                                        "declarations": [
                                                            {
                                                                "type": "VariableDeclarator",
                                                                "id": {
                                                                    "type": "Identifier",
                                                                    "name": "name"
                                                                },
                                                                "init": {
                                                                    "type": "MemberExpression",
                                                                    "computed": False,
                                                                    "object": {
                                                                        "type": "MemberExpression",
                                                                        "computed": False,
                                                                        "object": {
                                                                            "type": "ThisExpression"
                                                                        },
                                                                        "property": {
                                                                            "type": "Identifier",
                                                                            "name": "props"
                                                                        }
                                                                    },
                                                                    "property": {
                                                                        "type": "Identifier",
                                                                        "name": "name"
                                                                    }
                                                                }
                                                            }
                                                        ],
                                                        "kind": "var"
                                                    },
                                                    {
                                                        "type": "ReturnStatement",
                                                        "argument": {
                                                            "type": "CallExpression",
                                                            "callee": {
                                                                "type": "MemberExpression",
                                                                "computed": False,
                                                                "object": {
                                                                    "type": "MemberExpression",
                                                                    "computed": False,
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
                                                                    "name": "fieldset"
                                                                }
                                                            },
                                                            "arguments": [
                                                                {
                                                                    "type": "ObjectExpression",
                                                                    "properties": [
                                                                        {
                                                                            "type": "Property",
                                                                            "key": {
                                                                                "type": "Identifier",
                                                                                "name": "disabled"
                                                                            },
                                                                            "value": {
                                                                                "type": "MemberExpression",
                                                                                "computed": False,
                                                                                "object": {
                                                                                    "type": "MemberExpression",
                                                                                    "computed": False,
                                                                                    "object": {
                                                                                        "type": "ThisExpression"
                                                                                    },
                                                                                    "property": {
                                                                                        "type": "Identifier",
                                                                                        "name": "props"
                                                                                    }
                                                                                },
                                                                                "property": {
                                                                                    "type": "Identifier",
                                                                                    "name": "disabled"
                                                                                }
                                                                            },
                                                                            "kind": "init"
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    "type": "CallExpression",
                                                                    "callee": {
                                                                        "type": "MemberExpression",
                                                                        "computed": False,
                                                                        "object": {
                                                                            "type": "MemberExpression",
                                                                            "computed": False,
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
                                                                            "name": "label"
                                                                        }
                                                                    },
                                                                    "arguments": [
                                                                        {
                                                                            "type": "Literal",
                                                                            "value": None,
                                                                            "raw": "null"
                                                                        },
                                                                        {
                                                                            "type": "MemberExpression",
                                                                            "computed": False,
                                                                            "object": {
                                                                                "type": "MemberExpression",
                                                                                "computed": False,
                                                                                "object": {
                                                                                    "type": "ThisExpression"
                                                                                },
                                                                                "property": {
                                                                                    "type": "Identifier",
                                                                                    "name": "props"
                                                                                }
                                                                            },
                                                                            "property": {
                                                                                "type": "Identifier",
                                                                                "name": "label"
                                                                            }
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    "type": "CallExpression",
                                                                    "callee": {
                                                                        "type": "MemberExpression",
                                                                        "computed": False,
                                                                        "object": {
                                                                            "type": "MemberExpression",
                                                                            "computed": False,
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
                                                                            "name": "input"
                                                                        }
                                                                    },
                                                                    "arguments": [
                                                                        {
                                                                            "type": "ObjectExpression",
                                                                            "properties": [
                                                                                {
                                                                                    "type": "Property",
                                                                                    "key": {
                                                                                        "type": "Identifier",
                                                                                        "name": "ref"
                                                                                    },
                                                                                    "value": {
                                                                                        "type": "Literal",
                                                                                        "value": "input",
                                                                                        "raw": "\"input\""
                                                                                    },
                                                                                    "kind": "init"
                                                                                },
                                                                                {
                                                                                    "type": "Property",
                                                                                    "key": {
                                                                                        "type": "Identifier",
                                                                                        "name": "name"
                                                                                    },
                                                                                    "value": {
                                                                                        "type": "Identifier",
                                                                                        "name": "name"
                                                                                    },
                                                                                    "kind": "init"
                                                                                },
                                                                                {
                                                                                    "type": "Property",
                                                                                    "key": {
                                                                                        "type": "Identifier",
                                                                                        "name": "onChange"
                                                                                    },
                                                                                    "value": {
                                                                                        "type": "MemberExpression",
                                                                                        "computed": False,
                                                                                        "object": {
                                                                                            "type": "ThisExpression"
                                                                                        },
                                                                                        "property": {
                                                                                            "type": "Identifier",
                                                                                            "name": "fieldWasChanged"
                                                                                        }
                                                                                    },
                                                                                    "kind": "init"
                                                                                },
                                                                                {
                                                                                    "type": "Property",
                                                                                    "key": {
                                                                                        "type": "Identifier",
                                                                                        "name": "value"
                                                                                    },
                                                                                    "value": {
                                                                                        "type": "CallExpression",
                                                                                        "callee": {
                                                                                            "type": "MemberExpression",
                                                                                            "computed": False,
                                                                                            "object": {
                                                                                                "type": "MemberExpression",
                                                                                                "computed": False,
                                                                                                "object": {
                                                                                                    "type": "MemberExpression",
                                                                                                    "computed": False,
                                                                                                    "object": {
                                                                                                        "type": "ThisExpression"
                                                                                                    },
                                                                                                    "property": {
                                                                                                        "type": "Identifier",
                                                                                                        "name": "props"
                                                                                                    }
                                                                                                },
                                                                                                "property": {
                                                                                                    "type": "Identifier",
                                                                                                    "name": "model"
                                                                                                }
                                                                                            },
                                                                                            "property": {
                                                                                                "type": "Identifier",
                                                                                                "name": "valueForFieldNamed"
                                                                                            }
                                                                                        },
                                                                                        "arguments": [
                                                                                            {
                                                                                                "type": "Identifier",
                                                                                                "name": "name"
                                                                                            }
                                                                                        ]
                                                                                    },
                                                                                    "kind": "init"
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    "type": "CallExpression",
                                                                    "callee": {
                                                                        "type": "MemberExpression",
                                                                        "computed": False,
                                                                        "object": {
                                                                            "type": "ThisExpression"
                                                                        },
                                                                        "property": {
                                                                            "type": "Identifier",
                                                                            "name": "errorFor"
                                                                        }
                                                                    },
                                                                    "arguments": [
                                                                        {
                                                                            "type": "Identifier",
                                                                            "name": "name"
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ]
                                            },
                                            "rest": None,
                                            "generator": False,
                                            "expression": False
                                        },
                                        "kind": "init"
                                    },
                                    {
                                        "type": "Property",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "focus"
                                        },
                                        "value": {
                                            "type": "FunctionExpression",
                                            "id": None,
                                            "params": [],
                                            "defaults": [],
                                            "body": {
                                                "type": "BlockStatement",
                                                "body": [
                                                    {
                                                        "type": "ExpressionStatement",
                                                        "expression": {
                                                            "type": "CallExpression",
                                                            "callee": {
                                                                "type": "MemberExpression",
                                                                "computed": False,
                                                                "object": {
                                                                    "type": "CallExpression",
                                                                    "callee": {
                                                                        "type": "MemberExpression",
                                                                        "computed": False,
                                                                        "object": {
                                                                            "type": "MemberExpression",
                                                                            "computed": False,
                                                                            "object": {
                                                                                "type": "MemberExpression",
                                                                                "computed": False,
                                                                                "object": {
                                                                                    "type": "ThisExpression"
                                                                                },
                                                                                "property": {
                                                                                    "type": "Identifier",
                                                                                    "name": "refs"
                                                                                }
                                                                            },
                                                                            "property": {
                                                                                "type": "Identifier",
                                                                                "name": "input"
                                                                            }
                                                                        },
                                                                        "property": {
                                                                            "type": "Identifier",
                                                                            "name": "getDOMNode"
                                                                        }
                                                                    },
                                                                    "arguments": []
                                                                },
                                                                "property": {
                                                                    "type": "Identifier",
                                                                    "name": "focus"
                                                                }
                                                            },
                                                            "arguments": []
                                                        }
                                                    }
                                                ]
                                            },
                                            "rest": None,
                                            "generator": False,
                                            "expression": False
                                        },
                                        "kind": "init"
                                    }
                                ]
                            }
                        ]
                    }
                }
            ],
            "kind": "var"
        },
        {
            "type": "VariableDeclaration",
            "declarations": [
                {
                    "type": "VariableDeclarator",
                    "id": {
                        "type": "Identifier",
                        "name": "OrgNameDeDuper"
                    },
                    "init": {
                        "type": "CallExpression",
                        "callee": {
                            "type": "MemberExpression",
                            "computed": False,
                            "object": {
                                "type": "Identifier",
                                "name": "React"
                            },
                            "property": {
                                "type": "Identifier",
                                "name": "createClass"
                            }
                        },
                        "arguments": [
                            {
                                "type": "ObjectExpression",
                                "properties": [
                                    {
                                        "type": "Property",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "displayName"
                                        },
                                        "value": {
                                            "type": "Literal",
                                            "value": "OrgNameDeDuper",
                                            "raw": "'OrgNameDeDuper'"
                                        },
                                        "kind": "init"
                                    },
                                    {
                                        "type": "Property",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "render"
                                        },
                                        "value": {
                                            "type": "FunctionExpression",
                                            "id": None,
                                            "params": [],
                                            "defaults": [],
                                            "body": {
                                                "type": "BlockStatement",
                                                "body": [
                                                    {
                                                        "type": "ReturnStatement",
                                                        "argument": {
                                                            "type": "ConditionalExpression",
                                                            "test": {
                                                                "type": "CallExpression",
                                                                "callee": {
                                                                    "type": "MemberExpression",
                                                                    "computed": False,
                                                                    "object": {
                                                                        "type": "MemberExpression",
                                                                        "computed": False,
                                                                        "object": {
                                                                            "type": "MemberExpression",
                                                                            "computed": False,
                                                                            "object": {
                                                                                "type": "ThisExpression"
                                                                            },
                                                                            "property": {
                                                                                "type": "Identifier",
                                                                                "name": "props"
                                                                            }
                                                                        },
                                                                        "property": {
                                                                            "type": "Identifier",
                                                                            "name": "model"
                                                                        }
                                                                    },
                                                                    "property": {
                                                                        "type": "Identifier",
                                                                        "name": "existingOrgIsSelected"
                                                                    }
                                                                },
                                                                "arguments": []
                                                            },
                                                            "consequent": {
                                                                "type": "CallExpression",
                                                                "callee": {
                                                                    "type": "Identifier",
                                                                    "name": "DeduperExistingOrg"
                                                                },
                                                                "arguments": [
                                                                    {
                                                                        "type": "ObjectExpression",
                                                                        "properties": [
                                                                            {
                                                                                "type": "Property",
                                                                                "key": {
                                                                                    "type": "Identifier",
                                                                                    "name": "org"
                                                                                },
                                                                                "value": {
                                                                                    "type": "CallExpression",
                                                                                    "callee": {
                                                                                        "type": "MemberExpression",
                                                                                        "computed": False,
                                                                                        "object": {
                                                                                            "type": "MemberExpression",
                                                                                            "computed": False,
                                                                                            "object": {
                                                                                                "type": "MemberExpression",
                                                                                                "computed": False,
                                                                                                "object": {
                                                                                                    "type": "ThisExpression"
                                                                                                },
                                                                                                "property": {
                                                                                                    "type": "Identifier",
                                                                                                    "name": "props"
                                                                                                }
                                                                                            },
                                                                                            "property": {
                                                                                                "type": "Identifier",
                                                                                                "name": "model"
                                                                                            }
                                                                                        },
                                                                                        "property": {
                                                                                            "type": "Identifier",
                                                                                            "name": "selectedExistingOrg"
                                                                                        }
                                                                                    },
                                                                                    "arguments": []
                                                                                },
                                                                                "kind": "init"
                                                                            },
                                                                            {
                                                                                "type": "Property",
                                                                                "key": {
                                                                                    "type": "Identifier",
                                                                                    "name": "onReset"
                                                                                },
                                                                                "value": {
                                                                                    "type": "MemberExpression",
                                                                                    "computed": False,
                                                                                    "object": {
                                                                                        "type": "ThisExpression"
                                                                                    },
                                                                                    "property": {
                                                                                        "type": "Identifier",
                                                                                        "name": "existingOrgWasReset"
                                                                                    }
                                                                                },
                                                                                "kind": "init"
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            },
                                                            "alternate": {
                                                                "type": "CallExpression",
                                                                "callee": {
                                                                    "type": "Identifier",
                                                                    "name": "DeduperTypeahead"
                                                                },
                                                                "arguments": [
                                                                    {
                                                                        "type": "ObjectExpression",
                                                                        "properties": [
                                                                            {
                                                                                "type": "Property",
                                                                                "key": {
                                                                                    "type": "Identifier",
                                                                                    "name": "ref"
                                                                                },
                                                                                "value": {
                                                                                    "type": "Literal",
                                                                                    "value": "typeahead",
                                                                                    "raw": "\"typeahead\""
                                                                                },
                                                                                "kind": "init"
                                                                            },
                                                                            {
                                                                                "type": "Property",
                                                                                "key": {
                                                                                    "type": "Identifier",
                                                                                    "name": "disabled"
                                                                                },
                                                                                "value": {
                                                                                    "type": "MemberExpression",
                                                                                    "computed": False,
                                                                                    "object": {
                                                                                        "type": "MemberExpression",
                                                                                        "computed": False,
                                                                                        "object": {
                                                                                            "type": "ThisExpression"
                                                                                        },
                                                                                        "property": {
                                                                                            "type": "Identifier",
                                                                                            "name": "props"
                                                                                        }
                                                                                    },
                                                                                    "property": {
                                                                                        "type": "Identifier",
                                                                                        "name": "disabled"
                                                                                    }
                                                                                },
                                                                                "kind": "init"
                                                                            },
                                                                            {
                                                                                "type": "Property",
                                                                                "key": {
                                                                                    "type": "Identifier",
                                                                                    "name": "model"
                                                                                },
                                                                                "value": {
                                                                                    "type": "MemberExpression",
                                                                                    "computed": False,
                                                                                    "object": {
                                                                                        "type": "MemberExpression",
                                                                                        "computed": False,
                                                                                        "object": {
                                                                                            "type": "ThisExpression"
                                                                                        },
                                                                                        "property": {
                                                                                            "type": "Identifier",
                                                                                            "name": "props"
                                                                                        }
                                                                                    },
                                                                                    "property": {
                                                                                        "type": "Identifier",
                                                                                        "name": "model"
                                                                                    }
                                                                                },
                                                                                "kind": "init"
                                                                            },
                                                                            {
                                                                                "type": "Property",
                                                                                "key": {
                                                                                    "type": "Identifier",
                                                                                    "name": "onNameChosen"
                                                                                },
                                                                                "value": {
                                                                                    "type": "MemberExpression",
                                                                                    "computed": False,
                                                                                    "object": {
                                                                                        "type": "MemberExpression",
                                                                                        "computed": False,
                                                                                        "object": {
                                                                                            "type": "ThisExpression"
                                                                                        },
                                                                                        "property": {
                                                                                            "type": "Identifier",
                                                                                            "name": "props"
                                                                                        }
                                                                                    },
                                                                                    "property": {
                                                                                        "type": "Identifier",
                                                                                        "name": "onNameChosen"
                                                                                    }
                                                                                },
                                                                                "kind": "init"
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            }
                                                        }
                                                    }
                                                ]
                                            },
                                            "rest": None,
                                            "generator": False,
                                            "expression": False
                                        },
                                        "kind": "init"
                                    },
                                    {
                                        "type": "Property",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "existingOrgWasReset"
                                        },
                                        "value": {
                                            "type": "FunctionExpression",
                                            "id": None,
                                            "params": [],
                                            "defaults": [],
                                            "body": {
                                                "type": "BlockStatement",
                                                "body": [
                                                    {
                                                        "type": "ExpressionStatement",
                                                        "expression": {
                                                            "type": "CallExpression",
                                                            "callee": {
                                                                "type": "MemberExpression",
                                                                "computed": False,
                                                                "object": {
                                                                    "type": "MemberExpression",
                                                                    "computed": False,
                                                                    "object": {
                                                                        "type": "MemberExpression",
                                                                        "computed": False,
                                                                        "object": {
                                                                            "type": "ThisExpression"
                                                                        },
                                                                        "property": {
                                                                            "type": "Identifier",
                                                                            "name": "props"
                                                                        }
                                                                    },
                                                                    "property": {
                                                                        "type": "Identifier",
                                                                        "name": "model"
                                                                    }
                                                                },
                                                                "property": {
                                                                    "type": "Identifier",
                                                                    "name": "setValueForField"
                                                                }
                                                            },
                                                            "arguments": [
                                                                {
                                                                    "type": "Literal",
                                                                    "value": "name",
                                                                    "raw": "'name'"
                                                                },
                                                                {
                                                                    "type": "Literal",
                                                                    "value": "",
                                                                    "raw": "''"
                                                                }
                                                            ]
                                                        }
                                                    },
                                                    {
                                                        "type": "ExpressionStatement",
                                                        "expression": {
                                                            "type": "CallExpression",
                                                            "callee": {
                                                                "type": "MemberExpression",
                                                                "computed": False,
                                                                "object": {
                                                                    "type": "Identifier",
                                                                    "name": "_"
                                                                },
                                                                "property": {
                                                                    "type": "Identifier",
                                                                    "name": "defer"
                                                                }
                                                            },
                                                            "arguments": [
                                                                {
                                                                    "type": "CallExpression",
                                                                    "callee": {
                                                                        "type": "MemberExpression",
                                                                        "computed": False,
                                                                        "object": {
                                                                            "type": "FunctionExpression",
                                                                            "id": None,
                                                                            "params": [],
                                                                            "defaults": [],
                                                                            "body": {
                                                                                "type": "BlockStatement",
                                                                                "body": [
                                                                                    {
                                                                                        "type": "ExpressionStatement",
                                                                                        "expression": {
                                                                                            "type": "CallExpression",
                                                                                            "callee": {
                                                                                                "type": "MemberExpression",
                                                                                                "computed": False,
                                                                                                "object": {
                                                                                                    "type": "MemberExpression",
                                                                                                    "computed": False,
                                                                                                    "object": {
                                                                                                        "type": "MemberExpression",
                                                                                                        "computed": False,
                                                                                                        "object": {
                                                                                                            "type": "ThisExpression"
                                                                                                        },
                                                                                                        "property": {
                                                                                                            "type": "Identifier",
                                                                                                            "name": "refs"
                                                                                                        }
                                                                                                    },
                                                                                                    "property": {
                                                                                                        "type": "Identifier",
                                                                                                        "name": "typeahead"
                                                                                                    }
                                                                                                },
                                                                                                "property": {
                                                                                                    "type": "Identifier",
                                                                                                    "name": "focus"
                                                                                                }
                                                                                            },
                                                                                            "arguments": []
                                                                                        }
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "rest": None,
                                                                            "generator": False,
                                                                            "expression": False
                                                                        },
                                                                        "property": {
                                                                            "type": "Identifier",
                                                                            "name": "bind"
                                                                        }
                                                                    },
                                                                    "arguments": [
                                                                        {
                                                                            "type": "ThisExpression"
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ]
                                            },
                                            "rest": None,
                                            "generator": False,
                                            "expression": False
                                        },
                                        "kind": "init"
                                    }
                                ]
                            }
                        ]
                    }
                }
            ],
            "kind": "var"
        },
        {
            "type": "VariableDeclaration",
            "declarations": [
                {
                    "type": "VariableDeclarator",
                    "id": {
                        "type": "Identifier",
                        "name": "DeduperExistingOrg"
                    },
                    "init": {
                        "type": "CallExpression",
                        "callee": {
                            "type": "MemberExpression",
                            "computed": False,
                            "object": {
                                "type": "Identifier",
                                "name": "React"
                            },
                            "property": {
                                "type": "Identifier",
                                "name": "createClass"
                            }
                        },
                        "arguments": [
                            {
                                "type": "ObjectExpression",
                                "properties": [
                                    {
                                        "type": "Property",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "displayName"
                                        },
                                        "value": {
                                            "type": "Literal",
                                            "value": "DeduperExistingOrg",
                                            "raw": "'DeduperExistingOrg'"
                                        },
                                        "kind": "init"
                                    },
                                    {
                                        "type": "Property",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "mixins"
                                        },
                                        "value": {
                                            "type": "ArrayExpression",
                                            "elements": [
                                                {
                                                    "type": "MemberExpression",
                                                    "computed": False,
                                                    "object": {
                                                        "type": "Identifier",
                                                        "name": "ABC"
                                                    },
                                                    "property": {
                                                        "type": "Identifier",
                                                        "name": "EventHandling"
                                                    }
                                                }
                                            ]
                                        },
                                        "kind": "init"
                                    },
                                    {
                                        "type": "Property",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "render"
                                        },
                                        "value": {
                                            "type": "FunctionExpression",
                                            "id": None,
                                            "params": [],
                                            "defaults": [],
                                            "body": {
                                                "type": "BlockStatement",
                                                "body": [
                                                    {
                                                        "type": "VariableDeclaration",
                                                        "declarations": [
                                                            {
                                                                "type": "VariableDeclarator",
                                                                "id": {
                                                                    "type": "Identifier",
                                                                    "name": "org"
                                                                },
                                                                "init": {
                                                                    "type": "MemberExpression",
                                                                    "computed": False,
                                                                    "object": {
                                                                        "type": "MemberExpression",
                                                                        "computed": False,
                                                                        "object": {
                                                                            "type": "ThisExpression"
                                                                        },
                                                                        "property": {
                                                                            "type": "Identifier",
                                                                            "name": "props"
                                                                        }
                                                                    },
                                                                    "property": {
                                                                        "type": "Identifier",
                                                                        "name": "org"
                                                                    }
                                                                }
                                                            }
                                                        ],
                                                        "kind": "var"
                                                    },
                                                    {
                                                        "type": "ReturnStatement",
                                                        "argument": {
                                                            "type": "CallExpression",
                                                            "callee": {
                                                                "type": "MemberExpression",
                                                                "computed": False,
                                                                "object": {
                                                                    "type": "MemberExpression",
                                                                    "computed": False,
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
                                                                    "name": "fieldset"
                                                                }
                                                            },
                                                            "arguments": [
                                                                {
                                                                    "type": "Literal",
                                                                    "value": None,
                                                                    "raw": "null"
                                                                },
                                                                {
                                                                    "type": "CallExpression",
                                                                    "callee": {
                                                                        "type": "MemberExpression",
                                                                        "computed": False,
                                                                        "object": {
                                                                            "type": "MemberExpression",
                                                                            "computed": False,
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
                                                                            "name": "label"
                                                                        }
                                                                    },
                                                                    "arguments": [
                                                                        {
                                                                            "type": "ObjectExpression",
                                                                            "properties": [
                                                                                {
                                                                                    "type": "Property",
                                                                                    "key": {
                                                                                        "type": "Identifier",
                                                                                        "name": "className"
                                                                                    },
                                                                                    "value": {
                                                                                        "type": "Literal",
                                                                                        "value": "existing-org-label",
                                                                                        "raw": "\"existing-org-label\""
                                                                                    },
                                                                                    "kind": "init"
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            "type": "CallExpression",
                                                                            "callee": {
                                                                                "type": "Identifier",
                                                                                "name": "i18n"
                                                                            },
                                                                            "arguments": [
                                                                                {
                                                                                    "type": "Literal",
                                                                                    "value": "This organization already exists!",
                                                                                    "raw": "\"This organization already exists!\""
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    "type": "Literal",
                                                                    "value": ")",
                                                                    "raw": "\")\""
                                                                },
                                                                {
                                                                    "type": "CallExpression",
                                                                    "callee": {
                                                                        "type": "MemberExpression",
                                                                        "computed": False,
                                                                        "object": {
                                                                            "type": "MemberExpression",
                                                                            "computed": False,
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
                                                                            "name": "div"
                                                                        }
                                                                    },
                                                                    "arguments": [
                                                                        {
                                                                            "type": "ObjectExpression",
                                                                            "properties": [
                                                                                {
                                                                                    "type": "Property",
                                                                                    "key": {
                                                                                        "type": "Identifier",
                                                                                        "name": "className"
                                                                                    },
                                                                                    "value": {
                                                                                        "type": "Literal",
                                                                                        "value": "existing-org",
                                                                                        "raw": "\"existing-org\""
                                                                                    },
                                                                                    "kind": "init"
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            "type": "CallExpression",
                                                                            "callee": {
                                                                                "type": "MemberExpression",
                                                                                "computed": False,
                                                                                "object": {
                                                                                    "type": "MemberExpression",
                                                                                    "computed": False,
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
                                                                                    "name": "img"
                                                                                }
                                                                            },
                                                                            "arguments": [
                                                                                {
                                                                                    "type": "ObjectExpression",
                                                                                    "properties": [
                                                                                        {
                                                                                            "type": "Property",
                                                                                            "key": {
                                                                                                "type": "Identifier",
                                                                                                "name": "height"
                                                                                            },
                                                                                            "value": {
                                                                                                "type": "Literal",
                                                                                                "value": "48",
                                                                                                "raw": "\"48\""
                                                                                            },
                                                                                            "kind": "init"
                                                                                        },
                                                                                        {
                                                                                            "type": "Property",
                                                                                            "key": {
                                                                                                "type": "Identifier",
                                                                                                "name": "width"
                                                                                            },
                                                                                            "value": {
                                                                                                "type": "Literal",
                                                                                                "value": "48",
                                                                                                "raw": "\"48\""
                                                                                            },
                                                                                            "kind": "init"
                                                                                        },
                                                                                        {
                                                                                            "type": "Property",
                                                                                            "key": {
                                                                                                "type": "Identifier",
                                                                                                "name": "alt"
                                                                                            },
                                                                                            "value": {
                                                                                                "type": "MemberExpression",
                                                                                                "computed": False,
                                                                                                "object": {
                                                                                                    "type": "Identifier",
                                                                                                    "name": "org"
                                                                                                },
                                                                                                "property": {
                                                                                                    "type": "Identifier",
                                                                                                    "name": "name"
                                                                                                }
                                                                                            },
                                                                                            "kind": "init"
                                                                                        },
                                                                                        {
                                                                                            "type": "Property",
                                                                                            "key": {
                                                                                                "type": "Identifier",
                                                                                                "name": "src"
                                                                                            },
                                                                                            "value": {
                                                                                                "type": "MemberExpression",
                                                                                                "computed": False,
                                                                                                "object": {
                                                                                                    "type": "Identifier",
                                                                                                    "name": "org"
                                                                                                },
                                                                                                "property": {
                                                                                                    "type": "Identifier",
                                                                                                    "name": "thumbUrl"
                                                                                                }
                                                                                            },
                                                                                            "kind": "init"
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            "type": "CallExpression",
                                                                            "callee": {
                                                                                "type": "MemberExpression",
                                                                                "computed": False,
                                                                                "object": {
                                                                                    "type": "MemberExpression",
                                                                                    "computed": False,
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
                                                                                    "name": "span"
                                                                                }
                                                                            },
                                                                            "arguments": [
                                                                                {
                                                                                    "type": "ObjectExpression",
                                                                                    "properties": [
                                                                                        {
                                                                                            "type": "Property",
                                                                                            "key": {
                                                                                                "type": "Identifier",
                                                                                                "name": "className"
                                                                                            },
                                                                                            "value": {
                                                                                                "type": "Literal",
                                                                                                "value": "name",
                                                                                                "raw": "\"name\""
                                                                                            },
                                                                                            "kind": "init"
                                                                                        }
                                                                                    ]
                                                                                },
                                                                                {
                                                                                    "type": "MemberExpression",
                                                                                    "computed": False,
                                                                                    "object": {
                                                                                        "type": "Identifier",
                                                                                        "name": "org"
                                                                                    },
                                                                                    "property": {
                                                                                        "type": "Identifier",
                                                                                        "name": "name"
                                                                                    }
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            "type": "CallExpression",
                                                                            "callee": {
                                                                                "type": "MemberExpression",
                                                                                "computed": False,
                                                                                "object": {
                                                                                    "type": "MemberExpression",
                                                                                    "computed": False,
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
                                                                                    "name": "span"
                                                                                }
                                                                            },
                                                                            "arguments": [
                                                                                {
                                                                                    "type": "ObjectExpression",
                                                                                    "properties": [
                                                                                        {
                                                                                            "type": "Property",
                                                                                            "key": {
                                                                                                "type": "Identifier",
                                                                                                "name": "className"
                                                                                            },
                                                                                            "value": {
                                                                                                "type": "Literal",
                                                                                                "value": "location",
                                                                                                "raw": "\"location\""
                                                                                            },
                                                                                            "kind": "init"
                                                                                        }
                                                                                    ]
                                                                                },
                                                                                {
                                                                                    "type": "MemberExpression",
                                                                                    "computed": False,
                                                                                    "object": {
                                                                                        "type": "Identifier",
                                                                                        "name": "org"
                                                                                    },
                                                                                    "property": {
                                                                                        "type": "Identifier",
                                                                                        "name": "relativeLocationString"
                                                                                    }
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            "type": "CallExpression",
                                                                            "callee": {
                                                                                "type": "MemberExpression",
                                                                                "computed": False,
                                                                                "object": {
                                                                                    "type": "MemberExpression",
                                                                                    "computed": False,
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
                                                                                    "name": "ul"
                                                                                }
                                                                            },
                                                                            "arguments": [
                                                                                {
                                                                                    "type": "ObjectExpression",
                                                                                    "properties": [
                                                                                        {
                                                                                            "type": "Property",
                                                                                            "key": {
                                                                                                "type": "Identifier",
                                                                                                "name": "className"
                                                                                            },
                                                                                            "value": {
                                                                                                "type": "Literal",
                                                                                                "value": "actions",
                                                                                                "raw": "\"actions\""
                                                                                            },
                                                                                            "kind": "init"
                                                                                        }
                                                                                    ]
                                                                                },
                                                                                {
                                                                                    "type": "CallExpression",
                                                                                    "callee": {
                                                                                        "type": "MemberExpression",
                                                                                        "computed": False,
                                                                                        "object": {
                                                                                            "type": "MemberExpression",
                                                                                            "computed": False,
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
                                                                                            "name": "li"
                                                                                        }
                                                                                    },
                                                                                    "arguments": [
                                                                                        {
                                                                                            "type": "Literal",
                                                                                            "value": None,
                                                                                            "raw": "null"
                                                                                        },
                                                                                        {
                                                                                            "type": "CallExpression",
                                                                                            "callee": {
                                                                                                "type": "MemberExpression",
                                                                                                "computed": False,
                                                                                                "object": {
                                                                                                    "type": "MemberExpression",
                                                                                                    "computed": False,
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
                                                                                                    "name": "a"
                                                                                                }
                                                                                            },
                                                                                            "arguments": [
                                                                                                {
                                                                                                    "type": "ObjectExpression",
                                                                                                    "properties": [
                                                                                                        {
                                                                                                            "type": "Property",
                                                                                                            "key": {
                                                                                                                "type": "Identifier",
                                                                                                                "name": "href"
                                                                                                            },
                                                                                                            "value": {
                                                                                                                "type": "MemberExpression",
                                                                                                                "computed": False,
                                                                                                                "object": {
                                                                                                                    "type": "Identifier",
                                                                                                                    "name": "org"
                                                                                                                },
                                                                                                                "property": {
                                                                                                                    "type": "Identifier",
                                                                                                                    "name": "url"
                                                                                                                }
                                                                                                            },
                                                                                                            "kind": "init"
                                                                                                        }
                                                                                                    ]
                                                                                                },
                                                                                                {
                                                                                                    "type": "CallExpression",
                                                                                                    "callee": {
                                                                                                        "type": "Identifier",
                                                                                                        "name": "i18n"
                                                                                                    },
                                                                                                    "arguments": [
                                                                                                        {
                                                                                                            "type": "Literal",
                                                                                                            "value": "View org page",
                                                                                                            "raw": "\"View org page\""
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ]
                                                                                },
                                                                                {
                                                                                    "type": "CallExpression",
                                                                                    "callee": {
                                                                                        "type": "MemberExpression",
                                                                                        "computed": False,
                                                                                        "object": {
                                                                                            "type": "MemberExpression",
                                                                                            "computed": False,
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
                                                                                            "name": "li"
                                                                                        }
                                                                                    },
                                                                                    "arguments": [
                                                                                        {
                                                                                            "type": "Literal",
                                                                                            "value": None,
                                                                                            "raw": "null"
                                                                                        },
                                                                                        {
                                                                                            "type": "CallExpression",
                                                                                            "callee": {
                                                                                                "type": "MemberExpression",
                                                                                                "computed": False,
                                                                                                "object": {
                                                                                                    "type": "MemberExpression",
                                                                                                    "computed": False,
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
                                                                                                    "name": "a"
                                                                                                }
                                                                                            },
                                                                                            "arguments": [
                                                                                                {
                                                                                                    "type": "ObjectExpression",
                                                                                                    "properties": [
                                                                                                        {
                                                                                                            "type": "Property",
                                                                                                            "key": {
                                                                                                                "type": "Identifier",
                                                                                                                "name": "href"
                                                                                                            },
                                                                                                            "value": {
                                                                                                                "type": "MemberExpression",
                                                                                                                "computed": False,
                                                                                                                "object": {
                                                                                                                    "type": "Identifier",
                                                                                                                    "name": "org"
                                                                                                                },
                                                                                                                "property": {
                                                                                                                    "type": "Identifier",
                                                                                                                    "name": "becomeAdminUrl"
                                                                                                                }
                                                                                                            },
                                                                                                            "kind": "init"
                                                                                                        }
                                                                                                    ]
                                                                                                },
                                                                                                {
                                                                                                    "type": "CallExpression",
                                                                                                    "callee": {
                                                                                                        "type": "Identifier",
                                                                                                        "name": "i18n"
                                                                                                    },
                                                                                                    "arguments": [
                                                                                                        {
                                                                                                            "type": "Literal",
                                                                                                            "value": "Become an admin",
                                                                                                            "raw": "\"Become an admin\""
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ]
                                                                                },
                                                                                {
                                                                                    "type": "CallExpression",
                                                                                    "callee": {
                                                                                        "type": "MemberExpression",
                                                                                        "computed": False,
                                                                                        "object": {
                                                                                            "type": "MemberExpression",
                                                                                            "computed": False,
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
                                                                                            "name": "li"
                                                                                        }
                                                                                    },
                                                                                    "arguments": [
                                                                                        {
                                                                                            "type": "Literal",
                                                                                            "value": None,
                                                                                            "raw": "null"
                                                                                        },
                                                                                        {
                                                                                            "type": "CallExpression",
                                                                                            "callee": {
                                                                                                "type": "MemberExpression",
                                                                                                "computed": False,
                                                                                                "object": {
                                                                                                    "type": "MemberExpression",
                                                                                                    "computed": False,
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
                                                                                                    "name": "a"
                                                                                                }
                                                                                            },
                                                                                            "arguments": [
                                                                                                {
                                                                                                    "type": "ObjectExpression",
                                                                                                    "properties": [
                                                                                                        {
                                                                                                            "type": "Property",
                                                                                                            "key": {
                                                                                                                "type": "Identifier",
                                                                                                                "name": "href"
                                                                                                            },
                                                                                                            "value": {
                                                                                                                "type": "Literal",
                                                                                                                "value": "#",
                                                                                                                "raw": "\"#\""
                                                                                                            },
                                                                                                            "kind": "init"
                                                                                                        },
                                                                                                        {
                                                                                                            "type": "Property",
                                                                                                            "key": {
                                                                                                                "type": "Identifier",
                                                                                                                "name": "onClick"
                                                                                                            },
                                                                                                            "value": {
                                                                                                                "type": "CallExpression",
                                                                                                                "callee": {
                                                                                                                    "type": "MemberExpression",
                                                                                                                    "computed": False,
                                                                                                                    "object": {
                                                                                                                        "type": "ThisExpression"
                                                                                                                    },
                                                                                                                    "property": {
                                                                                                                        "type": "Identifier",
                                                                                                                        "name": "handle"
                                                                                                                    }
                                                                                                                },
                                                                                                                "arguments": [
                                                                                                                    {
                                                                                                                        "type": "MemberExpression",
                                                                                                                        "computed": False,
                                                                                                                        "object": {
                                                                                                                            "type": "MemberExpression",
                                                                                                                            "computed": False,
                                                                                                                            "object": {
                                                                                                                                "type": "ThisExpression"
                                                                                                                            },
                                                                                                                            "property": {
                                                                                                                                "type": "Identifier",
                                                                                                                                "name": "props"
                                                                                                                            }
                                                                                                                        },
                                                                                                                        "property": {
                                                                                                                            "type": "Identifier",
                                                                                                                            "name": "onReset"
                                                                                                                        }
                                                                                                                    }
                                                                                                                ]
                                                                                                            },
                                                                                                            "kind": "init"
                                                                                                        }
                                                                                                    ]
                                                                                                },
                                                                                                {
                                                                                                    "type": "CallExpression",
                                                                                                    "callee": {
                                                                                                        "type": "Identifier",
                                                                                                        "name": "i18n"
                                                                                                    },
                                                                                                    "arguments": [
                                                                                                        {
                                                                                                            "type": "Literal",
                                                                                                            "value": "Not it? Try again",
                                                                                                            "raw": "\"Not it? Try again\""
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ]
                                            },
                                            "rest": None,
                                            "generator": False,
                                            "expression": False
                                        },
                                        "kind": "init"
                                    }
                                ]
                            }
                        ]
                    }
                }
            ],
            "kind": "var"
        },
        {
            "type": "VariableDeclaration",
            "declarations": [
                {
                    "type": "VariableDeclarator",
                    "id": {
                        "type": "Identifier",
                        "name": "DeduperTypeahead"
                    },
                    "init": {
                        "type": "CallExpression",
                        "callee": {
                            "type": "MemberExpression",
                            "computed": False,
                            "object": {
                                "type": "Identifier",
                                "name": "React"
                            },
                            "property": {
                                "type": "Identifier",
                                "name": "createClass"
                            }
                        },
                        "arguments": [
                            {
                                "type": "ObjectExpression",
                                "properties": [
                                    {
                                        "type": "Property",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "displayName"
                                        },
                                        "value": {
                                            "type": "Literal",
                                            "value": "DeduperTypeahead",
                                            "raw": "'DeduperTypeahead'"
                                        },
                                        "kind": "init"
                                    },
                                    {
                                        "type": "Property",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "focus"
                                        },
                                        "value": {
                                            "type": "FunctionExpression",
                                            "id": None,
                                            "params": [],
                                            "defaults": [],
                                            "body": {
                                                "type": "BlockStatement",
                                                "body": [
                                                    {
                                                        "type": "ExpressionStatement",
                                                        "expression": {
                                                            "type": "CallExpression",
                                                            "callee": {
                                                                "type": "MemberExpression",
                                                                "computed": False,
                                                                "object": {
                                                                    "type": "MemberExpression",
                                                                    "computed": False,
                                                                    "object": {
                                                                        "type": "MemberExpression",
                                                                        "computed": False,
                                                                        "object": {
                                                                            "type": "ThisExpression"
                                                                        },
                                                                        "property": {
                                                                            "type": "Identifier",
                                                                            "name": "refs"
                                                                        }
                                                                    },
                                                                    "property": {
                                                                        "type": "Identifier",
                                                                        "name": "typeahead"
                                                                    }
                                                                },
                                                                "property": {
                                                                    "type": "Identifier",
                                                                    "name": "focus"
                                                                }
                                                            },
                                                            "arguments": []
                                                        }
                                                    }
                                                ]
                                            },
                                            "rest": None,
                                            "generator": False,
                                            "expression": False
                                        },
                                        "kind": "init"
                                    },
                                    {
                                        "type": "Property",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "render"
                                        },
                                        "value": {
                                            "type": "FunctionExpression",
                                            "id": None,
                                            "params": [],
                                            "defaults": [],
                                            "body": {
                                                "type": "BlockStatement",
                                                "body": [
                                                    {
                                                        "type": "ReturnStatement",
                                                        "argument": {
                                                            "type": "CallExpression",
                                                            "callee": {
                                                                "type": "MemberExpression",
                                                                "computed": False,
                                                                "object": {
                                                                    "type": "MemberExpression",
                                                                    "computed": False,
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
                                                                    "name": "fieldset"
                                                                }
                                                            },
                                                            "arguments": [
                                                                {
                                                                    "type": "Literal",
                                                                    "value": None,
                                                                    "raw": "null"
                                                                },
                                                                {
                                                                    "type": "CallExpression",
                                                                    "callee": {
                                                                        "type": "MemberExpression",
                                                                        "computed": False,
                                                                        "object": {
                                                                            "type": "MemberExpression",
                                                                            "computed": False,
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
                                                                            "name": "label"
                                                                        }
                                                                    },
                                                                    "arguments": [
                                                                        {
                                                                            "type": "ObjectExpression",
                                                                            "properties": [
                                                                                {
                                                                                    "type": "Property",
                                                                                    "key": {
                                                                                        "type": "Identifier",
                                                                                        "name": "className"
                                                                                    },
                                                                                    "value": {
                                                                                        "type": "ConditionalExpression",
                                                                                        "test": {
                                                                                            "type": "MemberExpression",
                                                                                            "computed": False,
                                                                                            "object": {
                                                                                                "type": "MemberExpression",
                                                                                                "computed": False,
                                                                                                "object": {
                                                                                                    "type": "ThisExpression"
                                                                                                },
                                                                                                "property": {
                                                                                                    "type": "Identifier",
                                                                                                    "name": "props"
                                                                                                }
                                                                                            },
                                                                                            "property": {
                                                                                                "type": "Identifier",
                                                                                                "name": "disabled"
                                                                                            }
                                                                                        },
                                                                                        "consequent": {
                                                                                            "type": "Literal",
                                                                                            "value": "disabled",
                                                                                            "raw": "'disabled'"
                                                                                        },
                                                                                        "alternate": {
                                                                                            "type": "Literal",
                                                                                            "value": "",
                                                                                            "raw": "''"
                                                                                        }
                                                                                    },
                                                                                    "kind": "init"
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            "type": "Literal",
                                                                            "value": "What’s the name of your organization?",
                                                                            "raw": "\"What’s the name of your organization?\""
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    "type": "CallExpression",
                                                                    "callee": {
                                                                        "type": "MemberExpression",
                                                                        "computed": False,
                                                                        "object": {
                                                                            "type": "Identifier",
                                                                            "name": "ABC"
                                                                        },
                                                                        "property": {
                                                                            "type": "Identifier",
                                                                            "name": "Typeahead"
                                                                        }
                                                                    },
                                                                    "arguments": [
                                                                        {
                                                                            "type": "ObjectExpression",
                                                                            "properties": [
                                                                                {
                                                                                    "type": "Property",
                                                                                    "key": {
                                                                                        "type": "Identifier",
                                                                                        "name": "ref"
                                                                                    },
                                                                                    "value": {
                                                                                        "type": "Literal",
                                                                                        "value": "typeahead",
                                                                                        "raw": "\"typeahead\""
                                                                                    },
                                                                                    "kind": "init"
                                                                                },
                                                                                {
                                                                                    "type": "Property",
                                                                                    "key": {
                                                                                        "type": "Identifier",
                                                                                        "name": "disabled"
                                                                                    },
                                                                                    "value": {
                                                                                        "type": "MemberExpression",
                                                                                        "computed": False,
                                                                                        "object": {
                                                                                            "type": "MemberExpression",
                                                                                            "computed": False,
                                                                                            "object": {
                                                                                                "type": "ThisExpression"
                                                                                            },
                                                                                            "property": {
                                                                                                "type": "Identifier",
                                                                                                "name": "props"
                                                                                            }
                                                                                        },
                                                                                        "property": {
                                                                                            "type": "Identifier",
                                                                                            "name": "disabled"
                                                                                        }
                                                                                    },
                                                                                    "kind": "init"
                                                                                },
                                                                                {
                                                                                    "type": "Property",
                                                                                    "key": {
                                                                                        "type": "Identifier",
                                                                                        "name": "defaultValue"
                                                                                    },
                                                                                    "value": {
                                                                                        "type": "CallExpression",
                                                                                        "callee": {
                                                                                            "type": "MemberExpression",
                                                                                            "computed": False,
                                                                                            "object": {
                                                                                                "type": "MemberExpression",
                                                                                                "computed": False,
                                                                                                "object": {
                                                                                                    "type": "MemberExpression",
                                                                                                    "computed": False,
                                                                                                    "object": {
                                                                                                        "type": "ThisExpression"
                                                                                                    },
                                                                                                    "property": {
                                                                                                        "type": "Identifier",
                                                                                                        "name": "props"
                                                                                                    }
                                                                                                },
                                                                                                "property": {
                                                                                                    "type": "Identifier",
                                                                                                    "name": "model"
                                                                                                }
                                                                                            },
                                                                                            "property": {
                                                                                                "type": "Identifier",
                                                                                                "name": "valueForFieldNamed"
                                                                                            }
                                                                                        },
                                                                                        "arguments": [
                                                                                            {
                                                                                                "type": "Literal",
                                                                                                "value": "name",
                                                                                                "raw": "'name'"
                                                                                            }
                                                                                        ]
                                                                                    },
                                                                                    "kind": "init"
                                                                                },
                                                                                {
                                                                                    "type": "Property",
                                                                                    "key": {
                                                                                        "type": "Identifier",
                                                                                        "name": "jqueryNodeForItem"
                                                                                    },
                                                                                    "value": {
                                                                                        "type": "MemberExpression",
                                                                                        "computed": False,
                                                                                        "object": {
                                                                                            "type": "ThisExpression"
                                                                                        },
                                                                                        "property": {
                                                                                            "type": "Identifier",
                                                                                            "name": "jqueryNodeForItem"
                                                                                        }
                                                                                    },
                                                                                    "kind": "init"
                                                                                },
                                                                                {
                                                                                    "type": "Property",
                                                                                    "key": {
                                                                                        "type": "Identifier",
                                                                                        "name": "dataSource"
                                                                                    },
                                                                                    "value": {
                                                                                        "type": "MemberExpression",
                                                                                        "computed": False,
                                                                                        "object": {
                                                                                            "type": "ThisExpression"
                                                                                        },
                                                                                        "property": {
                                                                                            "type": "Identifier",
                                                                                            "name": "autocompleteDataSource"
                                                                                        }
                                                                                    },
                                                                                    "kind": "init"
                                                                                },
                                                                                {
                                                                                    "type": "Property",
                                                                                    "key": {
                                                                                        "type": "Identifier",
                                                                                        "name": "onChange"
                                                                                    },
                                                                                    "value": {
                                                                                        "type": "MemberExpression",
                                                                                        "computed": False,
                                                                                        "object": {
                                                                                            "type": "ThisExpression"
                                                                                        },
                                                                                        "property": {
                                                                                            "type": "Identifier",
                                                                                            "name": "typeaheadWasChanged"
                                                                                        }
                                                                                    },
                                                                                    "kind": "init"
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ]
                                            },
                                            "rest": None,
                                            "generator": False,
                                            "expression": False
                                        },
                                        "kind": "init"
                                    },
                                    {
                                        "type": "Property",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "autocompleteDataSource"
                                        },
                                        "value": {
                                            "type": "FunctionExpression",
                                            "id": None,
                                            "params": [
                                                {
                                                    "type": "Identifier",
                                                    "name": "term"
                                                },
                                                {
                                                    "type": "Identifier",
                                                    "name": "callback"
                                                }
                                            ],
                                            "defaults": [],
                                            "body": {
                                                "type": "BlockStatement",
                                                "body": [
                                                    {
                                                        "type": "ExpressionStatement",
                                                        "expression": {
                                                            "type": "CallExpression",
                                                            "callee": {
                                                                "type": "MemberExpression",
                                                                "computed": False,
                                                                "object": {
                                                                    "type": "MemberExpression",
                                                                    "computed": False,
                                                                    "object": {
                                                                        "type": "MemberExpression",
                                                                        "computed": False,
                                                                        "object": {
                                                                            "type": "ThisExpression"
                                                                        },
                                                                        "property": {
                                                                            "type": "Identifier",
                                                                            "name": "props"
                                                                        }
                                                                    },
                                                                    "property": {
                                                                        "type": "Identifier",
                                                                        "name": "model"
                                                                    }
                                                                },
                                                                "property": {
                                                                    "type": "Identifier",
                                                                    "name": "orgDedupeResultsForTerm"
                                                                }
                                                            },
                                                            "arguments": [
                                                                {
                                                                    "type": "Identifier",
                                                                    "name": "term"
                                                                },
                                                                {
                                                                    "type": "CallExpression",
                                                                    "callee": {
                                                                        "type": "MemberExpression",
                                                                        "computed": False,
                                                                        "object": {
                                                                            "type": "FunctionExpression",
                                                                            "id": None,
                                                                            "params": [
                                                                                {
                                                                                    "type": "Identifier",
                                                                                    "name": "apiResults"
                                                                                }
                                                                            ],
                                                                            "defaults": [],
                                                                            "body": {
                                                                                "type": "BlockStatement",
                                                                                "body": [
                                                                                    {
                                                                                        "type": "VariableDeclaration",
                                                                                        "declarations": [
                                                                                            {
                                                                                                "type": "VariableDeclarator",
                                                                                                "id": {
                                                                                                    "type": "Identifier",
                                                                                                    "name": "results"
                                                                                                },
                                                                                                "init": {
                                                                                                    "type": "ArrayExpression",
                                                                                                    "elements": []
                                                                                                }
                                                                                            }
                                                                                        ],
                                                                                        "kind": "var"
                                                                                    },
                                                                                    {
                                                                                        "type": "IfStatement",
                                                                                        "test": {
                                                                                            "type": "UnaryExpression",
                                                                                            "operator": "!",
                                                                                            "argument": {
                                                                                                "type": "CallExpression",
                                                                                                "callee": {
                                                                                                    "type": "MemberExpression",
                                                                                                    "computed": False,
                                                                                                    "object": {
                                                                                                        "type": "Identifier",
                                                                                                        "name": "_"
                                                                                                    },
                                                                                                    "property": {
                                                                                                        "type": "Identifier",
                                                                                                        "name": "any"
                                                                                                    }
                                                                                                },
                                                                                                "arguments": [
                                                                                                    {
                                                                                                        "type": "CallExpression",
                                                                                                        "callee": {
                                                                                                            "type": "MemberExpression",
                                                                                                            "computed": False,
                                                                                                            "object": {
                                                                                                                "type": "Identifier",
                                                                                                                "name": "_"
                                                                                                            },
                                                                                                            "property": {
                                                                                                                "type": "Identifier",
                                                                                                                "name": "pluck"
                                                                                                            }
                                                                                                        },
                                                                                                        "arguments": [
                                                                                                            {
                                                                                                                "type": "Identifier",
                                                                                                                "name": "apiResults"
                                                                                                            },
                                                                                                            {
                                                                                                                "type": "Literal",
                                                                                                                "value": "isExact",
                                                                                                                "raw": "'isExact'"
                                                                                                            }
                                                                                                        ]
                                                                                                    }
                                                                                                ]
                                                                                            },
                                                                                            "prefix": True
                                                                                        },
                                                                                        "consequent": {
                                                                                            "type": "BlockStatement",
                                                                                            "body": [
                                                                                                {
                                                                                                    "type": "VariableDeclaration",
                                                                                                    "declarations": [
                                                                                                        {
                                                                                                            "type": "VariableDeclarator",
                                                                                                            "id": {
                                                                                                                "type": "Identifier",
                                                                                                                "name": "addNewOrgRow"
                                                                                                            },
                                                                                                            "init": {
                                                                                                                "type": "ObjectExpression",
                                                                                                                "properties": [
                                                                                                                    {
                                                                                                                        "type": "Property",
                                                                                                                        "key": {
                                                                                                                            "type": "Identifier",
                                                                                                                            "name": "name"
                                                                                                                        },
                                                                                                                        "value": {
                                                                                                                            "type": "Identifier",
                                                                                                                            "name": "term"
                                                                                                                        },
                                                                                                                        "kind": "init"
                                                                                                                    },
                                                                                                                    {
                                                                                                                        "type": "Property",
                                                                                                                        "key": {
                                                                                                                            "type": "Identifier",
                                                                                                                            "name": "value"
                                                                                                                        },
                                                                                                                        "value": {
                                                                                                                            "type": "Identifier",
                                                                                                                            "name": "term"
                                                                                                                        },
                                                                                                                        "kind": "init"
                                                                                                                    },
                                                                                                                    {
                                                                                                                        "type": "Property",
                                                                                                                        "key": {
                                                                                                                            "type": "Identifier",
                                                                                                                            "name": "isExact"
                                                                                                                        },
                                                                                                                        "value": {
                                                                                                                            "type": "Literal",
                                                                                                                            "value": None,
                                                                                                                            "raw": "null"
                                                                                                                        },
                                                                                                                        "kind": "init"
                                                                                                                    },
                                                                                                                    {
                                                                                                                        "type": "Property",
                                                                                                                        "key": {
                                                                                                                            "type": "Identifier",
                                                                                                                            "name": "isAddNew"
                                                                                                                        },
                                                                                                                        "value": {
                                                                                                                            "type": "Literal",
                                                                                                                            "value": True,
                                                                                                                            "raw": "True"
                                                                                                                        },
                                                                                                                        "kind": "init"
                                                                                                                    }
                                                                                                                ]
                                                                                                            }
                                                                                                        }
                                                                                                    ],
                                                                                                    "kind": "var"
                                                                                                },
                                                                                                {
                                                                                                    "type": "ExpressionStatement",
                                                                                                    "expression": {
                                                                                                        "type": "AssignmentExpression",
                                                                                                        "operator": "=",
                                                                                                        "left": {
                                                                                                            "type": "Identifier",
                                                                                                            "name": "results"
                                                                                                        },
                                                                                                        "right": {
                                                                                                            "type": "CallExpression",
                                                                                                            "callee": {
                                                                                                                "type": "MemberExpression",
                                                                                                                "computed": False,
                                                                                                                "object": {
                                                                                                                    "type": "Identifier",
                                                                                                                    "name": "results"
                                                                                                                },
                                                                                                                "property": {
                                                                                                                    "type": "Identifier",
                                                                                                                    "name": "concat"
                                                                                                                }
                                                                                                            },
                                                                                                            "arguments": [
                                                                                                                {
                                                                                                                    "type": "Identifier",
                                                                                                                    "name": "addNewOrgRow"
                                                                                                                }
                                                                                                            ]
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                            ]
                                                                                        },
                                                                                        "alternate": None
                                                                                    },
                                                                                    {
                                                                                        "type": "ExpressionStatement",
                                                                                        "expression": {
                                                                                            "type": "AssignmentExpression",
                                                                                            "operator": "=",
                                                                                            "left": {
                                                                                                "type": "Identifier",
                                                                                                "name": "results"
                                                                                            },
                                                                                            "right": {
                                                                                                "type": "CallExpression",
                                                                                                "callee": {
                                                                                                    "type": "MemberExpression",
                                                                                                    "computed": False,
                                                                                                    "object": {
                                                                                                        "type": "Identifier",
                                                                                                        "name": "results"
                                                                                                    },
                                                                                                    "property": {
                                                                                                        "type": "Identifier",
                                                                                                        "name": "concat"
                                                                                                    }
                                                                                                },
                                                                                                "arguments": [
                                                                                                    {
                                                                                                        "type": "CallExpression",
                                                                                                        "callee": {
                                                                                                            "type": "MemberExpression",
                                                                                                            "computed": False,
                                                                                                            "object": {
                                                                                                                "type": "Identifier",
                                                                                                                "name": "apiResults"
                                                                                                            },
                                                                                                            "property": {
                                                                                                                "type": "Identifier",
                                                                                                                "name": "map"
                                                                                                            }
                                                                                                        },
                                                                                                        "arguments": [
                                                                                                            {
                                                                                                                "type": "MemberExpression",
                                                                                                                "computed": False,
                                                                                                                "object": {
                                                                                                                    "type": "ThisExpression"
                                                                                                                },
                                                                                                                "property": {
                                                                                                                    "type": "Identifier",
                                                                                                                    "name": "jqueryItemForApiResult"
                                                                                                                }
                                                                                                            },
                                                                                                            {
                                                                                                                "type": "ThisExpression"
                                                                                                            }
                                                                                                        ]
                                                                                                    }
                                                                                                ]
                                                                                            }
                                                                                        }
                                                                                    },
                                                                                    {
                                                                                        "type": "ExpressionStatement",
                                                                                        "expression": {
                                                                                            "type": "CallExpression",
                                                                                            "callee": {
                                                                                                "type": "Identifier",
                                                                                                "name": "callback"
                                                                                            },
                                                                                            "arguments": [
                                                                                                {
                                                                                                    "type": "Identifier",
                                                                                                    "name": "results"
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "rest": None,
                                                                            "generator": False,
                                                                            "expression": False
                                                                        },
                                                                        "property": {
                                                                            "type": "Identifier",
                                                                            "name": "bind"
                                                                        }
                                                                    },
                                                                    "arguments": [
                                                                        {
                                                                            "type": "ThisExpression"
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ]
                                            },
                                            "rest": None,
                                            "generator": False,
                                            "expression": False
                                        },
                                        "kind": "init"
                                    },
                                    {
                                        "type": "Property",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "jqueryItemForApiResult"
                                        },
                                        "value": {
                                            "type": "FunctionExpression",
                                            "id": None,
                                            "params": [
                                                {
                                                    "type": "Identifier",
                                                    "name": "apiResult"
                                                }
                                            ],
                                            "defaults": [],
                                            "body": {
                                                "type": "BlockStatement",
                                                "body": [
                                                    {
                                                        "type": "VariableDeclaration",
                                                        "declarations": [
                                                            {
                                                                "type": "VariableDeclarator",
                                                                "id": {
                                                                    "type": "Identifier",
                                                                    "name": "r"
                                                                },
                                                                "init": {
                                                                    "type": "CallExpression",
                                                                    "callee": {
                                                                        "type": "MemberExpression",
                                                                        "computed": False,
                                                                        "object": {
                                                                            "type": "Identifier",
                                                                            "name": "_"
                                                                        },
                                                                        "property": {
                                                                            "type": "Identifier",
                                                                            "name": "clone"
                                                                        }
                                                                    },
                                                                    "arguments": [
                                                                        {
                                                                            "type": "Identifier",
                                                                            "name": "apiResult"
                                                                        }
                                                                    ]
                                                                }
                                                            }
                                                        ],
                                                        "kind": "var"
                                                    },
                                                    {
                                                        "type": "ExpressionStatement",
                                                        "expression": {
                                                            "type": "AssignmentExpression",
                                                            "operator": "=",
                                                            "left": {
                                                                "type": "MemberExpression",
                                                                "computed": False,
                                                                "object": {
                                                                    "type": "Identifier",
                                                                    "name": "r"
                                                                },
                                                                "property": {
                                                                    "type": "Identifier",
                                                                    "name": "value"
                                                                }
                                                            },
                                                            "right": {
                                                                "type": "MemberExpression",
                                                                "computed": False,
                                                                "object": {
                                                                    "type": "Identifier",
                                                                    "name": "r"
                                                                },
                                                                "property": {
                                                                    "type": "Identifier",
                                                                    "name": "name"
                                                                }
                                                            }
                                                        }
                                                    },
                                                    {
                                                        "type": "ReturnStatement",
                                                        "argument": {
                                                            "type": "Identifier",
                                                            "name": "r"
                                                        }
                                                    }
                                                ]
                                            },
                                            "rest": None,
                                            "generator": False,
                                            "expression": False
                                        },
                                        "kind": "init"
                                    },
                                    {
                                        "type": "Property",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "jqueryNodeForItem"
                                        },
                                        "value": {
                                            "type": "FunctionExpression",
                                            "id": None,
                                            "params": [
                                                {
                                                    "type": "Identifier",
                                                    "name": "item"
                                                }
                                            ],
                                            "defaults": [],
                                            "body": {
                                                "type": "BlockStatement",
                                                "body": [
                                                    {
                                                        "type": "VariableDeclaration",
                                                        "declarations": [
                                                            {
                                                                "type": "VariableDeclarator",
                                                                "id": {
                                                                    "type": "Identifier",
                                                                    "name": "li"
                                                                },
                                                                "init": {
                                                                    "type": "CallExpression",
                                                                    "callee": {
                                                                        "type": "Identifier",
                                                                        "name": "$"
                                                                    },
                                                                    "arguments": [
                                                                        {
                                                                            "type": "Literal",
                                                                            "value": "<li>",
                                                                            "raw": "'<li>'"
                                                                        }
                                                                    ]
                                                                }
                                                            }
                                                        ],
                                                        "kind": "var"
                                                    },
                                                    {
                                                        "type": "VariableDeclaration",
                                                        "declarations": [
                                                            {
                                                                "type": "VariableDeclarator",
                                                                "id": {
                                                                    "type": "Identifier",
                                                                    "name": "a"
                                                                },
                                                                "init": {
                                                                    "type": "CallExpression",
                                                                    "callee": {
                                                                        "type": "MemberExpression",
                                                                        "computed": False,
                                                                        "object": {
                                                                            "type": "CallExpression",
                                                                            "callee": {
                                                                                "type": "MemberExpression",
                                                                                "computed": False,
                                                                                "object": {
                                                                                    "type": "CallExpression",
                                                                                    "callee": {
                                                                                        "type": "Identifier",
                                                                                        "name": "$"
                                                                                    },
                                                                                    "arguments": [
                                                                                        {
                                                                                            "type": "Literal",
                                                                                            "value": "<a>",
                                                                                            "raw": "'<a>'"
                                                                                        }
                                                                                    ]
                                                                                },
                                                                                "property": {
                                                                                    "type": "Identifier",
                                                                                    "name": "appendTo"
                                                                                }
                                                                            },
                                                                            "arguments": [
                                                                                {
                                                                                    "type": "Identifier",
                                                                                    "name": "li"
                                                                                }
                                                                            ]
                                                                        },
                                                                        "property": {
                                                                            "type": "Identifier",
                                                                            "name": "attr"
                                                                        }
                                                                    },
                                                                    "arguments": [
                                                                        {
                                                                            "type": "Literal",
                                                                            "value": "href",
                                                                            "raw": "'href'"
                                                                        },
                                                                        {
                                                                            "type": "Literal",
                                                                            "value": "#!",
                                                                            "raw": "'#!'"
                                                                        }
                                                                    ]
                                                                }
                                                            }
                                                        ],
                                                        "kind": "var"
                                                    },
                                                    {
                                                        "type": "IfStatement",
                                                        "test": {
                                                            "type": "MemberExpression",
                                                            "computed": False,
                                                            "object": {
                                                                "type": "Identifier",
                                                                "name": "item"
                                                            },
                                                            "property": {
                                                                "type": "Identifier",
                                                                "name": "isAddNew"
                                                            }
                                                        },
                                                        "consequent": {
                                                            "type": "BlockStatement",
                                                            "body": [
                                                                {
                                                                    "type": "ExpressionStatement",
                                                                    "expression": {
                                                                        "type": "CallExpression",
                                                                        "callee": {
                                                                            "type": "MemberExpression",
                                                                            "computed": False,
                                                                            "object": {
                                                                                "type": "Identifier",
                                                                                "name": "a"
                                                                            },
                                                                            "property": {
                                                                                "type": "Identifier",
                                                                                "name": "addClass"
                                                                            }
                                                                        },
                                                                        "arguments": [
                                                                            {
                                                                                "type": "Literal",
                                                                                "value": "deduper-add-new-org",
                                                                                "raw": "'deduper-add-new-org'"
                                                                            }
                                                                        ]
                                                                    }
                                                                },
                                                                {
                                                                    "type": "ExpressionStatement",
                                                                    "expression": {
                                                                        "type": "CallExpression",
                                                                        "callee": {
                                                                            "type": "MemberExpression",
                                                                            "computed": False,
                                                                            "object": {
                                                                                "type": "Identifier",
                                                                                "name": "a"
                                                                            },
                                                                            "property": {
                                                                                "type": "Identifier",
                                                                                "name": "append"
                                                                            }
                                                                        },
                                                                        "arguments": [
                                                                            {
                                                                                "type": "Literal",
                                                                                "value": "<span class=\"deduper-add-label\">Add: </span>",
                                                                                "raw": "'<span class=\"deduper-add-label\">Add: </span>'"
                                                                            }
                                                                        ]
                                                                    }
                                                                }
                                                            ]
                                                        },
                                                        "alternate": None
                                                    },
                                                    {
                                                        "type": "ExpressionStatement",
                                                        "expression": {
                                                            "type": "CallExpression",
                                                            "callee": {
                                                                "type": "MemberExpression",
                                                                "computed": False,
                                                                "object": {
                                                                    "type": "Identifier",
                                                                    "name": "a"
                                                                },
                                                                "property": {
                                                                    "type": "Identifier",
                                                                    "name": "append"
                                                                }
                                                            },
                                                            "arguments": [
                                                                {
                                                                    "type": "BinaryExpression",
                                                                    "operator": "+",
                                                                    "left": {
                                                                        "type": "BinaryExpression",
                                                                        "operator": "+",
                                                                        "left": {
                                                                            "type": "Literal",
                                                                            "value": "<span class=\"deduper-org-name\">",
                                                                            "raw": "'<span class=\"deduper-org-name\">'"
                                                                        },
                                                                        "right": {
                                                                            "type": "MemberExpression",
                                                                            "computed": False,
                                                                            "object": {
                                                                                "type": "Identifier",
                                                                                "name": "item"
                                                                            },
                                                                            "property": {
                                                                                "type": "Identifier",
                                                                                "name": "name"
                                                                            }
                                                                        }
                                                                    },
                                                                    "right": {
                                                                        "type": "Literal",
                                                                        "value": "</span>",
                                                                        "raw": "'</span>'"
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    },
                                                    {
                                                        "type": "IfStatement",
                                                        "test": {
                                                            "type": "UnaryExpression",
                                                            "operator": "!",
                                                            "argument": {
                                                                "type": "MemberExpression",
                                                                "computed": False,
                                                                "object": {
                                                                    "type": "Identifier",
                                                                    "name": "item"
                                                                },
                                                                "property": {
                                                                    "type": "Identifier",
                                                                    "name": "isAddNew"
                                                                }
                                                            },
                                                            "prefix": True
                                                        },
                                                        "consequent": {
                                                            "type": "BlockStatement",
                                                            "body": [
                                                                {
                                                                    "type": "ExpressionStatement",
                                                                    "expression": {
                                                                        "type": "CallExpression",
                                                                        "callee": {
                                                                            "type": "MemberExpression",
                                                                            "computed": False,
                                                                            "object": {
                                                                                "type": "Identifier",
                                                                                "name": "a"
                                                                            },
                                                                            "property": {
                                                                                "type": "Identifier",
                                                                                "name": "append"
                                                                            }
                                                                        },
                                                                        "arguments": [
                                                                            {
                                                                                "type": "BinaryExpression",
                                                                                "operator": "+",
                                                                                "left": {
                                                                                    "type": "BinaryExpression",
                                                                                    "operator": "+",
                                                                                    "left": {
                                                                                        "type": "Literal",
                                                                                        "value": "<span class=\"deduper-org-location\">",
                                                                                        "raw": "'<span class=\"deduper-org-location\">'"
                                                                                    },
                                                                                    "right": {
                                                                                        "type": "MemberExpression",
                                                                                        "computed": False,
                                                                                        "object": {
                                                                                            "type": "Identifier",
                                                                                            "name": "item"
                                                                                        },
                                                                                        "property": {
                                                                                            "type": "Identifier",
                                                                                            "name": "relativeLocationString"
                                                                                        }
                                                                                    }
                                                                                },
                                                                                "right": {
                                                                                    "type": "Literal",
                                                                                    "value": "</span>",
                                                                                    "raw": "'</span>'"
                                                                                }
                                                                            }
                                                                        ]
                                                                    }
                                                                }
                                                            ]
                                                        },
                                                        "alternate": None
                                                    },
                                                    {
                                                        "type": "ReturnStatement",
                                                        "argument": {
                                                            "type": "Identifier",
                                                            "name": "li"
                                                        }
                                                    }
                                                ]
                                            },
                                            "rest": None,
                                            "generator": False,
                                            "expression": False
                                        },
                                        "kind": "init"
                                    },
                                    {
                                        "type": "Property",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "typeaheadWasChanged"
                                        },
                                        "value": {
                                            "type": "FunctionExpression",
                                            "id": None,
                                            "params": [
                                                {
                                                    "type": "Identifier",
                                                    "name": "newValue"
                                                },
                                                {
                                                    "type": "Identifier",
                                                    "name": "wasSelectedFromMenu"
                                                }
                                            ],
                                            "defaults": [],
                                            "body": {
                                                "type": "BlockStatement",
                                                "body": [
                                                    {
                                                        "type": "ExpressionStatement",
                                                        "expression": {
                                                            "type": "CallExpression",
                                                            "callee": {
                                                                "type": "MemberExpression",
                                                                "computed": False,
                                                                "object": {
                                                                    "type": "MemberExpression",
                                                                    "computed": False,
                                                                    "object": {
                                                                        "type": "MemberExpression",
                                                                        "computed": False,
                                                                        "object": {
                                                                            "type": "ThisExpression"
                                                                        },
                                                                        "property": {
                                                                            "type": "Identifier",
                                                                            "name": "props"
                                                                        }
                                                                    },
                                                                    "property": {
                                                                        "type": "Identifier",
                                                                        "name": "model"
                                                                    }
                                                                },
                                                                "property": {
                                                                    "type": "Identifier",
                                                                    "name": "setValueForField"
                                                                }
                                                            },
                                                            "arguments": [
                                                                {
                                                                    "type": "Literal",
                                                                    "value": "name",
                                                                    "raw": "'name'"
                                                                },
                                                                {
                                                                    "type": "Identifier",
                                                                    "name": "newValue"
                                                                }
                                                            ]
                                                        }
                                                    },
                                                    {
                                                        "type": "IfStatement",
                                                        "test": {
                                                            "type": "Identifier",
                                                            "name": "wasSelectedFromMenu"
                                                        },
                                                        "consequent": {
                                                            "type": "ExpressionStatement",
                                                            "expression": {
                                                                "type": "CallExpression",
                                                                "callee": {
                                                                    "type": "MemberExpression",
                                                                    "computed": False,
                                                                    "object": {
                                                                        "type": "MemberExpression",
                                                                        "computed": False,
                                                                        "object": {
                                                                            "type": "ThisExpression"
                                                                        },
                                                                        "property": {
                                                                            "type": "Identifier",
                                                                            "name": "props"
                                                                        }
                                                                    },
                                                                    "property": {
                                                                        "type": "Identifier",
                                                                        "name": "onNameChosen"
                                                                    }
                                                                },
                                                                "arguments": []
                                                            }
                                                        },
                                                        "alternate": None
                                                    }
                                                ]
                                            },
                                            "rest": None,
                                            "generator": False,
                                            "expression": False
                                        },
                                        "kind": "init"
                                    }
                                ]
                            }
                        ]
                    }
                }
            ],
            "kind": "var"
        },
        {
            "type": "VariableDeclaration",
            "declarations": [
                {
                    "type": "VariableDeclarator",
                    "id": {
                        "type": "Identifier",
                        "name": "OrgIntakeForm"
                    },
                    "init": {
                        "type": "CallExpression",
                        "callee": {
                            "type": "MemberExpression",
                            "computed": False,
                            "object": {
                                "type": "Identifier",
                                "name": "React"
                            },
                            "property": {
                                "type": "Identifier",
                                "name": "createClass"
                            }
                        },
                        "arguments": [
                            {
                                "type": "ObjectExpression",
                                "properties": [
                                    {
                                        "type": "Property",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "displayName"
                                        },
                                        "value": {
                                            "type": "Literal",
                                            "value": "OrgIntakeForm",
                                            "raw": "'OrgIntakeForm'"
                                        },
                                        "kind": "init"
                                    },
                                    {
                                        "type": "Property",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "fieldWasChanged"
                                        },
                                        "value": {
                                            "type": "FunctionExpression",
                                            "id": None,
                                            "params": [
                                                {
                                                    "type": "Identifier",
                                                    "name": "event"
                                                }
                                            ],
                                            "defaults": [],
                                            "body": {
                                                "type": "BlockStatement",
                                                "body": [
                                                    {
                                                        "type": "ExpressionStatement",
                                                        "expression": {
                                                            "type": "CallExpression",
                                                            "callee": {
                                                                "type": "MemberExpression",
                                                                "computed": False,
                                                                "object": {
                                                                    "type": "MemberExpression",
                                                                    "computed": False,
                                                                    "object": {
                                                                        "type": "MemberExpression",
                                                                        "computed": False,
                                                                        "object": {
                                                                            "type": "ThisExpression"
                                                                        },
                                                                        "property": {
                                                                            "type": "Identifier",
                                                                            "name": "props"
                                                                        }
                                                                    },
                                                                    "property": {
                                                                        "type": "Identifier",
                                                                        "name": "model"
                                                                    }
                                                                },
                                                                "property": {
                                                                    "type": "Identifier",
                                                                    "name": "setValueForField"
                                                                }
                                                            },
                                                            "arguments": [
                                                                {
                                                                    "type": "MemberExpression",
                                                                    "computed": False,
                                                                    "object": {
                                                                        "type": "MemberExpression",
                                                                        "computed": False,
                                                                        "object": {
                                                                            "type": "Identifier",
                                                                            "name": "event"
                                                                        },
                                                                        "property": {
                                                                            "type": "Identifier",
                                                                            "name": "target"
                                                                        }
                                                                    },
                                                                    "property": {
                                                                        "type": "Identifier",
                                                                        "name": "name"
                                                                    }
                                                                },
                                                                {
                                                                    "type": "MemberExpression",
                                                                    "computed": False,
                                                                    "object": {
                                                                        "type": "MemberExpression",
                                                                        "computed": False,
                                                                        "object": {
                                                                            "type": "Identifier",
                                                                            "name": "event"
                                                                        },
                                                                        "property": {
                                                                            "type": "Identifier",
                                                                            "name": "target"
                                                                        }
                                                                    },
                                                                    "property": {
                                                                        "type": "Identifier",
                                                                        "name": "value"
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ]
                                            },
                                            "rest": None,
                                            "generator": False,
                                            "expression": False
                                        },
                                        "kind": "init"
                                    },
                                    {
                                        "type": "Property",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "changeHandlerFor"
                                        },
                                        "value": {
                                            "type": "FunctionExpression",
                                            "id": None,
                                            "params": [
                                                {
                                                    "type": "Identifier",
                                                    "name": "name"
                                                }
                                            ],
                                            "defaults": [],
                                            "body": {
                                                "type": "BlockStatement",
                                                "body": [
                                                    {
                                                        "type": "ReturnStatement",
                                                        "argument": {
                                                            "type": "CallExpression",
                                                            "callee": {
                                                                "type": "MemberExpression",
                                                                "computed": False,
                                                                "object": {
                                                                    "type": "FunctionExpression",
                                                                    "id": None,
                                                                    "params": [
                                                                        {
                                                                            "type": "Identifier",
                                                                            "name": "value"
                                                                        }
                                                                    ],
                                                                    "defaults": [],
                                                                    "body": {
                                                                        "type": "BlockStatement",
                                                                        "body": [
                                                                            {
                                                                                "type": "ExpressionStatement",
                                                                                "expression": {
                                                                                    "type": "CallExpression",
                                                                                    "callee": {
                                                                                        "type": "MemberExpression",
                                                                                        "computed": False,
                                                                                        "object": {
                                                                                            "type": "MemberExpression",
                                                                                            "computed": False,
                                                                                            "object": {
                                                                                                "type": "MemberExpression",
                                                                                                "computed": False,
                                                                                                "object": {
                                                                                                    "type": "ThisExpression"
                                                                                                },
                                                                                                "property": {
                                                                                                    "type": "Identifier",
                                                                                                    "name": "props"
                                                                                                }
                                                                                            },
                                                                                            "property": {
                                                                                                "type": "Identifier",
                                                                                                "name": "model"
                                                                                            }
                                                                                        },
                                                                                        "property": {
                                                                                            "type": "Identifier",
                                                                                            "name": "setValueForField"
                                                                                        }
                                                                                    },
                                                                                    "arguments": [
                                                                                        {
                                                                                            "type": "Identifier",
                                                                                            "name": "name"
                                                                                        },
                                                                                        {
                                                                                            "type": "Identifier",
                                                                                            "name": "value"
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    "rest": None,
                                                                    "generator": False,
                                                                    "expression": False
                                                                },
                                                                "property": {
                                                                    "type": "Identifier",
                                                                    "name": "bind"
                                                                }
                                                            },
                                                            "arguments": [
                                                                {
                                                                    "type": "ThisExpression"
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ]
                                            },
                                            "rest": None,
                                            "generator": False,
                                            "expression": False
                                        },
                                        "kind": "init"
                                    },
                                    {
                                        "type": "Property",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "submit"
                                        },
                                        "value": {
                                            "type": "FunctionExpression",
                                            "id": None,
                                            "params": [],
                                            "defaults": [],
                                            "body": {
                                                "type": "BlockStatement",
                                                "body": [
                                                    {
                                                        "type": "ExpressionStatement",
                                                        "expression": {
                                                            "type": "CallExpression",
                                                            "callee": {
                                                                "type": "MemberExpression",
                                                                "computed": False,
                                                                "object": {
                                                                    "type": "MemberExpression",
                                                                    "computed": False,
                                                                    "object": {
                                                                        "type": "MemberExpression",
                                                                        "computed": False,
                                                                        "object": {
                                                                            "type": "ThisExpression"
                                                                        },
                                                                        "property": {
                                                                            "type": "Identifier",
                                                                            "name": "props"
                                                                        }
                                                                    },
                                                                    "property": {
                                                                        "type": "Identifier",
                                                                        "name": "model"
                                                                    }
                                                                },
                                                                "property": {
                                                                    "type": "Identifier",
                                                                    "name": "submit"
                                                                }
                                                            },
                                                            "arguments": []
                                                        }
                                                    }
                                                ]
                                            },
                                            "rest": None,
                                            "generator": False,
                                            "expression": False
                                        },
                                        "kind": "init"
                                    },
                                    {
                                        "type": "Property",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "render"
                                        },
                                        "value": {
                                            "type": "FunctionExpression",
                                            "id": None,
                                            "params": [],
                                            "defaults": [],
                                            "body": {
                                                "type": "BlockStatement",
                                                "body": [
                                                    {
                                                        "type": "ReturnStatement",
                                                        "argument": {
                                                            "type": "CallExpression",
                                                            "callee": {
                                                                "type": "MemberExpression",
                                                                "computed": False,
                                                                "object": {
                                                                    "type": "MemberExpression",
                                                                    "computed": False,
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
                                                                    "name": "form"
                                                                }
                                                            },
                                                            "arguments": [
                                                                {
                                                                    "type": "ObjectExpression",
                                                                    "properties": [
                                                                        {
                                                                            "type": "Property",
                                                                            "key": {
                                                                                "type": "Identifier",
                                                                                "name": "className"
                                                                            },
                                                                            "value": {
                                                                                "type": "Literal",
                                                                                "value": "create-org",
                                                                                "raw": "\"create-org\""
                                                                            },
                                                                            "kind": "init"
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    "type": "CallExpression",
                                                                    "callee": {
                                                                        "type": "MemberExpression",
                                                                        "computed": False,
                                                                        "object": {
                                                                            "type": "MemberExpression",
                                                                            "computed": False,
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
                                                                            "name": "label"
                                                                        }
                                                                    },
                                                                    "arguments": [
                                                                        {
                                                                            "type": "ObjectExpression",
                                                                            "properties": [
                                                                                {
                                                                                    "type": "Property",
                                                                                    "key": {
                                                                                        "type": "Identifier",
                                                                                        "name": "htmlFor"
                                                                                    },
                                                                                    "value": {
                                                                                        "type": "Literal",
                                                                                        "value": "org-type",
                                                                                        "raw": "\"org-type\""
                                                                                    },
                                                                                    "kind": "init"
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            "type": "Literal",
                                                                            "value": "What kind of organization do you represent?",
                                                                            "raw": "\"What kind of organization do you represent?\""
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    "type": "CallExpression",
                                                                    "callee": {
                                                                        "type": "MemberExpression",
                                                                        "computed": False,
                                                                        "object": {
                                                                            "type": "MemberExpression",
                                                                            "computed": False,
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
                                                                            "name": "div"
                                                                        }
                                                                    },
                                                                    "arguments": [
                                                                        {
                                                                            "type": "ObjectExpression",
                                                                            "properties": [
                                                                                {
                                                                                    "type": "Property",
                                                                                    "key": {
                                                                                        "type": "Identifier",
                                                                                        "name": "className"
                                                                                    },
                                                                                    "value": {
                                                                                        "type": "Literal",
                                                                                        "value": "styled-select",
                                                                                        "raw": "\"styled-select\""
                                                                                    },
                                                                                    "kind": "init"
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            "type": "CallExpression",
                                                                            "callee": {
                                                                                "type": "MemberExpression",
                                                                                "computed": False,
                                                                                "object": {
                                                                                    "type": "MemberExpression",
                                                                                    "computed": False,
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
                                                                                    "name": "select"
                                                                                }
                                                                            },
                                                                            "arguments": [
                                                                                {
                                                                                    "type": "ObjectExpression",
                                                                                    "properties": [
                                                                                        {
                                                                                            "type": "Property",
                                                                                            "key": {
                                                                                                "type": "Identifier",
                                                                                                "name": "name"
                                                                                            },
                                                                                            "value": {
                                                                                                "type": "Literal",
                                                                                                "value": "org_type",
                                                                                                "raw": "\"org_type\""
                                                                                            },
                                                                                            "kind": "init"
                                                                                        },
                                                                                        {
                                                                                            "type": "Property",
                                                                                            "key": {
                                                                                                "type": "Identifier",
                                                                                                "name": "value"
                                                                                            },
                                                                                            "value": {
                                                                                                "type": "CallExpression",
                                                                                                "callee": {
                                                                                                    "type": "MemberExpression",
                                                                                                    "computed": False,
                                                                                                    "object": {
                                                                                                        "type": "MemberExpression",
                                                                                                        "computed": False,
                                                                                                        "object": {
                                                                                                            "type": "MemberExpression",
                                                                                                            "computed": False,
                                                                                                            "object": {
                                                                                                                "type": "ThisExpression"
                                                                                                            },
                                                                                                            "property": {
                                                                                                                "type": "Identifier",
                                                                                                                "name": "props"
                                                                                                            }
                                                                                                        },
                                                                                                        "property": {
                                                                                                            "type": "Identifier",
                                                                                                            "name": "model"
                                                                                                        }
                                                                                                    },
                                                                                                    "property": {
                                                                                                        "type": "Identifier",
                                                                                                        "name": "valueForFieldNamed"
                                                                                                    }
                                                                                                },
                                                                                                "arguments": [
                                                                                                    {
                                                                                                        "type": "Literal",
                                                                                                        "value": "org_type",
                                                                                                        "raw": "'org_type'"
                                                                                                    }
                                                                                                ]
                                                                                            },
                                                                                            "kind": "init"
                                                                                        },
                                                                                        {
                                                                                            "type": "Property",
                                                                                            "key": {
                                                                                                "type": "Identifier",
                                                                                                "name": "onChange"
                                                                                            },
                                                                                            "value": {
                                                                                                "type": "MemberExpression",
                                                                                                "computed": False,
                                                                                                "object": {
                                                                                                    "type": "ThisExpression"
                                                                                                },
                                                                                                "property": {
                                                                                                    "type": "Identifier",
                                                                                                    "name": "fieldWasChanged"
                                                                                                }
                                                                                            },
                                                                                            "kind": "init"
                                                                                        }
                                                                                    ]
                                                                                },
                                                                                {
                                                                                    "type": "CallExpression",
                                                                                    "callee": {
                                                                                        "type": "MemberExpression",
                                                                                        "computed": False,
                                                                                        "object": {
                                                                                            "type": "MemberExpression",
                                                                                            "computed": False,
                                                                                            "object": {
                                                                                                "type": "MemberExpression",
                                                                                                "computed": False,
                                                                                                "object": {
                                                                                                    "type": "MemberExpression",
                                                                                                    "computed": False,
                                                                                                    "object": {
                                                                                                        "type": "MemberExpression",
                                                                                                        "computed": False,
                                                                                                        "object": {
                                                                                                            "type": "ThisExpression"
                                                                                                        },
                                                                                                        "property": {
                                                                                                            "type": "Identifier",
                                                                                                            "name": "props"
                                                                                                        }
                                                                                                    },
                                                                                                    "property": {
                                                                                                        "type": "Identifier",
                                                                                                        "name": "model"
                                                                                                    }
                                                                                                },
                                                                                                "property": {
                                                                                                    "type": "Identifier",
                                                                                                    "name": "constants"
                                                                                                }
                                                                                            },
                                                                                            "property": {
                                                                                                "type": "Identifier",
                                                                                                "name": "orgTypes"
                                                                                            }
                                                                                        },
                                                                                        "property": {
                                                                                            "type": "Identifier",
                                                                                            "name": "map"
                                                                                        }
                                                                                    },
                                                                                    "arguments": [
                                                                                        {
                                                                                            "type": "FunctionExpression",
                                                                                            "id": None,
                                                                                            "params": [
                                                                                                {
                                                                                                    "type": "Identifier",
                                                                                                    "name": "type"
                                                                                                }
                                                                                            ],
                                                                                            "defaults": [],
                                                                                            "body": {
                                                                                                "type": "BlockStatement",
                                                                                                "body": [
                                                                                                    {
                                                                                                        "type": "ReturnStatement",
                                                                                                        "argument": {
                                                                                                            "type": "CallExpression",
                                                                                                            "callee": {
                                                                                                                "type": "MemberExpression",
                                                                                                                "computed": False,
                                                                                                                "object": {
                                                                                                                    "type": "MemberExpression",
                                                                                                                    "computed": False,
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
                                                                                                                    "name": "option"
                                                                                                                }
                                                                                                            },
                                                                                                            "arguments": [
                                                                                                                {
                                                                                                                    "type": "ObjectExpression",
                                                                                                                    "properties": [
                                                                                                                        {
                                                                                                                            "type": "Property",
                                                                                                                            "key": {
                                                                                                                                "type": "Identifier",
                                                                                                                                "name": "key"
                                                                                                                            },
                                                                                                                            "value": {
                                                                                                                                "type": "MemberExpression",
                                                                                                                                "computed": False,
                                                                                                                                "object": {
                                                                                                                                    "type": "Identifier",
                                                                                                                                    "name": "type"
                                                                                                                                },
                                                                                                                                "property": {
                                                                                                                                    "type": "Identifier",
                                                                                                                                    "name": "name"
                                                                                                                                }
                                                                                                                            },
                                                                                                                            "kind": "init"
                                                                                                                        },
                                                                                                                        {
                                                                                                                            "type": "Property",
                                                                                                                            "key": {
                                                                                                                                "type": "Identifier",
                                                                                                                                "name": "value"
                                                                                                                            },
                                                                                                                            "value": {
                                                                                                                                "type": "MemberExpression",
                                                                                                                                "computed": False,
                                                                                                                                "object": {
                                                                                                                                    "type": "Identifier",
                                                                                                                                    "name": "type"
                                                                                                                                },
                                                                                                                                "property": {
                                                                                                                                    "type": "Identifier",
                                                                                                                                    "name": "name"
                                                                                                                                }
                                                                                                                            },
                                                                                                                            "kind": "init"
                                                                                                                        }
                                                                                                                    ]
                                                                                                                },
                                                                                                                {
                                                                                                                    "type": "MemberExpression",
                                                                                                                    "computed": False,
                                                                                                                    "object": {
                                                                                                                        "type": "Identifier",
                                                                                                                        "name": "type"
                                                                                                                    },
                                                                                                                    "property": {
                                                                                                                        "type": "Identifier",
                                                                                                                        "name": "label"
                                                                                                                    }
                                                                                                                }
                                                                                                            ]
                                                                                                        }
                                                                                                    }
                                                                                                ]
                                                                                            },
                                                                                            "rest": None,
                                                                                            "generator": False,
                                                                                            "expression": False
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    "type": "CallExpression",
                                                                    "callee": {
                                                                        "type": "MemberExpression",
                                                                        "computed": False,
                                                                        "object": {
                                                                            "type": "MemberExpression",
                                                                            "computed": False,
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
                                                                            "name": "p"
                                                                        }
                                                                    },
                                                                    "arguments": [
                                                                        {
                                                                            "type": "ObjectExpression",
                                                                            "properties": [
                                                                                {
                                                                                    "type": "Property",
                                                                                    "key": {
                                                                                        "type": "Identifier",
                                                                                        "name": "className"
                                                                                    },
                                                                                    "value": {
                                                                                        "type": "Literal",
                                                                                        "value": "hint",
                                                                                        "raw": "\"hint\""
                                                                                    },
                                                                                    "kind": "init"
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            "type": "CallExpression",
                                                                            "callee": {
                                                                                "type": "MemberExpression",
                                                                                "computed": False,
                                                                                "object": {
                                                                                    "type": "Identifier",
                                                                                    "name": "ABC"
                                                                                },
                                                                                "property": {
                                                                                    "type": "Identifier",
                                                                                    "name": "a"
                                                                                }
                                                                            },
                                                                            "arguments": [
                                                                                {
                                                                                    "type": "ObjectExpression",
                                                                                    "properties": [
                                                                                        {
                                                                                            "type": "Property",
                                                                                            "key": {
                                                                                                "type": "Identifier",
                                                                                                "name": "endpoint"
                                                                                            },
                                                                                            "value": {
                                                                                                "type": "Literal",
                                                                                                "value": "info/view-path",
                                                                                                "raw": "\"info/view-path\""
                                                                                            },
                                                                                            "kind": "init"
                                                                                        },
                                                                                        {
                                                                                            "type": "Property",
                                                                                            "key": {
                                                                                                "type": "Identifier",
                                                                                                "name": "values"
                                                                                            },
                                                                                            "value": {
                                                                                                "type": "ObjectExpression",
                                                                                                "properties": [
                                                                                                    {
                                                                                                        "type": "Property",
                                                                                                        "key": {
                                                                                                            "type": "Identifier",
                                                                                                            "name": "path"
                                                                                                        },
                                                                                                        "value": {
                                                                                                            "type": "Literal",
                                                                                                            "value": "Help/Organizations#Eligibility",
                                                                                                            "raw": "'Help/Organizations#Eligibility'"
                                                                                                        },
                                                                                                        "kind": "init"
                                                                                                    }
                                                                                                ]
                                                                                            },
                                                                                            "kind": "init"
                                                                                        }
                                                                                    ]
                                                                                },
                                                                                {
                                                                                    "type": "Literal",
                                                                                    "value": "Are we eligible?",
                                                                                    "raw": "\"Are we eligible?\""
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    "type": "CallExpression",
                                                                    "callee": {
                                                                        "type": "MemberExpression",
                                                                        "computed": False,
                                                                        "object": {
                                                                            "type": "MemberExpression",
                                                                            "computed": False,
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
                                                                            "name": "fieldset"
                                                                        }
                                                                    },
                                                                    "arguments": [
                                                                        {
                                                                            "type": "ObjectExpression",
                                                                            "properties": [
                                                                                {
                                                                                    "type": "Property",
                                                                                    "key": {
                                                                                        "type": "Identifier",
                                                                                        "name": "disabled"
                                                                                    },
                                                                                    "value": {
                                                                                        "type": "CallExpression",
                                                                                        "callee": {
                                                                                            "type": "MemberExpression",
                                                                                            "computed": False,
                                                                                            "object": {
                                                                                                "type": "ThisExpression"
                                                                                            },
                                                                                            "property": {
                                                                                                "type": "Identifier",
                                                                                                "name": "disabled"
                                                                                            }
                                                                                        },
                                                                                        "arguments": []
                                                                                    },
                                                                                    "kind": "init"
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            "type": "CallExpression",
                                                                            "callee": {
                                                                                "type": "MemberExpression",
                                                                                "computed": False,
                                                                                "object": {
                                                                                    "type": "MemberExpression",
                                                                                    "computed": False,
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
                                                                                    "name": "label"
                                                                                }
                                                                            },
                                                                            "arguments": [
                                                                                {
                                                                                    "type": "Literal",
                                                                                    "value": None,
                                                                                    "raw": "null"
                                                                                },
                                                                                {
                                                                                    "type": "Literal",
                                                                                    "value": "Where is your org located?",
                                                                                    "raw": "\"Where is your org located?\""
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            "type": "CallExpression",
                                                                            "callee": {
                                                                                "type": "Identifier",
                                                                                "name": "LocationEditorWidget"
                                                                            },
                                                                            "arguments": [
                                                                                {
                                                                                    "type": "ObjectExpression",
                                                                                    "properties": [
                                                                                        {
                                                                                            "type": "Property",
                                                                                            "key": {
                                                                                                "type": "Identifier",
                                                                                                "name": "model"
                                                                                            },
                                                                                            "value": {
                                                                                                "type": "MemberExpression",
                                                                                                "computed": False,
                                                                                                "object": {
                                                                                                    "type": "MemberExpression",
                                                                                                    "computed": False,
                                                                                                    "object": {
                                                                                                        "type": "ThisExpression"
                                                                                                    },
                                                                                                    "property": {
                                                                                                        "type": "Identifier",
                                                                                                        "name": "props"
                                                                                                    }
                                                                                                },
                                                                                                "property": {
                                                                                                    "type": "Identifier",
                                                                                                    "name": "locationModel"
                                                                                                }
                                                                                            },
                                                                                            "kind": "init"
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            "type": "CallExpression",
                                                                            "callee": {
                                                                                "type": "MemberExpression",
                                                                                "computed": False,
                                                                                "object": {
                                                                                    "type": "ThisExpression"
                                                                                },
                                                                                "property": {
                                                                                    "type": "Identifier",
                                                                                    "name": "errorFor"
                                                                                }
                                                                            },
                                                                            "arguments": [
                                                                                {
                                                                                    "type": "Literal",
                                                                                    "value": "address_geo_autocomplete",
                                                                                    "raw": "'address_geo_autocomplete'"
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    "type": "CallExpression",
                                                                    "callee": {
                                                                        "type": "MemberExpression",
                                                                        "computed": False,
                                                                        "object": {
                                                                            "type": "Identifier",
                                                                            "name": "ABC"
                                                                        },
                                                                        "property": {
                                                                            "type": "Identifier",
                                                                            "name": "If"
                                                                        }
                                                                    },
                                                                    "arguments": [
                                                                        {
                                                                            "type": "ObjectExpression",
                                                                            "properties": [
                                                                                {
                                                                                    "type": "Property",
                                                                                    "key": {
                                                                                        "type": "Identifier",
                                                                                        "name": "test"
                                                                                    },
                                                                                    "value": {
                                                                                        "type": "MemberExpression",
                                                                                        "computed": False,
                                                                                        "object": {
                                                                                            "type": "MemberExpression",
                                                                                            "computed": False,
                                                                                            "object": {
                                                                                                "type": "MemberExpression",
                                                                                                "computed": False,
                                                                                                "object": {
                                                                                                    "type": "MemberExpression",
                                                                                                    "computed": False,
                                                                                                    "object": {
                                                                                                        "type": "ThisExpression"
                                                                                                    },
                                                                                                    "property": {
                                                                                                        "type": "Identifier",
                                                                                                        "name": "props"
                                                                                                    }
                                                                                                },
                                                                                                "property": {
                                                                                                    "type": "Identifier",
                                                                                                    "name": "model"
                                                                                                }
                                                                                            },
                                                                                            "property": {
                                                                                                "type": "Identifier",
                                                                                                "name": "constants"
                                                                                            }
                                                                                        },
                                                                                        "property": {
                                                                                            "type": "Identifier",
                                                                                            "name": "isAuthed"
                                                                                        }
                                                                                    },
                                                                                    "kind": "init"
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            "type": "CallExpression",
                                                                            "callee": {
                                                                                "type": "Identifier",
                                                                                "name": "OrgNameDeDuper"
                                                                            },
                                                                            "arguments": [
                                                                                {
                                                                                    "type": "ObjectExpression",
                                                                                    "properties": [
                                                                                        {
                                                                                            "type": "Property",
                                                                                            "key": {
                                                                                                "type": "Identifier",
                                                                                                "name": "model"
                                                                                            },
                                                                                            "value": {
                                                                                                "type": "MemberExpression",
                                                                                                "computed": False,
                                                                                                "object": {
                                                                                                    "type": "MemberExpression",
                                                                                                    "computed": False,
                                                                                                    "object": {
                                                                                                        "type": "ThisExpression"
                                                                                                    },
                                                                                                    "property": {
                                                                                                        "type": "Identifier",
                                                                                                        "name": "props"
                                                                                                    }
                                                                                                },
                                                                                                "property": {
                                                                                                    "type": "Identifier",
                                                                                                    "name": "model"
                                                                                                }
                                                                                            },
                                                                                            "kind": "init"
                                                                                        },
                                                                                        {
                                                                                            "type": "Property",
                                                                                            "key": {
                                                                                                "type": "Identifier",
                                                                                                "name": "onNameChosen"
                                                                                            },
                                                                                            "value": {
                                                                                                "type": "MemberExpression",
                                                                                                "computed": False,
                                                                                                "object": {
                                                                                                    "type": "ThisExpression"
                                                                                                },
                                                                                                "property": {
                                                                                                    "type": "Identifier",
                                                                                                    "name": "nameWasChosen"
                                                                                                }
                                                                                            },
                                                                                            "kind": "init"
                                                                                        },
                                                                                        {
                                                                                            "type": "Property",
                                                                                            "key": {
                                                                                                "type": "Identifier",
                                                                                                "name": "disabled"
                                                                                            },
                                                                                            "value": {
                                                                                                "type": "UnaryExpression",
                                                                                                "operator": "!",
                                                                                                "argument": {
                                                                                                    "type": "CallExpression",
                                                                                                    "callee": {
                                                                                                        "type": "MemberExpression",
                                                                                                        "computed": False,
                                                                                                        "object": {
                                                                                                            "type": "MemberExpression",
                                                                                                            "computed": False,
                                                                                                            "object": {
                                                                                                                "type": "MemberExpression",
                                                                                                                "computed": False,
                                                                                                                "object": {
                                                                                                                    "type": "ThisExpression"
                                                                                                                },
                                                                                                                "property": {
                                                                                                                    "type": "Identifier",
                                                                                                                    "name": "props"
                                                                                                                }
                                                                                                            },
                                                                                                            "property": {
                                                                                                                "type": "Identifier",
                                                                                                                "name": "locationModel"
                                                                                                            }
                                                                                                        },
                                                                                                        "property": {
                                                                                                            "type": "Identifier",
                                                                                                            "name": "valid"
                                                                                                        }
                                                                                                    },
                                                                                                    "arguments": []
                                                                                                },
                                                                                                "prefix": True
                                                                                            },
                                                                                            "kind": "init"
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    "type": "CallExpression",
                                                                    "callee": {
                                                                        "type": "MemberExpression",
                                                                        "computed": False,
                                                                        "object": {
                                                                            "type": "Identifier",
                                                                            "name": "ABC"
                                                                        },
                                                                        "property": {
                                                                            "type": "Identifier",
                                                                            "name": "If"
                                                                        }
                                                                    },
                                                                    "arguments": [
                                                                        {
                                                                            "type": "ObjectExpression",
                                                                            "properties": [
                                                                                {
                                                                                    "type": "Property",
                                                                                    "key": {
                                                                                        "type": "Identifier",
                                                                                        "name": "test"
                                                                                    },
                                                                                    "value": {
                                                                                        "type": "CallExpression",
                                                                                        "callee": {
                                                                                            "type": "MemberExpression",
                                                                                            "computed": False,
                                                                                            "object": {
                                                                                                "type": "ThisExpression"
                                                                                            },
                                                                                            "property": {
                                                                                                "type": "Identifier",
                                                                                                "name": "completeFormVisible"
                                                                                            }
                                                                                        },
                                                                                        "arguments": []
                                                                                    },
                                                                                    "kind": "init"
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            "type": "CallExpression",
                                                                            "callee": {
                                                                                "type": "Identifier",
                                                                                "name": "FormField"
                                                                            },
                                                                            "arguments": [
                                                                                {
                                                                                    "type": "ObjectExpression",
                                                                                    "properties": [
                                                                                        {
                                                                                            "type": "Property",
                                                                                            "key": {
                                                                                                "type": "Identifier",
                                                                                                "name": "ref"
                                                                                            },
                                                                                            "value": {
                                                                                                "type": "Literal",
                                                                                                "value": "firstRevealedFormField",
                                                                                                "raw": "\"firstRevealedFormField\""
                                                                                            },
                                                                                            "kind": "init"
                                                                                        },
                                                                                        {
                                                                                            "type": "Property",
                                                                                            "key": {
                                                                                                "type": "Identifier",
                                                                                                "name": "name"
                                                                                            },
                                                                                            "value": {
                                                                                                "type": "Literal",
                                                                                                "value": "short_name",
                                                                                                "raw": "\"short_name\""
                                                                                            },
                                                                                            "kind": "init"
                                                                                        },
                                                                                        {
                                                                                            "type": "Property",
                                                                                            "key": {
                                                                                                "type": "Identifier",
                                                                                                "name": "label"
                                                                                            },
                                                                                            "value": {
                                                                                                "type": "Literal",
                                                                                                "value": "What is the NICKNAME of your organization?",
                                                                                                "raw": "\"What is the NICKNAME of your organization?\""
                                                                                            },
                                                                                            "kind": "init"
                                                                                        },
                                                                                        {
                                                                                            "type": "Property",
                                                                                            "key": {
                                                                                                "type": "Identifier",
                                                                                                "name": "disabled"
                                                                                            },
                                                                                            "value": {
                                                                                                "type": "CallExpression",
                                                                                                "callee": {
                                                                                                    "type": "MemberExpression",
                                                                                                    "computed": False,
                                                                                                    "object": {
                                                                                                        "type": "ThisExpression"
                                                                                                    },
                                                                                                    "property": {
                                                                                                        "type": "Identifier",
                                                                                                        "name": "disabled"
                                                                                                    }
                                                                                                },
                                                                                                "arguments": []
                                                                                            },
                                                                                            "kind": "init"
                                                                                        },
                                                                                        {
                                                                                            "type": "Property",
                                                                                            "key": {
                                                                                                "type": "Identifier",
                                                                                                "name": "model"
                                                                                            },
                                                                                            "value": {
                                                                                                "type": "MemberExpression",
                                                                                                "computed": False,
                                                                                                "object": {
                                                                                                    "type": "MemberExpression",
                                                                                                    "computed": False,
                                                                                                    "object": {
                                                                                                        "type": "ThisExpression"
                                                                                                    },
                                                                                                    "property": {
                                                                                                        "type": "Identifier",
                                                                                                        "name": "props"
                                                                                                    }
                                                                                                },
                                                                                                "property": {
                                                                                                    "type": "Identifier",
                                                                                                    "name": "model"
                                                                                                }
                                                                                            },
                                                                                            "kind": "init"
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            "type": "CallExpression",
                                                                            "callee": {
                                                                                "type": "Identifier",
                                                                                "name": "FormField"
                                                                            },
                                                                            "arguments": [
                                                                                {
                                                                                    "type": "ObjectExpression",
                                                                                    "properties": [
                                                                                        {
                                                                                            "type": "Property",
                                                                                            "key": {
                                                                                                "type": "Identifier",
                                                                                                "name": "name"
                                                                                            },
                                                                                            "value": {
                                                                                                "type": "Literal",
                                                                                                "value": "ein",
                                                                                                "raw": "\"ein\""
                                                                                            },
                                                                                            "kind": "init"
                                                                                        },
                                                                                        {
                                                                                            "type": "Property",
                                                                                            "key": {
                                                                                                "type": "Identifier",
                                                                                                "name": "label"
                                                                                            },
                                                                                            "value": {
                                                                                                "type": "Literal",
                                                                                                "value": "Government ID number:",
                                                                                                "raw": "\"Government ID number:\""
                                                                                            },
                                                                                            "kind": "init"
                                                                                        },
                                                                                        {
                                                                                            "type": "Property",
                                                                                            "key": {
                                                                                                "type": "Identifier",
                                                                                                "name": "disabled"
                                                                                            },
                                                                                            "value": {
                                                                                                "type": "CallExpression",
                                                                                                "callee": {
                                                                                                    "type": "MemberExpression",
                                                                                                    "computed": False,
                                                                                                    "object": {
                                                                                                        "type": "ThisExpression"
                                                                                                    },
                                                                                                    "property": {
                                                                                                        "type": "Identifier",
                                                                                                        "name": "disabled"
                                                                                                    }
                                                                                                },
                                                                                                "arguments": []
                                                                                            },
                                                                                            "kind": "init"
                                                                                        },
                                                                                        {
                                                                                            "type": "Property",
                                                                                            "key": {
                                                                                                "type": "Identifier",
                                                                                                "name": "model"
                                                                                            },
                                                                                            "value": {
                                                                                                "type": "MemberExpression",
                                                                                                "computed": False,
                                                                                                "object": {
                                                                                                    "type": "MemberExpression",
                                                                                                    "computed": False,
                                                                                                    "object": {
                                                                                                        "type": "ThisExpression"
                                                                                                    },
                                                                                                    "property": {
                                                                                                        "type": "Identifier",
                                                                                                        "name": "props"
                                                                                                    }
                                                                                                },
                                                                                                "property": {
                                                                                                    "type": "Identifier",
                                                                                                    "name": "model"
                                                                                                }
                                                                                            },
                                                                                            "kind": "init"
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            "type": "CallExpression",
                                                                            "callee": {
                                                                                "type": "Identifier",
                                                                                "name": "FormField"
                                                                            },
                                                                            "arguments": [
                                                                                {
                                                                                    "type": "ObjectExpression",
                                                                                    "properties": [
                                                                                        {
                                                                                            "type": "Property",
                                                                                            "key": {
                                                                                                "type": "Identifier",
                                                                                                "name": "name"
                                                                                            },
                                                                                            "value": {
                                                                                                "type": "Literal",
                                                                                                "value": "website",
                                                                                                "raw": "\"website\""
                                                                                            },
                                                                                            "kind": "init"
                                                                                        },
                                                                                        {
                                                                                            "type": "Property",
                                                                                            "key": {
                                                                                                "type": "Identifier",
                                                                                                "name": "label"
                                                                                            },
                                                                                            "value": {
                                                                                                "type": "Literal",
                                                                                                "value": "Organization website:",
                                                                                                "raw": "\"Organization website:\""
                                                                                            },
                                                                                            "kind": "init"
                                                                                        },
                                                                                        {
                                                                                            "type": "Property",
                                                                                            "key": {
                                                                                                "type": "Identifier",
                                                                                                "name": "disabled"
                                                                                            },
                                                                                            "value": {
                                                                                                "type": "CallExpression",
                                                                                                "callee": {
                                                                                                    "type": "MemberExpression",
                                                                                                    "computed": False,
                                                                                                    "object": {
                                                                                                        "type": "ThisExpression"
                                                                                                    },
                                                                                                    "property": {
                                                                                                        "type": "Identifier",
                                                                                                        "name": "disabled"
                                                                                                    }
                                                                                                },
                                                                                                "arguments": []
                                                                                            },
                                                                                            "kind": "init"
                                                                                        },
                                                                                        {
                                                                                            "type": "Property",
                                                                                            "key": {
                                                                                                "type": "Identifier",
                                                                                                "name": "model"
                                                                                            },
                                                                                            "value": {
                                                                                                "type": "MemberExpression",
                                                                                                "computed": False,
                                                                                                "object": {
                                                                                                    "type": "MemberExpression",
                                                                                                    "computed": False,
                                                                                                    "object": {
                                                                                                        "type": "ThisExpression"
                                                                                                    },
                                                                                                    "property": {
                                                                                                        "type": "Identifier",
                                                                                                        "name": "props"
                                                                                                    }
                                                                                                },
                                                                                                "property": {
                                                                                                    "type": "Identifier",
                                                                                                    "name": "model"
                                                                                                }
                                                                                            },
                                                                                            "kind": "init"
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            "type": "CallExpression",
                                                                            "callee": {
                                                                                "type": "MemberExpression",
                                                                                "computed": False,
                                                                                "object": {
                                                                                    "type": "MemberExpression",
                                                                                    "computed": False,
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
                                                                                    "name": "label"
                                                                                }
                                                                            },
                                                                            "arguments": [
                                                                                {
                                                                                    "type": "Literal",
                                                                                    "value": None,
                                                                                    "raw": "null"
                                                                                },
                                                                                {
                                                                                    "type": "Literal",
                                                                                    "value": "Describe your organization’s mission:",
                                                                                    "raw": "\"Describe your organization’s mission:\""
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            "type": "CallExpression",
                                                                            "callee": {
                                                                                "type": "MemberExpression",
                                                                                "computed": False,
                                                                                "object": {
                                                                                    "type": "MemberExpression",
                                                                                    "computed": False,
                                                                                    "object": {
                                                                                        "type": "Identifier",
                                                                                        "name": "ABC"
                                                                                    },
                                                                                    "property": {
                                                                                        "type": "Identifier",
                                                                                        "name": "RTE"
                                                                                    }
                                                                                },
                                                                                "property": {
                                                                                    "type": "Identifier",
                                                                                    "name": "RichTextEditor"
                                                                                }
                                                                            },
                                                                            "arguments": [
                                                                                {
                                                                                    "type": "ObjectExpression",
                                                                                    "properties": [
                                                                                        {
                                                                                            "type": "Property",
                                                                                            "key": {
                                                                                                "type": "Identifier",
                                                                                                "name": "wysihtml5Configuration"
                                                                                            },
                                                                                            "value": {
                                                                                                "type": "MemberExpression",
                                                                                                "computed": False,
                                                                                                "object": {
                                                                                                    "type": "MemberExpression",
                                                                                                    "computed": False,
                                                                                                    "object": {
                                                                                                        "type": "ThisExpression"
                                                                                                    },
                                                                                                    "property": {
                                                                                                        "type": "Identifier",
                                                                                                        "name": "props"
                                                                                                    }
                                                                                                },
                                                                                                "property": {
                                                                                                    "type": "Identifier",
                                                                                                    "name": "missionEditorConfiguration"
                                                                                                }
                                                                                            },
                                                                                            "kind": "init"
                                                                                        },
                                                                                        {
                                                                                            "type": "Property",
                                                                                            "key": {
                                                                                                "type": "Identifier",
                                                                                                "name": "editorStylesheetUrl"
                                                                                            },
                                                                                            "value": {
                                                                                                "type": "MemberExpression",
                                                                                                "computed": False,
                                                                                                "object": {
                                                                                                    "type": "MemberExpression",
                                                                                                    "computed": False,
                                                                                                    "object": {
                                                                                                        "type": "ThisExpression"
                                                                                                    },
                                                                                                    "property": {
                                                                                                        "type": "Identifier",
                                                                                                        "name": "props"
                                                                                                    }
                                                                                                },
                                                                                                "property": {
                                                                                                    "type": "Identifier",
                                                                                                    "name": "missionEditorStylesheet"
                                                                                                }
                                                                                            },
                                                                                            "kind": "init"
                                                                                        },
                                                                                        {
                                                                                            "type": "Property",
                                                                                            "key": {
                                                                                                "type": "Identifier",
                                                                                                "name": "onChange"
                                                                                            },
                                                                                            "value": {
                                                                                                "type": "CallExpression",
                                                                                                "callee": {
                                                                                                    "type": "MemberExpression",
                                                                                                    "computed": False,
                                                                                                    "object": {
                                                                                                        "type": "ThisExpression"
                                                                                                    },
                                                                                                    "property": {
                                                                                                        "type": "Identifier",
                                                                                                        "name": "changeHandlerFor"
                                                                                                    }
                                                                                                },
                                                                                                "arguments": [
                                                                                                    {
                                                                                                        "type": "Literal",
                                                                                                        "value": "mission",
                                                                                                        "raw": "\"mission\""
                                                                                                    }
                                                                                                ]
                                                                                            },
                                                                                            "kind": "init"
                                                                                        },
                                                                                        {
                                                                                            "type": "Property",
                                                                                            "key": {
                                                                                                "type": "Identifier",
                                                                                                "name": "value"
                                                                                            },
                                                                                            "value": {
                                                                                                "type": "CallExpression",
                                                                                                "callee": {
                                                                                                    "type": "MemberExpression",
                                                                                                    "computed": False,
                                                                                                    "object": {
                                                                                                        "type": "MemberExpression",
                                                                                                        "computed": False,
                                                                                                        "object": {
                                                                                                            "type": "MemberExpression",
                                                                                                            "computed": False,
                                                                                                            "object": {
                                                                                                                "type": "ThisExpression"
                                                                                                            },
                                                                                                            "property": {
                                                                                                                "type": "Identifier",
                                                                                                                "name": "props"
                                                                                                            }
                                                                                                        },
                                                                                                        "property": {
                                                                                                            "type": "Identifier",
                                                                                                            "name": "model"
                                                                                                        }
                                                                                                    },
                                                                                                    "property": {
                                                                                                        "type": "Identifier",
                                                                                                        "name": "valueForFieldNamed"
                                                                                                    }
                                                                                                },
                                                                                                "arguments": [
                                                                                                    {
                                                                                                        "type": "Literal",
                                                                                                        "value": "mission",
                                                                                                        "raw": "\"mission\""
                                                                                                    }
                                                                                                ]
                                                                                            },
                                                                                            "kind": "init"
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            "type": "CallExpression",
                                                                            "callee": {
                                                                                "type": "MemberExpression",
                                                                                "computed": False,
                                                                                "object": {
                                                                                    "type": "ThisExpression"
                                                                                },
                                                                                "property": {
                                                                                    "type": "Identifier",
                                                                                    "name": "errorFor"
                                                                                }
                                                                            },
                                                                            "arguments": [
                                                                                {
                                                                                    "type": "Literal",
                                                                                    "value": "mission",
                                                                                    "raw": "\"mission\""
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            "type": "CallExpression",
                                                                            "callee": {
                                                                                "type": "MemberExpression",
                                                                                "computed": False,
                                                                                "object": {
                                                                                    "type": "MemberExpression",
                                                                                    "computed": False,
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
                                                                                    "name": "fieldset"
                                                                                }
                                                                            },
                                                                            "arguments": [
                                                                                {
                                                                                    "type": "Literal",
                                                                                    "value": None,
                                                                                    "raw": "null"
                                                                                },
                                                                                {
                                                                                    "type": "CallExpression",
                                                                                    "callee": {
                                                                                        "type": "MemberExpression",
                                                                                        "computed": False,
                                                                                        "object": {
                                                                                            "type": "MemberExpression",
                                                                                            "computed": False,
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
                                                                                            "name": "label"
                                                                                        }
                                                                                    },
                                                                                    "arguments": [
                                                                                        {
                                                                                            "type": "Literal",
                                                                                            "value": None,
                                                                                            "raw": "null"
                                                                                        },
                                                                                        {
                                                                                            "type": "Literal",
                                                                                            "value": "Areas of focus:",
                                                                                            "raw": "\"Areas of focus:\""
                                                                                        }
                                                                                    ]
                                                                                },
                                                                                {
                                                                                    "type": "CallExpression",
                                                                                    "callee": {
                                                                                        "type": "MemberExpression",
                                                                                        "computed": False,
                                                                                        "object": {
                                                                                            "type": "Identifier",
                                                                                            "name": "ABC"
                                                                                        },
                                                                                        "property": {
                                                                                            "type": "Identifier",
                                                                                            "name": "Multiselect"
                                                                                        }
                                                                                    },
                                                                                    "arguments": [
                                                                                        {
                                                                                            "type": "ObjectExpression",
                                                                                            "properties": [
                                                                                                {
                                                                                                    "type": "Property",
                                                                                                    "key": {
                                                                                                        "type": "Identifier",
                                                                                                        "name": "disabled"
                                                                                                    },
                                                                                                    "value": {
                                                                                                        "type": "CallExpression",
                                                                                                        "callee": {
                                                                                                            "type": "MemberExpression",
                                                                                                            "computed": False,
                                                                                                            "object": {
                                                                                                                "type": "ThisExpression"
                                                                                                            },
                                                                                                            "property": {
                                                                                                                "type": "Identifier",
                                                                                                                "name": "disabled"
                                                                                                            }
                                                                                                        },
                                                                                                        "arguments": []
                                                                                                    },
                                                                                                    "kind": "init"
                                                                                                },
                                                                                                {
                                                                                                    "type": "Property",
                                                                                                    "key": {
                                                                                                        "type": "Identifier",
                                                                                                        "name": "name"
                                                                                                    },
                                                                                                    "value": {
                                                                                                        "type": "Literal",
                                                                                                        "value": "keywords",
                                                                                                        "raw": "\"keywords\""
                                                                                                    },
                                                                                                    "kind": "init"
                                                                                                },
                                                                                                {
                                                                                                    "type": "Property",
                                                                                                    "key": {
                                                                                                        "type": "Identifier",
                                                                                                        "name": "choices"
                                                                                                    },
                                                                                                    "value": {
                                                                                                        "type": "MemberExpression",
                                                                                                        "computed": False,
                                                                                                        "object": {
                                                                                                            "type": "MemberExpression",
                                                                                                            "computed": False,
                                                                                                            "object": {
                                                                                                                "type": "MemberExpression",
                                                                                                                "computed": False,
                                                                                                                "object": {
                                                                                                                    "type": "MemberExpression",
                                                                                                                    "computed": False,
                                                                                                                    "object": {
                                                                                                                        "type": "ThisExpression"
                                                                                                                    },
                                                                                                                    "property": {
                                                                                                                        "type": "Identifier",
                                                                                                                        "name": "props"
                                                                                                                    }
                                                                                                                },
                                                                                                                "property": {
                                                                                                                    "type": "Identifier",
                                                                                                                    "name": "model"
                                                                                                                }
                                                                                                            },
                                                                                                            "property": {
                                                                                                                "type": "Identifier",
                                                                                                                "name": "constants"
                                                                                                            }
                                                                                                        },
                                                                                                        "property": {
                                                                                                            "type": "Identifier",
                                                                                                            "name": "areasOfFocus"
                                                                                                        }
                                                                                                    },
                                                                                                    "kind": "init"
                                                                                                },
                                                                                                {
                                                                                                    "type": "Property",
                                                                                                    "key": {
                                                                                                        "type": "Identifier",
                                                                                                        "name": "selectedChoices"
                                                                                                    },
                                                                                                    "value": {
                                                                                                        "type": "CallExpression",
                                                                                                        "callee": {
                                                                                                            "type": "MemberExpression",
                                                                                                            "computed": False,
                                                                                                            "object": {
                                                                                                                "type": "MemberExpression",
                                                                                                                "computed": False,
                                                                                                                "object": {
                                                                                                                    "type": "MemberExpression",
                                                                                                                    "computed": False,
                                                                                                                    "object": {
                                                                                                                        "type": "ThisExpression"
                                                                                                                    },
                                                                                                                    "property": {
                                                                                                                        "type": "Identifier",
                                                                                                                        "name": "props"
                                                                                                                    }
                                                                                                                },
                                                                                                                "property": {
                                                                                                                    "type": "Identifier",
                                                                                                                    "name": "model"
                                                                                                                }
                                                                                                            },
                                                                                                            "property": {
                                                                                                                "type": "Identifier",
                                                                                                                "name": "valueForFieldNamed"
                                                                                                            }
                                                                                                        },
                                                                                                        "arguments": [
                                                                                                            {
                                                                                                                "type": "Literal",
                                                                                                                "value": "keywords",
                                                                                                                "raw": "'keywords'"
                                                                                                            }
                                                                                                        ]
                                                                                                    },
                                                                                                    "kind": "init"
                                                                                                },
                                                                                                {
                                                                                                    "type": "Property",
                                                                                                    "key": {
                                                                                                        "type": "Identifier",
                                                                                                        "name": "onChange"
                                                                                                    },
                                                                                                    "value": {
                                                                                                        "type": "CallExpression",
                                                                                                        "callee": {
                                                                                                            "type": "MemberExpression",
                                                                                                            "computed": False,
                                                                                                            "object": {
                                                                                                                "type": "ThisExpression"
                                                                                                            },
                                                                                                            "property": {
                                                                                                                "type": "Identifier",
                                                                                                                "name": "changeHandlerFor"
                                                                                                            }
                                                                                                        },
                                                                                                        "arguments": [
                                                                                                            {
                                                                                                                "type": "Literal",
                                                                                                                "value": "keywords",
                                                                                                                "raw": "'keywords'"
                                                                                                            }
                                                                                                        ]
                                                                                                    },
                                                                                                    "kind": "init"
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ]
                                                                                },
                                                                                {
                                                                                    "type": "CallExpression",
                                                                                    "callee": {
                                                                                        "type": "MemberExpression",
                                                                                        "computed": False,
                                                                                        "object": {
                                                                                            "type": "ThisExpression"
                                                                                        },
                                                                                        "property": {
                                                                                            "type": "Identifier",
                                                                                            "name": "errorFor"
                                                                                        }
                                                                                    },
                                                                                    "arguments": [
                                                                                        {
                                                                                            "type": "Literal",
                                                                                            "value": "keywords",
                                                                                            "raw": "\"keywords\""
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            "type": "CallExpression",
                                                                            "callee": {
                                                                                "type": "MemberExpression",
                                                                                "computed": False,
                                                                                "object": {
                                                                                    "type": "MemberExpression",
                                                                                    "computed": False,
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
                                                                                    "name": "label"
                                                                                }
                                                                            },
                                                                            "arguments": [
                                                                                {
                                                                                    "type": "Literal",
                                                                                    "value": None,
                                                                                    "raw": "null"
                                                                                },
                                                                                {
                                                                                    "type": "Literal",
                                                                                    "value": "Upload a photo or logo:",
                                                                                    "raw": "\"Upload a photo or logo:\""
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            "type": "CallExpression",
                                                                            "callee": {
                                                                                "type": "MemberExpression",
                                                                                "computed": False,
                                                                                "object": {
                                                                                    "type": "Identifier",
                                                                                    "name": "ABC"
                                                                                },
                                                                                "property": {
                                                                                    "type": "Identifier",
                                                                                    "name": "UploadcareWidget"
                                                                                }
                                                                            },
                                                                            "arguments": [
                                                                                {
                                                                                    "type": "ObjectExpression",
                                                                                    "properties": [
                                                                                        {
                                                                                            "type": "Property",
                                                                                            "key": {
                                                                                                "type": "Identifier",
                                                                                                "name": "name"
                                                                                            },
                                                                                            "value": {
                                                                                                "type": "Literal",
                                                                                                "value": "logo",
                                                                                                "raw": "\"logo\""
                                                                                            },
                                                                                            "kind": "init"
                                                                                        },
                                                                                        {
                                                                                            "type": "Property",
                                                                                            "key": {
                                                                                                "type": "Identifier",
                                                                                                "name": "onChange"
                                                                                            },
                                                                                            "value": {
                                                                                                "type": "CallExpression",
                                                                                                "callee": {
                                                                                                    "type": "MemberExpression",
                                                                                                    "computed": False,
                                                                                                    "object": {
                                                                                                        "type": "ThisExpression"
                                                                                                    },
                                                                                                    "property": {
                                                                                                        "type": "Identifier",
                                                                                                        "name": "changeHandlerFor"
                                                                                                    }
                                                                                                },
                                                                                                "arguments": [
                                                                                                    {
                                                                                                        "type": "Literal",
                                                                                                        "value": "logo",
                                                                                                        "raw": "\"logo\""
                                                                                                    }
                                                                                                ]
                                                                                            },
                                                                                            "kind": "init"
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            "type": "CallExpression",
                                                                            "callee": {
                                                                                "type": "MemberExpression",
                                                                                "computed": False,
                                                                                "object": {
                                                                                    "type": "ThisExpression"
                                                                                },
                                                                                "property": {
                                                                                    "type": "Identifier",
                                                                                    "name": "errorFor"
                                                                                }
                                                                            },
                                                                            "arguments": [
                                                                                {
                                                                                    "type": "Literal",
                                                                                    "value": "logo",
                                                                                    "raw": "\"logo\""
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            "type": "CallExpression",
                                                                            "callee": {
                                                                                "type": "MemberExpression",
                                                                                "computed": False,
                                                                                "object": {
                                                                                    "type": "MemberExpression",
                                                                                    "computed": False,
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
                                                                                    "name": "span"
                                                                                }
                                                                            },
                                                                            "arguments": [
                                                                                {
                                                                                    "type": "Literal",
                                                                                    "value": None,
                                                                                    "raw": "null"
                                                                                },
                                                                                {
                                                                                    "type": "CallExpression",
                                                                                    "callee": {
                                                                                        "type": "MemberExpression",
                                                                                        "computed": False,
                                                                                        "object": {
                                                                                            "type": "MemberExpression",
                                                                                            "computed": False,
                                                                                            "object": {
                                                                                                "type": "MemberExpression",
                                                                                                "computed": False,
                                                                                                "object": {
                                                                                                    "type": "ThisExpression"
                                                                                                },
                                                                                                "property": {
                                                                                                    "type": "Identifier",
                                                                                                    "name": "props"
                                                                                                }
                                                                                            },
                                                                                            "property": {
                                                                                                "type": "Identifier",
                                                                                                "name": "model"
                                                                                            }
                                                                                        },
                                                                                        "property": {
                                                                                            "type": "Identifier",
                                                                                            "name": "submissionErrorMessage"
                                                                                        }
                                                                                    },
                                                                                    "arguments": []
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            "type": "CallExpression",
                                                                            "callee": {
                                                                                "type": "MemberExpression",
                                                                                "computed": False,
                                                                                "object": {
                                                                                    "type": "MemberExpression",
                                                                                    "computed": False,
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
                                                                                    "name": "button"
                                                                                }
                                                                            },
                                                                            "arguments": [
                                                                                {
                                                                                    "type": "ObjectExpression",
                                                                                    "properties": [
                                                                                        {
                                                                                            "type": "Property",
                                                                                            "key": {
                                                                                                "type": "Identifier",
                                                                                                "name": "type"
                                                                                            },
                                                                                            "value": {
                                                                                                "type": "Literal",
                                                                                                "value": "button",
                                                                                                "raw": "\"button\""
                                                                                            },
                                                                                            "kind": "init"
                                                                                        },
                                                                                        {
                                                                                            "type": "Property",
                                                                                            "key": {
                                                                                                "type": "Identifier",
                                                                                                "name": "onClick"
                                                                                            },
                                                                                            "value": {
                                                                                                "type": "MemberExpression",
                                                                                                "computed": False,
                                                                                                "object": {
                                                                                                    "type": "ThisExpression"
                                                                                                },
                                                                                                "property": {
                                                                                                    "type": "Identifier",
                                                                                                    "name": "submit"
                                                                                                }
                                                                                            },
                                                                                            "kind": "init"
                                                                                        },
                                                                                        {
                                                                                            "type": "Property",
                                                                                            "key": {
                                                                                                "type": "Identifier",
                                                                                                "name": "disabled"
                                                                                            },
                                                                                            "value": {
                                                                                                "type": "CallExpression",
                                                                                                "callee": {
                                                                                                    "type": "MemberExpression",
                                                                                                    "computed": False,
                                                                                                    "object": {
                                                                                                        "type": "ThisExpression"
                                                                                                    },
                                                                                                    "property": {
                                                                                                        "type": "Identifier",
                                                                                                        "name": "disabled"
                                                                                                    }
                                                                                                },
                                                                                                "arguments": []
                                                                                            },
                                                                                            "kind": "init"
                                                                                        }
                                                                                    ]
                                                                                },
                                                                                {
                                                                                    "type": "Literal",
                                                                                    "value": "Submit",
                                                                                    "raw": "\"Submit\""
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ]
                                            },
                                            "rest": None,
                                            "generator": False,
                                            "expression": False
                                        },
                                        "kind": "init"
                                    },
                                    {
                                        "type": "Property",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "nameWasChosen"
                                        },
                                        "value": {
                                            "type": "FunctionExpression",
                                            "id": None,
                                            "params": [],
                                            "defaults": [],
                                            "body": {
                                                "type": "BlockStatement",
                                                "body": [
                                                    {
                                                        "type": "ExpressionStatement",
                                                        "expression": {
                                                            "type": "CallExpression",
                                                            "callee": {
                                                                "type": "MemberExpression",
                                                                "computed": False,
                                                                "object": {
                                                                    "type": "Identifier",
                                                                    "name": "_"
                                                                },
                                                                "property": {
                                                                    "type": "Identifier",
                                                                    "name": "defer"
                                                                }
                                                            },
                                                            "arguments": [
                                                                {
                                                                    "type": "CallExpression",
                                                                    "callee": {
                                                                        "type": "MemberExpression",
                                                                        "computed": False,
                                                                        "object": {
                                                                            "type": "FunctionExpression",
                                                                            "id": None,
                                                                            "params": [],
                                                                            "defaults": [],
                                                                            "body": {
                                                                                "type": "BlockStatement",
                                                                                "body": [
                                                                                    {
                                                                                        "type": "IfStatement",
                                                                                        "test": {
                                                                                            "type": "MemberExpression",
                                                                                            "computed": False,
                                                                                            "object": {
                                                                                                "type": "MemberExpression",
                                                                                                "computed": False,
                                                                                                "object": {
                                                                                                    "type": "ThisExpression"
                                                                                                },
                                                                                                "property": {
                                                                                                    "type": "Identifier",
                                                                                                    "name": "refs"
                                                                                                }
                                                                                            },
                                                                                            "property": {
                                                                                                "type": "Identifier",
                                                                                                "name": "firstRevealedFormField"
                                                                                            }
                                                                                        },
                                                                                        "consequent": {
                                                                                            "type": "BlockStatement",
                                                                                            "body": [
                                                                                                {
                                                                                                    "type": "ExpressionStatement",
                                                                                                    "expression": {
                                                                                                        "type": "CallExpression",
                                                                                                        "callee": {
                                                                                                            "type": "MemberExpression",
                                                                                                            "computed": False,
                                                                                                            "object": {
                                                                                                                "type": "MemberExpression",
                                                                                                                "computed": False,
                                                                                                                "object": {
                                                                                                                    "type": "MemberExpression",
                                                                                                                    "computed": False,
                                                                                                                    "object": {
                                                                                                                        "type": "ThisExpression"
                                                                                                                    },
                                                                                                                    "property": {
                                                                                                                        "type": "Identifier",
                                                                                                                        "name": "refs"
                                                                                                                    }
                                                                                                                },
                                                                                                                "property": {
                                                                                                                    "type": "Identifier",
                                                                                                                    "name": "firstRevealedFormField"
                                                                                                                }
                                                                                                            },
                                                                                                            "property": {
                                                                                                                "type": "Identifier",
                                                                                                                "name": "focus"
                                                                                                            }
                                                                                                        },
                                                                                                        "arguments": []
                                                                                                    }
                                                                                                }
                                                                                            ]
                                                                                        },
                                                                                        "alternate": None
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "rest": None,
                                                                            "generator": False,
                                                                            "expression": False
                                                                        },
                                                                        "property": {
                                                                            "type": "Identifier",
                                                                            "name": "bind"
                                                                        }
                                                                    },
                                                                    "arguments": [
                                                                        {
                                                                            "type": "ThisExpression"
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ]
                                            },
                                            "rest": None,
                                            "generator": False,
                                            "expression": False
                                        },
                                        "kind": "init"
                                    },
                                    {
                                        "type": "Property",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "disabled"
                                        },
                                        "value": {
                                            "type": "FunctionExpression",
                                            "id": None,
                                            "params": [],
                                            "defaults": [],
                                            "body": {
                                                "type": "BlockStatement",
                                                "body": [
                                                    {
                                                        "type": "ReturnStatement",
                                                        "argument": {
                                                            "type": "UnaryExpression",
                                                            "operator": "!",
                                                            "argument": {
                                                                "type": "CallExpression",
                                                                "callee": {
                                                                    "type": "MemberExpression",
                                                                    "computed": False,
                                                                    "object": {
                                                                        "type": "MemberExpression",
                                                                        "computed": False,
                                                                        "object": {
                                                                            "type": "MemberExpression",
                                                                            "computed": False,
                                                                            "object": {
                                                                                "type": "ThisExpression"
                                                                            },
                                                                            "property": {
                                                                                "type": "Identifier",
                                                                                "name": "props"
                                                                            }
                                                                        },
                                                                        "property": {
                                                                            "type": "Identifier",
                                                                            "name": "model"
                                                                        }
                                                                    },
                                                                    "property": {
                                                                        "type": "Identifier",
                                                                        "name": "allowsEditing"
                                                                    }
                                                                },
                                                                "arguments": []
                                                            },
                                                            "prefix": True
                                                        }
                                                    }
                                                ]
                                            },
                                            "rest": None,
                                            "generator": False,
                                            "expression": False
                                        },
                                        "kind": "init"
                                    },
                                    {
                                        "type": "Property",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "errorFor"
                                        },
                                        "value": {
                                            "type": "FunctionExpression",
                                            "id": None,
                                            "params": [
                                                {
                                                    "type": "Identifier",
                                                    "name": "name"
                                                }
                                            ],
                                            "defaults": [],
                                            "body": {
                                                "type": "BlockStatement",
                                                "body": [
                                                    {
                                                        "type": "VariableDeclaration",
                                                        "declarations": [
                                                            {
                                                                "type": "VariableDeclarator",
                                                                "id": {
                                                                    "type": "Identifier",
                                                                    "name": "error"
                                                                },
                                                                "init": {
                                                                    "type": "CallExpression",
                                                                    "callee": {
                                                                        "type": "MemberExpression",
                                                                        "computed": False,
                                                                        "object": {
                                                                            "type": "MemberExpression",
                                                                            "computed": False,
                                                                            "object": {
                                                                                "type": "MemberExpression",
                                                                                "computed": False,
                                                                                "object": {
                                                                                    "type": "ThisExpression"
                                                                                },
                                                                                "property": {
                                                                                    "type": "Identifier",
                                                                                    "name": "props"
                                                                                }
                                                                            },
                                                                            "property": {
                                                                                "type": "Identifier",
                                                                                "name": "model"
                                                                            }
                                                                        },
                                                                        "property": {
                                                                            "type": "Identifier",
                                                                            "name": "errorMessageForFieldNamed"
                                                                        }
                                                                    },
                                                                    "arguments": [
                                                                        {
                                                                            "type": "Identifier",
                                                                            "name": "name"
                                                                        }
                                                                    ]
                                                                }
                                                            }
                                                        ],
                                                        "kind": "var"
                                                    },
                                                    {
                                                        "type": "ReturnStatement",
                                                        "argument": {
                                                            "type": "LogicalExpression",
                                                            "operator": "&&",
                                                            "left": {
                                                                "type": "Identifier",
                                                                "name": "error"
                                                            },
                                                            "right": {
                                                                "type": "CallExpression",
                                                                "callee": {
                                                                    "type": "MemberExpression",
                                                                    "computed": False,
                                                                    "object": {
                                                                        "type": "MemberExpression",
                                                                        "computed": False,
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
                                                                        "name": "span"
                                                                    }
                                                                },
                                                                "arguments": [
                                                                    {
                                                                        "type": "Literal",
                                                                        "value": None,
                                                                        "raw": "null"
                                                                    },
                                                                    {
                                                                        "type": "Identifier",
                                                                        "name": "error"
                                                                    }
                                                                ]
                                                            }
                                                        }
                                                    }
                                                ]
                                            },
                                            "rest": None,
                                            "generator": False,
                                            "expression": False
                                        },
                                        "kind": "init"
                                    },
                                    {
                                        "type": "Property",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "completeFormVisible"
                                        },
                                        "value": {
                                            "type": "FunctionExpression",
                                            "id": None,
                                            "params": [],
                                            "defaults": [],
                                            "body": {
                                                "type": "BlockStatement",
                                                "body": [
                                                    {
                                                        "type": "ReturnStatement",
                                                        "argument": {
                                                            "type": "LogicalExpression",
                                                            "operator": "&&",
                                                            "left": {
                                                                "type": "UnaryExpression",
                                                                "operator": "!",
                                                                "argument": {
                                                                    "type": "UnaryExpression",
                                                                    "operator": "!",
                                                                    "argument": {
                                                                        "type": "CallExpression",
                                                                        "callee": {
                                                                            "type": "MemberExpression",
                                                                            "computed": False,
                                                                            "object": {
                                                                                "type": "MemberExpression",
                                                                                "computed": False,
                                                                                "object": {
                                                                                    "type": "MemberExpression",
                                                                                    "computed": False,
                                                                                    "object": {
                                                                                        "type": "ThisExpression"
                                                                                    },
                                                                                    "property": {
                                                                                        "type": "Identifier",
                                                                                        "name": "props"
                                                                                    }
                                                                                },
                                                                                "property": {
                                                                                    "type": "Identifier",
                                                                                    "name": "model"
                                                                                }
                                                                            },
                                                                            "property": {
                                                                                "type": "Identifier",
                                                                                "name": "valueForFieldNamed"
                                                                            }
                                                                        },
                                                                        "arguments": [
                                                                            {
                                                                                "type": "Literal",
                                                                                "value": "name",
                                                                                "raw": "'name'"
                                                                            }
                                                                        ]
                                                                    },
                                                                    "prefix": True
                                                                },
                                                                "prefix": True
                                                            },
                                                            "right": {
                                                                "type": "UnaryExpression",
                                                                "operator": "!",
                                                                "argument": {
                                                                    "type": "CallExpression",
                                                                    "callee": {
                                                                        "type": "MemberExpression",
                                                                        "computed": False,
                                                                        "object": {
                                                                            "type": "MemberExpression",
                                                                            "computed": False,
                                                                            "object": {
                                                                                "type": "MemberExpression",
                                                                                "computed": False,
                                                                                "object": {
                                                                                    "type": "ThisExpression"
                                                                                },
                                                                                "property": {
                                                                                    "type": "Identifier",
                                                                                    "name": "props"
                                                                                }
                                                                            },
                                                                            "property": {
                                                                                "type": "Identifier",
                                                                                "name": "model"
                                                                            }
                                                                        },
                                                                        "property": {
                                                                            "type": "Identifier",
                                                                            "name": "existingOrgIsSelected"
                                                                        }
                                                                    },
                                                                    "arguments": []
                                                                },
                                                                "prefix": True
                                                            }
                                                        }
                                                    }
                                                ]
                                            },
                                            "rest": None,
                                            "generator": False,
                                            "expression": False
                                        },
                                        "kind": "init"
                                    }
                                ]
                            }
                        ]
                    }
                }
            ],
            "kind": "var"
        },
        {
            "type": "VariableDeclaration",
            "declarations": [
                {
                    "type": "VariableDeclarator",
                    "id": {
                        "type": "Identifier",
                        "name": "OrgIntakePricing"
                    },
                    "init": {
                        "type": "CallExpression",
                        "callee": {
                            "type": "MemberExpression",
                            "computed": False,
                            "object": {
                                "type": "Identifier",
                                "name": "React"
                            },
                            "property": {
                                "type": "Identifier",
                                "name": "createClass"
                            }
                        },
                        "arguments": [
                            {
                                "type": "ObjectExpression",
                                "properties": [
                                    {
                                        "type": "Property",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "displayName"
                                        },
                                        "value": {
                                            "type": "Literal",
                                            "value": "OrgIntakePricing",
                                            "raw": "'OrgIntakePricing'"
                                        },
                                        "kind": "init"
                                    },
                                    {
                                        "type": "Property",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "render"
                                        },
                                        "value": {
                                            "type": "FunctionExpression",
                                            "id": None,
                                            "params": [],
                                            "defaults": [],
                                            "body": {
                                                "type": "BlockStatement",
                                                "body": [
                                                    {
                                                        "type": "ReturnStatement",
                                                        "argument": {
                                                            "type": "CallExpression",
                                                            "callee": {
                                                                "type": "Identifier",
                                                                "name": "i18n"
                                                            },
                                                            "arguments": [
                                                                {
                                                                    "type": "CallExpression",
                                                                    "callee": {
                                                                        "type": "MemberExpression",
                                                                        "computed": False,
                                                                        "object": {
                                                                            "type": "MemberExpression",
                                                                            "computed": False,
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
                                                                            "name": "div"
                                                                        }
                                                                    },
                                                                    "arguments": [
                                                                        {
                                                                            "type": "ObjectExpression",
                                                                            "properties": [
                                                                                {
                                                                                    "type": "Property",
                                                                                    "key": {
                                                                                        "type": "Identifier",
                                                                                        "name": "className"
                                                                                    },
                                                                                    "value": {
                                                                                        "type": "Literal",
                                                                                        "value": "pricing",
                                                                                        "raw": "\"pricing\""
                                                                                    },
                                                                                    "kind": "init"
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            "type": "CallExpression",
                                                                            "callee": {
                                                                                "type": "MemberExpression",
                                                                                "computed": False,
                                                                                "object": {
                                                                                    "type": "MemberExpression",
                                                                                    "computed": False,
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
                                                                                    "name": "h2"
                                                                                }
                                                                            },
                                                                            "arguments": [
                                                                                {
                                                                                    "type": "Literal",
                                                                                    "value": None,
                                                                                    "raw": "null"
                                                                                },
                                                                                {
                                                                                    "type": "Literal",
                                                                                    "value": "What kind of opportunities can my org post?",
                                                                                    "raw": "\"What kind of opportunities can my org post?\""
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            "type": "CallExpression",
                                                                            "callee": {
                                                                                "type": "MemberExpression",
                                                                                "computed": False,
                                                                                "object": {
                                                                                    "type": "MemberExpression",
                                                                                    "computed": False,
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
                                                                                    "name": "p"
                                                                                }
                                                                            },
                                                                            "arguments": [
                                                                                {
                                                                                    "type": "Literal",
                                                                                    "value": None,
                                                                                    "raw": "null"
                                                                                },
                                                                                {
                                                                                    "type": "Literal",
                                                                                    "value": "For ",
                                                                                    "raw": "\"For \""
                                                                                },
                                                                                {
                                                                                    "type": "CallExpression",
                                                                                    "callee": {
                                                                                        "type": "MemberExpression",
                                                                                        "computed": False,
                                                                                        "object": {
                                                                                            "type": "MemberExpression",
                                                                                            "computed": False,
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
                                                                                            "name": "strong"
                                                                                        }
                                                                                    },
                                                                                    "arguments": [
                                                                                        {
                                                                                            "type": "Literal",
                                                                                            "value": None,
                                                                                            "raw": "null"
                                                                                        },
                                                                                        {
                                                                                            "type": "MemberExpression",
                                                                                            "computed": False,
                                                                                            "object": {
                                                                                                "type": "MemberExpression",
                                                                                                "computed": False,
                                                                                                "object": {
                                                                                                    "type": "ThisExpression"
                                                                                                },
                                                                                                "property": {
                                                                                                    "type": "Identifier",
                                                                                                    "name": "props"
                                                                                                }
                                                                                            },
                                                                                            "property": {
                                                                                                "type": "Identifier",
                                                                                                "name": "orgType"
                                                                                            }
                                                                                        }
                                                                                    ]
                                                                                },
                                                                                {
                                                                                    "type": "Literal",
                                                                                    "value": " in ",
                                                                                    "raw": "\" in \""
                                                                                },
                                                                                {
                                                                                    "type": "CallExpression",
                                                                                    "callee": {
                                                                                        "type": "MemberExpression",
                                                                                        "computed": False,
                                                                                        "object": {
                                                                                            "type": "MemberExpression",
                                                                                            "computed": False,
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
                                                                                            "name": "strong"
                                                                                        }
                                                                                    },
                                                                                    "arguments": [
                                                                                        {
                                                                                            "type": "Literal",
                                                                                            "value": None,
                                                                                            "raw": "null"
                                                                                        },
                                                                                        {
                                                                                            "type": "MemberExpression",
                                                                                            "computed": False,
                                                                                            "object": {
                                                                                                "type": "MemberExpression",
                                                                                                "computed": False,
                                                                                                "object": {
                                                                                                    "type": "ThisExpression"
                                                                                                },
                                                                                                "property": {
                                                                                                    "type": "Identifier",
                                                                                                    "name": "props"
                                                                                                }
                                                                                            },
                                                                                            "property": {
                                                                                                "type": "Identifier",
                                                                                                "name": "countryName"
                                                                                            }
                                                                                        }
                                                                                    ]
                                                                                },
                                                                                {
                                                                                    "type": "Literal",
                                                                                    "value": ":",
                                                                                    "raw": "\":\""
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            "type": "CallExpression",
                                                                            "callee": {
                                                                                "type": "MemberExpression",
                                                                                "computed": False,
                                                                                "object": {
                                                                                    "type": "MemberExpression",
                                                                                    "computed": False,
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
                                                                                    "name": "ul"
                                                                                }
                                                                            },
                                                                            "arguments": [
                                                                                {
                                                                                    "type": "Literal",
                                                                                    "value": None,
                                                                                    "raw": "null"
                                                                                },
                                                                                {
                                                                                    "type": "CallExpression",
                                                                                    "callee": {
                                                                                        "type": "MemberExpression",
                                                                                        "computed": False,
                                                                                        "object": {
                                                                                            "type": "MemberExpression",
                                                                                            "computed": False,
                                                                                            "object": {
                                                                                                "type": "MemberExpression",
                                                                                                "computed": False,
                                                                                                "object": {
                                                                                                    "type": "ThisExpression"
                                                                                                },
                                                                                                "property": {
                                                                                                    "type": "Identifier",
                                                                                                    "name": "props"
                                                                                                }
                                                                                            },
                                                                                            "property": {
                                                                                                "type": "Identifier",
                                                                                                "name": "availableTypes"
                                                                                            }
                                                                                        },
                                                                                        "property": {
                                                                                            "type": "Identifier",
                                                                                            "name": "map"
                                                                                        }
                                                                                    },
                                                                                    "arguments": [
                                                                                        {
                                                                                            "type": "FunctionExpression",
                                                                                            "id": None,
                                                                                            "params": [
                                                                                                {
                                                                                                    "type": "Identifier",
                                                                                                    "name": "label"
                                                                                                }
                                                                                            ],
                                                                                            "defaults": [],
                                                                                            "body": {
                                                                                                "type": "BlockStatement",
                                                                                                "body": [
                                                                                                    {
                                                                                                        "type": "ReturnStatement",
                                                                                                        "argument": {
                                                                                                            "type": "CallExpression",
                                                                                                            "callee": {
                                                                                                                "type": "MemberExpression",
                                                                                                                "computed": False,
                                                                                                                "object": {
                                                                                                                    "type": "MemberExpression",
                                                                                                                    "computed": False,
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
                                                                                                                    "name": "li"
                                                                                                                }
                                                                                                            },
                                                                                                            "arguments": [
                                                                                                                {
                                                                                                                    "type": "Literal",
                                                                                                                    "value": None,
                                                                                                                    "raw": "null"
                                                                                                                },
                                                                                                                {
                                                                                                                    "type": "Literal",
                                                                                                                    "value": "label",
                                                                                                                    "raw": "\"label\""
                                                                                                                }
                                                                                                            ]
                                                                                                        }
                                                                                                    }
                                                                                                ]
                                                                                            },
                                                                                            "rest": None,
                                                                                            "generator": False,
                                                                                            "expression": False
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            "type": "CallExpression",
                                                                            "callee": {
                                                                                "type": "MemberExpression",
                                                                                "computed": False,
                                                                                "object": {
                                                                                    "type": "MemberExpression",
                                                                                    "computed": False,
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
                                                                                    "name": "h3"
                                                                                }
                                                                            },
                                                                            "arguments": [
                                                                                {
                                                                                    "type": "Literal",
                                                                                    "value": None,
                                                                                    "raw": "null"
                                                                                },
                                                                                {
                                                                                    "type": "Literal",
                                                                                    "value": "Why post on Idealist?",
                                                                                    "raw": "\"Why post on Idealist?\""
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            "type": "CallExpression",
                                                                            "callee": {
                                                                                "type": "MemberExpression",
                                                                                "computed": False,
                                                                                "object": {
                                                                                    "type": "MemberExpression",
                                                                                    "computed": False,
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
                                                                                    "name": "p"
                                                                                }
                                                                            },
                                                                            "arguments": [
                                                                                {
                                                                                    "type": "Literal",
                                                                                    "value": None,
                                                                                    "raw": "null"
                                                                                },
                                                                                {
                                                                                    "type": "Literal",
                                                                                    "value": "Idealist ... interests and location.",
                                                                                    "raw": "\"Idealist ... interests and location.\""
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ]
                                            },
                                            "rest": None,
                                            "generator": False,
                                            "expression": False
                                        },
                                        "kind": "init"
                                    }
                                ]
                            }
                        ]
                    }
                }
            ],
            "kind": "var"
        },
        {
            "type": "VariableDeclaration",
            "declarations": [
                {
                    "type": "VariableDeclarator",
                    "id": {
                        "type": "Identifier",
                        "name": "OrgIntakeSection"
                    },
                    "init": {
                        "type": "CallExpression",
                        "callee": {
                            "type": "MemberExpression",
                            "computed": False,
                            "object": {
                                "type": "Identifier",
                                "name": "React"
                            },
                            "property": {
                                "type": "Identifier",
                                "name": "createClass"
                            }
                        },
                        "arguments": [
                            {
                                "type": "ObjectExpression",
                                "properties": [
                                    {
                                        "type": "Property",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "displayName"
                                        },
                                        "value": {
                                            "type": "Literal",
                                            "value": "OrgIntakeSection",
                                            "raw": "'OrgIntakeSection'"
                                        },
                                        "kind": "init"
                                    },
                                    {
                                        "type": "Property",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "mixins"
                                        },
                                        "value": {
                                            "type": "ArrayExpression",
                                            "elements": [
                                                {
                                                    "type": "MemberExpression",
                                                    "computed": False,
                                                    "object": {
                                                        "type": "Identifier",
                                                        "name": "ABC"
                                                    },
                                                    "property": {
                                                        "type": "Identifier",
                                                        "name": "Observer"
                                                    }
                                                }
                                            ]
                                        },
                                        "kind": "init"
                                    },
                                    {
                                        "type": "Property",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "observed"
                                        },
                                        "value": {
                                            "type": "FunctionExpression",
                                            "id": None,
                                            "params": [],
                                            "defaults": [],
                                            "body": {
                                                "type": "BlockStatement",
                                                "body": [
                                                    {
                                                        "type": "ReturnStatement",
                                                        "argument": {
                                                            "type": "ArrayExpression",
                                                            "elements": [
                                                                {
                                                                    "type": "MemberExpression",
                                                                    "computed": False,
                                                                    "object": {
                                                                        "type": "MemberExpression",
                                                                        "computed": False,
                                                                        "object": {
                                                                            "type": "ThisExpression"
                                                                        },
                                                                        "property": {
                                                                            "type": "Identifier",
                                                                            "name": "props"
                                                                        }
                                                                    },
                                                                    "property": {
                                                                        "type": "Identifier",
                                                                        "name": "model"
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ]
                                            },
                                            "rest": None,
                                            "generator": False,
                                            "expression": False
                                        },
                                        "kind": "init"
                                    },
                                    {
                                        "type": "Property",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "getInitialState"
                                        },
                                        "value": {
                                            "type": "FunctionExpression",
                                            "id": None,
                                            "params": [],
                                            "defaults": [],
                                            "body": {
                                                "type": "BlockStatement",
                                                "body": [
                                                    {
                                                        "type": "ReturnStatement",
                                                        "argument": {
                                                            "type": "ObjectExpression",
                                                            "properties": [
                                                                {
                                                                    "type": "Property",
                                                                    "key": {
                                                                        "type": "Identifier",
                                                                        "name": "locationModel"
                                                                    },
                                                                    "value": {
                                                                        "type": "NewExpression",
                                                                        "callee": {
                                                                            "type": "Identifier",
                                                                            "name": "OrgIntakeLocationModel"
                                                                        },
                                                                        "arguments": [
                                                                            {
                                                                                "type": "CallExpression",
                                                                                "callee": {
                                                                                    "type": "MemberExpression",
                                                                                    "computed": False,
                                                                                    "object": {
                                                                                        "type": "Identifier",
                                                                                        "name": "_"
                                                                                    },
                                                                                    "property": {
                                                                                        "type": "Identifier",
                                                                                        "name": "extend"
                                                                                    }
                                                                                },
                                                                                "arguments": [
                                                                                    {
                                                                                        "type": "ObjectExpression",
                                                                                        "properties": [
                                                                                            {
                                                                                                "type": "Property",
                                                                                                "key": {
                                                                                                    "type": "Identifier",
                                                                                                    "name": "formModel"
                                                                                                },
                                                                                                "value": {
                                                                                                    "type": "MemberExpression",
                                                                                                    "computed": False,
                                                                                                    "object": {
                                                                                                        "type": "MemberExpression",
                                                                                                        "computed": False,
                                                                                                        "object": {
                                                                                                            "type": "ThisExpression"
                                                                                                        },
                                                                                                        "property": {
                                                                                                            "type": "Identifier",
                                                                                                            "name": "props"
                                                                                                        }
                                                                                                    },
                                                                                                    "property": {
                                                                                                        "type": "Identifier",
                                                                                                        "name": "model"
                                                                                                    }
                                                                                                },
                                                                                                "kind": "init"
                                                                                            }
                                                                                        ]
                                                                                    },
                                                                                    {
                                                                                        "type": "MemberExpression",
                                                                                        "computed": True,
                                                                                        "object": {
                                                                                            "type": "MemberExpression",
                                                                                            "computed": False,
                                                                                            "object": {
                                                                                                "type": "MemberExpression",
                                                                                                "computed": False,
                                                                                                "object": {
                                                                                                    "type": "MemberExpression",
                                                                                                    "computed": False,
                                                                                                    "object": {
                                                                                                        "type": "ThisExpression"
                                                                                                    },
                                                                                                    "property": {
                                                                                                        "type": "Identifier",
                                                                                                        "name": "props"
                                                                                                    }
                                                                                                },
                                                                                                "property": {
                                                                                                    "type": "Identifier",
                                                                                                    "name": "model"
                                                                                                }
                                                                                            },
                                                                                            "property": {
                                                                                                "type": "Identifier",
                                                                                                "name": "_fieldValues"
                                                                                            }
                                                                                        },
                                                                                        "property": {
                                                                                            "type": "Literal",
                                                                                            "value": "address",
                                                                                            "raw": "'address'"
                                                                                        }
                                                                                    }
                                                                                ]
                                                                            }
                                                                        ]
                                                                    },
                                                                    "kind": "init"
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ]
                                            },
                                            "rest": None,
                                            "generator": False,
                                            "expression": False
                                        },
                                        "kind": "init"
                                    },
                                    {
                                        "type": "Property",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "render"
                                        },
                                        "value": {
                                            "type": "FunctionExpression",
                                            "id": None,
                                            "params": [],
                                            "defaults": [],
                                            "body": {
                                                "type": "BlockStatement",
                                                "body": [
                                                    {
                                                        "type": "ReturnStatement",
                                                        "argument": {
                                                            "type": "CallExpression",
                                                            "callee": {
                                                                "type": "MemberExpression",
                                                                "computed": False,
                                                                "object": {
                                                                    "type": "MemberExpression",
                                                                    "computed": False,
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
                                                                    "name": "div"
                                                                }
                                                            },
                                                            "arguments": [
                                                                {
                                                                    "type": "Literal",
                                                                    "value": None,
                                                                    "raw": "null"
                                                                },
                                                                {
                                                                    "type": "CallExpression",
                                                                    "callee": {
                                                                        "type": "Identifier",
                                                                        "name": "OrgIntakeForm"
                                                                    },
                                                                    "arguments": [
                                                                        {
                                                                            "type": "ObjectExpression",
                                                                            "properties": [
                                                                                {
                                                                                    "type": "Property",
                                                                                    "key": {
                                                                                        "type": "Identifier",
                                                                                        "name": "model"
                                                                                    },
                                                                                    "value": {
                                                                                        "type": "MemberExpression",
                                                                                        "computed": False,
                                                                                        "object": {
                                                                                            "type": "MemberExpression",
                                                                                            "computed": False,
                                                                                            "object": {
                                                                                                "type": "ThisExpression"
                                                                                            },
                                                                                            "property": {
                                                                                                "type": "Identifier",
                                                                                                "name": "props"
                                                                                            }
                                                                                        },
                                                                                        "property": {
                                                                                            "type": "Identifier",
                                                                                            "name": "model"
                                                                                        }
                                                                                    },
                                                                                    "kind": "init"
                                                                                },
                                                                                {
                                                                                    "type": "Property",
                                                                                    "key": {
                                                                                        "type": "Identifier",
                                                                                        "name": "locationModel"
                                                                                    },
                                                                                    "value": {
                                                                                        "type": "MemberExpression",
                                                                                        "computed": False,
                                                                                        "object": {
                                                                                            "type": "MemberExpression",
                                                                                            "computed": False,
                                                                                            "object": {
                                                                                                "type": "ThisExpression"
                                                                                            },
                                                                                            "property": {
                                                                                                "type": "Identifier",
                                                                                                "name": "state"
                                                                                            }
                                                                                        },
                                                                                        "property": {
                                                                                            "type": "Identifier",
                                                                                            "name": "locationModel"
                                                                                        }
                                                                                    },
                                                                                    "kind": "init"
                                                                                },
                                                                                {
                                                                                    "type": "Property",
                                                                                    "key": {
                                                                                        "type": "Identifier",
                                                                                        "name": "missionEditorConfiguration"
                                                                                    },
                                                                                    "value": {
                                                                                        "type": "MemberExpression",
                                                                                        "computed": False,
                                                                                        "object": {
                                                                                            "type": "MemberExpression",
                                                                                            "computed": False,
                                                                                            "object": {
                                                                                                "type": "ThisExpression"
                                                                                            },
                                                                                            "property": {
                                                                                                "type": "Identifier",
                                                                                                "name": "props"
                                                                                            }
                                                                                        },
                                                                                        "property": {
                                                                                            "type": "Identifier",
                                                                                            "name": "missionEditorConfiguration"
                                                                                        }
                                                                                    },
                                                                                    "kind": "init"
                                                                                },
                                                                                {
                                                                                    "type": "Property",
                                                                                    "key": {
                                                                                        "type": "Identifier",
                                                                                        "name": "missionEditorStylesheet"
                                                                                    },
                                                                                    "value": {
                                                                                        "type": "MemberExpression",
                                                                                        "computed": False,
                                                                                        "object": {
                                                                                            "type": "MemberExpression",
                                                                                            "computed": False,
                                                                                            "object": {
                                                                                                "type": "ThisExpression"
                                                                                            },
                                                                                            "property": {
                                                                                                "type": "Identifier",
                                                                                                "name": "props"
                                                                                            }
                                                                                        },
                                                                                        "property": {
                                                                                            "type": "Identifier",
                                                                                            "name": "missionEditorStylesheet"
                                                                                        }
                                                                                    },
                                                                                    "kind": "init"
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    "type": "CallExpression",
                                                                    "callee": {
                                                                        "type": "Identifier",
                                                                        "name": "OrgIntakePricing"
                                                                    },
                                                                    "arguments": [
                                                                        {
                                                                            "type": "ObjectExpression",
                                                                            "properties": [
                                                                                {
                                                                                    "type": "Property",
                                                                                    "key": {
                                                                                        "type": "Identifier",
                                                                                        "name": "model"
                                                                                    },
                                                                                    "value": {
                                                                                        "type": "MemberExpression",
                                                                                        "computed": False,
                                                                                        "object": {
                                                                                            "type": "MemberExpression",
                                                                                            "computed": False,
                                                                                            "object": {
                                                                                                "type": "ThisExpression"
                                                                                            },
                                                                                            "property": {
                                                                                                "type": "Identifier",
                                                                                                "name": "props"
                                                                                            }
                                                                                        },
                                                                                        "property": {
                                                                                            "type": "Identifier",
                                                                                            "name": "model"
                                                                                        }
                                                                                    },
                                                                                    "kind": "init"
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ]
                                            },
                                            "rest": None,
                                            "generator": False,
                                            "expression": False
                                        },
                                        "kind": "init"
                                    }
                                ]
                            }
                        ]
                    }
                }
            ],
            "kind": "var"
        },
        {
            "type": "VariableDeclaration",
            "declarations": [
                {
                    "type": "VariableDeclarator",
                    "id": {
                        "type": "Identifier",
                        "name": "OrgIntake"
                    },
                    "init": {
                        "type": "ObjectExpression",
                        "properties": [
                            {
                                "type": "Property",
                                "key": {
                                    "type": "Identifier",
                                    "name": "domReady"
                                },
                                "value": {
                                    "type": "FunctionExpression",
                                    "id": None,
                                    "params": [],
                                    "defaults": [],
                                    "body": {
                                        "type": "BlockStatement",
                                        "body": [
                                            {
                                                "type": "IfStatement",
                                                "test": {
                                                    "type": "LogicalExpression",
                                                    "operator": "&&",
                                                    "left": {
                                                        "type": "UnaryExpression",
                                                        "operator": "!",
                                                        "argument": {
                                                            "type": "MemberExpression",
                                                            "computed": False,
                                                            "object": {
                                                                "type": "Identifier",
                                                                "name": "Session"
                                                            },
                                                            "property": {
                                                                "type": "Identifier",
                                                                "name": "authed"
                                                            }
                                                        },
                                                        "prefix": True
                                                    },
                                                    "right": {
                                                        "type": "MemberExpression",
                                                        "computed": False,
                                                        "object": {
                                                            "type": "CallExpression",
                                                            "callee": {
                                                                "type": "Identifier",
                                                                "name": "$"
                                                            },
                                                            "arguments": [
                                                                {
                                                                    "type": "Literal",
                                                                    "value": "[data-sherpa=org-intake]",
                                                                    "raw": "'[data-sherpa=org-intake]'"
                                                                }
                                                            ]
                                                        },
                                                        "property": {
                                                            "type": "Identifier",
                                                            "name": "length"
                                                        }
                                                    }
                                                },
                                                "consequent": {
                                                    "type": "BlockStatement",
                                                    "body": [
                                                        {
                                                            "type": "ExpressionStatement",
                                                            "expression": {
                                                                "type": "CallExpression",
                                                                "callee": {
                                                                    "type": "MemberExpression",
                                                                    "computed": False,
                                                                    "object": {
                                                                        "type": "Identifier",
                                                                        "name": "FormSherpa"
                                                                    },
                                                                    "property": {
                                                                        "type": "Identifier",
                                                                        "name": "present"
                                                                    }
                                                                },
                                                                "arguments": [
                                                                    {
                                                                        "type": "Literal",
                                                                        "value": "org-intake",
                                                                        "raw": "'org-intake'"
                                                                    },
                                                                    {
                                                                        "type": "CallExpression",
                                                                        "callee": {
                                                                            "type": "Identifier",
                                                                            "name": "$"
                                                                        },
                                                                        "arguments": [
                                                                            {
                                                                                "type": "Literal",
                                                                                "value": "[data-sherpa=org-intake]",
                                                                                "raw": "'[data-sherpa=org-intake]'"
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        "type": "ObjectExpression",
                                                                        "properties": [
                                                                            {
                                                                                "type": "Property",
                                                                                "key": {
                                                                                    "type": "Identifier",
                                                                                    "name": "modal"
                                                                                },
                                                                                "value": {
                                                                                    "type": "Literal",
                                                                                    "value": False,
                                                                                    "raw": "False"
                                                                                },
                                                                                "kind": "init"
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            }
                                                        }
                                                    ]
                                                },
                                                "alternate": None
                                            }
                                        ]
                                    },
                                    "rest": None,
                                    "generator": False,
                                    "expression": False
                                },
                                "kind": "init"
                            }
                        ]
                    }
                }
            ],
            "kind": "var"
        },
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "CallExpression",
                "callee": {
                    "type": "MemberExpression",
                    "computed": False,
                    "object": {
                        "type": "CallExpression",
                        "callee": {
                            "type": "Identifier",
                            "name": "$"
                        },
                        "arguments": [
                            {
                                "type": "Identifier",
                                "name": "document"
                            }
                        ]
                    },
                    "property": {
                        "type": "Identifier",
                        "name": "ready"
                    }
                },
                "arguments": [
                    {
                        "type": "FunctionExpression",
                        "id": None,
                        "params": [],
                        "defaults": [],
                        "body": {
                            "type": "BlockStatement",
                            "body": [
                                {
                                    "type": "IfStatement",
                                    "test": {
                                        "type": "CallExpression",
                                        "callee": {
                                            "type": "MemberExpression",
                                            "computed": False,
                                            "object": {
                                                "type": "Identifier",
                                                "name": "document"
                                            },
                                            "property": {
                                                "type": "Identifier",
                                                "name": "getElementById"
                                            }
                                        },
                                        "arguments": [
                                            {
                                                "type": "Literal",
                                                "value": "org-intake-component",
                                                "raw": "'org-intake-component'"
                                            }
                                        ]
                                    },
                                    "consequent": {
                                        "type": "BlockStatement",
                                        "body": [
                                            {
                                                "type": "ExpressionStatement",
                                                "expression": {
                                                    "type": "CallExpression",
                                                    "callee": {
                                                        "type": "MemberExpression",
                                                        "computed": False,
                                                        "object": {
                                                            "type": "Identifier",
                                                            "name": "OrgIntake"
                                                        },
                                                        "property": {
                                                            "type": "Identifier",
                                                            "name": "domReady"
                                                        }
                                                    },
                                                    "arguments": []
                                                }
                                            }
                                        ]
                                    },
                                    "alternate": None
                                }
                            ]
                        },
                        "rest": None,
                        "generator": False,
                        "expression": False
                    }
                ]
            }
        }
    ]
}


def objects_in_tree(tree):
    iterable = tree.values() if hasattr(tree, 'values') else tree
    if not hasattr(iterable, '__iter__'): return
    for child in iterable:
        if isinstance(child, dict):
            yield child
        if not isinstance(child, str):
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
    'value': lambda v: isinstance(v, str)
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


class Struct(object):
    def __init__(self, entries):
        self.__dict__.update(entries)


def immediate_subexpressions(expression):
    e = Struct(expression)
    type = e.type
    if type in ('ThisExpression', 'FunctionExpression', 'ArrowExpression', 'GraphExpression', 'GraphIndexExpression', 'Literal', 'Identifier'):
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
        return [e.callee] + e.arguments
    elif type == 'MemberExpression':
        return [e.object, e.property] if e.computed else [e.object]
    elif type == 'YieldExpression':
        return [e.argument] if e.argument else []
    elif type in ('ComprehensionExpression', 'GeneratorExpression'):
        return [e.body] + [block.right for block in e.blocks] + ([e.filter] if e.filter else [])
    elif type == 'LetExpression':
        return sum([[head.init] if head.init else [] for head in e.head], [e.body])


# def immediate_subexpressions(expression):
#     e = Struct(expression)
#     type = e.type
#     if type in ('ThisExpression', 'FunctionExpression', 'ArrowExpression', 'GraphExpression', 'GraphIndexExpression', 'Literal', 'Identifier'):
#         return []
#     elif type == 'ArrayExpression':
#         return []
#     elif type == 'ObjectExpression':
#         return []
#     elif type == 'SequenceExpression':
#         return []
#     elif type in ('UnaryExpression', 'UpdateExpression'):
#         return []
#     elif type in ('BinaryExpression', 'AssignmentExpression', 'LogicalExpression'):
#         return []
#     elif type == 'ConditionalExpression':
#         return []
#     elif type in ('NewExpression', 'CallExpression'):
#         return e.arguments[1:]
#     elif type == 'MemberExpression':
#         return []
#     elif type == 'YieldExpression':
#         return []
#     elif type in ('ComprehensionExpression', 'GeneratorExpression'):
#         return []
#     elif type == 'LetExpression':
#         return []



from pprint import pprint

# for message_expression in message_expressions_in_tree(program):
#     pprint([x['value'] for x in string_literals_in_tree(message_expression)])

# print "------"

def contains_string_literals(expression):
    return any(is_string_literal(e) for e in objects_in_tree(expression))

def print_type_tree(expression, depth=0):
    print "\t"*depth, expression['type']
    for subexpr in immediate_subexpressions(expression):
        print_type_tree(subexpr, depth+1)

# def type_tree(expression, depth=0):
#     indent = "\n" + "\t"*depth
#     return expression['type'] + indent + indent.join(
#         type_tree(subexpr, depth+1) for subexpr in immediate_subexpressions(expression)
#         )

def type_tree(expression, depth=0):
    yield "    "*depth + expression['type']
    for subexpr in immediate_subexpressions(expression):
        for x in type_tree(subexpr, depth+1): yield x

def expanded_babel_message_for_expression(expression, count=None, depth=1):
    if count is None:
        count = itertools.count()
    if is_string_literal(expression):
        return expression['value']
    # elif not contains_string_literals(expression):
    #     return "[%s:]" % next(count)
    else:
        indent = "\n" + "    "*depth
        subs = [expanded_babel_message_for_expression(subexpr, count, depth+1) for subexpr in immediate_subexpressions(expression)]
        first_indent = indent if len(subs) else ""
        braces = "[]" if contains_string_literals(expression) else "<>"
        return "%s%s:%s%s%s" % (braces[0], next(count), first_indent, indent.join(subs), braces[1])

def babel_message_for_expression(expression, count=None, depth=1):
    if count is None:
        count = itertools.count()
    print expression['type'], expression.get('value'), count
    if is_string_literal(expression):
        return expression['value']
    # elif not contains_string_literals(expression):
    #     return "[%s:]" % next(count)
    else:
        subs = [babel_message_for_expression(subexpr, count, depth+1) for subexpr in immediate_subexpressions(expression)]
        return "[%s:%s]" % (next(count), "".join(subs))


output = Struct({'babel':[], 'type': []})
# for message_expression in message_expressions_in_tree(program):

expr = list(message_expressions_in_tree(program))[-1]['arguments'][0]
output.babel = expanded_babel_message_for_expression(expr).split('\n')
output.type = list(type_tree(expr))
    # print expanded_babel_message_for_expression(message_expression['arguments'][0])
    # print_type_tree(message_expression['arguments'][0])

data = list(zip(*output.__dict__.values()))
padding = 2
col_width = max(len(word) for row in data for word in row) + padding
for row in data:
    print "".join(word.ljust(col_width) for word in row)

print babel_message_for_expression(expr)

# print "\n".join(output.type)
# print_type_tree(expr)

# print "\n".join(output.babel)
# print "\n".join(output.type)