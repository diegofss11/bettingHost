(function(){
	'use strict';

	angular.module('bettingHost', ['bettingHost.tpls'])
    .constant('Constants', {
        'PRODUCT_TYPE_WIN': 'W',
        'PRODUCT_TYPE_PLACE': 'P',
        'PRODUCT_TYPE_EXACTA': 'E',

        'NUMBER_OF_RUNNERS': 3,

        'WIN_COMISSION': 0.15,
        'PLACE_COMISSION': 0.12,
        'EXACTA_COMISSION': 0.18
    });

})();