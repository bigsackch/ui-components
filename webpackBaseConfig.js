// @flow weak
const webpack = require('webpack');
const path = require('path');

module.exports = {
    context: path.resolve(__dirname),
    entry: ['./src/index.js'],
    plugins: [],
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    cacheDirectory: true,
                },
            },
              {
                  loader: "url-loader",
                  test: /\.svg$/,
                  options: {
                      limit: 8192,
                      fallback: "file-loader",
                      publicPath: `./static/images/`,
                      outputPath: `./lib/static/images/`,
                      name: "[name]-[hash].[ext]"
                  }
              },
        ],
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        "react-addons-create-fragment": "createFragment",
        "react-addons-pure-render-mixin": "PureRenderMixin",
        "react-addons-transition-group": "TransitionGroup",
        "react-addons-update": "React.addons.update"
    }
};