"use strict";

var proxyquire = require("proxyquire"),
    fsModuleFactory = require("../testStubs/fsModuleFactory"),
    databaseFactoryPath = "./databaseFactory",
    repositoryPath = "./repository",
    repository;

describe("todo repository tests", function () {
    it("could be required", function () {
        repository = proxyquire(repositoryPath, {});

        expect(repository).not.toBe(null);
        expect(repository.add).toBeDefined();
        expect(repository.edit).toBeDefined();
        expect(repository.readAll).toBeDefined();
        expect(repository.readById).toBeDefined();
        expect(repository.deleteAll).toBeDefined();
        expect(repository.deleteById).toBeDefined();
    });

    describe("repository functionality tests", function () {
        var fakeFS, databaseFactory;

        beforeEach(function () {
            fakeFS = fsModuleFactory.createFunctionalMockFSModule();
            databaseFactory = proxyquire(databaseFactoryPath, {
                "fs": fakeFS
            });
            repository = proxyquire(repositoryPath, {
                "./databaseFactory": databaseFactory
            });
        });

        it("be able to read all todos", function () {
            var objectType = "todo",
                todo = {
                    "id": 0,
                    "content": "this is my first todo"
                };

            fakeFS.repo.result = JSON.stringify({
                "todo": [todo]
            });

            var result = repository.readAll(objectType);

            expect(result.length).toBe(1);
            expect(result[0]).toBeJsonEqual(todo);
        });

        it("be able to read a todo by id", function () {
            var objectType = "todo",
                todo = {
                    "id": 0,
                    "content": "this is my first todo"
                };

            fakeFS.repo.result = JSON.stringify({
                "todo": [todo]
            });

            var result = repository.readById(objectType, todo.id);

            expect(result).toBeJsonEqual(todo);
        });

        it("be able to add and initialze an id for a todo object", function () {
            var objectType = "todo",
                existTodo = {
                    "id": 0,
                    "content": "this is an exsiting todo",
                },
                newTodo = {
                    "content": "this is my first todo"
                };

            fakeFS.repo.result = JSON.stringify({
                "todo": [existTodo]
            });
            repository.add(objectType, newTodo);

            newTodo["id"] = 1;
            var expectResult = JSON.stringify({
                "todo": [existTodo, newTodo]
            });

            expect(fakeFS.repo.result).toBe(expectResult);
        });

        it("be able to edit a todo object", function () {
            var objectType = "todo",
                todo = {
                    "id": 0,
                    "content": "this is an exsiting todo",
                };

            fakeFS.repo.result = JSON.stringify({
                "todo": [todo]
            });

            todo.content = "this todo has been modified";

            repository.edit(objectType, todo);

            var expectResult = JSON.stringify({
                "todo": [todo]
            });

            expect(fakeFS.repo.result).toBe(expectResult);
        });

        it("be able to delete all todos", function () {
            var objectType = "todo",
                todo1 = {
                    "id": 0,
                    "content": "this is my first todo"
                },
                todo2 = {
                    "id": 1,
                    "content": "this is my second todo"
                };

            fakeFS.repo.result = JSON.stringify({
                "todo": [todo1, todo2]
            });

            repository.deleteAll(objectType);

            var result = repository.readAll(objectType);
            expect(result.length).toBe(0);
        });

        it("be able to delete a todo by id", function () {
            var objectType = "todo",
                todo1 = {
                    "id": 0,
                    "content": "this is my first todo"
                },
                todo2 = {
                    "id": 1,
                    "content": "this is my second todo"
                };

            fakeFS.repo.result = JSON.stringify({
                "todo": [todo1, todo2]
            });

            repository.deleteById(objectType, todo1.id);

            var result = repository.readAll(objectType);
            expect(result.length).toBe(1);
            expect(result[0]).toBeJsonEqual(todo2);
        });

    });
});
