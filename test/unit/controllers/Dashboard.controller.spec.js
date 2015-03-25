(function() {
	'use strict';

	describe('Controller: dashboardController', function(){

		var $scope, ctrl, dataProvider;

		beforeEach(module('bettingHost'));

		beforeEach(inject(function(_$rootScope_, _$controller_, _dataProvider_) {
			$scope = _$rootScope_.$new();
			dataProvider = _dataProvider_;

			ctrl = _$controller_('dashboardController', {
				$scope: $scope
			});

			$scope.$apply();
		}));

		describe('#init', function() {
			it('should resources data not be undefined', function() {
				expect(ctrl.mock).toBeDefined();
			});
		});
	});
})();
