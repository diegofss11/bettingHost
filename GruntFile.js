var Dgeni = require('dgeni');

module.exports = function( grunt ) {
	require('time-grunt')(grunt); //shows the execution time for tasks

	grunt.initConfig({
	  	pkg: grunt.file.readJSON('package.json'),

		connect: { //task
			server:{ //target
				options: { //target option
					port: 8001,
					hostname: 'localhost', // Change this to '0.0.0.0' to access the server from outside.
					keepalive: true,
					open: true
				}
			}
		},
		karma: {
	        unit: {
	            configFile: 'config/karma.conf.js'
	        }
	    },
	    protractor: {
      		options: {
        		keepAlive: true,
        		noColor: false,
        		configFile: 'config/protractor.conf.js'
      		},
      		run: {},
    	},
	    compass: {
			build: {
				options: {
					sassDir: 'source/styles',
					cssDir: 'source/dist/styles/css'
				}
			}
		},
		uglify: {
		    app: {
		    	files: {
		        	'source/dist/js/output.min.js': ['source/dist/js/temp/Annotated.js']
		      	}
		    }
  		},
  		jshint: {
			all: {
				options: {
					jshintrc: '.jshintrc'
				},
				src: [
					'source/js/**/*.js',
				  	'test/**/*.js',
				  	'!node_modules/**/*.js'
				]
			}
		},
		clean: {
			dist: 'source/dist',
			temp: 'source/dist/js/temp'
		},
		html2js: {
			options: {
				quoteChar: '\'',
				rename: function(moduleName) {
        			return moduleName.replace('../source/partials/', '');
      			},
      			module: 'tourManager.tpls',
      			base: 'source',
      			indentString: '    ',
      			singleModule: true,
				useStrict: true,
				htmlmin: {
					collapseBooleanAttributes: true,
					collapseWhitespace: true,
					removeAttributeQuotes: true,
					removeComments: true,
					removeEmptyAttributes: true,
					removeRedundantAttributes: true,
					removeScriptTypeAttributes: true,
					removeStyleLinkTypeAttributes: true
				}
			},
			main: {
				src: ['source/partials/*.tpl.html'],
      			dest: 'source/dist/js/templates_cache.js'
    		}
		},
		injector: {
			options: {},
		    app: {
		      	files: {
		      		'index.html' : [
		        		//JS
		        		'bower_components/jquery/dist/jquery.js',
		        		'bower_components/angular/angular.js',
		        		'bower_components/angular-animate/angular-animate.js',
		        		'bower_components/angular-aria/angular-aria.js',
		        		'bower_components/angular-ui-router/release/angular-ui-router.js',
		        		'bower_components/angular-modal/modal.js',
		        		'bower_components/angular-bootstrap/ui-bootstrap.js',
		        		'bower_components/angular-messages/angular-messages.js',
		        		'source/dist/js/templates_cache.js',
		        		'bower_components/satellizer/satellizer.js',
		        		'bower_components/ngstorage/ngStorage.js',

		        		//APP FILES
		        		'source/js/app.js',
		        		'source/js/**/*.controller.js',
		        		'source/js/**/*.service.js',
		        		'source/js/**/*.directive.js',
		        		'source/js/**/*.decorator.js',
		        		'source/js/**/*.dialog.js',

						//CSS
		          		'source/dist/styles/css/main.css'
		        	]
		        }
		    },
		},
		ngAnnotate: {
	        options: {
	            singleQuotes: true
	        },
	        app: {
	            files: {
	            	'source/dist/js/temp/Annotated.js' : ['source/js/**/*.js']
	            }
	        }
    	},
		open: {
			build: {
				path: 'http://127.0.0.1:8001',
      			app: 'Google Chrome'
			}
		},
		watch: {
			html: {
				files: ['index.html', 'source/partials/*.tpl.html'],
				options: {
					livereload: true
				}
			},
			js: {
				files: 'source/js/**/*.js',
				tasks: ['jshint'],
				options: {
					spawn: true,
					reload: true
				}
       		},
      		sass: {
      			files: ['source/styles/*.scss'],
      			tasks: ['compass']
      		},
      		livereload: {
		       	files: ['source/dist/styles/css/main.css'],
		       	options: {
					livereload: true,
					livereloadOnError: false
				}
		    }
    	}

  	});

	// ===========================================================================
  	// EVENTS ====================================================================
  	// ===========================================================================
	grunt.event.on('watch', function(action, filepath, target) {
  		grunt.log.writeln('EVENT: ' + target + ': ' + filepath + ' has ' + action);
	});



  	// ===========================================================================
  	// LOAD GRUNT PLUGINS ========================================================
    // ===========================================================================
	grunt.loadNpmTasks('grunt-contrib-compass'); //compile SASS to CSS - must install compass through gem - gem install compass
	grunt.loadNpmTasks('grunt-contrib-connect'); //connect a webservice
	grunt.loadNpmTasks('grunt-contrib-clean'); //
	grunt.loadNpmTasks('grunt-contrib-jshint'); //keep JavaScript code consistent
	grunt.loadNpmTasks('grunt-contrib-uglify');	//minimify javascript files
	grunt.loadNpmTasks('grunt-contrib-watch'); //run predefined tasks whenever watched file patterns are added, changed or deleted.
	grunt.loadNpmTasks('grunt-html2js'); //converts AngularJS templates to JavaScript
	grunt.loadNpmTasks('grunt-injector'); //injects css and js in a file
	grunt.loadNpmTasks('grunt-ng-annotate'); //adds and removes AngularJS dependency injection using annotations
	grunt.loadNpmTasks('grunt-protractor-runner'); //plugin for protractor runner
	grunt.loadNpmTasks('grunt-open'); //open urls and files from a grunt task
	grunt.loadNpmTasks('grunt-karma'); //karma test runner


	// ===========================================================================
  	// REGISTER TASKS ============================================================
  	// ===========================================================================

  	//TESTS
	grunt.registerTask('test',['karma']);
	grunt.registerTask('test-protractor',['protractor']);
	// ==========================================================================


	grunt.registerTask('dgeni', 'Generate docs via dgeni.', function() {
		var done = this.async(),
			dgeni = new Dgeni([require('./docs/dgeni-conf')]);

		dgeni.generate().then(done);
	});

	grunt.registerTask('default',['clean:dist', 'compass', 'html2js', 'injector', 'connect:server', 'open:build', 'clean:temp', 'watch']);

	grunt.registerTask('build',['clean:dist', 'compass', 'html2js', 'injector' ,'jshint', 'ngAnnotate', 'dgeni', 'uglify', 'connect:server', 'open:build', 'watch', 'clean:temp']);
};

