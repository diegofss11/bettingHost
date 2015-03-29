(function() {
    'use strict';

    /**
     * [BetHelper bet operations]
     *
     */
    function BetHelper($filter, Constants) {
        var _self = this,
            _formattedBets;

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
            return $filter('filter')(_formattedBets, { type: type });
        }

        /*
         * Private function
         * Gets stake based on the specific bets and winner
         * Returns totalStake
         */
        function _getWinStake(bets, winners) {
            var length = bets.length,
                totalStake = 0;

            winners = Array.isArray(winners) ? winners : [winners];

            for (var i = 0; i < length; i++) {
                var bet = bets[i];

                if (angular.equals(winners, bet.selections)) {
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

        //create calculatePayout function

        /*
         * Private function
         * Get payout for a given specific bets and winner
         * Returns payout
         */
        function _getPayout(bets, winners, type) {
            var winPool = _getWinPool(bets, type),
                winStake = _getWinStake(bets, winners, type),
                payout = !!winStake ? winPool / winStake : winStake;

            if (type === Constants.TYPE_PLACE) {
                payout = payout / Constants.NUMBER_OF_RUNNERS;
            }

            return +payout.toFixed(2);
        }

        /*
         * Public function
         * Build the output string given an input already formatted
         *
         * [Format requested]
         * <product>:<winningSelections>:<dividend>
         */
        _self.buildResultOutput = function(formattedInput) {
            var result = formattedInput.Result,
                winBets, placeBets, exactaBets, output, payout;

            _formattedBets = formattedInput.Bets;
            winBets = _getBetsByType(Constants.TYPE_WIN);
            placeBets = _getBetsByType(Constants.TYPE_PLACE);
            exactaBets = _getBetsByType(Constants.TYPE_EXACTA);

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
        };
    }

    BetHelper.$inject = ['$filter', 'Constants'];

    angular.module('bettingHost')
        .factory('betHelper', BetHelper);
})();