"use strict";

var Marionette = require("backbone.marionette"),
    Router;

Router = Marionette.AppRouter.extend({

    "appRoutes": {
        "home":                 "home",
        "like":                 "like",
        "login/:loginAccount":  "login",
        "*actions":             "defaultRoute"
    },

    "initialize": function(options) {
        this.on("change:isLogined", this.defaultRoute);
    },

    "execute": function(callback, args, name) {
        if (!this.isLogined && name !== "login") {
            this.navigate("login", { trigger:true });
            return false;
        }

        if (this.isLogined && name === "login"){
            this.navigate("home", { trigger: true });
            return false;
        }

        if (callback) callback.apply(this, args);
    }

});

module.exports = Router;
