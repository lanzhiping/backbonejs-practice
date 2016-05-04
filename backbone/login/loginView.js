"use strict";

var LoginView,
    $ = require("jquery"),
    _templates = require("../../build/js/templates"),
    Marionette = require("backbone.marionette");

LoginView = Marionette.ItemView.extend({

    className: "login-view",

    container: $("#container"),

    events: {
        "click #signIn": "signIn"
    },

    template: _templates["login/login_template"],

    initialize: function(){
        this.render();
    },

    render: function(){
        this.$el.html(this.template());
        this.container.html(this.$el);
        return this;
    },

    signIn: function(){
        var firstname = this.$("input[name='fname']").val(),
            lastname = this.$("input[name='lname]").val();
        app.router.isLogined = firstname === "zhiping" && lastname === "lan";
        app.router.trigger("change:isLogined");

        var fiveMinutes = 300000;
        setTimeout(function(){
            app.router.isLogined = false;
            app.router.trigger("change:isLogined");
        }, fiveMinutes);
    }
});

module.exports = LoginView;
