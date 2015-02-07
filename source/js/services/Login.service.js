(function() {
	'use strict';

	/**
	 * [LoginService Handles login application]
	 *
	 */
	function LoginService($http, CONSTANTS){
		var _self = this;

		_self.authenticate = function(user, success, error) {
			return $http.post(CONSTANTS.SERVER_BASE_URL + '/authenticate', user);
		};
	}

	LoginService.$inject = ['$http', 'CONSTANTS'];

	angular.module('tourManager')
		.service('loginService', LoginService);
})();

