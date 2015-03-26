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

			if (formattedBets.Result && formattedBets.Bets) {
				_self.race.output = betDataProvider.processOutput(formattedBets);
			} else {
				_self.race.error = 'Invalid input text';
			}
		};
	}

	DashboardController.$inject = ['$filter', 'betDataProvider'];

	angular.module('bettingHost')
		.controller('dashboardController', DashboardController);
})();