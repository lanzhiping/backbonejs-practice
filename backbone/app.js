'use strict';

var app = app || {};

(function (Backbone) {

	BackboneRouter(Backbone);
	BackboneView(Backbone);
	//BackboneModel(Backbone);
	//BackboneEvents(Backbone);
	//BackboneCollection(Backbone);

})(window.Backbone);

function BackboneRouter(Backbone){

	var router = Backbone.Router.extend({

		routes: {
			'home':                 'home',// #home
			'like': 				'like',
			'login/:loginAccount':  'login',// #login/lannano
			'*actions': 			'defaultRoute'
		},

		defaultRoute: function(actions) {
			this.isLogined && this.navigate('home', {trigger:true});
			!this.isLogined && this.navigate('login/lannano', {trigger:true});
		},

		execute: function(callback, args, name){
			if (!this.isLogined && name !=='login') {
    			this.navigate('login/lannano', {trigger:true});
    			return false;
    		}
    		if (this.isLogined && name === 'login'){
    			this.navigate('home', {trigger: true});
    			return false;
    		}
    		if (callback) callback.apply(this, args);
		},

		home: function(){
			new app.homeView();
		},
		like: function(){
			new app.likeView();
		},
		login: function() {
			new app.loginView();
		},

		initialize: function(options){
			this.on('change:isLogined', this.defaultRoute);
			this.isLogined = options.isLogined;
		}
	});

	app.router = new router({isLogined: false});
	Backbone.history.start();
}

function BackboneView(Backbone) {

	var iconButton = Backbone.View.extend({
		tagName:'i',
		className:'iconfont',
		container: $('#header'),
		events: {
			'click': function(){this.click();}
		},
		render: function (classString) {
			this.$el.addClass(classString);
			this.container.append(this.el);
			return this;
		},
		initialize: function (options) {
			this.click = options.click;
			this.render(options.iconClass);
			options.toggleClass && this.toggleClass(options.toggleClass);
		},
		toggleClass: function(args){
			args[3][args[2]]
			? this.$el.removeClass(args[1]).addClass(args[0])
			: this.$el.removeClass(args[0]).addClass(args[1]);
			
			this.listenTo(args[3], 'change:' + args[2] +' route', 
				function(routeName){
					args[3][args[2]]
					? this.$el.removeClass(args[1]).addClass(args[0])
					: this.$el.removeClass(args[0]).addClass(args[1]);
					this.$el.toggleClass(args[0], this.$el[0].className.indexOf(routeName)>-1);
				}
			);
		}
	});

	new iconButton({
		iconClass:'icon-left icon-homefill',
		toggleClass:['actived','','', app.router] ,
		click:function(){app.router.navigate('home', {trigger: true})}	});

	new iconButton({
		iconClass:'icon-left icon-likefill', 
		toggleClass:['actived','','', app.router] ,
		click:function(){app.router.navigate('like', {trigger: true})}	});

	new iconButton({
		iconClass: 'icon-right',
		toggleClass: ['icon-weibo', 'icon-close2', 'isLogined', app.router], 
		click:function(){app.router.navigate('login/lannano', {trigger: true})}	});
}

function BackboneModel(Backbone) {

	var Note = Backbone.Model.extend({
		defaults: { _id: 000000 },
		idAttribute: "_id",
		allowEidt: function () { return true; },
		initialize: function () {
			this.listenTo(this, 'change:name', function(p1, p2) { console.log('changed', p1, p2) });
		}
	});

	var mynote = new Note({
		name: (new Date()).toLocaleTimeString(),
		_id: 123456
	});

	mynote.set('name', 'note1');
}

function BackboneEvents(Backbone) {
	//var person = function (name) {
	//    this.name = name;
	//    return this;
	//};
	//person.prototype = Backbone.Events;
	//var erik = new person('erik');
	//erik.on('say', function () { console.log('my name is ' + this.name); });
	//erik.trigger('say');

	var erik = { say: function () { console.log(this.name); } };
	_.extend(erik, Backbone.Events);
	erik.on({
		'say:name': function (name) { console.log('my name is ' + name); this.name = name; },
		'say:greet': function () { console.log('hi there!'); }
	});

	var friendOfErik = {};
	friendOfErik.say = function () { console.log('hello!'); };
	_.extend(friendOfErik, Backbone.Events);
	friendOfErik.listenTo(erik, 'say:name', friendOfErik.say);

	erik.trigger('say:greet say:name', 'erik');
}

function BackboneCollection(Backbone) {

	var myModel = Backbone.Model.extend({
		say: function() { console.log('Hi, I am ' + this.name) }
	});
	
	var myCollection = Backbone.Collection.extend({
		model: myModel,
		initialize: function () {
			this.bind(this);
			this.setElement(this.at(0));
		},
		comparator: function (model) {
			return model.get("id");
		},
		getElement: function () {
			return this.currentElement;
		},
		setElement: function (model) {
			this.currentElement = model;
		},
		next: function () {
			this.setElement(this.at(this.indexOf(this.getElement()) + 1));
			return this;
		},
		prev: function () {
			this.setElement(this.at(this.indexOf(this.getElement()) - 1));
			return this;
		}
	});

	var collection1 = new myCollection([
		{ name: 'person1' },
		{ name: 'person2' },
		{ name: 'person3' }
	]);

	console.log(collection1);

	var Book = Backbone.Model.extend({ urlRoot: '/api/backbone?book' });
	var book1 = new Book({ name:'my first book', author:'zhiping' });
	var book2 = new Book({ name:'my first book', author:'zhiping' });
	var book3 = new Book({ name:'my first book', author:'zhiping' });
	console.log(book1, book1.isNew());
	//book1.save();
	//book2.save();
	//book3.save();
	//book1.fetch();
}