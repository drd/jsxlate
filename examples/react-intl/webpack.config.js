var webpack = require('webpack');
require("babel/register");


module.exports = {
    entry: {
        app: [
            './app.jsx',
            'webpack-dev-server/client?http://localhost:3002',
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
        new webpack.HotModuleReplacementPlugin(),
        // the React Intl locale modules expect a global ReactIntl
        new webpack.ProvidePlugin({
            'ReactIntl': 'react-intl'
        })
    ],
    resolve: {
        // Allow to omit extensions when requiring these files
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loaders: ['babel'] },
            // Pass *.jsx files through jsx-loader transform
            { test: /\.jsx$/, exclude: /(components|messages)\.jsx/, loaders: ['react-hot', 'babel', 'jsxlate-loader'] },
            { test: /(components|messages)\.jsx$/, loaders: ['react-hot', 'babel']}
        ]
    }
}