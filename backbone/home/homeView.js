"use strict";

var HomeView,
    _ = require("lodash"),
    _templates = require("templates"),
    Marionette = require("backbone.marionette");

HomeView = Marionette.ItemView.extend({
    el: "#container",

    template: _templates["home/home_template"],

    initialize: function(){
        _.bindAll(this, "scrolling");

        this.$el.scroll("", this.scrolling);
    },

    scrolling: function(event) {
        this.trigger("scrolling", event.target.scrollTop === 0);
    }
});

module.exports = HomeView;
