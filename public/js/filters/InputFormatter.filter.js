(function() {
    'use strict';

    /**
     * [inputFormatter Formats the input value to a customized format ]
     * The input is splitted by colons
     *
     * [Format requested]
     * Bet:<product>:<selections>:<stake>
     * Result:<first>:<second>:<third>
     *
     */
    function InputFormatter() {
        return function(input) {
            var formattedObject = {
                    "bets":[]
                },
                stringified = JSON.stringify(input),
                bets = stringified.split('\\n'),
                betsLen = bets.length;

            for(var i = 0; i < betsLen; i++) {
                var bet = bets[i],
                    isBet = bet.split(':')[0],
                    type = bet.split(':')[1];

                //TODO WORKAROUND
                if (isBet === "\"Bet" || isBet === "Bet" ) {
                    var selections = bet.split(':')[2],
                        stake = bet.split(':')[3],
                        concatenatedBet = type + ':' + selections + ':' + stake;

                    formattedObject.bets.push({ "Bet": concatenatedBet });
                } else {
                    formattedObject.Result = bet.split(':')[1] + ':' + bet.split(':')[2] + ':' + bet.split(':')[3];
                }
            }

            return formattedObject;
        };
    }

    InputFormatter.$inject = ['$filter'];

    angular.module('bettingHost')
        .filter('inputFormatter', InputFormatter);
})();