(function() {
	'use strict';

	/**
	 * @ngdoc directive
	 * @name TestDirective
	 * @description
	 * This is a test directive
	 * @example
	   <example>
	       <div test-directive></div>
	    </example>
	 */

	angular.module('tourManager')
		.directive('testDirective', function(){
			return {
				restrict: 'EA',
				templateUrl: 'partials/TestTemplate.html'
			};
		});
})();