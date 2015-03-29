(function() {
    'use strict';

    fdescribe('Service: BetFormatter', function(){
        var placeBet = {
                input: 'Bet:P:4:72\nResult:4:1:2',
                output: {
                    Bets: [
                        {
                            type: 'P',
                            selections: [4],
                            stake: 72
                        }
                    ],
                    Result: {
                        winners: [4, 1, 2]
                    }
                }
            },
            winnerBet = {
                input: 'Bet:W:1:3\nbet:W:2:4\nbet:W:3:5\nResult:1:3:5',
                output: {
                    Bets: [
                        {
                            type: 'W',
                            selections: [1],
                            stake: 3
                        },
                        {
                            type: 'W',
                            selections: [2],
                            stake: 4
                        },
                        {
                            type: 'W',
                            selections: [3],
                            stake: 5
                        }
                    ],
                    Result: {
                        winners: [1, 3, 5]
                    }
                }
            },
            exactaBet = {
                input: 'Bet:E:2,3:98\nbet:E:1,3:82\nbet:E:3,2:27\nbet:E:1,2:5\nResult:2:3:1',
                output: {
                    Bets: [
                        {
                            type: 'E',
                            selections: [2, 3],
                            stake: 98
                        },
                        {
                            type: 'E',
                            selections: [1, 3],
                            stake: 82
                        },
                        {
                            type: 'E',
                            selections: [3, 2],
                            stake: 27
                        },
                        {
                            type: 'E',
                            selections: [1, 2],
                            stake: 5
                        }
                    ],
                    Result: {
                        winners: [2, 3, 1]
                    }
                }
            },
            noResultBet = {
                input: 'Bet:E:2,3:98\nbet:E:1,3:82\nbet:E:3,2:27\nbet:E:1,2:5',
                output: {
                    Bets: [
                        {
                            type: 'P',
                            selections: [4],
                            stake: 72
                        }
                    ],
                    Result: {
                        winners: [4, 1, 2]
                    }
                }
            };

        beforeEach(module('bettingHost'));

        beforeEach(inject(function(_$filter_) {
            filterInputFormatter = _$filter_('inputFormatter');
        }));

        describe('#formatInput', function() {
            it('should format PLACE bet input', function() {
                var result = filterInputFormatter(placeBet.input);

                expect(result).toEqual(placeBet.output);
            });

            it('should format EXACTA bet input', function() {
                var result = filterInputFormatter(exactaBet.input);

                expect(result).toEqual(exactaBet.output);
            });

            it('should format WINNER bet input', function() {
                var result = filterInputFormatter(winnerBet.input);

                expect(result).toEqual(winnerBet.output);
            });

            it('should failed due to invalid input', function() {
                var result = filterInputFormatter(noResultBet.input);

                expect(result.Result).toBe(null);
                expect(result.Bets.length).toBe(0);
            });
        });
    });
})();
