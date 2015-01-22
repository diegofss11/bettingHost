angular.module('app.modules', []).run(['$templateCache', function($templateCache) {
  $templateCache.put("../source/partials/TestTemplate.html",
    "{{ 1 + 1 }}");
  $templateCache.put("../source/partials/TestTemplate2.html",
    "{{ 5+5 }}");
}]);
