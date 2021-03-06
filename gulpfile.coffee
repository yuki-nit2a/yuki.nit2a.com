g           = require 'gulp'
gp          = require('gulp-load-plugins')()
browserSync = require 'browser-sync'
named       = require 'vinyl-named-with-path'
runSequence = require 'run-sequence'

g.task 'init', ->
  browserSync.init
    proxy:
      target: '127.0.0.1:8760'
  return

g.task 'reload', ->
  browserSync.reload '*'
  return

taskJs = (webpackConfigPath) ->
  g.src 'src/js/*.js'
    .pipe gp.plumber()
    .pipe named()
    .pipe gp.eslint()
    .pipe gp.eslint.format()
    .pipe gp.webpack require webpackConfigPath
    .pipe g.dest('public/js/')

g.task 'js-dev', ->
  taskJs './webpack.config.dev.coffee'

g.task 'js-prod', ->
  taskJs './webpack.config.prod.coffee'

g.task 'json', ->
  g.src 'src/json/**'
    .pipe gp.plumber()
    .pipe named()
    .pipe g.dest('public/json/')

g.task 'css', ->
  g.src 'src/css/**'
    .pipe gp.plumber()
    .pipe gp.stylus(
      use           : [
        require('nib')()
        require('rupture')()
      ]
      import        : ['nib']
      include       : ['bower_components']
      'include css' : true
      compress      : true
    )
    .pipe gp.csscomb()
    .pipe gp.pleeease(
      autoprefixer   : true
      browsers       : [
        'last 3 versions'
        '> 1%'
      ]
      filters        : true
      rem            : true
      pseudoElements : true
      opacity        : true
      minifier       : true
      mqpacker       : true
      sourcemaps     : false
      next           : false
    )
    .pipe g.dest('public/css/')

g.task 'img', ->
  g.src 'src/img/**'
    .pipe gp.plumber()
    #.pipe gp.imagemin(
    #  optimizationLevel : 7
    #  progressive       : true
    #  interlaced        : true
    #  multipass         : true
    #)
    .pipe g.dest('public/img/')

g.task 'font', ->
  g.src 'src/font/**'
    .pipe gp.plumber()
    .pipe g.dest('public/font/')

g.task 'compile-dev', ['js-dev', 'json', 'css', 'img', 'font']
g.task 'compile-prod', ['js-prod', 'json', 'css', 'img', 'font']

g.task 'default', ['init', 'compile-dev'], ->
  g.watch 'src/app/**', ->
    runSequence 'reload'

  g.watch 'src/js/**', ->
    runSequence 'js-dev', 'reload'

  g.watch 'src/json/**', ->
    runSequence 'json', 'reload'

  g.watch 'src/css/**', ->
    runSequence 'css', 'reload'

  g.watch 'src/img/**', ->
    runSequence 'img', 'reload'

  g.watch 'src/font/**', ->
    runSequence 'font', 'reload'
