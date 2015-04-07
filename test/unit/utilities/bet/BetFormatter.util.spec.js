(function() {
    'use strict';

    describe('Service: BetFormatter', function(){
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
                input: 'Bet:W:1:3\nBet:W:2:4\nBet:W:3:5\nResult:1:3:5',
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
                input: 'Bet:E:2,3:98\nBet:E:1,3:82\nBet:E:3,2:27\nBet:E:1,2:5\nResult:2:3:1',
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
                input: 'Bet:E:2,3:98\nBet:E:1,3:82\nBet:E:3,2:27\nBet:E:1,2:5',
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
            }, betFormatterService;

        beforeEach(module('bettingHost'));

        beforeEach(inject(function(_betFormatter_) {
            betFormatterService = _betFormatter_;
        }));

        describe('#formatInput', function() {
            it('should format PLACE bet input', function() {
                var result = betFormatterService.getFormattedBets(placeBet.input);

                expect(result).toEqual(placeBet.output);
            });

            it('should format EXACTA bet input', function() {
                var result = betFormatterService.getFormattedBets(exactaBet.input);

                expect(result).toEqual(exactaBet.output);
            });

            it('should format WINNER bet input', function() {
                var result = betFormatterService.getFormattedBets(winnerBet.input);

                expect(result).toEqual(winnerBet.output);
            });

            it('should failed due to invalid input', function() {
                var result = betFormatterService.getFormattedBets(noResultBet.input);

                expect(result.Result).toBe(null);
                expect(result.Bets.length).toBe(0);
            });
        });
    });
})();
