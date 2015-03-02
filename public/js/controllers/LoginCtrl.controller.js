(function() {
	'use strict';

	/**
	 * [LoginController Handles login application]
	 * @param {Angular Material Service} $mdBottomSheet
	 */
	function LoginController($auth, $localStorage, $state, Constants, loginService, registerUserDialog) {
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
							$state.transitionTo('dashboard');
						}
					})
					.error(function(result) {
						console.log(result.message);
	  				});
			}
		};

		//Opens dialog for register
		_self.openModal = registerUserDialog.activate;
	}

	LoginController.$inject = ['$auth', '$localStorage', '$state', 'Constants', 'loginService', 'registerUserDialog'];

	angular.module('tourManager')
		.controller('loginCtrl', LoginController);
})();