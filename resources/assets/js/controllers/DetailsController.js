(function() {
	var module = angular.module("AngularApplication");
	
	var DetailsController = function($scope, $routeParams, $http) {
		$scope.item = {
			name: "Super Car",
			description: "A very handy car with a really nice interior.",
			img: "http://www.carnewschina.com/wp-content/uploads/2013/11/china-super-cars-show-5.jpg?97ba00",
			price: "11.50"
		};
	};
	
	module.controller("DetailsController", ["$scope", "$routeParams", "$http", DetailsController]);
})();