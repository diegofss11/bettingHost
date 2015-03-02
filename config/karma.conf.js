// Karma configuration

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        //LIBRARY FILES
        'public/vendor/jquery/dist/jquery.js',
        'public/vendor/angular/angular.js',
        'public/vendor/angular-mocks/angular-mocks.js',
        'public/vendor/angular-animate/angular-animate.js',
        'public/vendor/angular-aria/angular-aria.js',
        'public/vendor/angular-ui-router/release/angular-ui-router.js',
        'public/vendor/angular-modal/modal.js',
        'public/vendor/angular-bootstrap/ui-bootstrap.js',
        'public/vendor/angular-messages/angular-messages.js',
        'public/dist/js/templates_cache.js',
        'public/vendor/satellizer/satellizer.js',
        'public/vendor/ngstorage/ngStorage.js',
        'public/vendor/ng-table/dist/ng-table.js',

        //APP FILES
        'public/js/app.js',
        'public/js/**/*.controller.js',
        'public/js/**/*.service.js',
        'public/js/**/*.directive.js',
        'public/js/**/*.decorator.js',
        'public/js/**/*.dialog.js',

        //TESTS FILES
        'test/unit/**/*.spec.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
