(function() {

	/* ============ Variables and Constructor ============= */
	
	var RestUtil = null;
	var DestinationUtil = null;
	var HeaderUtil = null;
	var HashHelper = null;
	
	var moduleNames = new com.rs.module.ModuleNames();
	var adminControllerName = moduleNames.getAdminControllerName();
	var restUtilName = moduleNames.getRestClientName();
	var destinationUtilName = moduleNames.getDestinationUtilName();
	var headerUtilName = moduleNames.getHeaderUtilName();
	var hashHelperName = moduleNames.getHashHelperName();
	
	var module = angular.module(adminControllerName);
	
	var SearchUserController = function($scope, $sce, $location, RUtil, DUtil, HUtil, HHelper) {
		RestUtil = RUtil;
		DestinationUtil = DUtil;
		HeaderUtil = HUtil;
		HashHelper = HHelper;
		
		$scope.buttonStyle = "primary";
		$scope.buttonText = $sce.trustAsHtml("<span class='glyphicon glyphicon-search'></span>");
		
		$scope.url = constructUrl($location);
		
		$scope.model = $scope;
		$scope.executeRequest = jQuery.proxy(executeRequest, $scope);
	};
	
	module.controller("SearchUserController", ["$scope", "$sce", "$location", restUtilName, destinationUtilName, headerUtilName, hashHelperName, SearchUserController]);
	
	/* ================ Helper functions ================ */
	
	var constructUrl = function($location, EndpointHelper) {
		var hash = $location.path();
		if (hash.indexOf("edit") !== -1) {
			return HashHelper.getUserModificationHash();
		} else if (hash.indexOf("delete") !== -1) {
			return HashHelper.getUserDeletionHash();
		}
		return hash;
	};
	
	/* ================ Backend AJAX requests ================ */
	
	var executeRequest = function(oData) {
		var requestData = prepareRequestData(oData, this);
		RestUtil.GET(requestData, jQuery.proxy(onSuccess, this), jQuery.proxy(onError, this));
	};
	
	var prepareRequestData = function(oData, scope) {
		var path = "?";
		
		for (key in oData) {
			if (typeof oData[key] !== "undefined" && oData[key] !== "") {
				path += key + "=" + oData[key] + "&";
			}
		}
		
		var headers = {
			"Content-Type" : "application/json"
		};
		
		return {
			method : "GET",
			url : DestinationUtil.getUserSearchingEndpoint() + path,
			headers : headers
		};
	};
	
	var onSuccess = function(xhrResponse) {
		if (Array.isArray(xhrResponse.data)) {
			this.users = xhrResponse.data;
		} else {
			this.users = [xhrResponse.data];
		}
	};
	
	var onError = function(xhrResponse) {
		this.users = [];
		
		this.modalText = "Възникна проблем при търсене на потребители по зададените критерии.";
		this.requestExecutionResult = "Данни не бяха намерени." +
			"Статус на грешката: [" + xhrResponse.status + "], хвърлена грешка: [" + xhrResponse.statusText + "]." +
			"Информация от сървъра: [" + 
				HeaderUtil.getHeaderValueByName(xhrResponse, "X-Request-Result")
			+ "]";
		
		$('#result-modal').modal({ keyboard: true });
	};
	
})();