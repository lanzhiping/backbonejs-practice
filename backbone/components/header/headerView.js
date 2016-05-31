"use strict";

var HeaderView,
    _templates = require("templates"),
    Backbone = require("backbone"),
    Marionette = require("backbone.marionette");

HeaderView = Marionette.ItemView.extend({
    el: "#header",

    template: _templates["components/header/header_template"],

    ui: {
        "container": "#header",
        "userName": ".header_user_name",
        "userImage": ".header_user_image"
    },

    modelEvents: {
        "change name": "renderName",
        "change avatar_large": "renderImage"
    },

    model: new (Backbone.Model.extend({
        url: "/api/loginUser?weibo_id=" + this.getCookie("weibo_id"),

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

    onRender: function() {
        this.model.fetch();
    },

    renderName: function() {
        this.ui.userName.text(this.model.get("name"));
    },

    renderImage: function() {
        this.ui.userImage.attr("src", this.model.get("avatar_large"));
    },

    onBodyScrolling: function(isScrollToTop) {
        this.$el.toggleClass("header-docking", !isScrollToTop);
    }

});

module.exports = HeaderView;
