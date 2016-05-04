"use strict";

var HomeView,
    $ = require("jquery"),
    _templates = require("../../build/js/templates"),
    Marionette = require("backbone.marionette");

HomeView = Marionette.ItemView.extend({
    container: $("#container"),
    template: _templates["home/home_template"],
    events: {
        "click .todo-add": "addTodo",
    },
    initialize: function(){
        this.listenTo(app.todos,"reset",this.render());
        this.$input = this.$el.find("input");
        this.$todos = this.$("div#todo-container");
        app.todos.fetch({reset:true});
    },
    render: function(){
        this.$el.html(this.template());
        this.container.html(this.el);
        return this.renderTodoList;
    },
    renderTodoList: function(){
        this.$todos.empty();
        for(var index in app.todos.models){
            var todo = new app.todoView(app.todos.models[index].attributes);
            this.$todos.append(todo.el);
        }
        return this;
    },
    addTodo: function(){
        var todoContent = this.$input.val();
        var todo = new app.todoModel({content:todoContent});
        todo.save(todo.attributes, {wait:true});
        this.$input.val("");
    }
});

module.exports = HomeView;
