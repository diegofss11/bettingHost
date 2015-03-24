(function() {
	'use strict';

	/**
	 * [DataProviderService Serve the application with mock data]
	 *
	 */
	function DataProviderService(Constants) {
		var _self = this;

		_self.data = {
			bets: [
				{
					'Bet': 'W:1:3'
				},
				{
					'Bet': 'W:2:4'
				},
				{
					'Bet': 'W:3:5'
				},
				{
					'Bet': 'W:4:5'
				},
				{
					'Bet': 'W:1:16'
				},
				{
					'Bet': 'W:2:8'
				},
				{
					'Bet': 'W:3:22'
				},
				{
					'Bet': 'W:4:57'
				},
				{
					'Bet': 'W:1:42'
				},
				{
					'Bet': 'W:2:98'
				},
				{
					'Bet': 'W:3:63'
				},
				{
					'Bet': 'W:4:15'
				},
				{
					'Bet': 'P:1:31'
				},
				{
					'Bet': 'P:2:89'
				},
				{
					'Bet': 'P:3:28'
				},
				{
					'Bet': 'P:4:72'
				},
				{
					'Bet': 'P:1:40'
				},
				{
					'Bet': 'P:2:16'
				},
				{
					'Bet': 'P:3:82'
				},
				{
					'Bet': 'P:4:52'
				},
				{
					'Bet': 'P:1:18'
				},
				{
					'Bet': 'P:2:74'
				},
				{
					'Bet': 'P:3:39'
				},
				{
					'Bet': 'P:4:105'
				},
				{
					'Bet': 'E:1,2:13'
				},
				{
					'Bet': 'E:2,3:98'
				},
				{
					'Bet': 'E:1,3:82'
				},
				{
					'Bet': 'E:3,2:27'
				},
				{
					'Bet': 'E:1,2:5'
				},
				{
					'Bet': 'E:2,3:61'
				},
				{
					'Bet': 'E:1,3:28'
				},
				{
					'Bet': 'E:3,2:25'
				},
				{
					'Bet': 'E:1,2:81'
				},
				{
					'Bet': 'E:2,3:47'
				},
				{
					'Bet': 'E:1,3:93'
				},
				{
					'Bet': 'E:3,2:51'
				},
			],
			result: '2:3:1'
		};

		function _getComissionRate(product) {
			switch(product) {
				case Constants.PRODUCT_TYPE_WIN:
					return Constants.WIN_COMISSION;
				case Constants.PRODUCT_TYPE_PLACE:
					return Constants.PLACE_COMISSION;
				case Constants.PRODUCT_TYPE_EXACTA:
					return Constants.EXACTA_COMISSION;
			}
		};

		function _getStake(product, selections) {
			var bets = _self.data.bets,
				length = bets.length,
				totalStake = 0,
				bet, betProduct, betSelections, betStake;

			for (var i = 0; i < length; i++) {
				bet = bets[i].Bet;
				betProduct = bet.split(':')[0];
				betSelections = bet.split(':')[1];
				betStake = parseFloat(bet.split(':')[2]);

				//used double equals to compare x,x with [x, x]
				if (product === betProduct && selections == betSelections) {
					betSelections = bet.split(':')[1];
					totalStake += betStake;
				}
			}

			return totalStake;
		};

		function _getWinPool(product) {
			var bets = _self.data.bets,
				length = bets.length,
				winPool = 0,
				comission = _getComissionRate(product),
				bet, betProduct, betStake;

			for (var i = 0; i < length; i++) {
				bet = bets[i].Bet;
				betProduct = bet.split(':')[0];

				if (product === betProduct) {
					betStake = parseFloat(bet.split(':')[2]);
					winPool += betStake;
				}
			}

			return winPool * (1 - comission);
		};

		_self.getPayout = function(product, selections) {
			var winPool = _getWinPool(product),
				winStake = _getStake(product, selections),
				payout = winPool / winStake;

			if (product === Constants.PRODUCT_TYPE_PLACE) {
				payout = payout / Constants.NUMBER_OF_RUNNERS;
			}

			return +payout.toFixed(2);
		}
	}

	DataProviderService.$inject = ['Constants'];

	angular.module('bettingHost')
		.service('dataProvider', DataProviderService);
})();

