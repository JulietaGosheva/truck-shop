(function() {
	
	var module = angular.module("AdminController");
	
	var ProductDetailsController = function($scope, $routeParams, ProductLoader) {
		ProductLoader.loadProductById($routeParams.id, $scope);
	};
	
	module.controller("ProductDetailsController", ["$scope", "$routeParams", "ProductLoader", ProductDetailsController]);
})();