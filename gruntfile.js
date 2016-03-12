"use strict";

var gruntConfig = require("./grunt/gruntTaskConfig.js"),
    packageJson, packages, gruntPackages;

function initGrunt(grunt) {
    packageJson = grunt.file.readJSON('package.json');
    
    packages = Object.keys(packageJson.devDependencies);
    
    gruntPackages = packages.filter(function(packageName) {
        return packageName.indexOf("grunt-") === 0 && packageName !== "grunt-cli";
    });
}

function initGruntConfig(grunt) {
    grunt.initConfig(gruntConfig.config);
}

function loadPackages(grunt) {
    gruntPackages.forEach(function(packageName) {
        grunt.loadNpmTasks(packageName);
    });
}

function resigterTasks(grunt) {
    Object.keys(gruntConfig.tasks)
        .forEach(function(taskName) {
            grunt.registerTask(taskName, gruntConfig.tasks[taskName]);
        });
}

function gruntfile(grunt) {
    initGrunt(grunt);
    initGruntConfig(grunt);
    loadPackages(grunt);
    resigterTasks(grunt);
}

module.exports = gruntfile;
