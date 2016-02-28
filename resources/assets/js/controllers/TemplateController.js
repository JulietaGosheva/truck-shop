(function() {

	var clientModules = new com.rs.client.module.ClientModules();
	
	var module = angular.module(clientModules.getClientControllerName());
	
	var TemplateController = function($scope, NavigationRetriever) {
		$scope.navLinks = [];
		
		var navItems = NavigationRetriever.loadItems($scope);
		
		
		
//		var navigationArticals = NavigationUtil.getNavigationArticals();
//		for (var item in navigationArticals) {
//			$scope.navLinks.push({
//				navLinkName: navigationArticals[item].displayName,
//				navLinkUrl: navigationArticals[item].href
//			});
//		}
	};
	
	module.controller("TemplateController", ["$scope", clientModules.getNavigationItemRetrieverName(), TemplateController]);
})();