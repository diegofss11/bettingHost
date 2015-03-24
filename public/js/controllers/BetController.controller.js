(function() {
	'use strict';

	/**
	 * [BetController Handles dashboard application]
	 *
	 */
	function BetController(dataProvider) {
		var _self = this;

		_self.mock = dataProvider.data;

		_self.getWinPoolValue = function() {
			return 0;
		}
	}

	BetController.$inject = ['dataProvider'];

	angular.module('bettingHost')
		.controller('betController', BetController);
})();