(function() {
	'use strict';

	/**
	 * [LoginCtrl Handles login application]
	 * @param {Angular Material Service} $mdBottomSheet
	 */
	function LoginCtrl($auth, $localStorage, loginService, signInDialog){
		var _self = this;

		_self.authenticate = function(provider) {
			if(provider) {
				console.log(provider);
				$auth.authenticate(provider);
			} else {
				loginService.authenticate(_self.user)
					.success(function onAuthenticateSuccess(result){
						if(result.type === false) {

						} else {
							$localStorage.token = result.data.token;
							window.location = '/';
						}
						console.log('SUCCESS', result);
					})
					.error(function(result, status, headers, config) {
						console.log('Failed to signin');
	  				});
			}
		};

		//Opens dialog for sign in
		_self.openModal = signInDialog.activate;
	}

	LoginCtrl.$inject = ['$auth', '$localStorage', 'loginService', 'signInDialog'];

	angular.module('tourManager')
		.controller('loginCtrl', LoginCtrl);
})();