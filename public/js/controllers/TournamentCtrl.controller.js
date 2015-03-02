(function() {
	'use strict';

	/**
	 * [TournamentController Handles CRUD for tournaments]
	 *
	 */
	function TournamentController($filter, ngTableParams, tournamentDeleteDialog, tournamentAddDialog, tournamentService, Constants) {
		var _self = this, tournaments,
			filterOrderBy = $filter('orderBy');

		_getTournaments();

		function _getTournaments() {
			tournamentService.getTournaments().then(function(result) {
				if(result.status === Constants.SUCCESS) {
					tournaments = result.data;

					/*jshint -W055 */
					_self.tableParams = new ngTableParams({
				        page: 1,
				        count: 2,
				        sorting: {
				        	name: 'asc'
				        }
				    }, {
				        total: tournaments.length,
				        getData: function($defer, params) {
				            var orderedData = params.sorting() ? filterOrderBy(tournaments, params.orderBy()) : tournaments;

				            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
				        }
				    });
	        	}
	        });
		}

		_self.addTournament = function(newTournament) {
			tournamentService.addTournament(newTournament).then(function(result) {
		 		if(result.status === Constants.SUCCESS) {
		 			alert('CREATED ' + newTournament.name);
		 			_getTournaments();
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

	TournamentController.$inject = ['$filter', 'ngTableParams', 'tournamentDeleteDialog', 'tournamentAddDialog', 'tournamentService', 'Constants'];

	angular.module('tourManager')
		.controller('tournamentCtrl', TournamentController);
})();