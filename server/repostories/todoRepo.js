'use strict';

var databaseFactory = require("./databaseFactory"),
    repoHelper = require("./repositoryHelper"),
    database = new databaseFactory("test"),
    todoType = "todo",
    todoRepository;

function initTodoRepository () { // todo: need to abstract into a class

    function add(todoObject) {
        var todoList = database.read(todoType);

        todoObject.id = repoHelper.getSmallestContinuousId(todoList);
        todoList.push(todoObject);
        database.write(todoType, todoList);
    }

    function edit(todoObject) {
        var todoList = database.read(todoType);

        todoList.forEach(function (todo, index) {
            if (todo.id === todoObject.id) {
                todoList[index] = todoObject;
                return;
            }
        });

        database.write(todoType, todoList);
    };

    function readAll() {
        return database.read(todoType);
    };

    function findById(todoId) {
        return function(todo) {
            return todo.id === todoId;
        };
    }

    function readById(todoId) {
        return this.readAll()
                   .find(findById(todoId));
    };

    function deleteAll() {
        var emptyTodoList = [];

        database.write(todoType, emptyTodoList);
    };

    function filterOutById(todoId) {
        return function(todo) {
            return todo.id !== todoId;
        }
    }
    function deleteById(todoId) {
        var todoList = this.readAll();

        todoList = todoList.filter(filterOutById(todoId));
        database.write(todoType, todoList);
    };

    return {
        "add": add,
        "edit": edit,
        "readAll": readAll,
        "readById": readById,
        "deleteAll": deleteAll,
        "deleteById": deleteById
    };
}

function getInstance () {
    if (!todoRepository) {
        todoRepository = initTodoRepository();
    }

    return todoRepository;
}

module.exports = getInstance();
