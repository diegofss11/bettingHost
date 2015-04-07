exports.config = {
    specs:[
        '../test/e2e/**/*.spec.js'
    ],

    seleniumAddress: 'http://localhost:4444/wd/hub',

    jasmineNodeOpts: {
        isVerbose: true,
        showColors: true,
        includeStackTrace: true
    },

    capabilities: {
        'browserName': 'chrome'
    },

    rootElement: 'body',

    allScriptsTimeout: 20000
};