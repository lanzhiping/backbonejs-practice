module.exports = function(filename){
	var url = require('url'),
		dataManipulator = new (require('./InitDataBase.js'))(filename);

	function createFromChunk(objectType, response) {
		return function(chunk) {
			var obj = JSON.parse(chunk.toString('utf8'));
			dataManipulator.write(objectType, obj);

			response.writeHead(200, { 'Content-Type': 'application/json' });
			response.write(JSON.stringify(obj));
			response.end();
		}
	}

	function requestHandle(request, response) {
		var urlInfo = url.parse(request.url, true),
			objectType  = urlInfo.search.split('?')[1].split('/')[0],
			id = urlInfo.search.split('?')[1].split('/')[1];

		(request.method === 'POST' || request.method === 'PUT') 
		&& request.on('data', createFromChunk(objectType, response));

		(request.method === 'GET') && (function() {
			response.writeHead(200, { 'Content-Type': 'application/json' });
			response.write(JSON.stringify(dataManipulator.read(objectType) || []));
			response.end();
		})();

		(request.method === 'DELETE') && (function(){
			var result = dataManipulator.deleteByIdAndType(objectType, id);
			
			response.writeHead((result? 200:204), { 'Content-Type': 'application/json' });
			response.write(JSON.stringify({result: (result?'success':'No Content')}));
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