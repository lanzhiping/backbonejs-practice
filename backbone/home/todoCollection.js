'use strict';
var app = app || {};

app.todoModel = Backbone.Model.extend({
	urlRoot: '/api/backbone?todo',
	initialize:function(attributes){
		this.attributes = attributes;
		this.on('change', this.addToCollection);
		this.on('destroy', this.deleteFromCollection);
	},
	addToCollection:function(model){
		app.todos.add([model]);
		app.todos.trigger('reset');
	},
	deleteFromCollection:function(model){
		app.todos.remove([model]);
		app.todos.trigger('reset');
	}
});

app.todoCollection = Backbone.Collection.extend({
		model: app.todoModel,
		url: '/api/backbone?todo'
});

app.todos = new app.todoCollection();