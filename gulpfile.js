// Sort alphabetically
const autoprefixer = require('gulp-autoprefixer')
const gulp = require('gulp')
const livereload = require('gulp-livereload')
const plumber = require('gulp-plumber')
const run = require('gulp-run')
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')

const PATHS = {
  SRC: 'src',
  SITE: '_site',
  CSS: {
    SRC: 'src/css/',
    DIST: 'public/css/',
  }
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
 * Server
 */

gulp.task('dev:server', function() {
  return run('node server/index.js').exec()
})

/**
 * Watch
 */

gulp.task('dev:watch', function() {
  livereload.listen();
  gulp.watch([PATHS.CSS.SRC + '**/*.scss'], ['dev:styles']);
})

gulp.task('default', ['dev:styles', 'dev:server', 'dev:watch'])
gulp.task('build', ['build:styles'])
