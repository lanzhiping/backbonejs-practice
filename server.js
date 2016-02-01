(function(http) {

	// var dbInstance = new initDataBase('db/test.js');
	// dbInstance.write({ name: "zhiping" });
	// console.log(dbInstance.read());

	var server = http.createServer(function(request, response) {

		response.writeHead(200, { "Content-Type": "text/plain" });

		// response.write('<!DOCTYPE \"html\">');
		// response.write("<html>");
		// response.write("<head>");
		// response.write("<title>Hello World Page</title>");
		// response.write("</head>");
		// response.write("<body>");
		//console.log(JSON.stringify(request));
		response.write('hello world');

		//response.write("Hello World!");


		// response.write("</body>");
		// response.write("</html>");


		response.end();
	});

	server.listen(8080);
	console.log("Server is listening");


})(require('http'));


function initDataBase(filePath) {
	var jsonfile = require('jsonfile');
	this.filePath = filePath;

	this.write = function(obj) {
		jsonfile.writeFileSync(this.filePath, obj);
	};

	this.read = function() {
		return jsonfile.readFileSync(this.filePath);
	};
}