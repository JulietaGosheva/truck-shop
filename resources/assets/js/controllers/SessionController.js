(function() {

	/* ============ Variables and Constructor ============= */
	
	var clientModules = new com.rs.client.module.ClientModules();
	var registry = com.rs.registry.Registry.prototype.getInstance();

	var module = angular.module(clientModules.getClientControllerName());
	
	var SessionController = function ($scope) {
		initModel($scope);
		
		var sessionUtil = {
			showLoggedInUserTemplate: function() {
				$scope.isUserLoggedIn = true;
				$scope.userName = new com.rs.utils.UserUtil().getUserName();
			},
			hideLoggedInUserTemplate: function() {
				$scope.isUserLoggedIn = false;
				$scope.userName = "";
			}
		};
		
		registry.register(clientModules.getSessionUtilName(), sessionUtil);
	};
	
	var initModel = function($scope) {
		var userUtil = new com.rs.utils.UserUtil();
		$scope.isUserLoggedIn = userUtil.isUserLoggedIn();
		
		if ($scope.isUserLoggedIn) {
			$scope.userName = userUtil.getUserName();
		}
	};
	
	module.controller('SessionController', ["$scope", SessionController]);
})();