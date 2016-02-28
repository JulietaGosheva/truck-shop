(function() {
	
	var module = angular.module("AngularApplication");
	
	var ArticalsController = function($scope, $routeParams, $http, $location) {
		var navItem = $routeParams.navItemName;
		var navSubItem = $routeParams.navSubItemName;
		
		var navUtil = new com.rs.utils.NavigationUtil();
		
		if (typeof navSubItem === "undefined" && navUtil.hasSubItems(navItem) === false) {
			$scope.navItems = navUtil.getNavItems();
		} else {
			$scope.navSubItems = navUtil.getNavSubItems(navItem);
		}
		
		//TODO: Load products associated with the selected navigation item
		//P.S. if for some reason they don't exists assure that the UI won't broke
	};
	
	module.controller("ArticalsController", ["$scope", "$routeParams", "$http", "$location", ArticalsController]);
})();