'use strict';

var port = 8000,
	serverBuilder = require('./serverBuilder'),
    httpRequestHandler = require('./httpRequestHandler');

(function () {
    serverBuilder
        .withPort(process.env.PORT || port)
        .withHandler(httpRequestHandler('backbone'))
        .onSuccess(function () { console.log('server is listening at: ' + port) })
        .build()
        .start();
})();
