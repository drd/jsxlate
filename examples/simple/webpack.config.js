var webpack = require('webpack');

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
    resolveLoader: {
        // This is a bit nutty, but we set resolveLoader.root to the parent of
        // the entire jsxlate-loader directory, so it resolves
        // jsxlate-loader/index.js as the loader, allowing us to depend on the
        // module itself instead of npm inception
        root: __dirname + '/../../..'
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loaders: ['babel'] },
            // Pass *.jsx files through jsx-loader transform
            { test: /\.jsx$/, loaders: ['react-hot', 'babel'] },
        ]
    }
}
