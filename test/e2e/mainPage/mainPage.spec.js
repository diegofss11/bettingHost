(function() {
	'use strict';

	describe('E2E Testing', function(){	
	    var pageObjects = require('../pageObjects.js');

	    beforeEach( function () {
	        browser.get('/'); //navigates the router to the route
	        browser.waitForAngular();
	    });

	    it('Should body be defined', function () {
	    	expect(pageObjects.testElement).toBeDefined();
	    });
	});
})();


