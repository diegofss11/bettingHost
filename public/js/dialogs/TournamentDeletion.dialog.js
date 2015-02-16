(function() {
	'use strict';

	/**
	 * [Dialog that deletes a selected tournament]
	 *
	 */
	function TournamentDeletionDialog(btfModal) {
		return btfModal({
			controller: 'tournamentCtrl',
		    controllerAs: 'vmTournament',
		    templateUrl: 'partials/TournamentDeletionDialog.tpl.html'
		});
	}

	TournamentDeletionDialog.$inject = ['btfModal'];

	angular.module('tourManager')
		.factory('tournamentDeletionDialog', TournamentDeletionDialog);
})();

