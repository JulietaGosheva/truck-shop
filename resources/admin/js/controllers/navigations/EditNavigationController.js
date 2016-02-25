(function() {
	
	var RestClient= null;
	var HeaderUtil = null;
	var DestinationUtil = null;
	
	var moduleNames = new com.rs.module.ModuleNames();
	var registry = com.rs.registry.Registry.prototype.getInstance();
	
	var module = angular.module(moduleNames.getApplicationName());
	
	var EditNavigationController = function($scope, $http, NavigationRetriever) {
		initModel($scope);
		
		RestClient = registry.getReference(moduleNames.getRestClientName(), $http);
		HeaderUtil = registry.getReference(moduleNames.getHeaderUtilName());
		DestinationUtil = registry.getReference(moduleNames.getDestinationUtilName());
		
		NavigationRetriever.loadItems($scope);
	};
	
	var initModel = function ($scope) {
		$scope.subMenuEnabled = false;
		$scope.buttonText = "Редактирай";
	};
	
	module.controller("EditNavigationController", ["$scope", "$http", moduleNames.getNavigationItemRetrieverName(), EditNavigationController]);
	
	
	
})();