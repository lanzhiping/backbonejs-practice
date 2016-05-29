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
    template = require('gulp-underscore-template'),
    fs = require("fs"),
    uglify = require("uglify-js");


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

gulp.task("uglifyjs", ["buildjs", "sass"], function() {
    // var orig_code = fs.readFileSync("./build/js/home.js", "utf8");

    // var toplevel = uglify.parse(orig_code, {
    //     filename: "./build/js/home.js",
    // });
    // toplevel.figure_out_scope();

    // var compressor = uglify.Compressor();
    // var compressed_ast = toplevel.transform(compressor);
    // compressed_ast.figure_out_scope();
    // compressed_ast.compute_char_frequency();
    // compressed_ast.mangle_names();

    // var stream = uglify.OutputStream();
    // compressed_ast.print(stream);
    // var code = stream.toString();

    // var orig_code = fs.readFileSync("./build/js/home.js", "utf8");

    ["./build/js/home.js", "./build/js/login.js"]
    .forEach(function(file) {
        fs.writeFileSync(file, uglify.minify(file).code, "utf8");
    });

});

gulp.task("buildjs", ["cleanjs", "buildtlp", "browserifyjs"]);
gulp.task("build", ["uglifyjs"]);
gulp.task("default", ["buildjs", "watchjs"]);
