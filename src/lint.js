import {isElementMarker} from './ast';
import parsing from './parsing';


export default function findUntranslatedStrings(src) {
    const suspicious = [];

    const plugin = function lintPlugin() {
        return {
            visitor: {
                JSXText({node}) {
                    if (!this.inMarker && node.value.trim()) {
                        suspicious.push(node);
                    }
                },

                JSXElement: {
                    enter({node}) {
                        if (isElementMarker(node)) {
                            this.inMarker = true;
                        }
                    },

                    exit({node}) {
                        if (isElementMarker(node)) {
                            this.inMarker = false;
                        }
                    }
                }
            }
        };
    };

    parsing.transform(src, [plugin]);
    return suspicious;
}
