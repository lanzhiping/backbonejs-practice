var url = require('url'),
    DataManipulatorBuilder = require('./initDataBase.js');

function debug(response, obj) {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify(obj));
    response.end();
}

function createFromChunk(dataManipulator, objectType, response) {
    return function (chunk) {
        var obj = JSON.parse(chunk.toString('utf8'));

        dataManipulator.write(objectType, obj);
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.write(JSON.stringify(obj));
        response.end();
    }
}

function backboneServer(filename) {

    var dataManipulator = new DataManipulatorBuilder(filename);

	function requestHandle(request, response) {
        
        console.log('are you in backbone server or not?')
        
		var urlInfo = url.parse(request.url, true),
			objectType  = urlInfo.search.split('?')[1].split('/')[0],
			id = urlInfo.search.split('?')[1].split('/')[1];

		(request.method === 'POST' || request.method === 'PUT') 
		&& request.on('data', createFromChunk(dataManipulator, objectType, response));

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

module.exports = backboneServer;
