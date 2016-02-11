module.exports = function(grunt) {

	var libs = ['node_modules/underscore/underscore-min.js'
			   ,'node_modules/jquery/dist/jquery.min.js'
			   ,'node_modules/backbone/backbone-min.js'
			   ,'node_modules/backbone.marionette/lib/backbone.marionette.min.js'
			   ,'node_modules/requirejs/require.js'
			   ],
		libsOut = './dist/modules.js',
		specs = ['**.spec.js'],
		src = ['./backbone/*.js', '!./backbone/*.spec.js'],
		srcOut = './dist/main.js';



	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		watch: {
			js:{
				files: ['*.js', '*/**.js', '!dist/*'],
				tasks: ['uglify', 'concat']	
			},
			html:{
				files: ['*/*/*.html', '!dist/*'],
				tasks: ['underscore_singlefile']		
			}
		},

		uglify: {
			dev: {
				files: {
					'dist/main.js': src
				}
			}
		},

		concat: {
			depen: {
				files: {
					'dist/modules.js': libs
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

			test: {
				options: {
					port: 8000,
					keepalive: true,
					open: true,
					path: './',
					openPath: '/_SpecRunner.html'
				}
			}
		},

		jasmine: {
	    	appTest: {
		      	src: srcOut,
		      	options: {
		      		keepRunner: true,
		      		host : 'http://localhost:8000/',
		        	specs: specs,
		        	vendor: libsOut
		    	}
	    	}
	    },

	    underscore_singlefile: {
	        options : {
	            name : '_templates',
	            separartor : '\n\n'
	        },
	        build: {
	            src: 'backbone/*/*.html',
	            dest: 'dist/tpls.js'
	        }
	    }

	});


	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-iisexpress');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-underscore-singlefile');

	grunt.registerTask('default', ['uglify', 'concat', 'watch']);
};