(function() {
	'use strict';

	/**
	 * [Dialog that deletes a selected tournament]
	 *
	 */
	function TournamentAddDialog(btfModal) {
		return btfModal({
			controller: 'tournamentCtrl',
		    controllerAs: 'vmTournament',
		    templateUrl: 'partials/TournamentAddDialog.tpl.html'
		});
	}

	TournamentAddDialog.$inject = ['btfModal'];

	angular.module('tourManager')
		.factory('tournamentAddDialog', TournamentAddDialog);
})();

