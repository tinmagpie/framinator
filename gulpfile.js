'use strict';

// modules
var concat = require('gulp-concat');
var csso = require('gulp-csso');
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var prefix = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');

// configuration
var config = {
	src: {
		styles: ['src/css/base.scss','src/css/parts/*.scss'],
		scripts: ['src/js/base.js','src/js/parts/*.js']
	},
	dest: './build'
};

// styles
gulp.task('styles', function(){
	return gulp.src(config.src.styles)
		.pipe(concat('style.css'))
		.pipe(sass({
			errLogToConsole: true
		}))
		.pipe(prefix({
			browsers: ['last 3 versions','Safari 5.0','Firefox 3.6']
		}))
		.pipe(gulp.dest(config.dest))
		.pipe(csso())
		.pipe(rename('style.min.css'))
		.pipe(gulp.dest(config.dest));
});

// scripts
gulp.task('scripts', function () {
	return gulp.src(config.src.scripts)
		.pipe(concat('scripts.js'))
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(gulp.dest(config.dest))
		.pipe(uglify())
		.pipe(rename('scripts.min.js'))
		.pipe(gulp.dest(config.dest));
});

// watch
gulp.task('watch', function () {
	gulp.watch(config.src.scripts, ['scripts']);
	gulp.watch(config.src.styles, ['styles']);
});

// default
gulp.task('default',['styles','scripts']);


module.exports = gulp;
