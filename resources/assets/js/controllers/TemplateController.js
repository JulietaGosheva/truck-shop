(function() {

	var clientModules = new com.rs.client.module.ClientModules();
	var registry = new com.rs.registry.Registry().getInstance();
	
	var module = angular.module(clientModules.getClientControllerName());
	
	var TemplateController = function($scope, $sce) {
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
			},
			setBreadcrumb: function(navItem, navSubItem) {
				if (typeof navItem !== "undefined") {
					jQuery("#articalBreadcrumb").css("display", "inline");
					jQuery("#articalBreadcrumb").attr("href", navItem.href);
					jQuery("#spanForArticalBreadcrumb").css("display", "inline");
					jQuery("#articalBreadcrumb").text(navItem.displayName);
				} else {
					jQuery("#articalBreadcrumb").css("display", "none");
					jQuery("#spanForArticalBreadcrumb").css("display", "none");
				}
				
				if (typeof navSubItem !== "undefined") {
					jQuery("#subArticalBreadcrumb").css("display", "inline");
					jQuery("#subArticalBreadcrumb").attr("href", navSubItem.href);
					jQuery("#spanForSubArticalBreadcrumb").css("display", "inline");
					jQuery("#subArticalBreadcrumb").text(navSubItem.displayName);
				} else {
					jQuery("#subArticalBreadcrumb").css("display", "none");
					jQuery("#spanForSubArticalBreadcrumb").css("display", "none");
				}
			}
		};
		
		registry.register(clientModules.getTemplateUtilName(), template);
	};
	
	module.controller("TemplateController", ["$scope", "$sce", TemplateController]);
	
	var onLoadedNavItems = function() {
		$('#wait-modal').modal('hide');
	};
	
})();