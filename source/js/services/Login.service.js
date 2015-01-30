(function() {
	'use strict';

	/**
	 * [LoginService Handles login application]
	 *
	 */
	function LoginService($http, CONSTANTS){
		var _self = this;

		_self.authenticate = function(user, success, error) {
			$http.post(CONSTANTS.SERVER_BASE_URL + '/auth/login', user)
				.success(function onAuthenticateSuccess(data){
					console.log('SUCCESS', data);
				})
				.error(function(data, status, headers, config) {
					console.log('ERROR AUTHENTICATING');
  				});
        }
	};

	LoginService.$inject = ['$http', 'CONSTANTS'];

	angular.module('tourManager')
		.service('loginService', LoginService);
})();

