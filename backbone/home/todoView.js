'use strict';
var app = app || {};

app.todoView = Backbone.View.extend({
	template: _templates['todo_template'],
	initialize: function(options){
		this.model = new app.todoModel(options);
		this.listenTo(this.model, 'change', this.render);
		this.model.trigger('change');
	},
	render: function(){
		this.setElement(this.template(this.model.attributes));
		return this;
	},
	save: function(){
		this.model.save();
	}
});

