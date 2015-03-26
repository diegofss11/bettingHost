(function(){
	'use strict';

	angular.module('bettingHost', ['bettingHost.tpls', 'ui.router', ])
    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider.state('/', {
            url: '/',
            controller: 'dashboardController',
            controllerAs: 'vmDashboard',
            templateUrl: 'partials/Dashboard.tpl.html'
        });
    })
    .constant('Constants', {
        'TYPE_WIN': 'W',
        'TYPE_PLACE': 'P',
        'TYPE_EXACTA': 'E',

        'NUMBER_OF_RUNNERS': 3,

        'WIN_COMMISSION': 0.15,
        'PLACE_COMMISSION': 0.12,
        'EXACTA_COMMISSION': 0.18
    });

})();