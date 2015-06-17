// Load plugins

var gulp = require('gulp'),
    //gutil = require('gulp-util'),
    watch = require('gulp-watch'),
    lr    = require('tiny-lr'),
    server = lr(),
    livereload = require('gulp-livereload'),
    prefix = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-minify-css'),
    sass = require('gulp-ruby-sass'),
    imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify');

// Task to minify all css files in the css directory
gulp.task('minify-css', function(){
  gulp.src('./static/*.css')
    .pipe(minifyCSS({keepSpecialComments: 0}))
    .pipe(gulp.dest('./static/'));
});

gulp.task('minify-js', function(){
  return gulp.src('./_scripts/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./static/'))
        .pipe(uglify())
        .pipe(rename('all.min.js'))
        .pipe(gulp.dest('./static/'));
});

// Reload html
gulp.task('reload', function(){
  gulp.src('*.html')
    .pipe(watch(function(files) {
      return files.pipe(livereload(server));
    }));
});

// Task to optmize and minify images
gulp.task('minify-img', function() {
  return gulp.src('./static/images/*')
    .pipe((imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest('./static/images/'));
});


// Task that compiles scss files down to good old css
gulp.task('pre-process', function(){
  gulp.src('./_sass/style.scss')
      .pipe(watch(function(files) {
        return files.pipe(sass({loadPath: ['./_sass/'], style: "compact"}))
          .pipe(prefix())
          .pipe(gulp.dest('./static/'))
          .pipe(livereload(server));
      }));
});

/*
   DEFAULT TASK

 • Process sass and lints outputted css
 • Outputted css is run through autoprefixer
 • Sends updates to any files in directory to browser for
   automatic reloading

*/
gulp.task('default', function(){
  server.listen(35729, function (err) {
    gulp.watch(['*.html', '*/*.html', './_sass/*.scss','./_scripts/*.js'], function(event) {
      gulp.run('pre-process', 'minify-js', 'reload');
    });
  });
});

gulp.task('production', function(){
    gulp.run('minify-css','minify-img');
});

