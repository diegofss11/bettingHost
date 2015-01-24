(function(){
	'use strict';

	angular.module('tourManager', ['tourManager.tpls', 'tourManager.exception', 'ngMaterial'])
	.constant("CONSTANTS", {
        "SERVER_BASE_URL": "http://localhost:3000"
    });
})();