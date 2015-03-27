(function() {
	'use strict';

	/**
	 * [BetDataProviderService Serves the application with resources data]
	 *
	 */
	function BetDataProviderService($http, $filter, Constants) {
		var _self = this;

		/*
		 * Public function
		 * Gets resource file data.txt to be processed
		 * Returns promise
		 */
		_self.getResourceFile = function() {
			return $http.get('/resources/data.txt');
		};

		/*
		 * Private function
		 * Gets company commission rate for each type
		 * Returns commissionRate
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
		}

		/*
		 * Private function
		 * Gets stake based on the type and winner bet
		 * Returns totalStake
		 */
		function _getStake(type, winner) {
			var bets = _self.data.Bets,
				length = bets.length,
				totalStake = 0,
				bet;

			//TODO RETHINK
			winner = Array.isArray(winner) ? winner : [winner];

			for (var i = 0; i < length; i++) {
				bet = bets[i].Bet;
				//using angular.equals since `===` compares object references
				if (type === bet.type && angular.equals(winner, bet.selections)) {
					totalStake += bet.stake;
				}
			}

			return totalStake;
		}

		/*
		 * Private function
		 * Gets win pool value deducting company commission
		 * Returns winPool
		 */
		function _getWinPool(type) {
			var bets = _self.data.Bets,
				length = bets.length,
				winPool = 0,
				commission = _getCommissionRate(type);

			for (var i = 0; i < length; i++) {
				var bet = bets[i].Bet;

				if (type === bet.type) {
					winPool += bet.stake;
				}
			}

			return winPool * (1 - commission);
		}

		/*
		 * Private function
		 * Calculates and formats the output given bets
		 *
		 * [Format requested]
		 * <product>:<winningSelections>:<dividend>
		 */
		function _resolveOutput(formattedBets) {
			var result = formattedBets.Result,
				output, payout;

			//WIN statement
			payout = _self.getPayout(Constants.TYPE_WIN, result.winners[0]);
			output = 'Win:' + result.winners[0] + ':$' + payout + '\n';

			//PLACE statement
			for(var i = 0; i < Constants.NUMBER_OF_RUNNERS; i++) {
				payout = _self.getPayout(Constants.TYPE_PLACE, result.winners[i]);
				output += 'Place:' + result.winners[i] + ':$' + payout + '\n';
			}

			//EXACTA statement
			payout = _self.getPayout(Constants.TYPE_EXACTA, [result.winners[0], result.winners[1]]);
			output += 'Exacta:' + result.winners[0] + ',' + result.winners[1] + ':$' + payout + '\n';

			return output;
		}

		/*
		 * Public function
		 * Returns output values given bets
		 */
		_self.processOutput = function(formattedBets) {
			var output = 'invalid input';

			_self.data = null;

			if (formattedBets) {
				_self.data = formattedBets;
				output = _resolveOutput(formattedBets);
			}

			return output;
		};

		/*
		 * Public function
		 * [IT'S PUBLIC JUST FOR TESTS PURPOSE - should be private since no information is shown in view]
		 * Get payout for a given type and winner
		 * Returns payout
		 */
		_self.getPayout = function(type, winner) {
			var winPool = _getWinPool(type),
				winStake = _getStake(type, winner),
				payout = !!winStake ? winPool / winStake : winStake;

			payout = type === Constants.TYPE_PLACE ? payout / Constants.NUMBER_OF_RUNNERS : payout;

			return +payout.toFixed(2);
		};
	}

	BetDataProviderService.$inject = ['$http', '$filter', 'Constants'];

	angular.module('bettingHost')
		.service('betDataProvider', BetDataProviderService);
})();

