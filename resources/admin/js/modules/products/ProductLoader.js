(function() {
	
	var restUtil = null;
	var destinationUtil = null;
	
	var headers = {
		"Content-Type" : "application/json"
	};
	
	var ProductLoader = function(RESTUtil, DestinationUtil) {
		restUtil = RESTUtil;
		destinationUtil = DestinationUtil;

		return {
			loadProductById: loadProductById,
			loadProductTypes: loadProductTypes,
			loadProductBrands: loadProductBrands,
			loadProductModels: loadProductModels
		};
	};
	
	/* ============ Product Loading by ID =============*/
	
	var loadProductById = function(productId, $scope) {
		var requestData = prepareRequestData(productId, $scope);
		restUtil.GET(requestData, jQuery.proxy(onSuccess, $scope), jQuery.proxy(onError, $scope));
	};
	
	var prepareRequestData = function(productId, $scope) {
		var path = "?id=" + productId;
		
		return {
			method : "GET",
			headers : headers,
			url : destinationUtil.Product.search + path
		};
	};
	
	var onSuccess = function(xhrResponse) {
		this.name = xhrResponse.data.name;
		this.uniqueNumber = xhrResponse.data.uniqueNumber;
		this.newProductType = xhrResponse.data.type;
		this.newProductBrand = xhrResponse.data.brand;
		this.newProductModel = xhrResponse.data.model;
		this.price = xhrResponse.data.price;
		this.src = xhrResponse.data.src;
	};
	
	var onError = function(xhrResponse) {
		this.errorMessage = "Не успяхме да заредим данните за този продукт, моля опитайте пак.";
	};
	
	/* ============ TYPES Loading =============*/
	
	var loadProductTypes = function($scope) {
		var requestData = {
			method : "GET",
			headers: headers,
			url: destinationUtil.Product.types
		};
		restUtil.GET(requestData, jQuery.proxy(onSuccessfullyLoadedProductTypes, $scope), jQuery.proxy(onFailingOfLoadingProductTypes, $scope));
	};
	
	var onSuccessfullyLoadedProductTypes = function(xhrResponse) {
		this.types = xhrResponse.data;
	};
	
	var onFailingOfLoadingProductTypes = function(xhrResponse) {
		this.types = [];
		this.errorMessage = "Възникна грешка при зареждането на продуктовите типовете.";
	};
	
	/* ============ BRANDS Loading =============*/
	
	var loadProductBrands = function() {
		var requestData = {
			method : "GET",
			headers: headers,
			url: destinationUtil.Product.brands
		};
		restUtil.GET(requestData, jQuery.proxy(onSuccessfullyLoadedProductBrands, $scope), jQuery.proxy(onFailingOfLoadingProductBrands, $scope));
	};
	
	var onSuccessfullyLoadedProductBrands = function(xhrResponse) {
		this.brands = xhrResponse.data;
	};
	
	var onFailingOfLoadingProductBrands = function(xhrResponse) {
		this.brands = [];
		this.errorMessage = "Възникна грешка при зареждането на продуктовите производители.";
	};
	
	/* ============ MODELS Loading =============*/
	
	var loadProductModels = function() {
		var requestData = {
			method : "GET",
			headers: headers,
			url: destinationUtil.Product.brands
		};
		restUtil.GET(requestData, jQuery.proxy(onSuccessfullyLoadedProductModels, $scope), jQuery.proxy(onFailingOfLoadingProductModels, $scope));
	};
	
	var onSuccessfullyLoadedProductModels = function(xhrResponse) {
		this.models = xhrResponse.data;
	};
	
	var onFailingOfLoadingProductModels = function(xhrResponse) {
		this.models = [];
		this.errorMessage = "Възникна грешка при зареждането на продуктовите модели.";
	};
	
	/* ============ Module Registration =============*/
	
	var module = angular.module("AdminController");
	module.factory("ProductLoader", ["RESTUtil", "DestinationUtil", ProductLoader]);

})();