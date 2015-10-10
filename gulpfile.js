import gulp from 'gulp';
import eslint from 'gulp-eslint';

gulp.task('lint', () =>
  gulp.src(['gulpfile.js', 'src/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError()));

gulp.task('default', ['lint']);
