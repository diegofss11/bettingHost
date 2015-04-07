(function() {
    'use strict';

    /**
     * [betFormatter Formats and Parses the input value to a customized format]
     * The input is splitted by colons
     *
     * [Format input]
     * bet:<product>:<selections>:<stake>
     *
     *[Format output]
     *[Bets] having type, [selections] and stake property and Result having [winners]
     */

    function BetFormatter() {
        var _self = this,
            REGEX_GET_BETS = /(Bet:)[A-Z]:[0-9](,[0-9])?:[0-9]+/g,
            REGEX_GET_RESULT = /(Result:)[0-9]:[0-9]:[0-9]/g,
            COLON_DELIMITER = ':',
            COMMA_DELIMITER = ',',
            formattedObject;

        /*
         * Private function
         * Checks if the input is valid. Missing bet or Result is considered invalid
         * Returns isValid
         */
        function _isInputValid(input) {
            return input.match(REGEX_GET_BETS) && input.match(REGEX_GET_RESULT);
        }

        /*
         * Private function
         * Gets a formatted and parse to integer given a text value
         * Returns formattedSelections
         */
        function _getSelections(selections) {
            var formattedSelections = [];

            selections = selections.split(COMMA_DELIMITER);

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

                formattedObject.Bets.push(Bet);
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

        /*
         * Public function
         * Parses and formats object using regex operations
         * Returns a formatted/parsed object
         */
        _self.getFormattedBets = function(input) {
            formattedObject = {
                Bets: [],
                Result: null
            };

            if (_isInputValid(input)) {
                var bets = input.match(REGEX_GET_BETS),
                    result = input.match(REGEX_GET_RESULT)[0];

                _formatsBets(bets);
                _formatsResult(result);
            }

            return formattedObject;
        };

        return _self;
    }

    angular.module('betUtilities', [])
        .factory('betFormatter', BetFormatter);
})();