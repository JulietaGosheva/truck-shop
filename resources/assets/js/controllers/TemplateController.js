(function() {

	var clientModules = new com.rs.client.module.ClientModules();
	var module = angular.module(clientModules.getClientControllerName());
	
	var TemplateController = function($scope) {
		var navUtil = new com.rs.utils.NavigationUtil();
		$scope.items = navUtil.getNavItems();
	};
	
	module.controller("TemplateController", ["$scope", TemplateController]);
})();