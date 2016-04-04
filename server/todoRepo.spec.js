"use strict";

var proxyquire = require("proxyquire"),
    fsModuleFactory = require("./testStubs/fsModuleFactory"),
    todoRepo;

describe("todo repository tests", function (){

    it("could be required", function () {
        todoRepo = proxyquire("./todoRepo", {});
        expect(todoRepo).not.toBe(null);
        expect(todoRepo.add).toBeDefined();
        expect(todoRepo.edit).toBeDefined();
        expect(todoRepo.readAll).toBeDefined();
        expect(todoRepo.readById).toBeDefined();
        expect(todoRepo.deleteAll).toBeDefined();
        expect(todoRepo.deleteById).toBeDefined();
    });
});