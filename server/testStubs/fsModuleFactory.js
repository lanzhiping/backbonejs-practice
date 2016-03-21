"use strict";

function createFileNotExistMockFSModule () {
    return {
        "statSync": function(filePath) {
            throw "file '{0}' doesn't exist.".replace("{0}", filePath);
        }
    }
}

function createIsDirectoryMockFSModule () {
    return {
        "statSync": function(filePath) {
            return {
                "isDirectory": function(){ return true; }
            }
        }
    }
}

function createFileExistMockFSModule (data){
    return {
        "statSync": function(filePath) {
            return {
                "isDirectory": function(){ return false; }
            }
        },
        "readFileSync": function (filePath) {
            return data["read"];
        },
        "writeFileSync": function(filePath, stringifyObject) {
            data["write"].writenStringifyObject = stringifyObject;
        }
    }
}

var fsModuleFactory =  {
    "createFileNotExistMockFSModule": createFileNotExistMockFSModule,
    "createIsDirectoryMockFSModule": createIsDirectoryMockFSModule,
    "createFileExistMockFSModule": createFileExistMockFSModule
};

module.exports = fsModuleFactory
