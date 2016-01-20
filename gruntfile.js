module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		watch: {
			files: ['**/*.js'],
			//tasks: ['jshint']
		},

		iisexpress: {
			server: {
				options: {
					port: 3000,
					open: true,
					openPath: '/backbone/index.html'
				}
			}
		}
	});


	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-iisexpress');

	grunt.registerTask('default', ['iisexpress', 'watch']);

};