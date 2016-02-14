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
			this.listenTo(app.todos,'reset',this.render());
			this.$input = this.$el.find('input');
			this.$todos = this.$('div#todo-container');
			app.todos.fetch({reset:true});
		},
		render: function(){
			this.$el.html(this.template());
			this.container.html(this.el);
			return this.renderTodoList;
		},
		renderTodoList: function(){
			for(var index in app.todos.models){
				var todo = new app.todoView(app.todos.models[index].attributes);
				this.$todos.append(todo.el);
			}
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