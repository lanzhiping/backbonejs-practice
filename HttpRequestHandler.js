module.exports = function(areaString){
	var	fs = require('fs'),
		url = require('url'),
		path = require('path'),
		backboneServer = new (require('./backboneServer.js'))('test'),
		appStartPage = './' + areaString + '/index.html';

	return function(request, response){
		console.log("incoming request: " + request.url);
		response.statusCode = 204;

		if(request.url.indexOf('/api') === 0){
			backboneServer(request, response);
			console.log('-------------------' + (new Date).toTimeString() + '---------------------');
			return;
		}

		try {
			var uri = url.parse(request.url),
				requestAppPath = path.parse(uri.pathname),
				filename = path.join(process.cwd(), uri.pathname),
				stats = fs.statSync(filename);

			stats.isFile() 
			&& fileServer(response, filename);

			stats.isDirectory()
		 	&& (requestAppPath.base === '' || requestAppPath.base === areaString) 
		 	&& fileServer(response, appStartPage);

		}catch(e){
			errResponse(response);
		}finally{
			response.statusCode === 204	&& errResponse(response);
		}

		console.log('-------------------' + (new Date).toTimeString() + '---------------------');
		return;
	}

	function errResponse(response) {
		response.writeHead(404, { "Content-Type": "text/plain" });
		response.write("404 Not Found\n");
		response.end();
	}

	function fileServer(response, filename) {
		try{
			var fileContent = fs.readFileSync(filename, 'utf8');
			response.writeHead(200, { "Content-Type": "text/html" });
		 	response.write(fileContent, 'utf8');
		 	response.end();
		}catch(e){
			errResponse(response);
		}
	}
}
