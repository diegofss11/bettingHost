(function() {
	'use strict';

	describe('Controller: dashboardController', function(){

		var $scope, ctrl, service;

		beforeEach(module('bettingHost'));

		beforeEach(inject(function(_$rootScope_, _$controller_, _betDataProvider_) {
			$scope = _$rootScope_.$new();
			service = _betDataProvider_;

			ctrl = _$controller_('dashboardController', {
				$scope: $scope
			});

			spyOn(service, 'getResourceFile').and.callThrough();

			$scope.$apply();
		}));

		describe('#init', function() {
			it('should resources data not be undefined', function() {
				expect(ctrl.mock).toBeDefined();
			});
		});
	});
})();
