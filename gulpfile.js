var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin'),
    concat = require('gulp-concat'),
    less = require('gulp-less');

var paths = {
  modernizr: 'js/modernizr.custom.js',
  jquery: 'bower_components/jquery/dist/jquery.min.js',
  video: 'bower_components/video.js/dist/video-js/video.js',
  scripts: 'js/main.js',
  normalize: 'bower_components/normalize-css/normalize.css',
  less: 'less/*'
};

gulp.task('javascript', function () {
   gulp.src([
     paths.jquery,
     paths.modernizr,
     paths.video,
     paths.scripts
     ])
      .pipe(uglify())
      .pipe(concat('main.min.js'))
      .pipe(gulp.dest('js'))
});

gulp.task('less', function() {
  gulp.src([
    paths.normalize,
    paths.less
    ])
    .pipe(less())
    .pipe(cssmin())
    .pipe(concat('main.min.css'))
    .pipe(gulp.dest('css'));
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['javascript']);
  gulp.watch(paths.less, ['less']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch']);