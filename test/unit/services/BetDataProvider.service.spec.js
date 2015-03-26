(function() {
	'use strict';

	describe('Service: betDataProvider', function() {
		var mockValue = {
				inputValue :
					'Bet:W:1:3\nBet:W:3:5\nBet:W:4:5\nBet:W:1:16\nBet:W:2:8\nBet:W:3:22\nBet:W:4:57\n' +
					'Bet:W:1:42\nBet:W:2:98\nBet:W:3:63\nBet:P:1:40\nBet:P:2:16\nBet:P:3:82\nBet:P:4:52\nBet:P:1:18\n' +
					'Bet:P:2:74\nBet:P:3:39\nBet:P:4:105\nBet:E:1,3:82\nBet:E:3,2:27\nBet:E:1,2:5\nBet:E:2,3:61\n' +
					'Bet:E:1,3:28\nBet:E:3,2:25\nBet:E:1,2:81\nResult:2:3:1',
				outputValue: ''
			}, $httpBackend, $filter, service, constants, promise;

		beforeEach(module('bettingHost'));

		beforeEach(inject(function(_$rootScope_, $http, _$filter_, _$httpBackend_, _betDataProvider_, _Constants_) {
			$httpBackend = _$httpBackend_;
			$filter = _$filter_;
			service = _betDataProvider_;
			constants = _Constants_;

			$httpBackend.whenGET('/resources/data.txt').respond(mockValue.inputValue);

			service.data = $filter('inputFormatter')(mockValue.inputValue);

			_$rootScope_.$apply();
		}));

		afterEach(function() {
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();
		});

		//TODO FIX TEST
		describe('#getResouceFile', function() {
			it('should get a resource file to be used as default bets', function() {
				promise = service.getResourceFile();
				promise.then(function(result) {
					expect(result).toBeDefined();
				});

				$httpBackend.flush();
			});
		});

		describe('#getPayout', function() {
			it('should get dividend from `WIN` and selection `2`', function() {
				expect(service.getPayout(constants.TYPE_WIN, [2])).toBe(2.56);
			});

			it('should get dividend from `PLACE` and selection `2`', function() {
				expect(service.getPayout(constants.TYPE_PLACE, [2])).toBe(1.39);
			});

			it('should get dividend from `PLACE` and selection `3`', function() {
				expect(service.getPayout(constants.TYPE_PLACE, [3])).toBe(1.03);
			});

			it('should get dividend from `PLACE` and selection `1`', function() {
				expect(service.getPayout(constants.TYPE_PLACE, [1])).toBe(2.15);
			});

			it('should get dividend from `EXACTA` and selection `2, 3`', function() {
				expect(service.getPayout(constants.TYPE_EXACTA, [2, 3])).toBe(4.15);
			});
		});

		describe('#processOutput', function() {
			it('should get dividend from `WIN` and selection `2`', function() {
				var mockFormatted = $filter('inputFormatter')(mockValue.inputValue),
					output = service.processOutput(mockFormatted);

				//expect(output).toBe(mockValue.outputValue);
			});
		});
	});
})();


