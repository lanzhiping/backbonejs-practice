'use strict';

var port = 80,
    serverBuilder = require('./server/serverBuilder');
    

(function() {

    var express = require('express'),
        app = express();

    app.use("/dist", express.static("dist"));
    app.use("/font", express.static("font"));
    app.use("/backbone", express.static("backbone"));
    app.get("/", express.static("backbone"));
    app.all("/api/backbone", require("./server/backboneServer")("test"));

    serverBuilder
        .withPort(port)
        .withHandler(app) // .withHandler(httpRequestHandler('backbone'))
        .build()
        .start();
})();