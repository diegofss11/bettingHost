(function() {
	'use strict';

	/**
	 * [LoginCtrl Handles login application]
	 * @param {Angular Material Service} $mdBottomSheet
	 */
	function LoginCtrl(loginService){
		var _self = this;

		_self.validateLogin = function() {
			loginService.validateLogin(_self.user, function() {
				if (res.type == false) {
                    alert(res.data);
                } else {
                    $localStorage.token = res.data.token;

                    window.location = "/";
                }
            }, function() {
                $rootScope.error = 'Failed to signin';
            });
		}
	};

	LoginCtrl.$inject = ['loginService'];

	angular.module('tourManager')
		.controller('loginCtrl', LoginCtrl);
})();

