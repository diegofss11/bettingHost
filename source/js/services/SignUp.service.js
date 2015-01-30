(function() {
	'use strict';

	/**
	 * [SignUpService Handles the login creation for the application]
	 *
	 */
	function SignUpService($http, CONSTANTS){
		this.signUp = function(newUser) {
			$http.post(CONSTANTS.SERVER_BASE_URL + '/signup', newUser)
				.success(function onSuccessSignUp(data) {
					alert(data);
				})
				.error(function onErrorSignUp(data) {
					alert(data);
				});
		}
	};

	SignUpService.$inject = ['$http', 'CONSTANTS'];

	angular.module('tourManager')
		.service('signUpService', SignUpService);
})();

