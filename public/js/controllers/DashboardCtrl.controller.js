(function() {
	'use strict';

	/**
	 * [DashboardController Handles login application]
	 * @param {Angular Material Service} $mdBottomSheet
	 */
	function DashboardController() {
		var _self = this;

		_self.hideNav() = function() {
			_self.isVisible = !_self.isVisible;
		}

	}

	angular.module('tourManager')
		.controller('dashboardCtrl', DashboardController);
})();