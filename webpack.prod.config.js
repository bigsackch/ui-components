// @flow weak
/* eslint-disable import/no-unresolved */

const webpack = require('webpack');
const webpackBaseConfig = require('./webpackBaseConfig');
const path = require('path');

module.exports = Object.assign({}, webpackBaseConfig, {
module: Object.assign({}, webpackBaseConfig.module, {
    rules: webpackBaseConfig.module.rules.concat([
      {
        test: /\.(jpg|gif|png)$/,
        loader: 'file-loader',
      },
    ]),
  }),
  entry: webpackBaseConfig.entry,
output: {
    path: path.join(__dirname, './target/'),
    filename: 'eventum-ui.min.js',
    library: 'EventumUI',
    libraryTarget: "umd",
  },
  plugins: webpackBaseConfig.plugins.concat([
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
      },
      output: {
        comments: false,
      },
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ]),
});