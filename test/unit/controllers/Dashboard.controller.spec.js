(function() {
	'use strict';

	describe('Controller: dashboardController', function(){

		var $scope, $httpBackend, $controller,
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

		function _createController(hasFilterValid) {
			if (!hasFilterValid) {
				formattedBet.Result = null;
			}

			filter = jasmine.createSpy().and.returnValue(formattedBet);
			innerFilterSpy = jasmine.createSpy().and.returnValue(filter);

			ctrl = $controller('dashboardController', {
				$scope: $scope,
				$filter: innerFilterSpy
			});

			$scope.$apply();

			$httpBackend.flush();
		}

		beforeEach(module('bettingHost'));

		beforeEach(inject(function(_$rootScope_, _$httpBackend_, _$filter_, _$controller_, _betDataProvider_) {
			$scope = _$rootScope_.$new();
			$controller = _$controller_;
			$httpBackend = _$httpBackend_;
			service = _betDataProvider_;

			$httpBackend.whenGET('/resources/data.txt').respond( {data: 'resourceFile' });
			spyOn(service, 'processOutput');
		}));

		afterEach(function() {
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();
		});

		describe('#init', function() {
			it('should `race.input` be defined during controller initialization', function() {
				_createController(true);
				expect(ctrl.race.input).toBeDefined();
			});
		});

		describe('#processResult - valid input', function() {
			beforeEach(function() {
				_createController(true);
				ctrl.processResult();
			});

			it('should call filter with given arguments', function() {
				expect(innerFilterSpy).toHaveBeenCalledWith('inputFormatter');
				expect(filter).toHaveBeenCalledWith(ctrl.race.input);
			});

			it('should call `processOutput` from the service with given arguments', function() {
				expect(service.processOutput).toHaveBeenCalledWith(formattedBet);
			});
		});

		describe('#processResult - invalid input', function() {
			beforeEach(function() {
				_createController(false);
				ctrl.processResult();
			});

			it('should output error if bet is invalid', function() {
				expect(ctrl.race.error).toBe('Invalid input');
			});

			it('should not call processOutput if bet is invalid', function() {
				expect(service.processOutput).not.toHaveBeenCalled();
			});
		});
	});
})();
