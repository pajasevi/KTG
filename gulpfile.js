'use strict';

var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin'),
    concat = require('gulp-concat'),
    less = require('gulp-less'),
    livereload = require('gulp-livereload'),
    http = require('http'),
    st = require('st');

var paths = {
  jquery: 'bower_components/jquery/dist/jquery.min.js',
  video: 'bower_components/video.js/dist/video-js/video.js',
  scripts: 'js/main.js',
  normalize: 'bower_components/normalize-css/normalize.css',
  less: 'less/*'
};

gulp.task('javascript', function () {
   gulp.src([
     paths.jquery,
     paths.video,
     paths.scripts
     ])
      .pipe(uglify())
      .pipe(concat('main.min.js'))
      .pipe(gulp.dest('js'))
      .pipe(livereload());
});

gulp.task('less', function() {
  gulp.src([
    paths.normalize,
    paths.less
    ])
    .pipe(less())
    .pipe(cssmin())
    .pipe(concat('main.min.css'))
    .pipe(gulp.dest('css'))
    .pipe(livereload());
});

gulp.task('watch', ['server'], function() {
  livereload.listen();
  gulp.watch(paths.scripts, ['javascript']);
  gulp.watch(paths.less, ['less']);
});

gulp.task('server', function(done) {
  http.createServer(
    st({ path: __dirname, index: 'index.html', cache: false })
  ).listen(8080, done);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch']);