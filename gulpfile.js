var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('default', function () {
  return gulp.src(['./project/src/sass/**/*.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('watch', function () {
  gulp.watch('./project/src/sass/**/*.scss', ['default']);
});