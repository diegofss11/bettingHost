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
	}

	TournamentService.$inject = ['$http', 'Constants'];

	angular.module('tourManager')
		.service('tournamentService', TournamentService);
})();

