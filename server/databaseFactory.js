"use strict";

var fs = require("fs"),
    filepathTemplate = "./db/{0}.js",
    isDirectoryErrorTemplate = "{0} is not a valid file.";

function getFilePath (filename){
    return filepathTemplate.replace("{0}", filename);
}

function validateFilePath(filename) {
    try {
        if (fs.statSync(getFilePath(filename)).isDirectory()) {
            throw isDirectoryErrorTemplate.replace("{0}", filename);
        }
    } catch (e) {
        console.log(e);
        return false
    }

    return true;
}

function databaseFactory(filename) {

    this.filePath = validateFilePath(filename) ? getFilePath(filename) : null;

    this.read = function (objectType) {
        console.log('read: ' + (objectType || 'all'));

        var fileContent = fs.readFileSync(this.filePath, 'utf8');
        var rootObject = fileContent.length == 0 ? {} : JSON.parse(fileContent);
        return objectType ? rootObject[objectType] : rootObject;
    };

    this.write = function (objectType, obj) {
        console.log('write: ' + objectType);

        var rootObject = this.read();

        rootObject[objectType] = obj;
        fs.writeFileSync(this.filePath, JSON.stringify(rootObject));
    };
};

module.exports = databaseFactory
