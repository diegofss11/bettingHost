(function() {
	'use strict';

	describe('Controller: testTournament', function(){

		var $scope, $filter, $q, $httpBackend, ctrl,
			tournamentService, Constants, tournamentDeleteDialog;

		beforeEach(module('tourManager', 'btford.modal', 'tourManager.tpls'));

		beforeEach(inject(function(_$rootScope_, _$controller_, _$filter_, _$q_, _$httpBackend_, _tournamentService_, _tournamentDeleteDialog_, _Constants_) {
			$scope = _$rootScope_.$new();
			$filter = _$filter_;
			$q = _$q_;
			$httpBackend = _$httpBackend_;
			tournamentService = _tournamentService_;
			tournamentDeleteDialog = _tournamentDeleteDialog_;
			Constants = _Constants_;

			ctrl = _$controller_('tournamentCtrl', {
				$scope: $scope
			});

			//spyOn(tournamentService, 'getTournaments').and.callThrough();
			tournamentService.getTournaments = jasmine.createSpy('getTournaments').and.returnValue($q.when('mockedAccounts'));
			// $httpBackend.expectGET('/tournaments').respond('');
			// $httpBackend.flush();

			$scope.$apply();
		}));

		xdescribe("#init", function() {
			it('should call `getTournaments`', function(){
				expect(tournamentService.getTournaments).toHaveBeenCalled();
			});
		});
	});
})();
