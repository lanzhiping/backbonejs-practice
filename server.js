var http = require('http'),
	url = require('url'),
	path = require('path'),
	fs = require('fs'),
	HttpRequestHandler = require('./HttpRequestHandler.js');

(function (http) {
	http.createServer(HttpRequestHandler('backbone')).listen(8080);
	console.log("Server is listening");
})(http);

function InitDataBase(filePath) {
	var jsonfile = require('jsonfile');
	this.filePath = filePath;

	this.write = function (objectType, obj) {
		console.log('write: ' + objectType);

		var fileContent = fs.readFileSync('db/db.js').toString('utf8'); // todo: should be implement when init
		var	rootObject = fileContent.length == 0 ? {} : JSON.parse(fileContent);
		if(rootObject[objectType] == undefined) rootObject[objectType] = [];

		if(obj.id != undefined) {
			rootObject[objectType].forEach(function(item, index){ 
				if( item.id === obj.id )
				rootObject[objectType][index] = obj;
				return ;
			});
		} else {
			var index = 0;
			rootObject[objectType].sort(compare).forEach(function(item){ if(item.id > index) return; }); // todo: id is the same
			obj.id = index.toString();
			rootObject[objectType].push(obj);
		}
		
		jsonfile.writeFileSync(this.filePath, rootObject);
	};

	this.read = function () {
		console.log('read');
		return jsonfile.readFileSync(this.filePath);
	};

	function compare(a, b) {
		if (a.id < b.id) return -1;
		if (a.id > b.id) return 1;
		return 0;
	}
}

function requestHandle(request, response) {

	(request.method === 'POST') && request.on('data', createFromChunk(request, response));

	(request.method === 'GET') && (function() {
		var dbInstance = new InitDataBase('db/test.js');
		response.writeHead(200, { 'Content-Type': 'application/json' });
		response.write(JSON.stringify(dbInstance.read()));
		response.end();
	})();
}

function debug(response, obj) {
	response.writeHead(200, { 'Content-Type': 'application/json' });
	response.write(JSON.stringify(obj));
	response.end();
}

function errResponse(response) {
	response.writeHead(404, { "Content-Type": "text/plain" });
	response.write("404 Not Found\n");
	response.end();
}

function createFromChunk(request, response) {
	
	var urlInfo = url.parse(request.url, true),
		objectType  = urlInfo.search.split('?')[1];

	console.log('handle request', urlInfo);

	return function(chunk) {
		var dbInstance = new InitDataBase('db/db.js');
		var obj = JSON.parse(chunk.toString('utf8'));
		dbInstance.write(objectType, obj);

		response.writeHead(200, { 'Content-Type': 'application/json' });
		response.write('success');
		response.end();
	}
}