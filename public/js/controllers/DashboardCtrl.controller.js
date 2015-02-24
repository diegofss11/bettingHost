(function() {
	'use strict';

	/**
	 * [DashboardController Handles login application]
	 *
	 */
	function DashboardController() {
		var _self = this;

		_self.isVisible = true;

	}

	angular.module('tourManager')
		.controller('dashboardCtrl', DashboardController);
})();