const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: '',
    libraryTarget: 'commonjs'
  },
  externals: [nodeExternals()],
  mode: 'development',
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader'
      }
    }, {
      loader: "url-loader",
      options: {
        limit: 8192,
        fallback: "file-loader",
        publicPath: `./static/images/`,
        outputPath: `./lib/static/images/`,
        name: "[name]-[hash].[ext]"
      }
    }]
  },
};
