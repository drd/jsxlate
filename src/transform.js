import {isElementMarker} from './ast';
import transformation from './transformation';


module.exports = function() {
    return {
        visitor: {
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
