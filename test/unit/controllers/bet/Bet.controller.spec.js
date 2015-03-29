(function() {
	'use strict';

	describe('Controller: betController', function(){
		var $scope, $httpBackend, $controller,
			ctrl, betService, betFormatter,
			formattedBet = {
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
			};

		beforeEach(module('bettingHost'));

		beforeEach(inject(function(_$rootScope_, _$httpBackend_, _$controller_, _betService_, _betFormatter_) {
			$scope = _$rootScope_.$new();
			$controller = _$controller_;
			$httpBackend = _$httpBackend_;
			betService = _betService_;
			betFormatter = _betFormatter_;

			ctrl = $controller('betController', {
				$scope: $scope
			});

			$httpBackend.whenGET('/resources/data.txt').respond( {data: 'resourceFile' });
			$httpBackend.flush();

			spyOn(betService, 'getResourceFile');
			spyOn(betService, 'calculateResult');
			spyOn(betFormatter, 'getFormattedBets').and.callFake(function() {
				return formattedBet;
			});

			$scope.$apply();
		}));

		afterEach(function() {
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();
		});

		describe('#init', function() {
			it('should `race.input` be defined during controller initialization', function() {
				expect(ctrl.race.input).toBeDefined();
			});
		});

		describe('#processResult', function() {
			beforeEach(function() {
				ctrl.processResult();
			});

			it('should call `betFormatter.getFormattedBets` with given arguments', function() {
				expect(betFormatter.getFormattedBets).toHaveBeenCalledWith(ctrl.race.input);
			});

			it('should call `betService.calculateResult` from the betService with given arguments', function() {
				expect(betService.calculateResult).toHaveBeenCalledWith(formattedBet);
			});
		});
	});
})();
