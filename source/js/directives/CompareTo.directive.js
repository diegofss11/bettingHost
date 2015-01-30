(function() {
	'use strict';

	/**
	 * @ngdoc directive
	 * @name CompareToDirective
	 * @description
	 * This is a directive that compare the inputs
	 * @example
	   <example>
	       <div compare-to="value">
	    </example>
	 */
	function CompareToDirective(){
		return {
			require: "ngModel",
			scope: {
				otherModelValue: "=compareTo"
			},
			link: function(scope, element, attributes, ngModel) {

				ngModel.$validators.compareTo = function(modelValue) {
					return modelValue === scope.otherModelValue;
				};

				scope.$watch("otherModelValue", function() {
					ngModel.$validate();
				});
			}
    	};
	};

	angular.module('tourManager')
		.directive('compareTo', CompareToDirective);
})();