(function() {
	'use strict';

	fdescribe('Service: BetService', function() {
		var standardValue = {
				inputValue :
					'Bet:W:1:3\nbet:W:3:5\nbet:W:4:5\nbet:W:1:16\nbet:W:2:8\nbet:W:3:22\nbet:W:4:57\n' +
					'Bet:W:1:42\nbet:W:2:98\nbet:W:3:63\nbet:P:1:40\nbet:P:2:16\nbet:P:3:82\nbet:P:4:52\nbet:P:1:18\n' +
					'Bet:P:2:74\nbet:P:3:39\nbet:P:4:105\nbet:E:1,3:82\nbet:E:3,2:27\nbet:E:1,2:5\nbet:E:2,3:61\n' +
					'Bet:E:1,3:28\nbet:E:3,2:25\nbet:E:1,2:81\nResult:2:3:1',
				outputValue: 'Win:2:$2.56\nPlace:2:$1.39\nPlace:3:$1.03\nPlace:1:$2.15\nExacta:2,3:$4.15\n'
			},
			missingWinType = {
				inputValue : 'Bet:P:1:40\nbet:P:2:16\nbet:P:3:82\nbet:P:4:52\nbet:P:1:18\n' +
					'Bet:P:2:74\nbet:P:3:39\nbet:P:4:105\nbet:E:1,3:82\nbet:E:3,2:27\n' +
					'Bet:E:1,2:5\nbet:E:2,3:61\nbet:E:1,3:28\nbet:E:3,2:25\nbet:E:1,2:81\nResult:2:3:1',
				outputValue: 'Win:2:$0\nPlace:2:$1.39\nPlace:3:$1.03\nPlace:1:$2.15\nExacta:2,3:$4.15\n'
			},
			havingOnlyExactaType = {
				inputValue : 'Bet:E:1,3:82\nbet:E:3,2:27\nbet:E:1,2:5\nbet:E:2,3:61\nbet:E:1,3:28\nbet:E:3,2:25\nbet:E:1,2:81\nResult:2:3:1',
				outputValue: 'Win:2:$0\nPlace:2:$0\nPlace:3:$0\nPlace:1:$0\nExacta:2,3:$4.15\n'
			}, $httpBackend, betService, betHelperService;

		beforeEach(module('bettingHost'));

		beforeEach(inject(function(_$rootScope_, $http, _$httpBackend_, _betHelper_, _betService_) {
			$httpBackend = _$httpBackend_;
			betHelperService = _betHelper_;
			betService = _betService_;

			$httpBackend.whenGET('/resources/data.txt').respond(standardValue.inputValue);
			spyOn(betHelperService, 'buildResultOutput');

			_$rootScope_.$apply();
		}));

		afterEach(function() {
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();
		});

		describe('#getResouceFile', function() {
			it('should get a resource file to be used as default bets', function() {
				var promise = betService.getResourceFile();

				promise.then(function(result) {
					expect(result).toBeDefined();
				});

				$httpBackend.flush();
			});
		});

		fdescribe('#calculateResult', function() {
			fit('should have been called `betHelper.buildResultOutput`', function() {
				betService.calculateResult('mockData');
				expect(betHelperService.buildResultOutput).toHaveBeenCalledWith('mockData');
			});

			it('should match the result given an input', function() {
				var result = $filter('inputFormatter')(standardValue.inputValue),
					output = betService.processOutput(result);

				expect(output).toEqual(standardValue.outputValue);
			});

			it('should be `$0` for `WIN` stake if not bet', function() {
				var result = $filter('inputFormatter')(missingWinType.inputValue),
					output = betService.processOutput(result);

				expect(output).toEqual(missingWinType.outputValue);
			});

			it('should be `$0` for all but `EXACTA` if only EXACTA was bet', function() {
				var result = $filter('inputFormatter')(havingOnlyExactaType.inputValue),
					output = betService.processOutput(result);

				expect(output).toEqual(havingOnlyExactaType.outputValue);
			});
		});
	});
})();


