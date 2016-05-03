"use strict";

var Marionette = require("backbone.marionette"),
    Router;

Router = Marionette.AppRouter.extend({

    "appRoutes": {
        "home":                 "home",
        "like":                 "like",
        "login/:loginAccount":  "login",
        // "*actions":             "defaultRoute"
    },

    "initialize": function(options) {
        this.on('change:isLogined', this.defaultRoute);
        this.isLogined = this.options.isLogined;

    },

    "execute": function(callback, args, name) {

        if (!this.isLogined && name !=='login') {
            this.navigate('login/lannano', {trigger:true});
            return false;
        }

        if (this.isLogined && name === 'login'){
            this.navigate('home', {trigger: true});
            return false;
        }

        if (callback) callback.apply(this, args);
    }

        // routes: {
        //     'home':                 'home',
        //     'like':                 'like',
        //     'login/:loginAccount':  'login',
        //     '*actions':             'defaultRoute'
        // },

        // defaultRoute: function(actions) {
        //     this.isLogined && this.navigate('home', {trigger:true});
        //     !this.isLogined && this.navigate('login/lannano', {trigger:true});
        // },



        // home: function(){
        //     new app.homeView();
        // },
        // like: function(){
        //     new app.likeView();
        // },
        // login: function() {
        //     new app.loginView();
        // },


});

module.exports = Router;
