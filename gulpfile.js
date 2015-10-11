import gulp from 'gulp';
import eslint from 'gulp-eslint';
import babel from 'gulp-babel';

import './deploy/azure-tasks';

gulp.task('lint', () =>
  gulp.src(['gulpfile.js', 'src/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError()));

gulp.task('transform', () =>
  gulp.src('src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist')));

gulp.task('build', ['lint', 'transform']);

gulp.task('deploy-azure', ['build', 'azure-tasks']);
