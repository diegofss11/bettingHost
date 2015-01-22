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

	angular.module('app')
		.directive('testDirective', function(){
			return {
				restrict: 'EA',
				templateUrl: '/source/partials/TestTemplate.html'						
			};
		});
})();  




