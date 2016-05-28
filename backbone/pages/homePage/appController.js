"use strict";

var AppController,
    Marionette = require("backbone.marionette"),
    HeaderView = require("headerView"),
    HomeView = require("../../home/homeView"),
    LikeView = require("../../like/likeView");

AppController = Marionette.Controller.extend({
    "home": function() {
        this.headerView = new HeaderView().render();
        this.homeView = new HomeView().render();

        this.headerView.listenTo(this.homeView, "scrolling", this.headerView.onBodyScrolling);
    },

    "like": function() {
        new LikeView();
    }
});

module.exports = AppController;
