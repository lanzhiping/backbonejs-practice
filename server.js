console.log('hello world');

(function(http) {

	var dbInstance = new initDataBase('db/test.js');
	dbInstance.write({ name: "zhiping" });
	console.log(dbInstance.read());

	//var server = http.createServer(function(request, response) {
	//	response.writeHead(200, { "Content-Type": "text/html" });
	//	response.write('<!DOCTYPE \"html\">');
	//	response.write("<html>");
	//	response.write("<head>");
	//	response.write("<title>Hello World Page</title>");
	//	response.write("</head>");
	//	response.write("<body>");
	//	response.write("Hello World!");
	//	response.write("</body>");
	//	response.write("</html>");


	//	response.end();
	//});

	//server.listen(8080);
	//console.log("Server is listening");


})(require('http'));


function initDataBase(filePath) {
	var jsonfile = require('jsonfile');
	this.filePath = filePath;

	this.write = function(obj) {
		jsonfile.writeFile(this.filePath, obj, function(err) {
			console.error('write json to file error', err);
		});
	};

	this.read = function() {
		return jsonfile.readFileSync(this.filePath);
	};
}