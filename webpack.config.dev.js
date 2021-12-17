// Copyright (c) 2017 PlanGrid, Inc.

const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const output = path.resolve(__dirname, './build');
const PORT = 8081;

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: {
    app: path.resolve(__dirname, './src/app.js'),
  },
  output: {
    path: output,
    filename: "[name].bundle.js",
    publicPath: '/',
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'example_files'), 'node_modules'],
    extensions: ['.js', '.json', '.jsx'],
  },
  watchOptions: {
    ignored: /node_modules/,
  },
  devServer: {
    static: output,
    port: PORT,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, './src'),
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: () => [
                  autoprefixer({
                    browsers: [
                      '>1%',
                      'last 4 versions',
                      'not ie < 9',
                    ],
                  }),
                ],
              }
            },
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
            }
          },
        ],
      },
      {
        test: [/\.wexbim$/, /\.jpg$/, /\.docx$/, /\.csv$/, /\.mp4$/, /\.xlsx$/, /\.doc$/, /\.avi$/, /\.webm$/, /\.mov$/, /\.mp3$/, /\.rtf$/, /\.pdf$/],
        loader: 'file-loader',
      },
      {
        test: /\.png$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, './index.html'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ESLintPlugin(),
  ],
};
