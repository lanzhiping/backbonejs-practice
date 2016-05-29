"use strict";

var HomeView,
    _ = require("lodash"),
    _templates = require("templates"),
    Marionette = require("backbone.marionette");

HomeView = Marionette.ItemView.extend({
    el: "#container",

    template: _templates["home/home_template"]
});

module.exports = HomeView;
