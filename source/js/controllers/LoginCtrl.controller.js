(function() {
	'use strict';

	/**
	 * [LoginCtrl Handles login application]
	 * @param {Angular Material Service} $mdBottomSheet
	 */
	function LoginCtrl($auth, loginService, signUpDialog){
		var _self = this;

		_self.authenticate = function(provider) {

			if(provider) {
				console.log(provider);
				$auth.authenticate(provider);
			}
			else {
				loginService.authenticate(_self.user,
					function validateLoginCb() {
						if (res.type == false) {
		                    alert(res.data);
		                } else {
		                    $localStorage.token = res.data.token;

		                    window.location = "/";
		                }
			        },
			        function() {
			            $rootScope.error = 'Failed to signin';
			        });
			}
		}

		//Opens dialog for sign up
		_self.openModal = signUpDialog.activate;
	};

	LoginCtrl.$inject = ['$auth', 'loginService', 'signUpDialog'];

	angular.module('tourManager')
		.controller('loginCtrl', LoginCtrl);
})();

