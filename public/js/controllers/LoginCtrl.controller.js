(function() {
	'use strict';

	/**
	 * [LoginController Handles login application]
	 * @param {Angular Material Service} $mdBottomSheet
	 */
	function LoginController($auth, $localStorage, Constants, loginService, registerUserDialog) {
		var _self = this;

		_self.authenticate = function(provider) {
			if(provider) {
				console.log(provider);
				$auth.authenticate(provider);
			} else {
				loginService.authenticate(_self.user)
					.success(function onAuthenticateSuccess(result) {
						if(result.status !== Constants.SUCCESS) {
							alert(result.message);
						} else {
							$localStorage.token = result.token;
							window.location = '/dashboard';
						}
					})
					.error(function(result, status, headers, config) {
						console.log(result.message);
	  				});
			}
		};

		//Opens dialog for register
		_self.openModal = registerUserDialog.activate;
	}

	LoginController.$inject = ['$auth', '$localStorage', 'Constants', 'loginService', 'registerUserDialog'];

	angular.module('tourManager')
		.controller('loginCtrl', LoginController);
})();