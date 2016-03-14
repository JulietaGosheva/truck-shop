(function() {
	
	var clientModules = new com.rs.client.module.ClientModules();
	var module = angular.module(clientModules.getClientControllerName());
	
	var I18NController = function ($scope) {
		initModel($scope);
	};
	
	module.controller('I18NController', ["$scope", I18NController]);
	
	var initModel = function($scope) {
		$scope.onLinkClicked = jQuery.proxy(onLinkClicked, this);
	};
	
	var onLinkClicked = function(oElement) {
		setActiveLanguage();
	};
	
	var setActiveLanguage = function(language) {
		jQuery.ajaxSetup({
			headers: {
				"X-RS-Language": language
			}
		});
	}
	
})();