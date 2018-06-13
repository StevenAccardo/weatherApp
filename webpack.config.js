//Webpack 4

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = {
  entry: {
    main: './src/index.js'
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'src/js/[name].[chunkhash].js'
  },
  devServer: {
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(s*)css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.(woff(2)?|ttf|eot)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[hash].[ext]',
            outputPath: 'assets/fonts/',
            publicPath: 'assets/fonts/'
          }
        }
      },
      {
        test: /\.pdf$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[hash].[ext]',
            outputPath: 'assets/docs/',
            publicPath: 'assets/docs/'
          }
        }
      },
      {
        test: /\.(mp3|wav|wma|ogg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[hash].[ext]',
            outputPath: 'assets/audio/',
            publicPath: 'assets/audio/'
          }
        }
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 40000,
              name: '[name].[hash].[ext]',
              outputPath: 'assets/images/',
              publicPath: 'assets/images/'
            }
          },
          'image-webpack-loader'
        ]
      },
      {
        test: /\.(mp4|webm)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[hash].[ext]',
            outputPath: 'assets/videos/',
            publicPath: 'assets/videos/'
          }
        }
      }
    ]
  },
  plugins: [
    new FaviconsWebpackPlugin('./assets/images/favicon.png'),
    new CleanWebpackPlugin('dist', {}),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/index.html',
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.[contenthash].css'
    })
  ]
};
