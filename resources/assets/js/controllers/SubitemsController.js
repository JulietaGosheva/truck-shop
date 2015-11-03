(function() {
	var module = angular.module("AngularApplication");
	
	var SubitemsController = function($scope, $routeParams, NavigationUtil) {
//		$scope.subitems = NavigationUtil.getNavigationSubItems($routeParams.navItem);
	};
	
	module.controller("SubitemsController", ["$scope", "$routeParams", "NavigationUtil", SubitemsController]);
})();