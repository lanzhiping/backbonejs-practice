'use strict';
var app = app || {};

app.todoModel = Backbone.Model.extend({
	urlRoot: '/api/backbone?todo'
});
