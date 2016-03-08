var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

var sourceDestination = './src/app/*.js';
var outputDestination = './dist/';

gulp.task('script-full', function () {
  return gulp.src(sourceDestination)
    .pipe(sourcemaps.init())
    .pipe(concat('s.js'))
    .pipe(sourcemaps.write('/'))
    .pipe(gulp.dest(outputDestination));
});

gulp.task('script-minified', function () {
  return gulp.src(sourceDestination)
    .pipe(sourcemaps.init())
    .pipe(concat('s.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('/'))
    .pipe(gulp.dest(outputDestination));
});

gulp.task('default', ['script-full', 'script-minified'], function () { });
