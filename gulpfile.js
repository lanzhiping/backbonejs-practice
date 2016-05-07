"use strict";

var gulp = require("gulp"),
    browserify = require("browserify"),
    source = require('vinyl-source-stream'),
    path = require("path"),
    es = require('event-stream'),
    aliasify = require("aliasify"),
    aliasifyConfig = require("./aliasifyConfig"),
    sass = require('gulp-sass'),
    del = require("del"),
    concat = require('gulp-concat'),
    template = require('gulp-underscore-template');


var paths = {
    buildDir: ["./build/"],
    backboneDir: "./backbone/",
    backbonejs: "./backbone/**/*.js",
    backbonehtml: "./backbone/**/*.html",
    backbonesass: "./backbone/**/*.scss",
    backboneBootstrapSass: ["./backbone/pages/homePage/home.scss", "./backbone/pages/loginPage/login.scss"],
    backboneBootstrapJs: ["./backbone/pages/homePage/home.js", "./backbone/pages/loginPage/login.js"]
};

gulp.task("browserifyjs", function() {
    var tasks = paths.backboneBootstrapJs.map(function(entry) {
        return browserify({"entries": [entry]})
            .transform(aliasify, aliasifyConfig)
            .bundle()
            .pipe(source(path.basename(entry)))
            .pipe(gulp.dest("build/js"));
    });

    return es.merge.apply(null, tasks);
});

gulp.task("cleanjs", function() {
    return del(["build/js"]);
});

gulp.task("cleancss", function() {
    return del(["./build/css"]);
});

gulp.task("buildtlp", function() {
    return gulp.src(paths.backboneDir + "**/*_template.html")
        .pipe(template())
        .pipe(concat("templates.js"))
        .pipe(gulp.dest("build/js"));
});

gulp.task("sass", ["cleancss"], function () {
  return gulp.src(paths.backboneBootstrapSass)
    .pipe(sass({}).on("error", sass.logError))
    .pipe(gulp.dest("./build/css"));
});

gulp.task("watchsass", function () {
  gulp.watch(paths.backbonesass, ["sass"]);
});

gulp.task("watchjs", function() {
    gulp.watch(paths.backbonejs, ["browserifyjs"]);
    gulp.watch(paths.backbonehtml, ["buildtlp", "browserifyjs"]);
});

gulp.task("buildjs", ["cleanjs", "buildtlp", "browserifyjs"]);
gulp.task("build", ["buildjs", "sass"]);
gulp.task("default", ["buildjs", "watchjs"]);
