var webpack = require('webpack');
require("babel/register");


module.exports = {
    entry: {
        app: [
            './app.jsx',
            'webpack-dev-server/client?http://localhost:3000',
            'webpack/hot/dev-server'
        ]
    },
    output: {
        filename: 'app.js',
        path: __dirname + '/out',
        publicPath: '/out'
    },
    devtool: 'source-map',
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
            { test: /\.jsx$/, exclude: /(components|messages)\.jsx/, loaders: ['react-hot', 'babel', 'jsxlate-loader'] },
            { test: /(components|messages)\.jsx$/, loaders: ['react-hot', 'babel']}
        ]
    }
}
