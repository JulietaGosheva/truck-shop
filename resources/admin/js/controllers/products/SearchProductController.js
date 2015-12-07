(function() {
	
	var module = angular.module("AdminController");
	
	var SearchProductController = function($scope, $location, EndpointHelper) {
		var oData = {};
		$scope.model = $scope;
		$scope.searchProducts = findSearchedProducts;
		$scope.url = constructUrl($location, EndpointHelper);
	};
	
	module.controller("SearchProductController", ["$scope", "$location", "EndpointHelper", SearchProductController]);
	
	var constructUrl = function($location, EndpointHelper) {
		var hash = $location.path();
		if (hash.indexOf("edit") !== -1) {
			return EndpointHelper.products.edit;
		} else if (hash.indexOf("delete") !== -1) {
			return EndpointHelper.products.deletion;
		}
		return hash;
	};
	
	var findSearchedProducts = function($scope, oData) {
		$scope.products = [
	   		   {
	   			   id: 1,
	   			   src: "http://weknowyourdreams.com/images/car/car-05.jpg",
	   			   name: "Laborghini",
	   			   type: "Car"
			   },
			   {
				   id: 2,
				   src: "http://dreamatico.com/data_images/car/car-3.jpg",
				   name: "Renault",
	   			   type: "Car"
			   },
			   {
				   id: 3,
				   src: "http://weknowyourdreams.com/images/car/car-04.jpg",
				   name: "Mustang",
	   			   type: "Car"
			   },
			   {
				   id: 4,
				   src: "http://dreamatico.com/data_images/car/car-1.jpg",
				   name: "Laborghini",
	   			   type: "Car"
			   },
			   {
				   id: 5,
				   src: "http://www.info2india.com/cars/car-photos/small/bmw%20i8%201.jpg",
				   name: "BMW",
	   			   type: "Car"
			   }
        ];
	};
	
})();