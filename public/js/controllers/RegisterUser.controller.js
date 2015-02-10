(function() {
	'use strict';

	/**
	 * [RegisterUser Handles sign in for the application]
	 *
	 */
	function RegisterUserController(Constants, registerUserDialog, signInService){
		var _self = this;

		_self.register = function() {
			signInService.register(_self.newUser)
				.success(function onSuccessRegister(result) {
					if(result.status !== Constants.SUCCESS) {
						alert(result.message);
					}
					else {
						alert('User saved successfully');
					}
				})
				.error(function onErrorRegister(result) {
					alert(result.message);
				});
		};

		_self.close = registerUserDialog.deactivate;
	}

	RegisterUserController.$inject = ['Constants', 'registerUserDialog', 'RegisterUserService'];

	angular.module('tourManager')
		.controller('registerUserCtrl', RegisterUserController);
})();

