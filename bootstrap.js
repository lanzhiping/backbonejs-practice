'use strict';

var port = 80,
    http = require('http'),
	serverBuilder = require('./serverBuilder.js');

(function (http) {

    serverBuilder
        .withPort(port)
        .withHandler(HttpRequestHandler('backbone'))
        .onSuccess(function () { console.log('server is listening at' + port) })
        .build()
        .start();

    //http.createServer(HttpRequestHandler('backbone')).listen(80);
    //console.log("Server is listening");
})(http);
