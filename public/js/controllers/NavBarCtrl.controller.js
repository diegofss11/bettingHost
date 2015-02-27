(function() {
	'use strict';

	/**
	 * [NavBarController Handles navigation bar]
	 *
	 */
	function NavBarController() {
		var _self = this;

		_self.isVisible = true;

	}

	angular.module('tourManager')
		.controller('navBarCtrl', NavBarController);
})();