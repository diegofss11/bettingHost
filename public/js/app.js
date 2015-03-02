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

        $stateProvider.state('login', {
            url: '/login',
            authenticate: false,
            controller: 'loginCtrl',
            controllerAs: 'vmLogin',
            templateUrl: 'partials/Login.tpl.html'

        }).state('dashboard', {
            url: '/dashboard',
            authenticate: true,
            controller: 'dashboardCtrl',
            controllerAs: 'vmDashboard',
            templateUrl: 'partials/Dashboard.tpl.html'

        }).state('tournaments', {
            url: '/tournaments',
            authenticate: true,
            controller: 'tournamentCtrl',
            controllerAs: 'vmTournament',
            templateUrl: 'partials/Tournaments.tpl.html'
        }).state('tournaments.edit', {
            url: '/tournaments',
            controller: 'tournamentCtrl',
            controllerAs: 'vmTournament',
            template: 'EDIT TOURNAMENT'
        });
    })

    .run(['$rootScope', '$state', '$localStorage', function ($rootScope, $state, $localStorage) {
        $state.transitionTo('login');

        $rootScope.$on('$stateChangeStart', function(event, toState) {
            if(toState.authenticate && !$localStorage.token) {
                //is not authenticated
                $state.transitionTo('login');
                event.preventDefault();
            }
        });
    }])

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