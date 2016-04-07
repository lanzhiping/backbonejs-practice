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

    fdescribe("todo repository functionality tests", function() {
        it("be able to add a todo", function() {
            var fakeFS = fsModuleFactory.createFunctionalMockFSModule(),
                todoRepo = proxyquire(todoRepoPath, {
                    "fs": fakeFS
                }),
                todo = {
                    "content": "this is my first todo"
                };

            todoRepo.add(todo);

            expect(fakeFS.repo.result["todo"]).toBeJsonEqual(todo);
        });
    });
});
