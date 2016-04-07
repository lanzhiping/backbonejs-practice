'use strict';

// var fs = require('fs');

// function compare(a, b) {
//     if (a.id < b.id) return -1;
//     if (a.id > b.id) return 1;
//     return 0;
// }

// function validateFilePath(filename) {
//     var filePath = './db/' + filename + '.js';
//     try {
//         var stats = fs.statSync(filePath);
//         if (stats.isDirectory()) {
//             throw '{0} is not a valid file.'.replace('{0}', filename);
//         }

//     } catch (e) {
//         console.log(e);
//     }

//     return filePath;
// }

// function InitDataBase(filename) {

//     this.filePath = validateFilePath(filename);

//     this.read = function (objectType) {
//         console.log('read: ' + (objectType || 'all'));

//         var fileContent = fs.readFileSync(this.filePath, 'utf8');
//         var rootObject = fileContent.length == 0 ? {} : JSON.parse(fileContent);
//         return objectType ? rootObject[objectType] : rootObject;
//     };

//     this.deleteByIdAndType = function (objectType, id) {
//         console.log('delete type:' + objectType + ' id:' + id);

//         var rootObject = this.read(),
//             updateObjectSet = rootObject[objectType];

//         if (!updateObjectSet) {
//             console.log('objects of ' + objectType + ' doesnt exist.');
//             return false;
//         }
//         var deleteObject = updateObjectSet.filter(function (item) { return item.id === id });
//         if (!deleteObject) {
//             console.log(
//                 'the object type:{0} id:{1} doesnt exist.'
//                 .replace('{0}', objectType)
//                 .replace('{1}', id));
//             return false;
//         };

//         rootObject[objectType] = updateObjectSet.filter(function (item) { return item.id != id });
//         fs.writeFileSync(this.filePath, JSON.stringify(rootObject));
//         return true;
//     };

//     this.write = function (objectType, obj) {
//         console.log('write: ' + objectType);

//         var rootObject = this.read();
//         if (rootObject[objectType] == undefined) rootObject[objectType] = [];

//         if (obj.id != undefined) {
//             rootObject[objectType].forEach(function (item, index) {
//                 if (item.id === obj.id)
//                     rootObject[objectType][index] = obj;
//                 return;
//             });
//         } else {
//             var hightestContinousElement = rootObject[objectType]
//                                         .sort(compare)
//                                         .filter(function (item, index) { return item.id == index })
//                                         .pop();

//             obj.id = hightestContinousElement && rootObject[objectType].sort(compare)[0].id === 0
//                    ? hightestContinousElement.id + 1 : 0;
//             rootObject[objectType].push(obj);
//         }

//         fs.writeFileSync(this.filePath, JSON.stringify(rootObject));
//     };
// };

var databaseFactory = require("./databaseFactory"),
    database = new databaseFactory("test"),
    todoType = "todo",
    todoRepository;

todoRepository = function() {
    this.add = function(todoObject) {
        database.write(todoType, todoObject);
    };

    this.edit = function(){
        throw "no been implemented";
    };
    this.readAll = function(){
        throw "no been implemented";
    };
    this.readById = function(){
        throw "no been implemented";
    };
    this.deleteAll = function(){
        throw "no been implemented";
    };
    this.deleteById = function(){
        throw "no been implemented";
    };
};

module.exports = new todoRepository;
