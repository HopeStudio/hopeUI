const config = require('./webpack.config');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  mode: 'production',

  entry: path.resolve(__dirname, './app/index.js'),

  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'hopeUI',
    libraryTarget: 'umd',
  },

  module: config.module,

  plugins: [
    new ExtractTextPlugin('hopeUI.css', { allChunks: true }),
  ],
};
