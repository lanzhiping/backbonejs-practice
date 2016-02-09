module.exports = function InitDataBase(filename) {

	var fs = require('fs'),
		filePath = './db/'+ filename + '.js';

	function compare(a, b) {
		if (a.id < b.id) return -1;
		if (a.id > b.id) return 1;
		return 0;
	}

	try{
		var stats = fs.statSync(filePath);
		stats.isDirectory() && (function(){throw '"' + filename + '" is not vaild.';})();

		this.read = function () {
			console.log('read');
			return fs.readFileSync(filePath, 'utf8');
		};

		this.write = function (objectType, obj) {
			console.log('write: ' + objectType);

			var fileContent = this.read(); // todo: should be implement when init
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
			
			fs.writeFileSync(filePath, JSON.stringify(rootObject));
		};

	}catch(e){
		throw '"' + filename + '" is not vaild.';
	}
};
