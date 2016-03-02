'use strict';

var _transformation = require('./transformation');

var _transformation2 = _interopRequireDefault(_transformation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ast = require('./ast');

module.exports = function () {
    return {
        visitor: {
            JSXElement: {
                enter: function enter(path) {
                    var node = path.node;

                    if (ast.isElementMarker(node) && _transformation2.default.needsTransformation(node)) {
                        path.replaceWith(_transformation2.default.transformElementMarker(node));
                    }
                }
            }
        }
    };
};

