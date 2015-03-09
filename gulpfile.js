'use strict';

var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin'),
    concat = require('gulp-concat'),
    less = require('gulp-less'),
    livereload = require('gulp-livereload'),
    pxtorem = require('gulp-pxtorem'),
    http = require('http'),
    st = require('st');

var paths = {
  jquery: 'bower_components/jquery/dist/jquery.min.js',
  video: 'bower_components/video.js/dist/video-js/video.js',
  main_scripts: 'js/main.js',
  index_scripts: 'js/index-scripts.js',
  garage_scripts: 'js/garage-scripts.js',
  detect_mobile: 'js/detect-mobile.js',
  normalize: 'bower_components/normalize-css/normalize.css',
  less: 'less/main.less'
};

gulp.task('javascript', function () {
   gulp.src([
     paths.jquery,
     paths.video,
     paths.main_scripts,
     paths.detect_mobile
     ])
      .pipe(uglify())
      .pipe(concat('main.min.js'))
      .pipe(gulp.dest('js/build'))
      .pipe(livereload());

    gulp.src([
        paths.index_scripts
    ])
        .pipe(uglify())
        .pipe(concat('index-scripts.min.js'))
        .pipe(gulp.dest('js/build'));

    gulp.src([
        paths.garage_scripts
    ])
        .pipe(uglify())
        .pipe(concat('garage-scripts.min.js'))
        .pipe(gulp.dest('js/build'));
});

gulp.task('less', function() {
  gulp.src([
    paths.normalize,
    paths.less
    ])
    .pipe(less())
    .pipe(pxtorem())
    .pipe(cssmin())
    .pipe(concat('main.min.css'))
    .pipe(gulp.dest('css'))
    .pipe(livereload());
});

gulp.task('watch', ['server'], function() {
  livereload.listen();
  gulp.watch('js/*', ['javascript']);
  gulp.watch('less/*', ['less']);
});

gulp.task('server', function(done) {
  http.createServer(
    st({ path: __dirname, index: 'index.html', cache: false })
  ).listen(8080, done);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch']);
