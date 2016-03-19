(function() {

	/* ============ Variables and Constructor ============= */
	
	var clientModules = new com.rs.client.module.ClientModules();
	var registry = com.rs.registry.Registry.prototype.getInstance();
	
	var module = angular.module(clientModules.getClientControllerName());
	
	var LogoutController = function ($scope, $http) {
		var RestClient = registry.getReference(clientModules.getRestClientName(), $http);
		var DestinationUtil = registry.getReference(clientModules.getDestinationUtilName());
		
		var requestData = {
			method: "GET",
			url: DestinationUtil.getLogoutEndpoint()
		};
		
		RestClient.GET(requestData, jQuery.proxy(onLogoutSuccess, $scope), jQuery.proxy(onLogoutFailure, $scope));
	};
	
	module.controller('LogoutController', ["$scope", "$http", LogoutController]);
	
	var onLogoutSuccess = function(xhrResponse) {
		var userUtil = new com.rs.utils.UserUtil();
		userUtil.setUserData(undefined);
		
		location.hash = "#/";
	};
	
	var onLogoutFailure = function(xhrResponse) {
		location.hash = "#/";
		
		$("#result-modal-label").text("Неуспешен изход от системата.");
		$("#result-modal-body").text("Извинявайте за неудобството, но не успяхме да ви отпишем от системата.");
		$('#result-modal').modal({ keyboard: true });
	};
	
})();