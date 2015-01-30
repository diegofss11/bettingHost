(function() {
	'use strict';

	/**
	 * @ngdoc directive
	 * @name TemplateModalDirective
	 * @description 
	 * This is a template for modal
	 * @example
	   <example>
	       <div class="modal x-modal" template-modal="{{title}}" close="{{closeMethod}}">
	    </example>
	 */
	function TemplateModalDirective(){
		return {
			restrict: 'EA',
			templateUrl: 'partials/TemplateModal.tpl.html',
			transclude: true,
			scope: {
				title: '@templateModal',
				close: '&'
			}
		};
	};

	angular.module('tourManager')
		.directive('templateModal', TemplateModalDirective);
})();