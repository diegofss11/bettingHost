(function() {
	'use strict';

	/**
	 * [dashboardController Handles dashboard application]
	 *
	 */
	function DashboardController($filter, betDataProvider) {
		var _self = this;

		/*
		 * IIFE method
		 * Get a example bet/result as default
		 */
		(function() {
			var promise = betDataProvider.getResourceFile();

			promise.then(function(result) {
				 _self.race = {
					input: result.data
				};
			});
		})();

		/*
		 * Public method
		 * Resolves race output values
		 */
		_self.processResult = function() {
			var formattedBets = $filter('inputFormatter')(_self.race.input);

			_self.race.output = betDataProvider.processOutput(formattedBets);
		};
	}

	DashboardController.$inject = ['$filter', 'betDataProvider'];

	angular.module('bettingHost')
		.controller('dashboardController', DashboardController);
})();