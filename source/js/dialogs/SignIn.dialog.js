(function() {
	'use strict';

	/**
	 * [Dialog that creates a sign in modal for the application]
	 *
	 */
	function SignInDialog(btfModal) {
		return btfModal({
			controller: 'signInCtrl',
		    controllerAs: 'vmSignIn',
		    templateUrl: 'partials/SignInForm.tpl.html'
		});
	};

	SignInDialog.$inject = ['btfModal'];

	angular.module('tourManager')
		.factory('signInDialog', SignInDialog);
})();

