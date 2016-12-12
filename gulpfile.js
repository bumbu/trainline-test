// Sort alphabetically
const autoprefixer = require('gulp-autoprefixer')
const gulp = require('gulp')
const livereload = require('gulp-livereload')
const plumber = require('gulp-plumber')
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')
const webpackStream = require('webpack-stream')

const PATHS = {
  SRC: 'src',
  SITE: '_site',
  CSS: {
    SRC: 'src/css/',
    DIST: 'public/css/',
  },
  JS: {
    SRC: 'src/js/',
    DIST: 'public/js/',
  },
}

/**
 * Styles
 */

gulp.task('dev:styles', function() {
  return gulp.src(PATHS.CSS.SRC + 'main.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(PATHS.CSS.DIST))
    .pipe(livereload());
})

gulp.task('build:styles', function() {
  return gulp.src(PATHS.CSS.SRC + 'main.scss')
    .pipe(plumber())
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer({browsers: ['last 2 versions', 'ie >= 10']}))
    .pipe(gulp.dest(PATHS.CSS.DIST))
})

/**
 * Scripts
 */

gulp.task('dev:scripts', function() {
  return gulp.src(PATHS.JS.SRC + 'index.js')
    .pipe(webpackStream({
      devtool: 'inline-source-map',
      output: {
        filename: 'index.js',
      },
      module: {
        loaders: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            include: __dirname,
            query: {
              presets: ["react", "es2015"],
            }
          }
        ]
      },
    }))
    .on('error', function handleError() {
      this.emit('end'); // Recover from errors
    })
    .pipe(gulp.dest(PATHS.JS.DIST))
})

gulp.task('build:scripts', function() {
  return gulp.src(PATHS.JS.SRC + 'index.js')
    .pipe(webpackStream({
      output: {
        filename: 'index.js',
      },
      module: {
        loaders: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            include: __dirname,
            query: {
              presets: ["react", "es2015"],
            }
          }
        ]
      },
      plugins: [
        new webpackStream.webpack.optimize.UglifyJsPlugin({
          compress: {
              warnings: false
          }
        })
      ]
    }))
    .pipe(gulp.dest(PATHS.JS.DIST))
})

/**
 * Server
 */

gulp.task('dev:server', function() {
  const server = require('./server/index')
})

/**
 * Watch
 */

gulp.task('dev:watch', function() {
  livereload.listen();
  gulp.watch([PATHS.CSS.SRC + '**/*.scss'], ['dev:styles']);
  gulp.watch([PATHS.JS.SRC + '**/*.js'], ['dev:scripts']);
})

gulp.task('default', ['dev:styles', 'dev:scripts', 'dev:server', 'dev:watch'])
gulp.task('build', ['build:styles', 'build:scripts'])
