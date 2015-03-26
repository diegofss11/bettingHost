(function() {
    'use strict';

    /**
     * [inputFormatter Formats and parse the input value to a customized format]
     * The input is splitted by colons
     *
     * [Format requested]
     * Bet:<product>:<selections>:<stake>
     * Result:<first>:<second>:<third>
     *
     */

    var REGEX_GET_BETS = /(Bet:)[A-Z]:[0-9](,[0-9])?:[0-9]+/g,
        REGEX_GET_RESULT = /(Result:)[0-9]:[0-9]:[0-9]/g,
        COLON_DELIMITER = ':',
        COMMA_DELIMITER = ',',
        formattedObject = {
            Bets: [],
            Result: null
        };

    function InputFormatter() {
        return function(input) {
            var bets = input.match(REGEX_GET_BETS),
                result = input.match(REGEX_GET_RESULT)[0];

            _formatsBets(bets);
            _formatsResult(result);

            return formattedObject;
        };
    }

    /*
     * Private function
     * Gets a formatted and parse to integer given a text value
     * Returns formattedSelections
     */
    function _getSelections(selections) {
        var selections = selections.split(COMMA_DELIMITER),
            formattedSelections = [];

        for(var i = 0; i < selections.length; i++) {
             formattedSelections.push(+selections[i]);
        }

        return formattedSelections;
    }

    /*
     * Private method
     * Formats bets to a requested format
     */
    function _formatsBets(bets) {
        for(var i = 0; i < bets.length; i++) {
            var bet = bets[i],
                Bet = {
                    type: bet.split(COLON_DELIMITER)[1],
                    selections: _getSelections(bet.split(COLON_DELIMITER)[2]),
                    stake: parseFloat(bet.split(COLON_DELIMITER)[3])
                };

            formattedObject.Bets.push({ 'Bet': Bet });
        }
    }

    /*
     * Private method
     * Formats and parse to integer the result to a requested format
     */
    function _formatsResult(result) {
        var Result = {
            winners : [ +result.split(COLON_DELIMITER)[1], +result.split(COLON_DELIMITER)[2], +result.split(COLON_DELIMITER)[3]]
        };

        formattedObject.Result = Result;
    }

    InputFormatter.$inject = ['$filter'];

    angular.module('bettingHost')
        .filter('inputFormatter', InputFormatter);
})();