(function() {
	'use strict';

	/**
	 * [BetService Serves the application with resources data and calculate result]
	 *
	 */
	function BetService($http, betHelper) {
		var _self = this;

		/*
		 * Public function
		 * Gets resource file data.txt to be processed
		 * Returns promise
		 */
		_self.getResourceFile = function() {
			return $http.get('/resources/data.txt').then(function(response) {
				return response.data;
			});
		};

		/*
		 * Public function
		 * Returns the result for the bets
		 */
		_self.calculateResult = function(formattedBets) {
			return betHelper.buildResultOutput(formattedBets);
		};

	}

	BetService.$inject = ['$http', 'betHelper'];

	angular.module('bettingHost')
		.service('betService', BetService);
})();

