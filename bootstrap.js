'use strict';

var port = 8000,
    _ = require("lodash"),
    bodyParser = require("body-parser"),
    expressSession = require("express-session"),
    loginController = require("./server/loginController"),
    weiboServer = require("./server/weiboServer"),
    httpServer = require('./server/httpServer');

(function () {
    var express = require('express'),
        app = express(),
        backboneServer = new require("./server/backboneServer");

    app.use(bodyParser.json());
    app.use(expressSession({secret:"lanzhipinglanzhiping"}));
    app.use("/favicon.ico", express.static("./favicon.ico"));
    app.use("/build", express.static("build"));
    app.use("/font", express.static("font"));


    app.use("/login", function(req, res, next) {
        if (loginController.isLogined(req)) {
            res.redirect("/home");
        } else {
            express.static("backbone/pages/loginPage")(req, res, next);
        }
    });
    app.use("/home", function(req, res, next) {
        if (loginController.isLogined(req)) {
            express.static("backbone/pages/homePage")(req, res, next);
        } else {
            res.redirect("/login");
        }
    });

    app.get("/api/login", loginController.login);
    app.get("/api/loginUser", weiboServer.loginUser);

    app.get("/api/backbone", backboneServer.get);
    app.post("/api/backbone", backboneServer.post);
    app.put("/api/backbone", backboneServer.put);
    app.delete("/api/backbone", backboneServer.delete);



    httpServer
        .withPort(process.env.PORT || port)
        .withHandler(app)
        .start();
})();
