"use strict";

var AppController,
    Marionette = require("backbone.marionette"),
    HeaderView = require("headerView"),
    HomeView = require("../../home/homeView"),
    LikeView = require("../../like/likeView");

AppController = Marionette.Controller.extend({
    "home": function() {
        new HeaderView().render();
        // new HomeView();
    },

    "like": function() {
        new LikeView();
    }
});

module.exports = AppController;
