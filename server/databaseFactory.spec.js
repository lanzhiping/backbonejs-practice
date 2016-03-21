"use strict";

var proxyquire = require("proxyquire"),
    testHelper = require("./serverTests.helper"),
    fsModuleFactory = require("./testStubs/fsModuleFactory"),
    databaseFactory;

describe("databaseFactory Tests", function () {

    beforeEach(function(){
        testHelper(jasmine);
    });

    it("should not be null", function () {
        databaseFactory = proxyquire("./databaseFactory", {});
        expect(databaseFactory).toBeDefined();
    });

    it("should be able to initialize from file name", function () {
        var stubs = {
                "fs": fsModuleFactory.createFileExistMockFSModule()
            },
            databaseFactory = proxyquire("./databaseFactory", stubs);

        var databaseInstance = new databaseFactory("serverTest");

        expect(databaseInstance.filePath).not.toBe(null);
        expect(databaseInstance.filePath).toBe("./db/serverTest.js");
    });

    it("filePath should be null when file name is the directory", function () {
        var stubs = {
                "fs": fsModuleFactory.createIsDirectoryMockFSModule()
            },
            databaseFactory = proxyquire("./databaseFactory", stubs);

        var databaseInstance = new databaseFactory("serverTest");

        expect(databaseInstance.filePath).toBe(null);
    });

    it("filePath should be empty when file doesnt exit", function () {
        var stubs = {
                "fs": fsModuleFactory.createFileNotExistMockFSModule()
            },
            databaseFactory = proxyquire("./databaseFactory", stubs);

        var databaseInstance = new databaseFactory("serverTest");

        expect(databaseInstance.filePath).toBe(null);
    });

    it("should able to read root object", function () {
        var rootObject = {
                "name": "nano"
            },
            fsOptions = {
                "read": JSON.stringify(rootObject)
            },
            stubs = {
                "fs": fsModuleFactory.createFileExistMockFSModule(fsOptions)
            },
            databaseFactory = proxyquire("./databaseFactory", stubs);

        var databaseInstance = new databaseFactory("serverTest");

        var result = databaseInstance.read();
        expect(result).toBeJsonEqual(rootObject);
    });

    it("should able to read object by type", function () {
        var rootObject = {
                "name": "nano",
                "age": "25"
            },
            fsOptions = {
                "read": JSON.stringify(rootObject)
            },
            stubs = {
                "fs": fsModuleFactory.createFileExistMockFSModule(fsOptions)
            },
            databaseFactory = proxyquire("./databaseFactory", stubs);

        var databaseInstance = new databaseFactory("serverTest");

        var result = databaseInstance.read("age");
        expect(result).toBe(rootObject["age"]);
    });

    it("should able to write object", function () {
        var rootObject = {
                "todo": {
                    "content": "this is my first todo"
                }
            },
            fsOptions = {
                "read": JSON.stringify(rootObject),
                "write": {}
            },
            stubs = {
                "fs": fsModuleFactory.createFileExistMockFSModule(fsOptions)
            },
            databaseFactory = proxyquire("./databaseFactory", stubs);

        var databaseInstance = new databaseFactory("serverTest");
        databaseInstance.write("todo", rootObject["todo"]);

        var result = JSON.parse(fsOptions.write.writenStringifyObject);
        expect(result).toBeJsonEqual(rootObject);
    });

});
