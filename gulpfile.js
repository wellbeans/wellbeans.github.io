var gulp = require('gulp'),
    gutil = require('gulp-util'),
    stylus = require('gulp-stylus'),
    jeet = require('jeet'),
    rupture = require('rupture'),
    prefix = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    plumber = require('gulp-plumber');

var onError = function (err) {
  gutil.beep();
  console.log(err);
};

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: "./site"
    }
  });
});

gulp.task('stylus', function() {
  return gulp.src('site/css/style.styl')
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(stylus({
      use: [jeet(), rupture()]
    }))
    .pipe(gulp.dest('site/css/'))
    .pipe(reload({ stream: true }));
});

gulp.task('autoprefixer', ['stylus'], function () {
  return gulp.src('site/css/style.css')
    .pipe(prefix())
    .pipe(gulp.dest('site/css/'));
});

gulp.watch('site/css/**/*.styl', ['autoprefixer']);

gulp.task('default', ['autoprefixer', 'browser-sync']);
