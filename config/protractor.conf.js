// Protractor configuration

exports.config = {
    allScriptsTimeout: 20000,

    specs:[
        '../test/e2e/**/*.spec.js'
    ],

    rootElement: 'body',

    //RUNNING A STANDALONE SELENIUM SERVER
    seleniumServerJar: '../node_modules/grunt-protractor-runner/node_modules/protractor/selenium/selenium-server-standalone-2.44.0.jar',

    seleniumPorter: 4444,

    capabilities: {
        'browserName': 'chrome'
    },

    framework: 'jasmine',

    jasmineNodeOpts: {
        isVerbose: false,
        showColors: true,
        includeStackTrace: true,
    },

    baseUrl: 'http://localhost:8001'
};
