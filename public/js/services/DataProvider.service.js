(function() {
	'use strict';

	/**
	 * [DataProviderService Serve the application with mock data]
	 *
	 */
	function DataProviderService(ProductType) {
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

		_self.getWinPool = function(product) {
			var bets = _self.data.bets,
				length = bets.length,
				winPool = 0,
				bet, betProduct, betSelections, betStake;

			for (var i = 0; i < length; i++) {
				bet = bets[i].Bet;
				betProduct = bet.split(':')[0];

				if (product === betProduct) {
					betSelections = bet.split(':')[1];
					betStake = parseFloat(bet.split(':')[2]);
					console.log(betStake)
					winPool += betStake;
				}
			}

			return winPool;
		};
	}

	DataProviderService.$inject = ['ProductType'];

	angular.module('bettingHost')
		.service('dataProvider', DataProviderService);
})();

