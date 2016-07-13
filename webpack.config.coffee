webpack = require('gulp-webpack').webpack
BowerWebpackPlugin = require 'bower-webpack-plugin'

module.exports =
  output:
    filename: '[name].js'

  resolve:
    modulesDirectories: [
      'node_modules/'
      'bower_components/'
    ]
    extensions: [
      ''
      '.js'
      '.coffee'
    ]

  module:
    loaders: [
      {
        test   : /\.coffee$/
        loader : 'coffee'
      }
      {
        test   : /\.js$/
        loader : 'babel'
      }
      {
        test   : /\.css$/
        loader : 'style!css'
      }
      {
        test   : /\.(png|svg|gif|jpg)$/
        loader : 'raw!img'
      }
    ]

  plugins: [
    new BowerWebpackPlugin()

    new webpack.ProvidePlugin
      $               : 'jquery'
      jQuery          : 'jquery'
      'window.jQuery' : 'jquery'
      'root.jQuery'   : 'jquery'
      'p5'            : 'p5'

    #new webpack.SourceMapDevToolPlugin
    #  filename: '[name].js.map'
  ]
