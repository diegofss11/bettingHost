(function() {
	'use strict';

	/**
	 * [SignUp Handles sign up for the application]
	 *
	 */
	function SignUpController($http, signUpDialog, signUpService){
		var _self = this;

		_self.signUp = function() {
			signUpService.signUp(_self.newUser, function onSuccess(data) {
				console.log(data);
			}, function onError(data) {
				console.log(data);
			});
		}

		_self.close = signUpDialog.deactivate;
	};

	SignUpController.$inject = ['$http', 'signUpDialog', 'signUpService'];

	angular.module('tourManager')
		.controller('signUpCtrl', SignUpController);
})();

