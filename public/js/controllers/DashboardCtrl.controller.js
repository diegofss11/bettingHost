(function() {
	'use strict';

	/**
	 * [DashboardController Handles login application]
	 *
	 */
	function DashboardController() {
		var _self = this;

		_self.isVisible = true;

		_self.hideNav = function() {
			_self.isVisible = !_self.isVisible;
		};
	}

	angular.module('tourManager')
		.controller('dashboardCtrl', DashboardController);
})();