"use strict";

var http = require("http"),
    defaultPort = 8000;

function defaultRequestHander(req, res) {
    var logTemplate = "In comming url: {0}.";
    console.log(logTemplate.replace("{0}", req.url));

    res.withHandler(200, {
        "Content-Type": "text/plain"
    });
    res.with("hello world!");
    res.end();
}

function onServerEvent(req, res) {
    var logTemplate = "In comming url: {0}.";
    console.log(logTemplate.replace("{0}", req.url));

    res.on("finish", function() {
        console.log("Finish request :" + req.url + " in " + new Date());
    });
}

function onSuccessStart() {
    console.log('server is listening at: ' + this.portNumber);
}

function ServerBuilder() {
    this.withPort = function(portNumber) {
        this.portNumber = portNumber;
        return this;
    };

    this.withHandler = function(handler) {
        this.requestHandler = handler;
        return this;
    };

    this.onSuccess = function(callback) {
        this.successCallback = callback;
        return this;
    };

    this.build = function() {
        this.requestHandler = this.requestHandler || defaultRequestHander;
        this.server = http.createServer(this.requestHandler);
        this.portNumber = this.portNumber || defaultPort;
        this.server.on("request", onServerEvent);
        this.server.on("listening", onSuccessStart.bind(this));
        this.successCallback && this.server.on("listening", this.successCallback);
        return this;
    };

    this.start = function() {
        this.build();
        this.server.listen(this.portNumber);
    };
}

module.exports = new ServerBuilder();