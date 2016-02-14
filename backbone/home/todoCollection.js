'use strict';
var app = app || {};

app.todoModel = Backbone.Model.extend({
	urlRoot: '/api/backbone?todo',
});

app.todoCollection = Backbone.Collection.extend({
		model: app.todoModel,
		url: '/api/backbone?todo'
});

app.todos = new app.todoCollection();