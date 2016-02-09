var http = require('http'),
	url = require('url'),
	path = require('path'),
	fs = require('fs'),
	HttpRequestHandler = require('./HttpRequestHandler.js');

(function (http) {
	http.createServer(HttpRequestHandler('backbone')).listen(8080);
	console.log("Server is listening");
})(http);
