'use strict';

var Backbone = require("backbone"),
    Marionette = require("backbone.marionette"),
    Router = require("router"),
    app;

app = new Marionette.Application();
console.log("hi there");

app.router = new Router();

Backbone.history.start();
