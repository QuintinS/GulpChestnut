/* File: gulpfile.js */

/* ========== Paths ========== */

var

    projectName = "cardtricks",
    projectSrcSCSS = './_source/scss/**/*.{scss,sass}',
    projectSrcJS = './_source/js/**/*.js',
    projectDestJS = './dist/js',
    projectDestCSS = './dist/css',

    demoSrcSCSS = './demo/_source/scss/**/*.{scss,sass}',
    demoSrcJS = './demo/_source/js/**/*.js',
    demoSrcLibs = './demo/_source/js/libs/*js',
    demoDestJS = './demo/js',
    demoDestCSS = './demo/css',


/* ========== Modules ========== */

    // Gulp
    gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    gutil = require('gulp-util'),

    // SCSS
    sass = require('gulp-sass'),
    uglifycss = require('gulp-uglifycss'),

    // Javascript


    // Post CSS
    postcss      = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),

    // Utilities
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    pump = require('pump'),
    projects = gulpLoadPlugins();

/* ========== Pipelines ========== */

// Javascript Libs Pipeline
gulp.task('projectLibs', function(done){

  gulp.src(
    'bower_components/jquery/dist/jquery.js',
    'bower_components/foundation-sites/js/*.js'
  )
  .pipe(plumber(errorHandler))
  .pipe(concat('libs.js'))
  .pipe(gulp.dest(projectDestJS))
  .pipe(rename('libs.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest(projectDestJS));
  done();

});

// Source Javascript Pipeline
gulp.task('projectJs', function(done){

  gulp.src(projectSrcJS)
  .pipe(plumber(errorHandler))
  .pipe(gulp.dest(projectDestJS))
  .pipe(sourcemaps.init())
    .pipe(concat(projectName + '.js'))
    .pipe(rename(projectName + '.min.js'))
    .pipe(uglify())
  .pipe(sourcemaps.write(""))
  .pipe(gulp.dest(projectDestJS))
  .pipe(projects.livereload());
  done();

});

// Source SCSS Pipeline
gulp.task('projectSass', function(done){

  var projectsPostCSS = [
    autoprefixer({browsers: ['last 1 version']})
  ];

  gulp.src(projectSrcSCSS)
    .pipe(plumber(errorHandler))
    .pipe(sourcemaps.init())
      .pipe(sass({
        errLogToConsole: true
      }))
      .pipe(postcss(projectsPostCSS))
      .pipe(gulp.dest(projectDestCSS))
      .pipe(concat(projectName + '.css'))
      .pipe(gulp.dest(projectDestCSS))
      .pipe(uglifycss())
      .pipe(rename(projectName + '.min.css'))
      .pipe(sourcemaps.write(""))
    .pipe(gulp.dest(projectDestCSS))
    .pipe(projects.livereload());
  done();


});


// Demo Libs Pipeline
gulp.task('demoLibs', function(done){

  gulp.src(
    'bower_components/jquery/dist/jquery.js',
    'bower_components/foundation-sites/js/*.js',
    'bower_components/highlightjs/highlight.pack.min.js'
  )
  .pipe(plumber(errorHandler))
  .pipe(gulp.dest(demoDestJS))
  .pipe(concat("demolibs.js"))
  .pipe(rename('demolibs.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest(demoDestJS));
  done();

});

// Demo Javascript Pipeline
gulp.task('demoJs', function(done){

  gulp.src(demoSrcJS)
  .pipe(plumber(errorHandler))
  .pipe(gulp.dest(demoDestJS))
  .pipe(sourcemaps.init())
    .pipe(concat('demo.js'))
    .pipe(rename('demo.min.js'))
    .pipe(uglify())
  .pipe(sourcemaps.write(""))
  .pipe(gulp.dest(demoDestJS))
  .pipe(projects.livereload());
  done();

});

// Demo SCSS Pipeline
gulp.task('demoSass', function(done){

  var demosPostCSS = [
    autoprefixer({browsers: ['last 1 version']})
  ];

  gulp.src(demoSrcSCSS)
    .pipe(plumber(errorHandler))
    .pipe(sourcemaps.init())
      .pipe(sass({
        errLogToConsole: true
      }))
      .pipe(postcss(demosPostCSS))
      .pipe(gulp.dest(demoDestCSS))
      .pipe(concat('demo.css'))
      .pipe(gulp.dest(demoDestCSS))
      .pipe(uglifycss())
      .pipe(rename('demo.min.css'))
      .pipe(sourcemaps.write(""))
    .pipe(gulp.dest(demoDestCSS))
    .pipe(projects.livereload());
  done();

});


/* ========== Watch ========== */

gulp.task('watch', function(done){

  projects.livereload.listen();

  gulp.watch(projectSrcSCSS, gulp.series('projectSass'));
  gulp.watch(projectSrcJS, gulp.series('projectJs'));

  gulp.watch(demoSrcSCSS, gulp.series('demoSass'));
  gulp.watch(demoSrcJS, gulp.series('demoJs'));

  done();

});

gulp.task('build', gulp.series(["demoLibs", "projectLibs"]) );

gulp.task('default', gulp.series(["watch"]));

function errorHandler(error) {
	gutil.log(
		gutil.colors.cyan('Plumber') + gutil.colors.red(' found unhandled error:\n'),
		error.toString()
	);
  gutil.beep();
}
