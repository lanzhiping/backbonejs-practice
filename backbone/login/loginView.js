"use strict";

var LoginView,
    $ = require("jquery"),
    _templates = require("templates"),
    Marionette = require("backbone.marionette");

LoginView = Marionette.ItemView.extend({

    className: "login-view",

    container: $("#container"),

    ui: {
        "signInButton": "#signIn"
    },

    events: {
        "click @ui.signInButton": "signIn"
    },

    template: _templates["login/login_template"],

    onRender: function(){
        this.$el.html(this.template());
        this.container.html(this.$el);
    },

    signIn: function(){
        window.location.replace("/api/login");
    }

});

module.exports = LoginView;
