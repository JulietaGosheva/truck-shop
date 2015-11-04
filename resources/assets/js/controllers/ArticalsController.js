(function() {
	var module = angular.module("AngularApplication");
	
	var ArticalsController = function($scope, $routeParams, $http, $location, NavigationUtil) {
		var artical = null;
		if ($routeParams.subArtical) {
			artical = $routeParams.subArtical;
		} else {
			artical = NavigationUtil.getNavigationArtical($routeParams.artical);
		}
		
		if (hasSubArticals(artical)) {
			$scope.subArticals = NavigationUtil.getNavigationSubArticals($routeParams.artical);
		} else {
			$scope.articals = getArticals($http, $location.path(), artical);
		}
	};
	
	module.controller("ArticalsController", ["$scope", "$routeParams", "$http", "$location", "NavigationUtil", ArticalsController]);
	
	var hasSubArticals = function(artical) {
		return artical === undefined ?
				false : artical.subArtical === undefined ?
						false : artical.subArtical.length > 0;
	};
	
	// TODO: create real request
	var getArticals = function(http, hash, artical) {
		
		return [
   		   {
   			   id: 1,
   			   src: "http://weknowyourdreams.com/images/car/car-05.jpg",
   			   description: "Mnogo Qka",
   			   price: "Zaslujava si",
   			   href: "#" + hash + "/1"
		   },
		   {
			   id: 2,
			   src: "http://dreamatico.com/data_images/car/car-3.jpg",
			   description: "Trendy",
			   price: "Ne si zaslujava",
   			   href: "#" + hash + "/2"
		   },
		   {
			   id: 3,
			   src: "http://weknowyourdreams.com/images/car/car-04.jpg",
			   description: "Mashina",
			   price: "Mnogo",
   			   href: "#" + hash + "/3"
		   },
		   {
			   id: 4,
			   src: "http://dreamatico.com/data_images/car/car-1.jpg",
			   description: "God",
			   price: "Bezcenna",
   			   href: "#" + hash + "/4"
		   },
		   {
			   id: 5,
			   src: "http://www.info2india.com/cars/car-photos/small/bmw%20i8%201.jpg",
			   description: "Electricity",
			   price: "Visoka",
   			   href: "#" + hash + "/5"
		   }
        ];
	};
})();