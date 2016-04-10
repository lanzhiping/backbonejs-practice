"use strict";

var proxyquire = require("proxyquire"),
    fsModuleFactory = require("./testStubs/fsModuleFactory"),
    databaseFactoryPath = "./databaseFactory",
    todoRepoPath = "./todoRepo",
    todoRepo;

describe("todo repository tests", function () {
    it("could be required", function () {
        todoRepo = proxyquire(todoRepoPath, {});

        expect(todoRepo).not.toBe(null);
        expect(todoRepo.add).toBeDefined();
        expect(todoRepo.edit).toBeDefined();
        expect(todoRepo.readAll).toBeDefined();
        expect(todoRepo.readById).toBeDefined();
        expect(todoRepo.deleteAll).toBeDefined();
        expect(todoRepo.deleteById).toBeDefined();
    });

    describe("todo repository functionality tests", function () {
        var fakeFS, databaseFactory, todoRepo;

        beforeEach(function () {
            fakeFS = fsModuleFactory.createFunctionalMockFSModule();
            databaseFactory = proxyquire(databaseFactoryPath, {
                "fs": fakeFS
            });
            todoRepo = proxyquire(todoRepoPath, {
                "./databaseFactory": databaseFactory
            });
        });

        it("be able to read a todo", function () {
            var todo = {
                "id": 0,
                "content": "this is my first todo"
            };

            fakeFS.repo.result = JSON.stringify({
                "todo": [todo]
            });

            var result = todoRepo.readAll();

            expect(result.length).toBe(1);
            expect(result[0]).toBeJsonEqual(todo);
        });

        it("be able to add and initialze an id for a todo object", function () {
            var existTodo = {
                    "id": 0,
                    "content": "this is an exsiting todo",
                },
                newTodo = {
                    "content": "this is my first todo"
                };

            fakeFS.repo.result = JSON.stringify({
                "todo": [existTodo]
            });
            todoRepo.add(newTodo);

            newTodo["id"] = 1;
            var expectResult = JSON.stringify({
                "todo": [existTodo, newTodo]
            });

            expect(fakeFS.repo.result).toBe(expectResult);
        });

        it("be able to edit a todo object", function () {
            var todo = {
                "id": 0,
                "content": "this is an exsiting todo",
            };

            fakeFS.repo.result = JSON.stringify({
                "todo": [todo]
            });

            todo.content = "this todo has been modified";

            todoRepo.edit(todo);

            var expectResult = JSON.stringify({
                "todo": [todo]
            });

            expect(fakeFS.repo.result).toBe(expectResult);
        });
    });
});
