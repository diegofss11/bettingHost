(function() {
	'use strict';

	/**
	 * [LoginService Handles login application]
	 *
	 */
	function LoginService($http, Constants) {
		var _self = this;

		_self.authenticate = function(user) {
			return $http.post(Constants.SERVER_BASE_URL + '/authenticate', user);
		};
	}

	LoginService.$inject = ['$http', 'Constants'];

	angular.module('tourManager')
		.service('loginService', LoginService);
})();

