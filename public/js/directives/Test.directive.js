(function() {
	'use strict';

	/**
	 * @ngdoc directive
	 * @name NavBarDirective
	 * @description
	 * This handles the navigation bar of the application
	 * @example
	   <example>
	       <nav navbar></nav>">
	    </example>
	 */
	function NavBarDirective(){
		return {
			restrict: 'EA',
			templateUrl: 'partials/NavBar.tpl.html',
			controller: 'navBarCtrl',
			controllerAs: 'vmNavBar'
		};
	}

	angular.module('bettingHost')
		.directive('navBar', NavBarDirective);
})();