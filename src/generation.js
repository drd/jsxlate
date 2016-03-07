import babelGenerator from 'babel-generator';


export default function generate(ast, opts, code) {
    opts = Object.assign({comments: false}, opts);
    return babelGenerator(ast, opts, code).code;
}
