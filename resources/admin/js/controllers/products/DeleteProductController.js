(function() {
	
	/* ============ Variables and Constructor ============= */
	
	var RestUtil = null;
	var DestinationUtil = null;
	var HeaderUtil = null;
	
	var moduleNames = new com.rs.module.ModuleNames();
	var adminControllerName = moduleNames.getApplicationName();
	var restUtilName = moduleNames.getRestClientName();
	var headerUtilName = moduleNames.getHeaderUtilName();
	var destinationUtilName = moduleNames.getDestinationUtilName();
	
	var module = angular.module(adminControllerName);
	
	var DeleteProductController = function($scope, $routeParams, RUtil, DUtil, HUtil) {
		RestUtil = RUtil;
		DestinationUtil = DUtil;
		HeaderUtil = HUtil;
		
		$scope.executeRequest = jQuery.proxy(executeRequest, $scope, $routeParams);
	};
	
	module.controller("DeleteProductController", ["$scope", "$routeParams", restUtilName, destinationUtilName, headerUtilName, DeleteProductController]);
	
	/* ============ Function declaration ============= */
	
	var executeRequest = function(routeParams) {
		var requestData = prepareRequestData(routeParams);
		RestUtil.DELETE(requestData, jQuery.proxy(onSuccess, this), jQuery.proxy(onError, this));
	};
	
	var prepareRequestData = function(routeParams) {
		var productId = routeParams.id;
		
		return {
			method : "DELETE",
			url : String.format(DestinationUtil.getProductDeletionEndpoint(), productId)
		};
	};
	
	var onSuccess = function(xhrResponse) {
		this.title = "Успешно изтрит продукт.";
		this.resultMessage = "Успешно изтрит продукт. Моля изчакайте страницата да бъде презаредена.";
		
		$('#delete-products-result-modal').modal({ backdrop: "static" });
		
		setTimeout(function() {
			location.hash = "#/products/delete";
		}, 1500);
	};
	
	var onError = function(xhrResponse) {
		this.title = "Неуспешно изтриване.";
		this.resultMessage = "Данните не бяха изтрити." +
			"Статус на грешката: [" + xhrResponse.status + "], хвърлена грешка: [" + xhrResponse.statusText + "]." +
			"Информация от сървъра: [" 
				+ HeaderUtil.getHeaderValueByName(xhrResponse, "X-Request-Result") 
			+ "]";
		
		$('#delete-products-result-modal').modal({ keyboard: true });
	};
	
})();