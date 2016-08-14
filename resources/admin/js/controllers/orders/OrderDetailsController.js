(function() {

	var HeaderUtil = null;
	var RestClient = null;
	var DestinationUtil = null;
	
	var moduleNames = new com.rs.module.ModuleNames();
	var adminControllerName = moduleNames.getAdminControllerName();

	var registry = com.rs.registry.Registry.prototype.getInstance();
	
	var module = angular.module(adminControllerName);
	
	var OrderDetailsController = function($scope, $http, $routeParams) {
		HeaderUtil = registry.getReference(moduleNames.getHeaderUtilName());
		RestClient = registry.getReference(moduleNames.getRestClientName(), $http);
		DestinationUtil = registry.getReference(moduleNames.getDestinationUtilName());
		
		initModel($scope);
		
		retrieveOrders($scope, $routeParams.id);
	};
	
	var initModel = function($scope, $http) {
		$scope.orders = [];
	};
	
	module.controller("OrderDetailsController", ["$scope", "$http", "$routeParams", OrderDetailsController]);
	
	var retrieveOrders = function($scope, id) {
		var requestData = {
			method: "GET",
			url: String.format(DestinationUtil.getOrdersById(), id)
		};

		var onSuccess = jQuery.proxy(function(xhrResponse) {
			this.orders = xhrResponse.data;
			
			for (var i = 0 ; i < this.orders.length ; i++) {
				this.orders[i].delivery_info = JSON.parse(this.orders[i].delivery_info);
			}
		}, $scope);

		var onError = jQuery.proxy(function(xhrResponse) {
			var requestExecutionResult = "Данни не бяха намерени." +
			"Статус на грешката: [" + xhrResponse.status + "], хвърлена грешка: [" + xhrResponse.statusText + "]." +
			"Информация от сървъра: [" + 
				HeaderUtil.getHeaderValueByName(xhrResponse, "X-Request-Result")
			+ "]";
		
			alert(requestExecutionResult);
		}, $scope);
		
		RestClient.GET(requestData, onSuccess, onError);
	};
	
	
})();