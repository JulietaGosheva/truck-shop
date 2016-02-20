(function() {

	/* ============ Variables and Constructor ============= */
	
	var RestUtil = null;
	var DestinationUtil = null;
	var HeaderUtil = null;
	
	var moduleNames = new com.rs.module.ModuleNames();
	var adminControllerName = moduleNames.getApplicationName();
	var restUtilName = moduleNames.getRestUtilName();
	var destinationUtilName = moduleNames.getDestinationUtilName();
	var headerUtilName = moduleNames.getHeaderUtilName();
	
	var module = angular.module(adminControllerName);
	
	var UserCreationController = function($scope, $sce, RUtil, DUtil, HUtil) {
		RestUtil = RUtil;
		DestinationUtil = DUtil;
		HeaderUtil = HUtil;
		
		$scope.buttonText = $sce.trustAsHtml("Регистрирай");
		$scope.buttonStyle = "default";
		
		$scope.executeRequest = jQuery.proxy(executeUserCreationRequest, $scope);
	};
	
	module.controller("UserCreationController", ["$scope", "$sce", restUtilName, destinationUtilName, headerUtilName, UserCreationController]);
	
	/* ================ Backend AJAX requests ================ */
	
	var executeUserCreationRequest = function(oData) {
		var requestData = prepareRequestData(oData, this);
		RestUtil.POST(requestData, jQuery.proxy(onSuccess, this), jQuery.proxy(onError, this));
	};
	
	var prepareRequestData = function(oData, scope) {
		var data = {
			email : oData.email,
			password : oData.password,
			firstname : oData.firstname,
			lastname : oData.lastname
		};
		
		var headers = {
			"Content-Type" : "application/json"
		};
		
		return {
			method : "POST",
			url : DestinationUtil.getUserCreationEndpoint(),
			headers : headers,
			data : JSON.stringify(data) 
		};
	};
	
	var onSuccess = function(xhrResponse) {
		this.requestExecutionResult = "Успешно записани данни. Моля изчакайте страницата да бъде презаредена.";
		
		$('#result-modal').modal({ backdrop: "static" });
		
		setTimeout(function() {
			location.reload();
		}, 1500);
	};
	
	var onError = function(xhrResponse) {
		this.requestExecutionResult = "Данните не бяха успешно записани." +
				"Статус на грешката: [" + xhrResponse.status + "], хвърлена грешка: [" + xhrResponse.statusText + "]." +
				"Информация от сървъра: [" 
					+ HeaderUtil.getHeaderValueByName(xhrResponse, "X-Request-Result")
				+ "]";
		$('#result-modal').modal({ keyboard: true });
	};
	
})();