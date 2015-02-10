(function() {
	'use strict';

	/**
	 * [Dialog that creates a sign in modal for the application]
	 *
	 */
	function RegisterUserDialog(btfModal) {
		return btfModal({
			controller: 'registerUserCtrl',
		    controllerAs: 'vmRegisterUser',
		    templateUrl: 'partials/RegisterUser.tpl.html'
		});
	}

	RegisterUserDialog.$inject = ['btfModal'];

	angular.module('tourManager')
		.factory('RegisterUserDialog', RegisterUserDialog);
})();

