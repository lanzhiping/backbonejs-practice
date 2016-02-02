module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		watch: {
			files: ['*.js', '*/**.js', '!dist/*'],
			tasks: ['uglify', 'concat']
		},

		uglify: {
			dev: {
				files: {
					'dist/main.js': ['backbone/**.js']
				}
			}
			
		},

		concat: {
			depen: {
				files: {
					'dist/modules.js': [
						'node_modules/underscore/underscore-min.js',
						'node_modules/jquery/dist/jquery.min.js',
						'node_modules/backbone/backbone-min.js',
						'node_modules/backbone.marionette/lib/backbone.marionette.min.js',
					]
				}
			}
		},

		iisexpress: {
			server: {
				options: {
					port: 3000,
					open: true,
					openPath: '/backbone/index.html'
				}
			},

			db: {
				options: {
					port: 4000,
					path: '../practice/db'
				}
			}
		}
	});


	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-iisexpress');

	grunt.registerTask('default', ['uglify', 'concat', 'watch']);

};