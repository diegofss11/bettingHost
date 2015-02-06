(function() {
	'use strict';

	/**
	 * [SignIn Handles sign up for the application]
	 *
	 */
	function SignInController(signInDialog, signInService){
		var _self = this;

		_self.signIn = function() {
			signInService.signIn(_self.newUser)
				.success(function onSuccessSignIn(data) {
					alert(data);
				})
				.error(function onErrorSignIn(data) {
					alert(data);
				});
		}

		_self.close = signInDialog.deactivate;
	};

	SignInController.$inject = ['signInDialog', 'signInService'];

	angular.module('tourManager')
		.controller('signInCtrl', SignInController);
})();

