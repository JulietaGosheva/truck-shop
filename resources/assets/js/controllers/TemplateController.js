(function() {
	var module = angular.module("AngularApplication");
	
	var TemplateController = function($scope, Constants) {
		$scope.navLinks = [];
		
		var navigationItems = Constants.getNavigationItems();
		for (var item in navigationItems) {
			$scope.navLinks.push({
				navLinkName: navigationItems[item].displayName,
				navLinkUrl: navigationItems[item].href
			});
		}
	};
	
	module.controller("TemplateController", ["$scope", "Constants", TemplateController]);
})();