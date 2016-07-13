webpack = require('gulp-webpack').webpack
BowerWebpackPlugin = require 'bower-webpack-plugin'

module.exports =
  output:
    filename: '[name].js'

  resolve:
    root: [
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
        test: /\.coffee$/
        loader: 'coffee'
      }
      {
        test: /\.js$/
        loader: 'babel'
      }
      {
        test: /\.css$/
        loader: 'style!css'
      }
      {
        test: /\.(png|svg|gif|jpg)$/
        loader: 'raw!img'
      }
    ]

  plugins: [
    new BowerWebpackPlugin()

    new webpack.ProvidePlugin
      $: 'jquery'
      jQuery: 'jquery'
      'window.jQuery': 'jquery'
      'root.jQuery': 'jquery'

    new webpack.BannerPlugin(
      ''
    ,
      raw: false
      entryOnly: false
    )

    #new webpack.SourceMapDevToolPlugin
    #  filename: '[name].js.map'

    new webpack.optimize.CommonsChunkPlugin
      name: 'common'
      chunks: [
        'page'
      ]
    new webpack.optimize.CommonsChunkPlugin
      name: 'base'
      chunks: [
        'common'
      ]

    new webpack.optimize.OccurenceOrderPlugin()
    new webpack.optimize.DedupePlugin()
    new webpack.optimize.UglifyJsPlugin
      compress:
        warnings: false
    new webpack.optimize.AggressiveMergingPlugin()
  ]
