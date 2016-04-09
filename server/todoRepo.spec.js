"use strict";

var proxyquire = require("proxyquire"),
    fsModuleFactory = require("./testStubs/fsModuleFactory"),
    todoRepoPath = "./todoRepo",
    todoRepo;

describe("todo repository tests", function (){
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

    describe("todo repository functionality tests", function() {
        it("be able to read a todo", function() {
            var fakeFS = fsModuleFactory.createFunctionalMockFSModule(),
                todoRepo = proxyquire(todoRepoPath, {
                    "./databaseFactory": proxyquire("./databaseFactory", {
                        "fs": fakeFS
                    })
                }),
                todo = {
                    "content": "this is my first todo"
                };

            fakeFS.repo.result = JSON.stringify({
                "todo": [todo]
            });

            var result = todoRepo.readAll("todo");

            expect(result.length).toBe(1);
            expect(result[0]).toBeJsonEqual(todo);
        });
    });
});
