'use strict';

var port = 8000,
    _ = require("lodash"),
    bodyParser = require("body-parser"),
    loginController = require("./server/loginController"),
    httpServer = require('./server/httpServer');

(function () {
    var express = require('express'),
        app = express(),
        backboneServer = new require("./server/backboneServer");

    app.use(function(req, res, next) {
        console.log("do i need to go back here again")
        req.isLogined = loginController.isLogined();
        next();
    });
    app.use(bodyParser.json());


    app.use("/favicon.ico", express.static("./favicon.ico"));
    app.use("/build", express.static("build"));
    app.use("/font", express.static("font"));


    app.use("/login", function(req, res, next) {
        if (req.isLogined) {
            res.redirect("/home");
        } else {
            express.static("backbone/pages/loginPage")(req, res, next);
        }

    });
    app.use("/home", function(req, res, next) {
        if (req.isLogined) {
            express.static("backbone/pages/homePage")(req, res, next);
        } else {
            res.redirect("/login");
        }
    });


    app.get("/api/backbone", backboneServer.get);
    app.post("/api/backbone", backboneServer.post);
    app.put("/api/backbone", backboneServer.put);
    app.delete("/api/backbone", backboneServer.delete);


    httpServer
        .withPort(process.env.PORT || port)
        .withHandler(app)
        .start();
})();
