var webpack = require('webpack');
require("babel/register");


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
            { test: /\.jsx$/, exclude: /(components|messages)\.jsx/, loaders: ['babel', 'jsxlate-loader'] },
            { test: /(components|messages)\.jsx$/, loaders: ['babel']}
        ]
    }
}