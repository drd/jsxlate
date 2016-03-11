'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = findUntranslatedStrings;

var _ast = require('./ast');

var _generation = require('./generation');

var _generation2 = _interopRequireDefault(_generation);

var _parsing = require('./parsing');

var _parsing2 = _interopRequireDefault(_parsing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function findUntranslatedStrings(src) {
    var suspicious = [];

    var plugin = function lintPlugin() {
        return {
            visitor: {
                JSXText: function JSXText(_ref) {
                    var node = _ref.node;

                    if (!this.inMarker && node.value.trim()) {
                        suspicious.push(node);
                    }
                },


                JSXElement: {
                    enter: function enter(_ref2) {
                        var node = _ref2.node;

                        if ((0, _ast.isElementMarker)(node)) {
                            this.inMarker = true;
                        }
                    },
                    exit: function exit(_ref3) {
                        var node = _ref3.node;

                        if ((0, _ast.isElementMarker)(node)) {
                            this.inMarker = false;
                        }
                    }
                }
            }
        };
    };

    _parsing2.default.transform(src, [plugin]);
    return suspicious;
}

