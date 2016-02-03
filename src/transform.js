const ast = require('./ast');
import transformation from './transformation';


module.exports = function({types: t}) {
    return {
        visitor: {
            JSXElement: {
                enter: function(path) {
                    const {node} = path;
                    if (ast.isElementMarker(node) && transformation.needsTransformation(node)) {
                        path.replaceWith(transformation.transformElementMarker(node));
                    }
                }
            }
        }
    };
};
