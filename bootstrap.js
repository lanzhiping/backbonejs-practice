'use strict';

var port = 8000,
    bodyParser = require("body-parser"),
    httpServer = require('./server/httpServer');

(function () {
    var express = require('express'),
        app = express(),
        backboneServer = new require("./server/backboneServer");

    app.get("/", express.static("backbone"));

    app.use("/dist", express.static("dist"));
    app.use("/font", express.static("font"));
    app.use("/backbone", express.static("backbone"));

    app.use(bodyParser.json());

    app.get("/api/backbone", backboneServer.get);
    app.post("/api/backbone", backboneServer.post);
    app.put("/api/backbone", backboneServer.put);
    app.delete("/api/backbone", backboneServer.delete);

    httpServer
        .withPort(process.env.PORT || port)
        .withHandler(app)
        .start();
})();
