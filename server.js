var http = require('http'),
	HttpRequestHandler = require('./HttpRequestHandler.js');

(function (http) {
	http.createServer(HttpRequestHandler('backbone')).listen(80);
	console.log("Server is listening");
})(http);
