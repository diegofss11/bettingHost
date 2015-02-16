(function() {
	'use strict';

	/**
	 * [TournamentController Handles CRUD for tournaments]
	 *
	 */
	function TournamentController(tournamentDeletionDialog, tournamentService, Constants) {
		var _self = this;

		function _getTournaments() {
		 	tournamentService.getTournaments().then(function(result) {
		 		if(result.status === Constants.SUCCESS) {
		 			_self.tournaments = result.data;
		 		}
		 	});
		}

		 _getTournaments();

		_self.openDeletion = tournamentDeletionDialog.activate;
		_self.close = tournamentDeletionDialog.deactivate;
	}

	TournamentController.$inject = ['tournamentDeletionDialog', 'tournamentService', 'Constants'];

	angular.module('tourManager')
		.controller('tournamentCtrl', TournamentController);
})();