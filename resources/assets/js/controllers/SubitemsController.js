(function() {
	var module = angular.module("AngularApplication");
	
	var SubitemsController = function($scope, $routeParams, Constants) {
		$scope.subitems = Constants.getNavigationSubItems($routeParams.navItem);
	};
	
	module.controller("SubitemsController", ["$scope", "$routeParams", "Constants", SubitemsController]);
})();