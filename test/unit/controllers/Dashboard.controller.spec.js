(function() {
	'use strict';

	describe('Controller: dashboardController', function(){

		var $scope, $httpBackend,
			ctrl, service, innerFilterSpy, filter;

		beforeEach(module('bettingHost'));

		beforeEach(inject(function(_$rootScope_, _$httpBackend_, _$filter_, _$controller_, _betDataProvider_) {
			$scope = _$rootScope_.$new();
			$httpBackend = _$httpBackend_;
			service = _betDataProvider_;
			filter = jasmine.createSpy().and.returnValue('formattedBets');
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

		describe('#processResult', function() {
			beforeEach(function() {
				ctrl.processResult();
			});

			it('should call filter with given arguments', function() {
				expect(innerFilterSpy).toHaveBeenCalledWith('inputFormatter');
				expect(filter).toHaveBeenCalledWith(ctrl.race.input);
			});

			it('should `processOutput` be called from the server defined filter with given arguments', function() {
				expect(service.processOutput).toHaveBeenCalledWith('formattedBets');
			});
		});
	});
})();
