var http = require('http'),
	url = require('url'),
	path = require('path'),
	fs = require('fs');

(function (http) {
	http.createServer(httpRequestHandler).listen(8080);
	console.log("Server is listening");
})(http);

function InitDataBase(filePath) {
	var jsonfile = require('jsonfile');
	this.filePath = filePath;

	this.write = function (objectType, obj) {
		console.log('write: ' + objectType);

		var fileContent = fs.readFileSync('db/test.js').toString('utf8');
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
			rootObject[objectType].sort(compare).forEach(function(item){ if(item.id > index) return; });
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

function httpRequestHandler(request, response) {

	console.log("request coming in: " + request.url);

	var uri = url.parse(request.url).pathname,
		filename = path.join(process.cwd(), uri);

	fs.stat(filename, function(err, stats) {
		if (err) {
			errResponse(response);
			return;
		}

		if (stats.isDirectory()) {
			if (filename.slice(-1).toLowerCase() != filename.slice(-1).toUpperCase()) filename.substr(0, filename.length - 1);
			if (fs.statSync(filename).isDirectory()) filename += '\\index.html';

			fs.stat(filename, function(err, stats) {
				if (err) {
					requestHandle(request, response);
					return;
				}

				fileServer(response, filename);
			});
		} else {
			fileServer(response, filename);
		}
	});
	
	console.log('-----------------' + (new Date).toTimeString() + '---------------------');
}

function fileServer(response, filename) {

	fs.readFile(filename, "binary", function(err, file) {
		if (err) {
			response.writeHead(500, { "Content-Type": "text/plain" });
			response.write(err + "\n");
			response.end();
			return;
		}

		response.writeHead(200, { "Content-Type": "text/html" });
		response.write(file, "binary");
		response.end();
	});
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
		objectType  = urlInfo.search.split('/')[1];
	console.log('handle request', urlInfo);

	return function(chunk) {
		var dbInstance = new InitDataBase(urlInfo.pathname + '/db.js');
		var obj = JSON.parse(chunk.toString('utf8'));
		dbInstance.write(objectType, obj);

		response.writeHead(200, { 'Content-Type': 'application/json' });
		response.write('success');
		response.end();
	}
}