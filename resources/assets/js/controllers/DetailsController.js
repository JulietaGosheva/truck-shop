(function() {
	
	var RestClient = null;
	var HeaderUtil = null;
	var DestinationUtil = null;
	
	var clientModules = new com.rs.client.module.ClientModules();
	var registry = com.rs.registry.Registry.prototype.getInstance();
	
	var module = angular.module(clientModules.getClientControllerName());
	
	var DetailsController = function($scope, $routeParams, $http) {
		RestClient = registry.getReference(clientModules.getRestClientName(), $http);
		HeaderUtil = registry.getReference(clientModules.getHeaderUtilName());
		DestinationUtil = registry.getReference(clientModules.getDestinationUtilName());
		
		$scope.host = DestinationUtil.getServerHostEndpoint();
		
		var uniqueId = $routeParams.uniqueId;
		if (isNaN(uniqueId)) {
			//TODO: show error dialog
			return;
		}
		
		loadItemByUniqueId.call($scope, uniqueId);
	};
	
	module.controller("DetailsController", ["$scope", "$routeParams", "$http", DetailsController]);
	
	var loadItemByUniqueId = function(uniqueId) {
		var requestData = {
			method: "GET",
			url: DestinationUtil.getProductSearchingEndpoint() + "?uniqueId=" + uniqueId
		};
		
		RestClient.GET(requestData, jQuery.proxy(onSuccess, this), jQuery.proxy(onError, this));
	};
	
	var onSuccess = function(xhrResponse) {
		this.item = xhrResponse.data;
	};
	
	var onError = function(xhrResponse) {
		this.modalText = "Неуспешенo извличане на данни.";
		this.requestExecutionResult = "Данните за продукта, който искате да заредите не бяха успешно извлечени." +
			"Статус на грешката: [" + xhrResponse.status + "], хвърлена грешка: [" + xhrResponse.statusText + "]." +
			"Информация от сървъра: [" 
				+ HeaderUtil.getHeaderValueByName(xhrResponse, "X-Request-Result")
			+ "]";
		$('#result-modal').modal({ keyboard: true });
	};
	
})();