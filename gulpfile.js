/* File: gulpfile.js */

/* ========== Paths ========== */

var
    pluginSrcSCSS = './_source/scss/**/*.{scss,sass}',
    pluginSrcJS = './_source/js/**/*.js',
    pluginDestJS = './dist/js',
    pluginDestCSS = './dist/css',

    demoSrcSCSS = './demo/_source/scss/**/*.{scss,sass}',
    demoSrcJS = './demo/_source/js/**/*.js',
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
    plugins = gulpLoadPlugins();

/* ========== Pipelines ========== */

// Javascript Libs Pipeline
gulp.task('jsLibs', function(done){

  gulp.src(
    'bower_components/jquery/dist/jquery.js',
    'bower_components/foundation-sites/js/*.js'
  )
    .pipe(plumber(errorHandler))
    .pipe(concat('libs.js'))
    .pipe(gulp.dest(pluginDestJS))
    .pipe(rename('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(pluginDestJS));
  done();

});

// Plugin Soure Javascript Pipeline
gulp.task('pluginJs', function(done){

  gulp.src(pluginSrcJS)
    .pipe(plumber(errorHandler))
    // .pipe(concat('scripts.js'))
    .pipe(gulp.dest(pluginDestJS))
    // .pipe(rename('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(pluginDestJS))
    .pipe(plugins.livereload());
  done();

});

// Plugin Soure SCSS Pipeline
gulp.task('pluginSass', function(done){

  var pluginsPostCSS = [
    autoprefixer({browsers: ['last 1 version']})
  ];

  gulp.src(pluginSrcSCSS)
    .pipe(plumber(errorHandler))
    .pipe(sourcemaps.init())
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(postcss(pluginsPostCSS))
    .pipe(uglifycss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(pluginDestCSS))
    .pipe(plugins.livereload());
  done();

});



// Plugin Soure Javascript Pipeline
gulp.task('demoJs', function(done){

  gulp.src(demoSrcJS)
    .pipe(plumber(errorHandler))
    // .pipe(concat('scripts.js'))
    .pipe(gulp.dest(demoDestJS))
    // .pipe(rename('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(demoDestJS))
    .pipe(plugins.livereload());
  done();

});

// Plugin Soure SCSS Pipeline
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
    .pipe(uglifycss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(demoDestCSS))
    .pipe(plugins.livereload());
  done();

});


/* ========== Watch ========== */

gulp.task('default', function(done){

  plugins.livereload.listen();

  gulp.watch(pluginSrcSCSS, gulp.series('pluginSass'));
  gulp.watch(pluginSrcJS, gulp.series('pluginJs'));

  gulp.watch(demoSrcSCSS, gulp.series('demoSass'));
  gulp.watch(demoSrcJS, gulp.series('demoJs'));

  gulp.watch('./_source/js/libs/**/*.{js}', gulp.series('jsLibs'));

  done();

});


function errorHandler(error) {
	gutil.log(
		gutil.colors.cyan('Plumber') + gutil.colors.red(' found unhandled error:\n'),
		error.toString()
	);
  gutil.beep();
}
