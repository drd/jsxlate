var webpack = require('webpack');
require("babel/register");

var translator = require('../../jsx-translator');

module.exports = {
    entry: {
        app: './app.jsx'
    },
    output: {
        filename: 'app.js',
        path: __dirname + '/out',
        publicPath: '/js'
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
            { test: /\.js$/, exclude: /node_modules/, loaders: ['babel'] },
            // Pass *.jsx files through jsx-loader transform
            { test: /\.jsx$/, exclude: /(components|messages)\.jsx/, loaders: ['babel', '../../transform-loader'] },
            { test: /(components|messages)\.jsx$/, loaders: ['babel']}
        ]
    }
}