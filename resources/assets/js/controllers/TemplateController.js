(function() {
	var module = angular.module("AngularApplication");
	
	var TemplateController = function($scope, NavigationUtil) {
		$scope.navLinks = [];
		
		var navigationArticals = NavigationUtil.getNavigationArticals();
		for (var item in navigationArticals) {
			$scope.navLinks.push({
				navLinkName: navigationArticals[item].displayName,
				navLinkUrl: navigationArticals[item].href
			});
		}
	};
	
	module.controller("TemplateController", ["$scope", "NavigationUtil", TemplateController]);
})();