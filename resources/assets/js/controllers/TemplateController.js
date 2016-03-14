(function() {

	var clientModules = new com.rs.client.module.ClientModules();
	var registry = new com.rs.registry.Registry().getInstance();
	
	var module = angular.module(clientModules.getClientControllerName());
	
	var TemplateController = function($scope) {
		var navUtil = new com.rs.utils.NavigationUtil();

		$scope.items = navUtil.getNavItems();
		$scope.onLoadedNavItems = jQuery.proxy(onLoadedNavItems, $scope);
		
		var template = {
			setNavItems : function(navItems) {
				if (Array.isArray(navItems) && navItems.length === 0) {
					$scope.items = [{displayName: "", href: "#/", hide: "true"}];
				} else {
					$scope.items = navItems;
				}
			}	
		};
		
		registry.register("NavItemsTemplate", template);
	};
	
	module.controller("TemplateController", ["$scope", TemplateController]);
	
	var onLoadedNavItems = function() {
		$('#wait-modal').modal('hide');
	};
	
})();