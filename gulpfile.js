var gulp = require("gulp");
var sass = require("gulp-sass");
var cleanCSS = require("gulp-clean-css");
var connect = require("gulp-connect");
var babel = require("gulp-babel");
var sourcemap = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require("gulp-uglify");
var imagemin = require("gulp-imagemin");

function processHTML() {
	return gulp.src("src/html/**/*.html")
		.pipe(gulp.dest("dist/"))
		.pipe(connect.reload());
}

function processJS() {
	return gulp.src("src/js/**/*.js")
		.pipe(sourcemap.init())
		.pipe(babel({
			presets: ["@babel/env"]
		}))
        .pipe(concat("app.js"))
        .pipe(sourcemap.write("."))
		.pipe(uglify())
		.pipe(gulp.dest("dist/assets/js/"))
		.pipe(connect.reload());
}

function processSass() {
	return gulp.src("src/sass/**/*.scss")
		.pipe(sourcemap.init())
		.pipe(sass())
		.pipe(cleanCSS({ compatibility: "ie9" }))
        .pipe(sourcemap.write("."))
		.pipe(gulp.dest("dist/assets/css/"))
		.pipe(connect.reload());
}


function processImages() {
	// var filetypes = ["jpg", "jpeg", "png", "gif"];
	// return gulp.src(["src/images/**/*.{" + filetypes.join(",") + "}"])
	// return gulp.src(["src/images/**/*.{jpg,jpeg,png,gif}"])
	return gulp.src(["src/images/**/*.*", "!src/images/resized/**/*.*", "!src/images/**/thumb.db"])
		.pipe(imagemin([
			imagemin.mozjpeg({quality: 25, progressive: true}),
			imagemin.optipng({optimizationLevel: 1})
		]))
		.pipe(gulp.dest("dist/assets/images/"))
		.pipe(connect.reload());
}

function processResizeImages() {
	return gulp.src(["src/images/resized/**/*.*", "!src/images/resized/**/thumb.db"])
		.pipe(imageResize({
			width : 500,
			crop : false,
			upscale : false
		}))
		.pipe(imagemin([
			imagemin.mozjpeg({quality: 25, progressive: true}),
			imagemin.optipng({optimizationLevel: 1})
		]))
		.pipe(gulp.dest("dist/assets/images/resized/"))
		.pipe(connect.reload());
}

function watch() {
	gulp.watch("src/sass/**/*.scss", { ignoreInitial: false }, processSass);
	gulp.watch("src/html/**/*.html", { ignoreInitial: false }, processHTML);
	gulp.watch("src/js/**/*.js", { ignoreInitial: false }, processJS);
	gulp.watch("src/images/**/*.*", { ignoreInitial: false }, processImages);
	gulp.watch("src/images/resized/**/*.*", { ignoreInitial: false }, processResizeImages);
}

function server() {
  return connect.server({
    root: 'dist',
    livereload: true
  });
}

gulp.task("default", gulp.parallel(server, watch));
