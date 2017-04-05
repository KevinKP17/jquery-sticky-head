var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var minify = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');

var cssPath = 'assets/css';
var jsPath = 'assets/js';


// FOR DEVELOPMENT
gulp.task('css:watch', function(){
  return gulp.src( cssPath + '/*.scss')
          .pipe(watch( cssPath + '/*.scss'))
          .pipe(sass())
          .pipe(gulp.dest( cssPath ));
});

gulp.task('css', function(){
  return gulp.src( cssPath + '/*.scss')
          .pipe(sass())
          .pipe(gulp.dest( cssPath ));
});


// FOR PRODUCTION
gulp.task('mini-js', function(){
  return gulp.src( jsPath+'/jq-sticky-head.js' )
          .pipe(uglify())
          .pipe(gulp.dest('dist'));
});

gulp.task('mini-css', function(){
  return gulp.src([cssPath + '/vendor/*.css' , cssPath + '/style.css'] )
          .pipe(concat('style.css'))
          .pipe(minify())
          .pipe(gulp.dest('dist'));
});

gulp.task('prod', ['mini-js', 'mini-css'], function(){});
