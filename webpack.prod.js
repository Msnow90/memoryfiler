'use strict';

var webpack = require('webpack');

module.exports = {
    mode: 'production',
    entry: './app/main.js',
    output: {
        path: __dirname,
        filename: './public/bundle.js'
    },
    context: __dirname,
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            }
        ]
    }
};
