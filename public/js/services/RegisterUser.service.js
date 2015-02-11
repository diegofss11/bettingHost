(function() {
	'use strict';

	/**
	 * [RegisterUserService Handles the login creation for the application]
	 *
	 */
	function RegisterUserService($http, Constants) {
		this.register = function(newUser) {
			return $http.post(Constants.SERVER_BASE_URL + '/register', newUser);
		};
	}

	RegisterUserService.$inject = ['$http', 'Constants'];

	angular.module('tourManager')
		.service('registerUserService', RegisterUserService);
})();

