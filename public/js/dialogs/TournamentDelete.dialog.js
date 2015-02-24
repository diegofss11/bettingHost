(function() {
	'use strict';

	/**
	 * [Dialog that deletes a selected tournament]
	 *
	 */
	function TournamentDeleteDialog(btfModal) {
		return btfModal({
			controller: 'tournamentCtrl',
		    controllerAs: 'vmTournament',
		    templateUrl: 'partials/TournamentDeleteDialog.tpl.html'
		});
	}

	TournamentDeleteDialog.$inject = ['btfModal'];

	angular.module('tourManager')
		.factory('tournamentDeleteDialog', TournamentDeleteDialog);
})();

