(function() {
	'use strict';

	fdescribe('Controller: dashboardController', function(){

		var $scope, $httpBackend,
			ctrl, service, innerFilterSpy, filter,
			formattedBet = {
				Bets: [
					{
						Bet: {
							type: 'P',
							selections: [4],
							stake: 72
						}
					}
				],
				Result: {
					winners: [4, 1, 2]
				}
			};

		beforeEach(module('bettingHost'));

		beforeEach(inject(function(_$rootScope_, _$httpBackend_, _$filter_, _$controller_, _betDataProvider_) {
			$scope = _$rootScope_.$new();
			$httpBackend = _$httpBackend_;
			service = _betDataProvider_;
			filter = jasmine.createSpy().and.returnValue(formattedBet);
			innerFilterSpy = jasmine.createSpy().and.returnValue(filter);

			ctrl = _$controller_('dashboardController', {
				$scope: $scope,
				$filter: innerFilterSpy
			});

			$httpBackend.whenGET('/resources/data.txt').respond( {data: 'resourceFile' });
			spyOn(service, 'processOutput');

			$scope.$apply();
			$httpBackend.flush();
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

		fdescribe('#processResult', function() {
			beforeEach(function() {
				ctrl.processResult();
			});

			it('should call filter with given arguments', function() {
				expect(innerFilterSpy).toHaveBeenCalledWith('inputFormatter');
				expect(filter).toHaveBeenCalledWith(ctrl.race.input);
			});

			it('should call `processOutput` from the service with given arguments', function() {
				expect(service.processOutput).toHaveBeenCalledWith(formattedBet);
			});

			it('should output error if bet is invalid', function() {
				expect(ctrl.race.error).toBe('Invalid input text');
			});

			fit('should not call processOutput if bet is invalid', function() {
				expect(service.processOutput).not.toHaveBeenCalled();
			});
		});
	});
})();
