(function() {

	var module = angular.module(clientModules.getClientControllerName());
	
	var TemplateController = function($scope) {
		var clientCache = com.rs.client.cache.ClientCache.prototype.getInstance();
		$scope.items = clientCache.getCacheEntry("navItems");
	};
	
	module.controller("TemplateController", ["$scope", TemplateController]);
})();