module.exports = function(filename){
	var url = require('url'),
		dataManipulator = new (require('./InitDataBase.js'))(filename);

	function createFromChunk(objectType, response) {
		return function(chunk) {
			var obj = JSON.parse(chunk.toString('utf8'));
			dataManipulator.write(objectType, obj);

			response.writeHead(200, { 'Content-Type': 'application/json' });
			response.write('success');
			response.end();
		}
	}

	function requestHandle(request, response) {
		var urlInfo = url.parse(request.url, true),
			objectType  = urlInfo.search.split('?')[1];

		(request.method === 'POST') && request.on('data', createFromChunk(objectType, response));

		(request.method === 'GET') && (function() {
			response.writeHead(200, { 'Content-Type': 'application/json' });
			response.write(JSON.stringify(dataManipulator.read(objectType) || []));
			response.end();
		})();
	}

	return requestHandle;
}

function debug(response, obj) {
	response.writeHead(200, { 'Content-Type': 'application/json' });
	response.write(JSON.stringify(obj));
	response.end();
}