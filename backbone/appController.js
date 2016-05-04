"use strict";

var AppController,
    Marionette = require("backbone.marionette"),
    HomeView = require("./home/homeView"),
    LikeView = require("./like/likeView"),
    LoginView = require("./login/loginView");

AppController = Marionette.Controller.extend({

    "initialize": function() {
        this.isLogined = this.options.isLogined;
    },

    "defaultRoute": function(actions) {
        if (this.isLogined) {
            this.navigate("home", { trigger: true });
        } else {
            this.navigate("login/lannano", { trigger: true });
        }
    },

    "home": function() {
        new HomeView();
    },

    "like": function() {
        new LikeView();
    },

    "login": function() {
        new LoginView();
    },
});

module.exports = AppController;
