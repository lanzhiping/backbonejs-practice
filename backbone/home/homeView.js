'use strict';

var app = app || {};

(function(Backbone){

	app.homeView = Backbone.View.extend({
		container: $('#container'),
		template: _templates['home_template'],
		events: {
			'click .todo-add': 'addTodo',
		},
		initialize: function(){
			this.render();
			this.$input = this.$el.find('input');
			this.$todos = this.$el.find('#todo-container');
		},
		render: function(){
			this.$el.html(this.template());
			this.container.html(this.$el);
			return this;
		},
		addTodo: function(){
			var todoContent = this.$input.val();
			var todo = new app.todoView({content:todoContent});
			this.$todos.append(todo.el);
			this.$input.val('');
		}
	});

})(window.Backbone);