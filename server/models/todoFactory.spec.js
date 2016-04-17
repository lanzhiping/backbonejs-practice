"use strict";

var todoFactory = require("./todoFactory");

describe("todoFactory", function() {

    it("should be able to create a todo", function() {
        var todoId = 0,
            todoContent = "this is my first todo",
            result;

        result = todoFactory.create({
            "id": todoId,
            "content": todoContent
        });

        expect(result.id).toBe(todoId);
        expect(result.content).toBe(todoContent);
    });

});