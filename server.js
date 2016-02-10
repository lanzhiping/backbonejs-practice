var http = require('http'),
	HttpRequestHandler = require('./HttpRequestHandler.js');

(function (http) {
	http.createServer(HttpRequestHandler('backbone')).listen(8080);
	console.log("Server is listening");
})(http);
