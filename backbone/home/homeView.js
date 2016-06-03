"use strict";

var HomeView,
    ChildView,
    Backbone = require("backbone"),
    _templates = require("templates"),
    Marionette = require("backbone.marionette");

ChildView = Marionette.ItemView.extend({
    className: "weibo_container",

    template: _templates["home/home_template"],

    serializeData: function(){
        return {
            "data": this.model.toJSON()
        }
    }
});

HomeView = Marionette.CollectionView.extend({
    el: "#container",

    collection: new (Backbone.Collection),

    initialize: function() {
        this.collection.parse = function(data) {
            return data.statuses;
        };
        this.collection.url = "/api/publicWeibo/?weibo_id=" + this.getCookie("weibo_id");
        this.collection.fetch();
    },

    childView: ChildView,

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
});

module.exports = HomeView;
