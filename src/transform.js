import {isElementMarker, isFunctionMarker} from './ast';
import transformation from './transformation';


module.exports = function() {
    return {
        visitor: {
            CallExpression: {
                enter: function(path) {
                    const {node} = path;
                    if (isFunctionMarker(node)) {
                        path.replaceWith(transformation.transformFunctionMarker(node));
                    }
                }
            },
            JSXElement: {
                enter: function(path) {
                    const {node} = path;
                    if (isElementMarker(node) && transformation.needsTransformation(node)) {
                        path.replaceWith(transformation.transformElementMarker(node));
                    }
                }
            }
        }
    };
};
