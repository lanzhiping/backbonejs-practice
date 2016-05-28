"use strict";

var AppController,
    Marionette = require("backbone.marionette"),
    BodyView = require("homePage/bodyView"),
    LikeView = require("../../like/likeView");

AppController = Marionette.Controller.extend({
    "home": function() {
        this.bodyView = new BodyView().render();
    },

    "like": function() {
        new LikeView();
    }
});

module.exports = AppController;
