'use strict';

var Backbone = require("backbone"),
    Marionette = require("backbone.marionette"),
    Router = require("router"),
    AppController = require("appController"),
    app;

app = new Marionette.Application();
console.log("hi there");

app.router = new Router({
    "isLogined": false,
    "controller": new AppController({
        "isLogined": false,
    })
});

Backbone.history.start();
