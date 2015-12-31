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
		
		this.brands = this.productTypes[oElement.type].brands;
		updateProductBrands();
	};
	
	var reloadModels = function(oElement) {
		this.models = this.productTypes[oElement.type].brands[oElement.brand].models;
	};
	
	/* ================ Helper functions ================ */
	
	var constructUrl = function($location, EndpointHelper) {
		var hash = $location.path();
		if (hash.indexOf("edit") !== -1) {
			return EndpointHelper.products.edit;
		} else if (hash.indexOf("delete") !== -1) {
			return EndpointHelper.products.deletion;
		}
		return EndpointHelper.products.details;
	};
	
	/* ================ Backend AJAX requests ================ */
	
	var executeSearchRequest = function(RESTUtil, DestinationUtil, oData) {
		//clearPreviousSearchResultIfExists();
		
		var requestData = prepareRequestData(oData, DestinationUtil, this);
		RESTUtil.GET(requestData, jQuery.proxy(onSuccess, this), jQuery.proxy(onError, this));
	};
	
	var clearPreviousSearchResultIfExists = function() {
		$("#productList").empty();
	};
	
	var prepareRequestData = function(oData, DestinationUtil, scope) {
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
			url : DestinationUtil.Product.search + path,
			headers : headers
		};
	};
	
	var onSuccess = function(xhrResponse) {
		if (Array.isArray(xhrResponse.data)) {
			this.products = xhrResponse.data;
		} else {
			this.products = [xhrResponse.data];
		}
		console.log("Success message : " + xhrResponse.data);
	};
	
	var onError = function(xhrResponse) {
		this.products = [];
		console.log("Error message : " + xhrResponse.data);
	};
	
})();