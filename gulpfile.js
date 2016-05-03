"use strict";

var gulp = require("gulp"),
    sourcemaps = require("gulp-sourcemaps"),
    browserify = require("gulp-browserify"),
    uglify = require('uglify-js'),
    del = require("del"),
    concat = require('gulp-concat'),
    //htmlmin = require('gulp-htmlmin'),
    template = require('gulp-underscore-template');


var paths = {
    buildDir: ["./build/"],
    backboneDir: "./backbone/",
    backbonejs: "./backbone/**/*.js",
    backboneBootstrapJs: "./backbone/app.js"
};



gulp.task("cleanjs", function() {
    return del(["build/js"]);
});

gulp.task("buildtlp", function() {
    return gulp.src(paths.backboneDir + "*/*.html")
        .pipe(template())
        .pipe(concat("templates.js"))
        .pipe(gulp.dest("build/js"));
});

gulp.task("buildjs", ["cleanjs", "buildtlp"], function() {
    return gulp.src(paths.backboneBootstrapJs)
             .pipe(sourcemaps.init())
             .pipe(browserify({
                "debug": !process.env.production
              }))
             .pipe(sourcemaps.write())
             .pipe(gulp.dest("build/js"));
});

gulp.task("watchjs", function() {
    gulp.watch(paths.backbonejs, ["buildjs"]);
});

gulp.task("default", ["buildjs", "watchjs"]);
