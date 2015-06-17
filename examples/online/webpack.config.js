var webpack = require('webpack');
require("babel/register");


module.exports = {
    entry: {
        app: [
            './app.jsx',
            'webpack-dev-server/client?http://localhost:3001',
            'webpack/hot/dev-server'
        ]
    },
    output: {
        filename: 'app.js',
        path: __dirname + '/out',
        publicPath: '/out'
    },
    devtool: 'eval',
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
        // Allow to omit extensions when requiring these files
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            // ugh, escodegen
            { test: /\.json$/, loaders: ['json-loader']},
            { test: /\.js$/, exclude: /node_modules/, loaders: ['babel?optional=runtime'] },
            // Pass *.jsx files through jsx-loader transform
            { test: /\.jsx$/, exclude: /(components|messages)\.jsx/, loaders: ['react-hot', 'babel?optional=runtime', 'jsxlate-loader'] },
            { test: /(components|messages)\.jsx$/, loaders: ['react-hot', 'babel']}
        ]
    }
}