(function() {
	'use strict';

	/**
	 * [BetDataProviderService Serves the application with resources data]
	 *
	 */
	function BetDataProviderService($http, $filter, Constants) {
		var _self = this;

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
		 * Gets Bets array given a specific type
		 * Returns [Bets]
		 */
		function _getBetsByType(type) {
			var bets = _self.data.Bets,
				length = bets.length,
				specificBets = [];

			for (var i = 0; i < length; i++) {
				var bet = bets[i].Bet;

				if (type === bet.type) {
					specificBets.push(bet);
				}
			}

			return specificBets;
		}


		/*
		 * Private function
		 * Gets stake based on the specific bets and winner
		 * Returns totalStake
		 */
		function _getStake(bets, winner) {
			var length = bets.length,
				totalStake = 0;

			//TODO RETHINK
			winner = Array.isArray(winner) ? winner : [winner];

			for (var i = 0; i < length; i++) {
				var bet = bets[i];

				//using angular.equals since `===` compares object references
				if (angular.equals(winner, bet.selections)) {
					totalStake += bet.stake;
				}
			}

			return totalStake;
		}

		/*
		 * Private function
		 * Gets win pool value deducting company commission given specific bets and type
		 * Returns winPool
		 */
		function _getWinPool(bets, type) {
			var length = bets.length,
				winPool = 0,
				commission = _getCommissionRate(type);

			for (var i = 0; i < length; i++) {
				winPool += bets[i].stake;
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
				winBets = _getBetsByType(Constants.TYPE_WIN),
				placeBets = _getBetsByType(Constants.TYPE_PLACE),
				exactaBets = _getBetsByType(Constants.TYPE_EXACTA),
				output, payout;

			//WIN statement
			payout = _getPayout(winBets, result.winners[0], Constants.TYPE_WIN);
			output = 'Win:' + result.winners[0] + ':$' + payout + '\n';

			//PLACE statement
			for(var i = 0; i < Constants.NUMBER_OF_RUNNERS; i++) {
				payout = _getPayout(placeBets, result.winners[i], Constants.TYPE_PLACE);
				output += 'Place:' + result.winners[i] + ':$' + payout + '\n';
			}

			//EXACTA statement
			payout = _getPayout(exactaBets, [result.winners[0], result.winners[1]], Constants.TYPE_EXACTA);
			output += 'Exacta:' + result.winners[0] + ',' + result.winners[1] + ':$' + payout + '\n';

			return output;
		}

		/*
		 * Private function
		 * Get payout for a given specific bets and winner
		 * Returns payout
		 */
		function _getPayout(bets, winner, type) {
			var winPool = _getWinPool(bets, type),
				winStake = _getStake(bets, winner),
				payout = !!winStake ? winPool / winStake : winStake;

			payout = type === Constants.TYPE_PLACE ? payout / Constants.NUMBER_OF_RUNNERS : payout;

			return +payout.toFixed(2);
		};


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
		 * Gets resource file data.txt to be processed
		 * Returns promise
		 */
		_self.getResourceFile = function() {
			return $http.get('/resources/data.txt');
		};

	}

	BetDataProviderService.$inject = ['$http', '$filter', 'Constants'];

	angular.module('bettingHost')
		.service('betDataProvider', BetDataProviderService);
})();

