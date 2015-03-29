(function() {
	'use strict';

	describe('Service: BetService', function() {
		var $httpBackend, betService, betHelperService;

		beforeEach(module('bettingHost'));

		beforeEach(inject(function(_$rootScope_, _$httpBackend_, _betHelper_, _betService_) {
			$httpBackend = _$httpBackend_;
			betHelperService = _betHelper_;
			betService = _betService_;

			$httpBackend.whenGET('/resources/data.txt').respond('mockResponse');
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

		describe('#calculateResult', function() {
			it('should have been called `betHelper.buildResultOutput`', function() {
				betService.calculateResult('mockData');
				expect(betHelperService.buildResultOutput).toHaveBeenCalledWith('mockData');
			});
		});
	});
})();


