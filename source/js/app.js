(function(){
	'use strict';

	angular.module('tourManager', ['btford.modal', 'tourManager.tpls', 'tourManager.exception', 'ngStorage', 'ngMessages',
        'satellizer', 'ui.bootstrap', 'ui.router'])

	//PROVIDERS
    .config(function($authProvider){
		$authProvider.google({
      		clientId: '536761838915-v9tq90luf0ok3burpimgnr1drof25kc5.apps.googleusercontent.com'
    	});

    	$authProvider.facebook({
      		clientId: '1000141996681114'
    	});
	})
    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/login");

        $stateProvider.state('login', {
            url: '/login',
            controller: 'loginCtrl',
            controllerAs: 'vmLogin',
            templateUrl: 'partials/LoginForm.tpl.html'
        });
    })
	.constant("CONSTANTS", {
        "SERVER_BASE_URL": "http://localhost:3000"
    });

})();