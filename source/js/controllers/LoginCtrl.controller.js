(function() {
	'use strict';

	/**
	 * [LoginCtrl Handles login application]
	 * @param {Angular Material Service} $mdBottomSheet
	 */
	function LoginCtrl($auth, $localStorage, loginService, signUpDialog){
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
		}

		//Opens dialog for sign up
		_self.openModal = signUpDialog.activate;
	};

	LoginCtrl.$inject = ['$auth', '$localStorage', 'loginService', 'signUpDialog'];

	angular.module('tourManager')
		.controller('loginCtrl', LoginCtrl);
})();

