'use strict';

var databaseFactory = require("./databaseFactory"),
    repoHelper = require("./repositoryHelper"),
    database = new databaseFactory("test"),
    repository;

function initRepository () { // todo: need to abstract into a class

    function add(objType, object) {
        var objectList = database.read(objType);

        object.id = repoHelper.getSmallestContinuousId(objectList);
        objectList.push(object);
        database.write(objType, objectList);
    }

    function edit(objType, object) {
        var objectList = database.read(objType);

        objectList.forEach(function (obj, index) {
            if (obj.id === object.id) {
                objectList[index] = object;
                return;
            }
        });

        database.write(objType, objectList);
    };

    function readAll(objType) {
        return database.read(objType);
    };

    function findById(objId) {
        return function(obj) {
            return obj.id === objId;
        };
    }

    function readById(objType, objId) {
        return this.readAll(objType)
                   .find(findById(objId));
    };

    function deleteAll(objType) {
        var emptyList = [];

        database.write(objType, emptyList);
    };

    function filterOutById(objId) {
        return function(obj) {
            return obj.id !== objId;
        }
    }

    function deleteById(objType, objId) {
        var objList = this.readAll(objType);

        objList = objList.filter(filterOutById(objId));
        database.write(objType, objList);
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
    if (!repository) {
        repository = initRepository();
    }

    return repository;
}

module.exports = getInstance();
