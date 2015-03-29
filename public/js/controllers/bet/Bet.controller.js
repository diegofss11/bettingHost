(function() {
	'use strict';

	/**
	 * [betController handles features shown in the view]
	 *
	 */
	function BetController(betFormatter, betService) {
		var _self = this;

		/*
		 * IIFE method
		 * Get a example bet/result as default
		 */
		(function() {
			var promise = betService.getResourceFile();

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
			_self.race.output = null;
			_self.race.error = null;
			_self.isHelpVisible = false;
		}

		/*
		 * Public method
		 * Resolves race output values
		 */
		_self.processResult = function() {
			var formattedBets = betFormatter.getFormattedBets(_self.race.input);

			_resetState();

			if (formattedBets.Result && formattedBets.Bets) {
				_self.race.output = betService.calculateResult(formattedBets);
			} else {
				_self.race.error = 'Invalid input';
			}
		};
	}

	BetController.$inject = ['betFormatter', 'betService'];

	angular.module('bettingHost')
		.controller('betController', BetController);
})();