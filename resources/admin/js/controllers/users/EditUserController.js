(function() {

	/* ============ Variables and Constructor ============= */
	
	var RestUtil = null;
	var DestinationUtil = null;
	var HeaderUtil = null;
	
	var moduleNames = new com.rs.module.ModuleNames();
	var adminControllerName = moduleNames.getAdminControllerName();
	var restUtilName = moduleNames.getRestClientName();
	var destinationUtilName = moduleNames.getDestinationUtilName();
	var headerUtilName = moduleNames.getHeaderUtilName();
	var userRetrieverName = moduleNames.getUserRetrieverName();
	
	var module = angular.module(adminControllerName);
	
	var EditUserController = function($scope, $routeParams, RUtil, DUtil, HUtil, URetriever) {
		RestUtil = RUtil;
		DestinationUtil = DUtil;
		HeaderUtil = HUtil;
		
		$scope.buttonText = "Редактирай";
		$scope.buttonStyle = "default";

		$scope.executeRequest = jQuery.proxy(executeRequest, $scope);
		
		var userId = $routeParams.id;
		URetriever.loadUserById(userId, $scope);
	};
	
	module.controller("EditUserController", ["$scope", "$routeParams", restUtilName, destinationUtilName, headerUtilName, userRetrieverName, EditUserController]);
	
	/* ================ Backend AJAX requests ================ */
	
	var executeRequest = function (oData) {
		var requestData = prepareRequestData(oData, this);
		RestUtil.PUT(requestData, jQuery.proxy(onSuccess, this), jQuery.proxy(onError, this));
	};
	
	var prepareRequestData = function(oData, scope) {
		var data = {
			id : scope.id,
			email : oData.email,
			password : oData.password,
			firstname : oData.firstname,
			lastname : oData.lastname
		};
		
		var headers = {
			"Content-Type" : "application/json"
		};
		
		return {
			method : "PUT",
			url : DestinationUtil.getUserModificationEndpoint(),
			headers : headers,
			data : JSON.stringify(data) 
		};
	};
	
	var onSuccess = function(xhrResponse) {
		this.modalText = "Успешно редактиране.";
		this.requestExecutionResult = "Успешно редактирани данни. Моля изчакайте страницата да бъде презаредена.";
		
		$('#result-modal').modal({ backdrop: "static" });
		
		setTimeout(function() {
			location.hash = "#/users/edit";
		}, 1500);
	};
	
	var onError = function(xhrResponse) {
		this.modalText = "Неуспешно редактиране.";
		this.requestExecutionResult = "Данните не бяха редактирани." +
			"Статус на грешката: [" + xhrResponse.status + "], хвърлена грешка: [" + xhrResponse.statusText + "]." +
			"Информация от сървъра: [" 
				+ HeaderUtil.getHeaderValueByName(xhrResponse, "X-Request-Result") 
			+ "]";
		
		$('#result-modal').modal({ keyboard: true });
	};
	
})();