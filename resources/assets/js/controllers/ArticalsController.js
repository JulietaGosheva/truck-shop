(function() {
	var module = angular.module("AngularApplication");
	
	var ArticalsController = function($scope, $routeParams, $http, NavigationUtil) {
		var artical = null;
		if ($routeParams.subArtical) {
			artical = $routeParams.subArtical;
		} else {
			artical = NavigationUtil.getNavigationArtical($routeParams.artical);
		}
		
		if (hasSubItems(artical)) {
			$scope.subArticals = NavigationUtil.getNavigationSubArticals($routeParams.artical);
		} else {
			$scope.articals = getArticals($http, artical);
		}
	};
	
	module.controller("ArticalsController", ["$scope", "$routeParams", "$http", "NavigationUtil", ArticalsController]);
	
	var hasSubItems = function(artical) {
		return artical.subArtical === undefined ? false : artical.subArtical.length > 0;
	};
	
	// TODO: create real request
	var getArticals = function($http, artical) {
		return [
   		   { src: "http://weknowyourdreams.com/images/car/car-05.jpg", description: "Mnogo Qka", price: "Zaslujava si" },
		   { src: "http://dreamatico.com/data_images/car/car-3.jpg", description: "Trendy", price: "Ne si zaslujava" },
		   { src: "http://weknowyourdreams.com/images/car/car-04.jpg", description: "Mashina", price: "Mnogo" },
		   { src: "http://dreamatico.com/data_images/car/car-1.jpg", description: "God", price: "Bezcenna" },
		   { src: "http://www.info2india.com/cars/car-photos/small/bmw%20i8%201.jpg", description: "Electricity", price: "Visoka" }
        ];
	};
})();