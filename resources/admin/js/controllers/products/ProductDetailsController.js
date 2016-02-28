(function() {
	
	var moduleNames = new com.rs.module.ModuleNames();
	
	var adminControllerName = moduleNames.getAdminControllerName();
	var productRetrieverName = moduleNames.getProductRetrieverName();
	
	var module = angular.module(adminControllerName);
	
	var ProductDetailsController = function($scope, $routeParams, ProductRetriever) {
		ProductRetriever.loadProductById($routeParams.id, $scope);
	};
	
	module.controller("ProductDetailsController", ["$scope", "$routeParams", productRetrieverName, ProductDetailsController]);
})();