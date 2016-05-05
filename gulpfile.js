"use strict";

var gulp = require("gulp"),
    sourcemaps = require("gulp-sourcemaps"),
    browserify = require("browserify"),
    source = require('vinyl-source-stream'),
    aliasify = require("aliasify"),
    aliasifyConfig = require("./aliasifyConfig"),
    del = require("del"),
    concat = require('gulp-concat'),
    template = require('gulp-underscore-template');


var paths = {
    buildDir: ["./build/"],
    backboneDir: "./backbone/",
    backbonejs: "./backbone/**/*.js",
    backbonehtml: "./backbone/**/*.html",
    backboneBootstrapJs: "./backbone/app.js"
};


gulp.task("browserifyjs", function() {
    return browserify(paths.backboneBootstrapJs)
        .transform(aliasify, aliasifyConfig)
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest("build/js"));
});

gulp.task("cleanjs", function() {
    return del(["build/js"]);
});

gulp.task("buildtlp", function() {
    return gulp.src(paths.backboneDir + "*/*.html")
        .pipe(template())
        .pipe(concat("templates.js"))
        .pipe(gulp.dest("build/js"));
});


gulp.task("build", ["cleanjs", "buildtlp", "browserifyjs"]);

gulp.task("watchjs", function() {
    gulp.watch(paths.backbonejs, ["browserifyjs"]);
    gulp.watch(paths.backbonehtml, ["buildtlp", "browserifyjs"]);
});

gulp.task("default", ["buildjs", "watchjs"]);
