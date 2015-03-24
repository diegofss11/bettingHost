(function() {
	'use strict';

	describe('Controller: betController', function(){

		var $scope, ctrl, dataProvider;

		beforeEach(module('bettingHost'));

		beforeEach(inject(function(_$rootScope_, _$controller_, _dataProvider_) {
			$scope = _$rootScope_.$new();
			dataProvider = _dataProvider_;

			ctrl = _$controller_('betController', {
				$scope: $scope
			});

			$scope.$apply();
		}));

		describe('#init', function() {
			it('should mock data not be undefined', function() {
				expect(ctrl.mock).toBeDefined();
			});
		});
	});
})();
