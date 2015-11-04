(function() {
	var module = angular.module("AngularApplication");
	
	var SearchController = function($scope, $location, $routeParams) {
		if ($routeParams.uniqueNumber) {
			// TODO: create search request by unique number
			var hash = $location.path();
			$scope.articals = [{
	   			   id: 1,
	   			   src: "http://weknowyourdreams.com/images/car/car-05.jpg",
	   			   description: "Mnogo Qka",
	   			   price: "Zaslujava si",
	   			   href: "#" + hash + "/1"
			   }];
			return;
		}
		
		$scope.search = function(uniqueNumber) {
			$location.url("/search/" + uniqueNumber);
		};
	};
	
	module.controller("SearchController", ["$scope", "$location", "$routeParams", SearchController]);
})();