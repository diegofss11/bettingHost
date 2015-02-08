var Dgeni = require('dgeni');

module.exports = function( grunt ) {
	require('time-grunt')(grunt); //shows the execution time for tasks

	grunt.initConfig({
	  	pkg: grunt.file.readJSON('package.json'),
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
					sassDir: 'public/styles',
					cssDir: 'public/dist/styles/css'
				}
			}
		},
		uglify: {
		    app: {
		    	files: {
		        	'public/dist/js/output.min.js': ['public/dist/js/temp/Annotated.js']
		      	}
		    }
  		},
  		jshint: {
			all: {
				options: {
					jshintrc: '.jshintrc'
				},
				src: [
					'public/js/**/*.js',
				  	'test/**/*.js',
				  	'!node_modules/**/*.js'
				]
			}
		},
		clean: {
			dist: 'public/dist',
			temp: 'public/dist/js/temp'
		},
		html2js: {
			options: {
				quoteChar: '\'',
				rename: function(moduleName) {
        			return moduleName.replace('../public/partials/', '');
      			},
      			module: 'tourManager.tpls',
      			base: 'public',
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
				src: ['public/partials/*.tpl.html'],
      			dest: 'public/dist/js/templates_cache.js'
    		}
		},
		injector: {
			options: {},
		    app: {
		      	files: {
		      		'public/index.html' : [
		        		//JS
		        		'/vendor/jquery/dist/jquery.js',
		        		'/vendor/angular/angular.js',
		        		'/vendor/angular-animate/angular-animate.js',
		        		'/vendor/angular-aria/angular-aria.js',
		        		'/vendor/angular-ui-router/release/angular-ui-router.js',
		        		'/vendor/angular-modal/modal.js',
		        		'/vendor/angular-bootstrap/ui-bootstrap.js',
		        		'/vendor/angular-messages/angular-messages.js',
		        		'/dist/js/templates_cache.js',
		        		'/vendor/satellizer/satellizer.js',
		        		'/vendor/ngstorage/ngStorage.js',

		        		//APP FILES
		        		'/js/app.js',
		        		'/js/**/*.controller.js',
		        		'/js/**/*.service.js',
		        		'/js/**/*.directive.js',
		        		'/js/**/*.decorator.js',
		        		'/js/**/*.dialog.js',

						//CSS
		          		'/dist/styles/css/main.css'
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
	            	'public/dist/js/temp/Annotated.js' : ['public/js/**/*.js']
	            }
	        }
    	},
		watch: {
			html: {
				files: ['public/index.html', 'public/partials/*.tpl.html'],
				options: {
					livereload: true
				}
			},
			js: {
				files: 'public/js/**/*.js',
				tasks: ['jshint'],
				options: {
					spawn: true,
					reload: true
				}
       		},
      		sass: {
      			files: ['public/styles/*.scss'],
      			tasks: ['compass']
      		},
      		livereload: {
		       	files: ['public/dist/styles/css/main.css'],
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

	grunt.registerTask('default',['clean:dist', 'compass', 'html2js', 'injector', 'clean:temp', 'watch']);

	grunt.registerTask('build',['clean:dist', 'compass', 'html2js', 'injector' ,'jshint', 'ngAnnotate', 'dgeni', 'uglify', 'watch', 'clean:temp']);
};

