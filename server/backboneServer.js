"use strict";

var url = require("url"),
    repository = require("./repositories/repository"),
    responseHeader = {
        "Content-Type": "application/json"
    };

function getObjectTypeFromUrl(request) { // todo: refactor
    var urlInfo = url.parse(request.url, true),
        objectType = urlInfo.search.split("?")[1].split("/")[0],
        id = Number.parseInt(urlInfo.search.split("?")[1].split("/")[1]);

    return {
        "id": id,
        "objectType": objectType
    };
}

function backboneServer() {
    // read
    this.get = function(request, response) {
        var urlInfo = getObjectTypeFromUrl(request),

            data = repository.readAll(urlInfo.objectType);

        response.writeHead(200, responseHeader);
        response.write(JSON.stringify(data || []));
        response.end();
    };

    // create
    this.post = function(request, response) {
        var urlInfo = getObjectTypeFromUrl(request);

        repository.add(urlInfo.objectType, request.body);

        response.writeHead(200, {
            "Content-Type": "application/json"
        });
        response.write(JSON.stringify(request.body));
        response.end();
    };

    //  update
    this.put = function (request, response) {
        var urlInfo = getObjectTypeFromUrl(request);

        repository.edit(urlInfo.objectType, request.body);

        response.writeHead(200, {
            "Content-Type": "application/json"
        });
        response.write(JSON.stringify(request.body));
        response.end();
    };

    // delete`
    this.delete = function(request, response) {
        var urlInfo = getObjectTypeFromUrl(request);

        repository.deleteById(urlInfo.objectType, urlInfo.id);

        response.writeHead(200, responseHeader);
        response.write(JSON.stringify({"result":"success"}));
        response.end();
    };
}

module.exports = new backboneServer();
