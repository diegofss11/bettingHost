(function(){
	'use strict';

	angular.module('tourManager', ['btford.modal', 'tourManager.tpls', 'tourManager.exception', 'ngStorage', 'ngMessages',
        'satellizer', 'ngTable', 'ui.bootstrap', 'ui.router'])

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
        $urlRouterProvider.otherwise('/login');

        // $stateProvider.state('login', {
        //     url: '/login',
        //     controller: 'loginCtrl',
        //     controllerAs: 'vmLogin',
        //     templateUrl: 'partials/Login.tpl.html'
        // }).state('dashboard', {
        //     url: '/dashboard',
        //     controller: 'dashboardCtrl',
        //     controllerAs: 'vmDashboard',
        //     templateUrl: 'partials/Dashboard.tpl.html'
        // }).state('tournaments', {
        //     url: '/tournaments',
        //     controller: 'tournamentCtrl',
        //     controllerAs: 'vmTournament',
        //     templateUrl: 'partials/Tournaments.tpl.html'
        // });

        $stateProvider.state('login', {
            url: '/login',
            controller: 'dashboardCtrl',
            controllerAs: 'vmDashboard',
            templateUrl: 'partials/Dashboard.tpl.html'
        });
    })
	.constant('Constants', {
        'SERVER_BASE_URL': 'http://localhost:3000',
        'SUCCESS': 200,
        'NO_RESPONSE': 204,
        'BAD_REQUEST': 400,
        'UNAUTHORIZED': 401,
        'FORBIDDEN': 403,
        'NOT_FOUND': 404
    });

})();