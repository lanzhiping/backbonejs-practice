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
        url: "/api/publicWeibo?weibo_id=" + this.getCookie("weibo_id"),

        getCookie: function(cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for(var i = 0; i <ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length,c.length);
                }
            }
            return "";
        }
    })),
});

module.exports = HomeView;
