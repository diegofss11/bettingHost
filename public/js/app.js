(function(){
	'use strict';

	angular.module('bettingHost', ['bettingHost.tpls'])
    .constant('ProductType', {
        'WIN': 'W',
        'PLACE': 'P',
        'EXACTA': 'E'
    });

})();