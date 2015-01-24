angular.module('tourManager.tpls', []).run(['$templateCache', function($templateCache) {
    $templateCache.put('partials/TestTemplate2.tpl.html',
        '{{ 5+5 }}');
}]);
