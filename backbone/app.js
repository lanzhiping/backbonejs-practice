(function (Backbone) {
	'use strict';

	BackboneView(Backbone);
	BackboneModel(Backbone);
	BackboneEvents(Backbone);
	BackboneCollection(Backbone);

})(window.Backbone);

function BackboneView(Backbone) {

	var pEl = Backbone.View.extend({
		tagName: 'p',
		initialize: function (text) {
			setText(this, text);
			$('body').append(this.el);
		}
	});

	var buttonE = Backbone.View.extend({
		tagName: 'button',
		render: function () { $('body').append(this.el) },
		initialize: function (text, clickArg) {
			this.render();
			this.clickArg = clickArg;
			setText(this, text);
		},
		events: {
			"click": function () {
				setBorder(this.clickArg);
				setText(this.clickArg, 'again this is my first backbone element');
			}
		}
	});

	var p = new pEl('this is my first backbone element');
	var button = new buttonE('set border', p);

	function setBorder(view) {
		view.$el.css('border', 'solid 1px blue');
	}

	function setText(view, text) {
		view.$el.text(text);
	}

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

	var Book = Backbone.Model.extend({ urlRoot: '/db?book' });
	var book1 = new Book({ name:'my first book', author:'zhiping' });
	var book2 = new Book({ name:'my first book', author:'zhiping' });
	var book3 = new Book({ name:'my first book', author:'zhiping' });
	console.log(book1, book1.isNew());
	book1.save();
	book2.save();
	book3.save();
	//book1.fetch();
	


}