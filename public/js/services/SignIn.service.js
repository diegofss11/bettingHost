(function() {
	'use strict';

	/**
	 * [SignInService Handles the login creation for the application]
	 *
	 */
	function SignInService($http, Constants){
		this.register = function(newUser) {
			return $http.post(Constants.SERVER_BASE_URL + '/register', newUser);
		};
	}

	SignInService.$inject = ['$http', 'Constants'];

	angular.module('tourManager')
		.service('signInService', SignInService);
})();

