"use strict";

var BodyView,
    _ = require("lodash"),
    HeaderView = require("headerView"),
    HomeView = require("homeView"),
    Marionette = require("backbone.marionette");

BodyView = Marionette.ItemView.extend({
    el: "#body",

    template: false,

    initialize: function(){
        _.bindAll(this, "scrolling");
        this.$el.scroll("", this.scrolling);
    },

    onRender: function() {
        this.headerView = new HeaderView().render();
        this.homeView = new HomeView().render();

        this.headerView.listenTo(this, "scrolling", this.headerView.onBodyScrolling);
    },

    scrolling: function(event) {
        this.trigger("scrolling", event.target.scrollTop === 0);
    }
});

module.exports = BodyView;
