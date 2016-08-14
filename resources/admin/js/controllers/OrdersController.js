(function() {

	var RestClient = null;
	var DestinationUtil = null;
	
	var moduleNames = new com.rs.module.ModuleNames();
	var adminControllerName = moduleNames.getAdminControllerName();

	var registry = com.rs.registry.Registry.prototype.getInstance();
	
	var module = angular.module(adminControllerName);
	
	var OrdersController = function($scope, $http) {
		RestClient = registry.getReference(moduleNames.getRestClientName(), $http);
		DestinationUtil = registry.getReference(moduleNames.getDestinationUtilName());
		
		initModel($scope);
	};
	
	var initModel = function($scope, $http) {
		$scope.selectedOption = "default";
		$scope.option = "default";
		$scope.model = $scope;
		
		setOptionTypes($scope);
		$scope.setOption = function() {
			$scope.option = $scope.selectedOption;
		};
		
		$scope.dailyOrders = [];
		$scope.ordersByDate = [];
		$scope.userOrders = [];
		
		$scope.findDailyOrders = jQuery.proxy(findDailyOrders, $scope);
		$scope.findOrdersByDate = jQuery.proxy(findOrdersByDate, $scope);
		$scope.findOrdersByUser = jQuery.proxy(findOrdersByUser, $scope);
	};
	
	module.controller("OrdersController", ["$scope", "$http", OrdersController]);
	
	var setOptionTypes = function($scope) {
		$scope.ordersByUserOpt = 'ordersByUser';
		$scope.dailyOrdersOpt = 'dailyOrders';
		$scope.ordersByDateOpt = 'ordersByDate';
		$scope.ordersByProductTypeOpt = 'ordersByProductType';
		$scope.mostSoldProductsOpt = 'mostSoldProducts';
	};
	
	var isSelected = function() {
		return false;
	};
	
	var getCurrentDate = function() {
		var today = new Date();
		var date = today.getDate();
		var month = today.getMonth() + 1;
		var year = today.getFullYear();

		if(date < 10) {
		    date = '0' + date
		} 

		if(month < 10) {
		    month = '0' + month
		} 

		return date + '/' + month + '/' + year;
	};
	
	var findDailyOrders = function() {
		var requestData = {
			method: "GET",
			url: DestinationUtil.getDailyOrdersEndpoint()
		};

		var onSuccess = jQuery.proxy(function(xhrResponse) {
			this.dailyOrders = xhrResponse.data;
		}, this);

		var onError = jQuery.proxy(function(xhrResponse) {
			var requestExecutionResult = "Данни не бяха намерени." +
			"Статус на грешката: [" + xhrResponse.status + "], хвърлена грешка: [" + xhrResponse.statusText + "]." +
			"Информация от сървъра: [" + 
				HeaderUtil.getHeaderValueByName(xhrResponse, "X-Request-Result")
			+ "]";
		
		alert(requestExecutionResult);
		}, this);
		
		RestClient.GET(requestData, onSuccess, onError);
	};
	
	var findOrdersByDate = function() {
		var dateField = document.getElementById("searchedDate");
		
		var requestData = {
			method: "GET",
			url: String.format(DestinationUtil.getOrdersByDate(), dateField.value)
		};
		
		var onSuccess = jQuery.proxy(function(xhrResponse) {
			this.ordersByDate = xhrResponse.data;
		}, this);
		
		var onError = jQuery.proxy(function(xhrResponse) {
			var requestExecutionResult = "Данни не бяха намерени." +
			"Статус на грешката: [" + xhrResponse.status + "], хвърлена грешка: [" + xhrResponse.statusText + "]." +
			"Информация от сървъра: [" + 
				HeaderUtil.getHeaderValueByName(xhrResponse, "X-Request-Result")
			+ "]";
		
		alert(requestExecutionResult);
		}, this);
		
		RestClient.GET(requestData, onSuccess, onError);
	};
	
	var findOrdersByUser = function(oData) {
		var endpointUrl = DestinationUtil.getOrdersByUser();
		if (typeof oData.name !== "undefined") {
			endpointUrl += "userName=" + oData.name + "&";
		}
		
		if (typeof oData.email !== "undefined") {
			endpointUrl += "email=" + oData.email;
		}
		
		var requestData = {
			method: "GET",
			url: endpointUrl
		};
		
		var onSuccess = jQuery.proxy(function(xhrResponse) {
			this.userOrders = xhrResponse.data;
		}, this);
		
		var onError = jQuery.proxy(function(xhrResponse) {
			var requestExecutionResult = "Данни не бяха намерени." +
				"Статус на грешката: [" + xhrResponse.status + "], хвърлена грешка: [" + xhrResponse.statusText + "]." +
				"Информация от сървъра: [" + 
					HeaderUtil.getHeaderValueByName(xhrResponse, "X-Request-Result")
				+ "]";
			
			alert(requestExecutionResult);
		}, this);
		
		RestClient.GET(requestData, onSuccess, onError);
	};
	
})();