(function() {
	'use strict';

	/**
	 * [TournamentService Handles CRUD for tournaments]
	 *
	 */
	function TournamentService($http, Constants) {
		this.getTournaments = function() {
			return $http.get(Constants.SERVER_BASE_URL + '/tournaments');
		};

		this.addTournament = function(newTournament) {
			return $http.post(Constants.SERVER_BASE_URL + '/tournaments', newTournament);
		};

		this.deleteTournament = function(tournament) {
			return $http.delete(Constants.SERVER_BASE_URL + '/tournaments/' + tournament._id);
		};
	}

	TournamentService.$inject = ['$http', 'Constants'];

	angular.module('tourManager')
		.service('tournamentService', TournamentService);
})();

