(function(){
	'use strict';

	angular.module('bettingHost', ['bettingHost.tpls', 'betUtilities', 'ui.router', 'ngAnimate'])
    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider.state('/', {
            url: '/',
            controller: 'betController',
            controllerAs: 'vmBet',
            templateUrl: 'partials/Main.tpl.html'
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