"use strict";

var url = require("url"),
    DataManipulatorBuilder = require("./initDataBase.js"),
    responseHeader = {
        "Content-Type": "application/json"
    };

function getObjectTypeFromUrl(request) {
    var urlInfo = url.parse(request.url, true),
        objectType = urlInfo.search.split("?")[1].split("/")[0],
        id = urlInfo.search.split("?")[1].split("/")[1];

    return {
        "id": id,
        "objectType": objectType
    };
}

function backboneServer() {
    var dataManipulator;

    this.build = function(filename) {
        dataManipulator = new DataManipulatorBuilder(filename);
        return this;
    };

    // read
    this.get = function(request, response) {
        var urlInfo = getObjectTypeFromUrl(request),
            data = dataManipulator.read(urlInfo.objectType);

        response.writeHead(200, responseHeader);
        response.write(JSON.stringify(data || []));
        response.end();
    };

    // create
    this.post = function(request, response) {
        var urlInfo = getObjectTypeFromUrl(request);
        dataManipulator.write(urlInfo.objectType, request.body);
        response.writeHead(200, {
            "Content-Type": "application/json"
        });
        response.write(JSON.stringify(request.body));
        response.end();
    };

    //  update
    this.put = this.post;

    // delete`
    this.delete = function(request, response) {
        var urlInfo = getObjectTypeFromUrl(request),
            isSuccessful = dataManipulator.deleteByIdAndType(urlInfo.objectType, urlInfo.id),
            result = isSuccessful ? "success" : "No Content";
        response.writeHead((isSuccessful ? 200 : 204), responseHeader);
        response.write(JSON.stringify({"result":result}));
        response.end();
    };
}

module.exports = new backboneServer();
