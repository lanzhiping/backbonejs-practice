'use strict';

var Backbone = require("backbone"),
    Marionette = require("backbone.marionette"),
    RootView = require("loginRootView"),
    app;

app = new Marionette.Application({
    rootView: new RootView().render()
});

app.on("start", function() {
    console.log("startLoginView");
    Backbone.history.start();
});

app.start();
