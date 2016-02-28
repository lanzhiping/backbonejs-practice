"use strict";

var paths = {
    // js libs
    "underscore": "node_modules/underscore/underscore-min.js",
    "jquery": "node_modules/jquery/dist/jquery.min.js",
    "backbone": "node_modules/backbone/backbone-min.js",
    "marionette": "node_modules/backbone.marionette/lib/backbone.marionette.min.js",
    
    // my source
    "appjs": ["backbone/*/*.js", "backbone/app.js"],
    "appsass": ["backbone/**/*.sass", "backbone/*.sass"],
    "appjade": "backbone/**/*.jade",
    "apptest": "backbone/**/*.spec.js",

    // compiled output js
    "distModule": "./dist/modules.js",
    "distSrc": "./dist/src.js",
};

module.exports = paths;
