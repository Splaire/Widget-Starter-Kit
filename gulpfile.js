var gulp          = require('gulp');
var del           = require('del');
var plumber       = require('gulp-plumber');
var jshint        = require('gulp-jshint');
var stylish       = require('jshint-stylish');
var livereload    = require('gulp-livereload');
var autoprefixer  = require('gulp-autoprefixer');
var sass          = require('gulp-sass');
var runSequence   = require('run-sequence');
var connect       = require('gulp-connect');
var open          = require('gulp-open');

var inlinesource  = require('gulp-inline-source');

var exec = require('child_process').exec,
    child;

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
  child = exec('ruby ./emulator.rb', function(err, stdout, stderr) {
    console.log(err, stdout, stderr);
  });
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
  del('./tmp', cb);
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
