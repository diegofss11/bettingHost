(function() {
	'use strict';

	/**
	 * [SignInService Handles the login creation for the application]
	 *
	 */
	function SignInService($http, CONSTANTS){
		this.signIn = function(newUser) {
			return $http.post(CONSTANTS.SERVER_BASE_URL + '/signin', newUser);
		}
	};

	SignInService.$inject = ['$http', 'CONSTANTS'];

	angular.module('tourManager')
		.service('signInService', SignInService);
})();

