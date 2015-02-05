(function() {
	'use strict';

	/**
	 * [SignUp Handles sign up for the application]
	 *
	 */
	function SignUpController(signUpDialog, signUpService){
		var _self = this;

		_self.signUp = function() {
			signUpService.signUp(_self.newUser)
				.success(function onSuccessSignUp(data) {
					alert(data);
				})
				.error(function onErrorSignUp(data) {
					alert(data);
				});
		}

		_self.close = signUpDialog.deactivate;
	};

	SignUpController.$inject = ['signUpDialog', 'signUpService'];

	angular.module('tourManager')
		.controller('signUpCtrl', SignUpController);
})();

