(function() {
	'use strict';

	describe('Service: BetHelper', function() {
		var standardValue = {
				inputValue : {
					Bets: [
						{
							type: 'W',
							selections: [1],
							stake: 3
						},
						{
							type: 'W',
							selections: [3],
							stake: 5
						},
						{
							type: 'W',
							selections: [4],
							stake: 5
						},
						{
							type: 'W',
							selections: [1],
							stake: 16
						},
						{
							type: 'W',
							selections: [2],
							stake: 8
						},
						{
							type: 'W',
							selections: [3],
							stake: 22
						},
						{
							type: 'W',
							selections: [4],
							stake: 57
						},
						{
							type: 'W',
							selections: [1],
							stake: 42
						},
						{
							type: 'W',
							selections: [2],
							stake: 98
						},
						{
							type: 'W',
							selections: [3],
							stake: 63
						},
						{
							type: 'P',
							selections: [1],
							stake: 40
						},
						{
							type: 'P',
							selections: [2],
							stake: 16
						},
						{
							type: 'P',
							selections: [3],
							stake: 82
						},
						{
							type: 'P',
							selections: [4],
							stake: 52
						},
						{
							type: 'P',
							selections: [1],
							stake: 18
						},
						{
							type: 'P',
							selections: [2],
							stake: 74
						},
						{
							type: 'P',
							selections: [3],
							stake: 39
						},
						{
							type: 'P',
							selections: [4],
							stake: 105
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
						},
						{
							type: 'E',
							selections: [2, 3],
							stake: 61
						},
						{
							type: 'E',
							selections: [1, 3],
							stake: 28
						},
						{
							type: 'E',
							selections: [3, 2],
							stake: 25
						},
						{
							type: 'E',
							selections: [1, 2],
							stake: 81
						}
					],
					Result: { winners: [2, 3, 1] }
				},
				outputValue: 'Win:2:$2.56\nPlace:2:$1.39\nPlace:3:$1.03\nPlace:1:$2.15\nExacta:2,3:$4.15\n'
			},
			missingWinType = {
				inputValue: {
					Bets: [
						{
							type: 'P',
							selections: [4],
							stake: 105
						},
						{
							type: 'E',
							selections: [1, 2],
							stake: 81
						}
					], Result: { winners: [1, 2, 4] }
				},
				outputValue: 'Win:1:$0\nPlace:1:$0\nPlace:2:$0\nPlace:4:$0.29\nExacta:1,2:$0.82\n'
			},
			havingOnlyExactaType = {
				inputValue: {
					Bets: [
						{
							type: 'E',
							selections: [2, 3],
							stake: 80
						}
					], Result: { winners: [2, 3, 4] }
				},
				outputValue: 'Win:2:$0\nPlace:2:$0\nPlace:3:$0\nPlace:4:$0\nExacta:2,3:$0.82\n'
			}, betHelperService;

		beforeEach(module('bettingHost'));

		beforeEach(inject(function(_$rootScope_, _betHelper_) {
			betHelperService = _betHelper_;

			_$rootScope_.$apply();
		}));

		describe('#buildResultOutput', function() {
			it('should build the output based on the input - standard input', function() {
				var output = betHelperService.buildResultOutput(standardValue.inputValue);

				expect(output).toBe(standardValue.outputValue);
			});

			it('should be `$0` for `WIN` stake if not bet', function() {
				var output = betHelperService.buildResultOutput(missingWinType.inputValue);

				expect(output).toEqual(missingWinType.outputValue);
			});

			it('should be `$0` for all but `EXACTA` if only EXACTA was bet', function() {
				var output = betHelperService.buildResultOutput(havingOnlyExactaType.inputValue);

				expect(output).toEqual(havingOnlyExactaType.outputValue);
			});
		});
	});
})();


