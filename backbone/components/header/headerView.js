"use strict";

var HeaderView,
    Marionette = require("backbone.marionette");

HeaderView = Marionette.ItemView.extend({
    el: "#header",

    template: false
});

module.exports = HeaderView;
