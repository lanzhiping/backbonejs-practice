'use strict';

var port = 80,
    http = require('http'),
	serverBuilder = require('./serverBuilder.js'),
    httpRequestHandler = require('./HttpRequestHandler.js');

(function () {
    serverBuilder
        .withPort(port)
        .withHandler(httpRequestHandler('backbone'))
        .onSuccess(function () { console.log('server is listening at: ' + port) })
        .build()
        .start();
})();
