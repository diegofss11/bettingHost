module.exports = function( grunt ) {
	require('time-grunt')(grunt); //shows the execution time for tasks

	grunt.initConfig({
	  	pkg: grunt.file.readJSON('package.json'),
		karma: {
	        unit: {
	            configFile: 'config/karma.conf.js'
	        }
	    },
	    compass: {
			build: {
				options: {
					sassDir: 'public/styles',
					cssDir: 'public/dist/styles/css'
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
			dist: 'public/dist'
		},
		html2js: {
			options: {
				quoteChar: '\'',
				rename: function(moduleName) {
        			return moduleName.replace('../public/partials/', '');
      			},
      			module: 'bettingHost.tpls',
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
      			dest: 'public/dist/js/templatesCache.js'
    		}
		},
		injector: {
			options: {
				ignorePath: 'public/'
			},
		    app: {
		      	files: {
		      		'public/index.html' : [
		        		//JS
		        		'public/vendor/angular/angular.js',
						'public/vendor/angular-ui-router/release/angular-ui-router.js',
						'public/vendor/angular-animate/angular-animate.js',
						'public/dist/js/templatesCache.js',

		        		//APP FILES
		        		'public/js/app.js',
		        		'public/js/**/*.controller.js',
		        		'public/js/**/*.service.js',
		        		'public/js/**/*.directive.js',
		        		'public/js/**/*.filter.js',

						//CSS
		          		'public/dist/styles/css/main.css'
					]
		        }
		    }
		},
		watch: {
			html: {
				files: ['public/index.html', 'public/partials/*.tpl.html'],
				task: ['default'],
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
	grunt.loadNpmTasks('grunt-open'); //open urls and files from a grunt task
	grunt.loadNpmTasks('grunt-karma'); //karma test runner


	// ===========================================================================
  	// REGISTER TASKS ============================================================
  	// ===========================================================================

  	//TESTS
	grunt.registerTask('tdd',['clean:dist', 'compass', 'html2js', 'karma']);
	// ==========================================================================

	grunt.registerTask('default',['clean:dist', 'compass', 'html2js', 'injector', 'watch']);
};

