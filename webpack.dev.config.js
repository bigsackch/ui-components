// @flow weak
/* eslint-disable import/no-unresolved */

const webpack = require('webpack');
const webpackBaseConfig = require('./webpackBaseConfig');
const path = require('path');
module.exports = Object.assign({}, webpackBaseConfig, {
    cache: true,
    devtool: 'source-map',

    entry: webpackBaseConfig.entry,

    output: {
        path: path.join(__dirname, './target/'),
        filename: 'eventum-ui.js',
        library: 'EventumUI',
        libraryTarget: "umd",
    },

    module: Object.assign({}, webpackBaseConfig.module, {
        rules: webpackBaseConfig.module.rules.concat([{
            test: /\.(jpg|gif|png)$/,
            loader: 'file-loader',
        }, ]),
    }),
    plugins: webpackBaseConfig.plugins.concat([
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
    ]),
});