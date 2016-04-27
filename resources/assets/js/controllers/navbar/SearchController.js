(function() {
	
	var clientModules = new com.rs.client.module.ClientModules();

	var module = angular.module(clientModules.getClientControllerName());
	
	var SearchController = function($scope, $location, $routeParams) {
		$scope.search = function(uniqueId) {
			$scope.uniqueId = "";
			$location.url("/search/" + uniqueId);
		};
	};
	
	module.controller("SearchController", ["$scope", "$location", "$routeParams", SearchController]);
})();