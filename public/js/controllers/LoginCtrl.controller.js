(function() {
	'use strict';

	/**
	 * [LoginCtrl Handles login application]
	 * @param {Angular Material Service} $mdBottomSheet
	 */
	function LoginCtrl($auth, $localStorage, Constants, loginService, signInDialog){
		var _self = this;

		_self.authenticate = function(provider) {
			if(provider) {
				console.log(provider);
				$auth.authenticate(provider);
			} else {
				loginService.authenticate(_self.user)
					.success(function onAuthenticateSuccess(result){
						if(result.status !== Constants.SUCCESS) {
							alert(result.message);
						} else {
							debugger;
							$localStorage.token = result.token;
							window.location = '/index';
						}
					})
					.error(function(result, status, headers, config) {
						console.log('Failed to signin');
	  				});
			}
		};

		//Opens dialog for sign in
		_self.openModal = signInDialog.activate;
	}

	LoginCtrl.$inject = ['$auth', '$localStorage', 'Constants', 'loginService', 'signInDialog'];

	angular.module('tourManager')
		.controller('loginCtrl', LoginCtrl);
})();