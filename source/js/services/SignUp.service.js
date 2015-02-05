(function() {
	'use strict';

	/**
	 * [SignUpService Handles the login creation for the application]
	 *
	 */
	function SignUpService($http, CONSTANTS){
		this.signUp = function(newUser) {
			return $http.post(CONSTANTS.SERVER_BASE_URL + '/signup', newUser);
		}
	};

	SignUpService.$inject = ['$http', 'CONSTANTS'];

	angular.module('tourManager')
		.service('signUpService', SignUpService);
})();

