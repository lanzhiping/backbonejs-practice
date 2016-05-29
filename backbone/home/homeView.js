"use strict";

var HomeView,
    _ = require("lodash"),
    Backbone = require("backbone"),
    _templates = require("templates"),
    Marionette = require("backbone.marionette");

HomeView = Marionette.CollectionView.extend({
    el: "#container",

    initialize: function() {
        this.collection.fetch();
    },

    childView: Marionette.ItemView.extend({
        template: _templates["home/home_template"],
    }),

    collection: new (Backbone.Collection.extend({
        url: "/api/publicWeibo"
    })),
});

module.exports = HomeView;
