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
	
	var NavigationCreationController = function($scope, RUtil, DUtil, HUtil) {
		RestUtil = RUtil;
		DestinationUtil = DUtil;
		HeaderUtil = HUtil;
		
		$scope.menuInsertMode = true;
		$scope.subMenuInsertMode = true;
		
		$scope.executeRequest = jQuery.proxy(executeRequest, $scope);
	};
	
	module.controller("NavigationCreationController", ["$scope", restUtilName, destinationUtilName, headerUtilName, NavigationCreationController]);
	
	/* ================ Backend AJAX requests ================ */
	
	var executeRequest = function(oData) {
		var requestData = prepareRequestData(oData, this);
		RestUtil.POST(requestData, jQuery.proxy(onSuccess, this), jQuery.proxy(onError, this));
	};
	
	var prepareRequestData = function(oData, scope) {
		var data = {
			name : oData.name,
			parentId : oData.parentId,
			displayName : oData.displayName,
			language : oData.language
		};
		
		var headers = {
			"Content-Type" : "application/json"
		};
		
		return {
			method : "POST",
			url : DestinationUtil.getNavigationItemCreationEndpoint(),
			headers : headers,
			data : JSON.stringify(data) 
		};
	};
	
	var onSuccess = function(xhrResponse) {
		this.modalText = "Успешен запис";
		this.requestExecutionResult = "Успешно записани данни. Моля изчакайте страницата да бъде презаредена.";
		
		$('#result-modal').modal({ backdrop: "static" });
		
		setTimeout(function() {
			location.reload();
		}, 1500);
	};
	
	var onError = function(xhrResponse) {
		this.modalText = "Неуспешен запис";
		this.requestExecutionResult = "Данните не бяха успешно записани." +
			"Статус на грешката: [" + xhrResponse.status + "], хвърлена грешка: [" + xhrResponse.statusText + "]." +
			"Информация от сървъра: [" 
				+ HeaderUtil.getHeaderValueByName(xhrResponse, "X-Request-Result")
			+ "]";
		$('#result-modal').modal({ keyboard: true });
	};
	
})();