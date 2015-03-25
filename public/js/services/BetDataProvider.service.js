(function() {
	'use strict';

	/**
	 * [BetDataProviderService Serves the application with resources data]
	 *
	 */
	function BetDataProviderService($http, Constants) {
		var _self = this;

		/*
		 * Public function
		 * Gets resource file data.txt to be processed
		 */
		_self.getResourceFile = function() {
			return $http.get('/resources/data.txt');
		};

		/*
		 * Private function
		 * Gets company commission rate for each type
		 */
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

		/*
		 * Private function
		 * Gets stake based on the type and selections
		 */
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

		/*
		 * Private function
		 * Gets win pool value deducting company commission
		 */
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

		/*
		 * Private function
		 * Calculates and formats the output given bets
		 *
		 * [Format requested]
		 * <product>:<winningSelections>:<dividend>
		 */
		function _resolveOutput(formattedBets) {
			var result = formattedBets.Result,
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

			return output;
		}

		/*
		 * Public function
		 * Returns output values given bets
		 */
		_self.processOutput = function(formattedBets) {
			var output = 'invalid input';

			if(formattedBets) {
				_self.data = formattedBets;
				output = _resolveOutput(formattedBets);
			}

			return output;
		};

		/*
		 * Public function
		 * Get payout for a given type and selections
		 */
		_self.getPayout = function(type, selections) {
			var winPool = _getWinPool(type),
				winStake = _getStake(type, selections),
				payout = winPool / winStake;

			if (type === Constants.TYPE_PLACE) {
				payout = payout / Constants.NUMBER_OF_RUNNERS;
			}

			return +payout.toFixed(2);
		}
	}

	BetDataProviderService.$inject = ['$http', 'Constants'];

	angular.module('bettingHost')
		.service('betDataProvider', BetDataProviderService);
})();

