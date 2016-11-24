const gulp          = require('gulp');
const del           = require('del');
const plumber       = require('gulp-plumber');
const jshint        = require('gulp-jshint');
const stylish       = require('jshint-stylish');
const livereload    = require('gulp-livereload');
const autoprefixer  = require('gulp-autoprefixer');
const sass          = require('gulp-sass');
const runSequence   = require('run-sequence');
const connect       = require('gulp-connect');
const open          = require('gulp-open');
const inlinesource  = require('gulp-inline-source');
const exec          = require('child_process').exec;

gulp.task('default', function(cb){
  runSequence('build', ['connect', 'watch'], 'open', cb);
});

gulp.task('build', function(cb){
  runSequence('clean', ['lint', 'styles'], 'inlinesource', 'reload', cb);
});

gulp.task('open', function(){
  return gulp.src(__filename).pipe( open({uri: 'http://localhost:4567'}) );
});

gulp.task('inlinesource', function () {
  return gulp.src('./src/index.html')
    .pipe( plumber() )
    .pipe( inlinesource() )
    .pipe(gulp.dest('./dist'));
});

gulp.task('connect', function () {
  exec('ruby ./emulator.rb', (err, stdout, stderr) => console.log(err, stdout, stderr) );
});

gulp.task('styles', function () {
  return gulp.src( './src/style.scss' )
    .pipe( plumber() )
    .pipe( sass() )
    .pipe( autoprefixer({
      browsers: ['Android >= 29','ChromeAndroid >= 29','Chrome >= 29'],
      cascade: false
    }))
    .pipe( gulp.dest( './tmp' ) );
});

gulp.task('clean', function (cb) {
  return del('./tmp', cb);
});

gulp.task('lint', function() {
  return gulp.src( './src/*.js' )
    .pipe( plumber() )
    .pipe( jshint() )
    .pipe( jshint.reporter(stylish) );
});

gulp.task('reload', function(){
  return livereload.reload();
});

gulp.task('watch', function(){
  livereload.listen();
  gulp.watch( ['./{src,tmp}/*.{html,js,css}'], ['build'] );
  gulp.watch( './src/style.scss', ['styles'] );
});
