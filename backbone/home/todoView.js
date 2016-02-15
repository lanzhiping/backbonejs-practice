'use strict';
var app = app || {};

app.todoView = Backbone.View.extend({
	template: _templates['todo_template'],
	events:{'click .icon-close2': 'deleteButton'},
	initialize: function(options){
		this.model = new app.todoModel(options);
		!this.model.isNew() && this.render();
	},
	render: function(){
		this.setElement(this.template(this.model.attributes));
		return this;
	},
	deleteButton: function(){
		this.model.destroy();
	}
});