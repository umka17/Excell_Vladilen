/* eslint-disable arrow-parens */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development';
// const isProd = !isDev;

const filename = (ext) => isDev ? `bundle.${ext}`: `bundle.[hash].${ext}`;
const jsLoaders = () => {
  const loaders = [{
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env'],
      plugins: ['@babel/plugin-proposal-class-properties']
    },
  }];
  if (isDev) {
    loaders.push('eslint-loader');
  }
  return loaders;
};

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: ['@babel/polyfill', './index.js'],
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: isDev? 'source-map': false,
  devServer: {
    port: 9000,
    open: true,
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@core': path.resolve(__dirname, 'src/core'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    // new HtmlWebpackPlugin({
    //   template: './dashboard.html',
    //   filename: 'dashboard.html',
    // }),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/favicon.ico'),
          to: path.resolve(__dirname, 'docs'),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: '',
          },
        }, 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: '',
          },
        },
        'css-loader',
        'sass-loader',
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: jsLoaders(),
      },
    ],
  },
};
