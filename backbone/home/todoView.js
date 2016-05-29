// 'use strict';
// var app = app || {};

// app.todoView = Backbone.View.extend({
// 	template: _templates['home/todo_template'],
// 	events:{
// 		'dblclick': 'editTodo',
// 		'click .icon-close2': 'deleteButton',
// 		'click .icon-save': 'save'
// 	},
// 	initialize: function(options){
// 		this.model = new app.todoModel(options);
// 		!this.model.isNew() && this.render();
// 		this.$input = this.$el.find('input#todo-edit');
// 	},
// 	render: function(){
// 		this.setElement(this.template(this.model.attributes));
// 		return this;
// 	},
// 	deleteButton: function(){
// 		this.model.destroy();
// 	},
// 	editTodo:function(){
// 		this.$el.children().toggleClass('edit');
// 		var todoContent = this.model.attributes.content;
// 		this.$input.val(todoContent);
// 	},
// 	save: function(){
// 		var updateText = this.$input.val();
// 		//this.model.set('content', updateText);
// 		this.model.save({'content':updateText}, {wait:true});
// 		//this.editTodo();
// 	}
// });