"use strict";

var Marionette = require("backbone.marionette"),
    AppController = require("appController"),
    Router;

Router = Marionette.AppRouter.extend({
    "routes": {
        "": "defaultToHome"
    },

    "appRoutes": {
        "home": "home",
        "like": "like"
    },

    "controller": new AppController(),

    "defaultToHome": function() {
        this.navigate("home", { trigger: true });
    }
});

module.exports = Router;
