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
		
		openBusyDialog();
		
		RestClient.GET(requestData, jQuery.proxy(onSuccess, this), jQuery.proxy(onError, this));
	};
	
	var onSuccess = function(xhrResponse) {
		this.item = xhrResponse.data;

		closeBusyDialog();
	};
	
	var onError = function(xhrResponse) {
		closeBusyDialog();
		
		$("#result-modal-label").text("Неуспешенo извличане на данни.");
		$("#result-modal-body").text("Данните за продукта, който искате да заредите не бяха успешно извлечени.");
		$('#result-modal').modal({ keyboard: true });
	};
	
	var openBusyDialog = function() {
		$('#wait-modal').modal({
			backdrop: 'static',
			keyboard: false
		});
	};
	
	var closeBusyDialog = function() {
		$('#wait-modal').modal('hide');
	};
	
})();