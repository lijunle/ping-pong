import gulp from 'gulp';
import eslint from 'gulp-eslint';
import babel from 'gulp-babel';

gulp.task('lint', () =>
  gulp.src(['gulpfile.js', 'src/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError()));

gulp.task('transform', () =>
  gulp.src('src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist')));

gulp.task('default', ['lint', 'transform']);
