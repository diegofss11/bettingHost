(function() {
	'use strict';

	/**
	 * [TournamentController Handles CRUD for tournaments]
	 *
	 */
	function TournamentController($scope, tournamentDeleteDialog, tournamentAddDialog, tournamentService, Constants) {
		var _self = this;

		_getTournaments();

		function _getTournaments() {
		 	tournamentService.getTournaments().then(function(result) {
		 		if(result.status === Constants.SUCCESS) {
		 			_self.tournaments = result.data;
		 		}
		 	});
		}

		_self.addTournament = function(newTournament) {
			tournamentService.addTournament(newTournament).then(function(result) {
		 		if(result.status === Constants.SUCCESS) {
		 			alert("CREATED " + newTournament.name);
		 			_self.tournaments = result.data;
		 			_self.closeAddTournamentDialog();
		 		}
		 	});
		};

		_self.deleteTournament = function(tournament) {
		 	tournamentService.deleteTournament(tournament).then(function(result) {
		 		if(result.status === Constants.SUCCESS) {
		 			_getTournaments();
		 			_self.closeDeleteDialog();
		 		} else {
		 			console.log(result);
		 		}
		 	});
		};

		_self.openDeleteDialog = tournamentDeleteDialog.activate;
		_self.closeDeleteDialog = tournamentDeleteDialog.deactivate;
		_self.openAddTournamentDialog = tournamentAddDialog.activate;
		_self.closeAddTournamentDialog = tournamentAddDialog.deactivate;
	}

	TournamentController.$inject = ['$scope', 'tournamentDeleteDialog', 'tournamentAddDialog', 'tournamentService', 'Constants'];

	angular.module('tourManager')
		.controller('tournamentCtrl', TournamentController);
})();