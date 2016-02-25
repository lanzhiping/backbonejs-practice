'use strict';

var port = 80,
	serverBuilder = require('./serverBuilder'),
    httpRequestHandler = require('./httpRequestHandler');

(function () {
    serverBuilder
        .withPort(port)
        .withHandler(httpRequestHandler('backbone'))
        .onSuccess(function () { console.log('server is listening at: ' + port) })
        .build()
        .start();
})();
