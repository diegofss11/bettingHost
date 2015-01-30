(function() {
	'use strict';

	/**
	 * [Dialog that creates a sign Up modal for the application]
	 *
	 */
	function SignUpDialog(btfModal) {
		return btfModal({
			controller: 'signUpCtrl',
		    controllerAs: 'vmSignUp',
		    templateUrl: 'partials/SignupForm.tpl.html'
		});
	};

	SignUpDialog.$inject = ['btfModal'];

	angular.module('tourManager')
		.factory('signUpDialog', SignUpDialog);
})();

