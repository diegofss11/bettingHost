(function() {
	'use strict';

	/**
	 * [dashboardController Handles dashboard application]
	 *
	 */
	function DashboardController(betDataProvider) {
		var _self = this;

		_self.mock = betDataProvider.data;

		_self.getWinPoolValue = function() {
			return 0;
		}
	}

	DashboardController.$inject = ['betDataProvider'];

	angular.module('bettingHost')
		.controller('dashboardController', DashboardController);
})();