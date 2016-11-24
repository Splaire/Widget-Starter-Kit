// Utils
const gulp          = require('gulp');
const runSequence   = require('run-sequence');
const connect       = require('gulp-connect');
const open          = require('gulp-open');
const exec          = require('child_process').exec;
const del           = require('del');
const plumber       = require('gulp-plumber');
const livereload    = require('gulp-livereload');

// HTML
const usemin        = require('gulp-usemin');
const minifyHtml    = require('gulp-minify-html');

// JS
const uglify        = require('gulp-uglify');
const jshint        = require('gulp-jshint');
const stylish       = require('jshint-stylish');

// CSS
const minifyCss     = require('gulp-minify-css');
const autoprefixer  = require('gulp-autoprefixer');
const sass          = require('gulp-sass');

var DEBUG = false;

const autoprefixerOpts = {
  browsers: ['Android >= 29', 'ChromeAndroid >= 29', 'Chrome >= 29', 'last 5 versions']
};

const sassOpts = {
  outputStyle: 'compressed'
};

gulp.task('default', ['build']);

gulp.task('develop', function(cb){
  DEBUG = true;
  runSequence('build', ['connect', 'watch'], 'open', cb);
});

gulp.task('build', function(cb){
  runSequence('clean', ['lint', 'usemin'], 'reload', cb);
});

gulp.task('open', function(){
  return gulp.src(__filename).pipe( open({uri: 'http://localhost:4567'}) );
});

gulp.task('usemin', function(){
  var jsTasks = DEBUG ? [] : [ uglify() ];
  var htmlTasks = DEBUG ? [] : [ minifyHtml() ];

  return gulp.src( './src/index.html')
    .pipe(usemin({
      enableHtmlComment: true,
      inlinecss: [ sass(sassOpts), autoprefixer(autoprefixerOpts), minifyCss() ],
      html: htmlTasks,
      inlinejs: jsTasks
    }))
    .pipe( gulp.dest('./dist') );
});

gulp.task('connect', function () {
  exec('ruby ./emulator.rb', (err, stdout, stderr) => console.log(err, stdout, stderr) );
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
  gulp.watch( ['./src/*.{html,js,css}'], ['build'] );
});
