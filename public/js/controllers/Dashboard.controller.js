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
			}, function(error) {
				alert('Error: ' + error.data);
			});
		})();

		/*
		 * Private method
		 * Resets state for all variables bound to the view
		 */
		function _resetState() {
			//reset variables
			_self.race.output = null;
			_self.race.error = null;
			_self.isHelpVisible = false;
		}

		/*
		 * Public method
		 * Resolves race output values
		 */
		_self.processResult = function() {
			var formattedBets = $filter('inputFormatter')(_self.race.input);

			_resetState();

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