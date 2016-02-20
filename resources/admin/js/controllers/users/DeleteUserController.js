(function() {

	/* ============ Variables and Constructor ============= */
	
	var RestUtil = null;
	var DestinationUtil = null;
	var HeaderUtil = null;
	
	var moduleNames = new com.rs.module.ModuleNames();
	var adminControllerName = moduleNames.getApplicationName();
	var restUtilName = moduleNames.getRestUtilName();
	var headerUtilName = moduleNames.getHeaderUtilName();
	var destinationUtilName = moduleNames.getDestinationUtilName();
	
	var module = angular.module(adminControllerName);
	
	var DeleteUserController = function($scope, $routeParams, RUtil, DUtil, HUtil) {
		RestUtil = RUtil;
		DestinationUtil = DUtil;
		HeaderUtil = HUtil;
		
		$scope.buttonText = "Изтрии";
		$scope.buttonStyle = "default";
		
		$scope.executeRequest = jQuery.proxy(executeRequest, $scope, $routeParams);
	};
	
	module.controller("DeleteUserController", ["$scope", "$routeParams", restUtilName, destinationUtilName, headerUtilName, DeleteUserController]);
	
	/* ============ Function declaration ============= */
	
	var executeRequest = function(routeParams) {
		var requestData = prepareRequestData(routeParams);
		RestUtil.DELETE(requestData, jQuery.proxy(onSuccess, this), jQuery.proxy(onError, this));
	};
	
	var prepareRequestData = function(routeParams) {
		var userId = routeParams.id;
		
		return {
			method : "DELETE",
			url : String.format(DestinationUtil.getUserDeletionEndpoint(), userId)
		};
	};
	
	var onSuccess = function(xhrResponse) {
		this.title = "Успешно изтрит потребител.";
		this.resultMessage = "Успешно изтрит потребител. Моля изчакайте страницата да бъде презаредена.";
		
		$('#result-modal').modal({ backdrop: "static" });
		
		setTimeout(function() {
			location.hash = "#/users/delete";
		}, 1500);
	};
	
	var onError = function(xhrResponse) {
		this.title = "Неуспешно изтриване.";
		this.resultMessage = "Данните не бяха изтрити." +
			"Статус на грешката: [" + xhrResponse.status + "], хвърлена грешка: [" + xhrResponse.statusText + "]." +
			"Информация от сървъра: [" 
				+ HeaderUtil.getHeaderValueByName(xhrResponse, "X-Request-Result") 
			+ "]";
		
		$('#result-modal').modal({ keyboard: true });
	};
	
})();