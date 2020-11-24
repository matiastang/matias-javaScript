/*
 * @Author: tangdaoyong
 * @Date: 2020-11-24 17:04:01
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2020-11-24 17:10:28
 * @Description: file content
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
      app: './src/index.js'
  },
  plugins: [
    new CleanWebpackPlugin(),
     new HtmlWebpackPlugin({
       title: 'JavaScript学习',
     }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },

};