const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development',

  entry: path.resolve(__dirname, './app/entry.js'),

  output: {
    filename: 'hopeUI.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'hopeUI',
    libraryTarget: 'umd',
  },

  devtool: 'eval-source-map',

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                'env', 'stage-0', 'react',
              ],
              plugins: ['transform-runtime'],
            },
          },
        ],
      }, {
        test: /\.(c|le)ss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 2,
                localIdentName: '[name]-[local]-[hash:base64:5]',
              },
            }, {
              loader: 'postcss-loader',
              options: {
                config: {
                  path: path.resolve(__dirname, './postcss.config.js'),
                },
              },
            }, 'less-loader',
          ],
        }),
      },
    ],
  },

  resolve: {
    alias: {
      hopeUI: path.resolve(__dirname, 'app/'),
    },
  },

  plugins: [
    new ExtractTextPlugin('hopeUI.css', { allChunks: true }),
    new HTMLWebpackPlugin({ template: './app/hopeUI.html' }),
    new webpack.HotModuleReplacementPlugin(),
  ],

  externals: {
    jQuery: '$',
    jquery: '$',
    react: 'React',
    'react-dom': 'ReactDOM',
  },

  devServer: {
    contentBase: path.resolve(__dirname),
    compress: false,
    port: 8868,
    hot: true,
    inline: true,
  },
};
