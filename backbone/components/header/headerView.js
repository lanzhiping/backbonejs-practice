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
        url: "/api/loginUser"
    })),

    onRender: function() {
        this.model.fetch();
    },

    renderName: function() {
        this.ui.userName.text(this.model.get("name"));
    },

    renderImage: function() {
        this.ui.userImage.attr("src", this.model.get("avatar_large"));
    }

});

module.exports = HeaderView;
