'use strict';

var Backbone = require("backbone"),
    Marionette = require("backbone.marionette"),
    Router = require("./router"),
    AppController = require("./appController"),
    app;

app = new Marionette.Application();
console.log("hi there")

app.router = new Router({
    "isLogined": false,
    "controller": new AppController({
        "isLogined": false,
    })
});

Backbone.history.start();

// var app = app || {};

// (function (Backbone) {

// 	BackboneRouter(Backbone);
// 	BackboneView(Backbone);

// })(window.Backbone);

// function BackboneRouter(Backbone){

// 	var router = Backbone.Router.extend({

// 		routes: {
// 			'home':                 'home',
// 			'like': 				'like',
// 			'login/:loginAccount':  'login',
// 			'*actions': 			'defaultRoute'
// 		},

// 		defaultRoute: function(actions) {
// 			this.isLogined && this.navigate('home', {trigger:true});
// 			!this.isLogined && this.navigate('login/lannano', {trigger:true});
// 		},

// 		execute: function(callback, args, name){
// 			if (!this.isLogined && name !=='login') {
//     			this.navigate('login/lannano', {trigger:true});
//     			return false;
//     		}
//     		if (this.isLogined && name === 'login'){
//     			this.navigate('home', {trigger: true});
//     			return false;
//     		}
//     		if (callback) callback.apply(this, args);
// 		},

// 		home: function(){
// 			new app.homeView();
// 		},
// 		like: function(){
// 			new app.likeView();
// 		},
// 		login: function() {
// 			new app.loginView();
// 		},

// 		initialize: function(options){
// 			this.on('change:isLogined', this.defaultRoute);
// 			this.isLogined = options.isLogined;
// 		}
// 	});

// 	app.router = new router({isLogined: false});
// 	Backbone.history.start();
// }

// function BackboneView(Backbone) {

// 	var iconButton = Backbone.View.extend({
// 		tagName:'i',
// 		className:'iconfont',
// 		container: $('#header'),
// 		events: {
// 			'click': function(){this.click();}
// 		},
// 		render: function (classString) {
// 			this.$el.addClass(classString);
// 			this.container.append(this.el);
// 			return this;
// 		},
// 		initialize: function (options) {
// 			this.click = options.click;
// 			this.render(options.iconClass);
// 			options.toggleClass && this.toggleClass(options.toggleClass);
// 		},
// 		toggleClass: function(args){
// 			args[3][args[2]]
// 			? this.$el.removeClass(args[1]).addClass(args[0])
// 			: this.$el.removeClass(args[0]).addClass(args[1]);

// 			this.listenTo(args[3], 'change:' + args[2],
// 				function(routeName){
// 					args[3][args[2]]
// 					? this.$el.removeClass(args[1]).addClass(args[0])
// 					: this.$el.removeClass(args[0]).addClass(args[1]);
// 				}
// 			);
// 		}
// 	});

// 	new iconButton({
// 		iconClass:'icon-left icon-homefill',
// 		click:function(){app.router.navigate('home', {trigger: true})}	});

// 	new iconButton({
// 		iconClass:'icon-left icon-likefill',
// 		click:function(){app.router.navigate('like', {trigger: true})}	});

// 	new iconButton({
// 		iconClass: 'icon-right',
// 		toggleClass: ['icon-close2', 'icon-weibo', 'isLogined', app.router],
// 		click:function(){
// 			app.router.isLogined = false;
// 			app.router.trigger('change:isLogined');}
// 		});
// }