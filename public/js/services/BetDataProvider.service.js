(function() {
	'use strict';

	/**
	 * [BetDataProviderService Serves the application with mock data]
	 *
	 */
	function BetDataProviderService($http, Constants) {
		var _self = this;

		(function() {
			$http.get('/mock/data.json').then(function(response) {
				_self.data = response;
			});
		})();

		function _getCommissionRate(type) {
			switch(type) {
				case Constants.TYPE_WIN:
					return Constants.WIN_COMMISSION;
				case Constants.TYPE_PLACE:
					return Constants.PLACE_COMMISSION;
				case Constants.TYPE_EXACTA:
					return Constants.EXACTA_COMMISSION;
				default:
					return 0;
			}
		};

		function _getStake(type, selections) {
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
				if (type === betProduct && selections == betSelections) {
					betSelections = bet.split(':')[1];
					totalStake += betStake;
				}
			}

			return totalStake;
		};

		function _getWinPool(type) {
			var bets = _self.data.bets,
				length = bets.length,
				winPool = 0,
				commission = _getCommissionRate(type),
				bet, betProduct, betStake;

			for (var i = 0; i < length; i++) {
				bet = bets[i].Bet;
				betProduct = bet.split(':')[0];

				if (type === betProduct) {
					betStake = parseFloat(bet.split(':')[2]);
					winPool += betStake;
				}
			}

			return winPool * (1 - commission);
		};

		_self.getPayout = function(type, selections) {
			var winPool = _getWinPool(type),
				winStake = _getStake(type, selections),
				payout = winPool / winStake;

			if (type === Constants.TYPE_PLACE) {
				payout = payout / Constants.NUMBER_OF_RUNNERS;
			}

			return +payout.toFixed(2);
		}

		_self.resolveOutput = function() {
			var result = _self.data.result,
				horses = result.split(':'),
				output, payout;

			payout = _self.getPayout(Constants.TYPE_WIN, horses[0]);
			output = 'Win:' + horses[0] + ':$' + payout + '\n';

			for(var i = 0; i < Constants.NUMBER_OF_RUNNERS; i++) {
				payout = _self.getPayout(Constants.TYPE_PLACE, horses[i]);
				output += 'Place:' + horses[i] + ':$' + payout + '\n';
			}

			payout = _self.getPayout(Constants.TYPE_EXACTA, [horses[0], horses[1]]);
			output += 'Exacta:' + horses[0] + ',' + horses[1] + ':$' + payout + '\n';

			_self.output = output;
		}
	}

	BetDataProviderService.$inject = ['$http', 'Constants'];

	angular.module('bettingHost')
		.service('betDataProvider', BetDataProviderService);
})();

