(function() {
	
	var module = angular.module("AdminController");
	
	var SearchProductController = function($scope, $location, RESTUtil, DestinationUtil, EndpointHelper, ProductLoader) {
		$scope.url = constructUrl($location, EndpointHelper);
		$scope.executeSearchRequest = jQuery.proxy(executeSearchRequest, $scope, RESTUtil, DestinationUtil);

		$scope.updateProductModels = updateProductModels;
		$scope.updateProductTypes = updateProductTypes;
		$scope.updateProductBrands = updateProductBrands;
		
		$scope.reloadBrands = jQuery.proxy(reloadBrands, $scope);
		$scope.reloadModels = jQuery.proxy(reloadModels, $scope);
		
		ProductLoader.loadAllProductEntries($scope);
	};
	
	module.controller("SearchProductController", ["$scope", "$location", "RESTUtil", "DestinationUtil", "EndpointHelper", "ProductLoader", SearchProductController]);
	
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
		
		this.brands = this.productTypes[oElement.existingProductType].brands;
		updateProductBrands();
	};
	
	var reloadModels = function(oElement) {
		this.models = this.productTypes[oElement.existingProductType].brands[oElement.existingProductBrand].models;
	};
	
	/* ================ Backend AJAX requests ================ */
	
	var constructUrl = function($location, EndpointHelper) {
		var hash = $location.path();
		if (hash.indexOf("edit") !== -1) {
			return EndpointHelper.products.edit;
		} else if (hash.indexOf("delete") !== -1) {
			return EndpointHelper.products.deletion;
		}
		return EndpointHelper.products.details;
	};
	
	var executeSearchRequest = function(RESTUtil, DestinationUtil, oData) {
		var requestData = prepareRequestData(oData, DestinationUtil, this);
		RESTUtil.GET(requestData, jQuery.proxy(onSuccess, this), jQuery.proxy(onError, this));
	};
	
	var prepareRequestData = function(oData, DestinationUtil, scope) {
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
			url : DestinationUtil.Product.search + path,
			headers : headers
		};
	};
	
	var onSuccess = function(xhrResponse) {
		this.products = xhrResponse.data;
		console.log("Success message : " + xhrResponse.data);
	};
	
	var onError = function(xhrResponse) {
		this.products = [];
		console.log("Error message : " + xhrResponse.data);
	};
	
})();