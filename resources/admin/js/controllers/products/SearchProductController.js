(function() {
	
	/* ============ Variables and Constructor ============= */
	
	var RestUtil = null;
	var DestinationUtil = null;
	var HashHelper = null;
	var ProductRetriever = null;
	var HeaderUtil = null;
	
	var moduleNames = new com.rs.module.ModuleNames();
	var adminControllerName = moduleNames.getAdminControllerName();
	var restUtilName = moduleNames.getRestClientName();
	var destinationUtilName = moduleNames.getDestinationUtilName();
	var hashHelperName = moduleNames.getHashHelperName();
	var productRetrieverName = moduleNames.getProductRetrieverName();
	var headerUtilName = moduleNames.getHeaderUtilName();
	
	var module = angular.module(adminControllerName);
	
	var SearchProductController = function($scope, $location, RUtil, DUtil, HHelper, PRetriever, HUtil) {
		RestUtil = RUtil;
		DestinationUtil = DUtil;
		HashHelper = HHelper;
		ProductRetriever = PRetriever;
		HeaderUtil = HUtil;
		
		$scope.url = constructUrl($location);
		$scope.executeSearchRequest = jQuery.proxy(executeSearchRequest, $scope);

		$scope.updateProductModels = updateProductModels;
		$scope.updateProductTypes = updateProductTypes;
		$scope.updateProductBrands = updateProductBrands;
		
		$scope.reloadBrands = jQuery.proxy(reloadBrands, $scope);
		$scope.reloadModels = jQuery.proxy(reloadModels, $scope);
		
		ProductRetriever.loadAllProductEntries($scope);
	};
	
	module.controller("SearchProductController", ["$scope", "$location", restUtilName, destinationUtilName, hashHelperName, productRetrieverName, headerUtilName, SearchProductController]);
	
/* ================ ngCustomRepeatWatcher directive callback handlers ================ */
	
	var updateProductTypes = function() {
		setTimeout(function() {
			$("#types").trigger("chosen:updated");
		}, 50);
	};
	
	var updateProductBrands = function() {
		setTimeout(function() {
			$("#brands").trigger("chosen:updated");
		}, 50);
	};
	
	var updateProductModels = function() {
		setTimeout(function() {
			$("#models").trigger("chosen:updated");
		}, 50);
	};
	
	/* ================ Selectors onChange event handlers ================ */
	
	var reloadBrands = function(oElement) {
		this.models = [];
		updateProductModels();
		
		this.brands = this.productTypes[oElement.type].brands;
		updateProductBrands();
	};
	
	var reloadModels = function(oElement) {
		this.models = this.productTypes[oElement.type].brands[oElement.brand].models;
	};
	
	/* ================ Helper functions ================ */
	
	var constructUrl = function($location) {
		var hash = $location.path();
		if (hash.indexOf("edit") !== -1) {
			return HashHelper.getProductModificationHash();
		} else if (hash.indexOf("delete") !== -1) {
			return HashHelper.getProductDeletionHash();
		}
		return HashHelper.getProductDetailsHash();
	};
	
	/* ================ Backend AJAX requests ================ */
	
	var executeSearchRequest = function(oData) {
		//clearPreviousSearchResultIfExists();
		
		var requestData = prepareRequestData(oData, this);
		RestUtil.GET(requestData, jQuery.proxy(onSuccess, this), jQuery.proxy(onError, this));
	};
	
	var clearPreviousSearchResultIfExists = function() {
		$("#productList").empty();
	};
	
	var prepareRequestData = function(oData, scope) {
		var path = "?";
		var typesDropdown = $("#types")[0];
		var brandsDropdown = $("#brands")[0];
		var modelsDropdown = $("#models")[0];
		
		for (key in oData) {
			if (typeof oData[key] !== "undefined" && oData[key] !== "") {
				if (key === "type") {
					path += key + "=" + typesDropdown.options[typesDropdown.selectedIndex].text + "&";
				} else if (key === "brand") {
					path += key + "=" + brandsDropdown.options[brandsDropdown.selectedIndex].text + "&";
				} else if (key === "model") {
					path += key + "=" + modelsDropdown.options[modelsDropdown.selectedIndex].text + "&";
				} else {
					path += key + "=" + oData[key] + "&";
				}
			}
		}
		
		var headers = {
			"Content-Type" : "application/json"
		};
		
		return {
			method : "GET",
			url : DestinationUtil.getProductSearchingEndpoint() + path,
			headers : headers
		};
	};
	
	var onSuccess = function(xhrResponse) {
		if (Array.isArray(xhrResponse.data)) {
			this.products = xhrResponse.data;
		} else {
			this.products = [xhrResponse.data];
		}
	};
	
	var onError = function(xhrResponse) {
		this.products = [];
		
		this.modalText = "Възникна проблем при търсене на продукти по зададените критерии.";
		this.requestExecutionResult = "Данни не бяха намерени." +
			"Статус на грешката: [" + xhrResponse.status + "], хвърлена грешка: [" + xhrResponse.statusText + "]." +
			"Информация от сървъра: [" + 
				HeaderUtil.getHeaderValueByName(xhrResponse, "X-Request-Result")
			+ "]";
		
		$('#products-result-modal').modal({ keyboard: true });
	};
	
})();