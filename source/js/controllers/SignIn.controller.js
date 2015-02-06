(function() {
	'use strict';

	/**
	 * [SignIn Handles sign up for the application]
	 *
	 */
	function SignInController(signInDialog, signInService){
		var _self = this;

		_self.register = function() {
			signInService.register(_self.newUser)
				.success(function onSuccessRegister(data) {
					alert(data);
				})
				.error(function onErrorRegister(data) {
					alert(data);
				});
		}

		_self.close = signInDialog.deactivate;
	};

	SignInController.$inject = ['signInDialog', 'signInService'];

	angular.module('tourManager')
		.controller('signInCtrl', SignInController);
})();

