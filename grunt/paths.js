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

    // server source
    "serverjs": "./server/databaseFactory.js",
    "serverspecjs": "./server/databaseFactory.spec.js",

    // compiled output js
    "distClientSrc": "./dist/clientsrc.js",
    "distClientModule": "./dist/modules.js",
    "distServerSrc": "./dist/serversrc.js",
    "distServerTest": "./dist/serverTests.js",
};

module.exports = paths;
