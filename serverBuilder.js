'use strict';

var http = require('http');

function defaultRequestHander(req, res) {
    var logTemplate = 'In comming url: {0}.';
    console.log(logTemplate.replace('{0}', req.url));

    res.withHandler(200, { "Content-Type": "text/plain" });
    res.with('hello world!');
    res.end();
}

function serverBuilder() {
    this.withPort = function (portNumber) {
        this.portNumber = portNumber;
        return this;
    };

    this.withHandler = function (handler) {
        this.requestHandler = handler;
        return this;
    };

    this.onSuccess = function (callback) {
        this.successCallback = callback;
        return this;
    };

    this.build = function () {
        this.portNumber = this.portNumber || 8000;
        this.requestHandler = this.requestHandler || defaultRequestHander;
        this.server = http.createServer(this.requestHandler);
        this.successCallback && this.server.on('listening', this.successCallback);
        return this;
    };

    this.start = function () {
        this.server.listen(this.portNumber);
    };
}

module.exports = new serverBuilder();