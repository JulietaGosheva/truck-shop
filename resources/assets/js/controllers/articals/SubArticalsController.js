(function() {

	var RestClient = null;
	var HeaderUtil = null;
	var DestinationUtil = null;
	var tempProductTypeIds = null;
	
	var clientModules = new com.rs.client.module.ClientModules();
	var registry = com.rs.registry.Registry.prototype.getInstance();
	
	var module = angular.module(clientModules.getClientControllerName());
	
	var SubArticalsController = function($scope, $routeParams, $http, $location) {
		RestClient = registry.getReference(clientModules.getRestClientName(), $http);
		HeaderUtil = registry.getReference(clientModules.getHeaderUtilName());
		DestinationUtil = registry.getReference(clientModules.getDestinationUtilName());
		
		$scope.host = DestinationUtil.getServerHostEndpoint();
		
		var navItemName = $routeParams.navItemName;
		var navSubItemName = $routeParams.navSubItemName;
		
		var navUtil = new com.rs.utils.NavigationUtil();
		
		$scope.navItem = navUtil.getNavItemByName(navSubItemName);
		loadProducts.call($scope, $scope.navItem.productTypeIds);
	};
	
	module.controller("SubArticalsController", ["$scope", "$routeParams", "$http", "$location", SubArticalsController]);
	
	var loadProducts = function(productTypeIds) {
		var requestData = prepareRequestData.call(this, productTypeIds);
		if (typeof requestData === "undefined") {
			return;
		}
		
		RestClient.GET(requestData, jQuery.proxy(onSuccess, this), jQuery.proxy(onError, this));
	};
	
	var prepareRequestData = function(productTypeIds) {
		if (typeof productTypeIds === "undefined" || Array.isArray(productTypeIds) === false || productTypeIds.length === 0) {
			this.noContent = "Няма намерени продукти.";
			return;
		}
		
		var clientCache = com.rs.client.cache.ClientCache.prototype.getInstance();
		var products = clientCache.getCacheEntry("products");
		
		var requestParam = "?productIds=";
		for (var i = 0 ; i < productTypeIds.length - 1 ; i++) {
			if (typeof products !== "undefined" && typeof products[productTypeIds[i]] !== "undefined") {
				continue;
			}
			requestParam += productTypeIds[i] + ";";
		}
		
		if (typeof products === "undefined" || typeof products[productTypeIds[productTypeIds.length - 1]] === "undefined") {
			requestParam += productTypeIds[productTypeIds.length - 1];
		}
		
		if (requestParam === "?productIds=") {
			var productItems = [];
			for (var i = 0 ; i < productTypeIds.length ; i++) {
				jQuery.merge(productItems, products[productTypeIds[i]]);
			}
			this.items = productItems;
			return;
		}
		
		tempProductTypeIds = productTypeIds;
		
		return {
			method: "GET",
			url: DestinationUtil.getProductTypesEndpoint() + requestParam
		};
	};
	
	var onSuccess = function(xhrResponse) {
		var productTypes = [];
		if (Array.isArray(xhrResponse.data)) {
			productTypes = xhrResponse.data;
		} else {
			productTypes = [xhrResponse.data];
		}
		
		retrieveProductsByProductTypeId.call(this, productTypes);
	};
	
	var retrieveProductsByProductTypeId = function(productTypes) {
		var requestParam = "?productTypeIds=";
		for (var i = 0 ; i < productTypes.length - 1 ; i++) {
			requestParam += productTypes[i].id + ";";
		}
		requestParam += productTypes[productTypes.length - 1].id;
		
		var requestData = {
			method: "GET",
			url: DestinationUtil.getProductSearchingEndpoint() + requestParam
		};
		
		RestClient.GET(requestData, jQuery.proxy(onSuccessfullyLoadedItems, this), jQuery.proxy(onError, this));
	};
	
	var onSuccessfullyLoadedItems = function(xhrResponse) {
		addItemsToCache.call(this, Array.isArray(xhrResponse.data) ? xhrResponse.data : [xhrResponse.data]);
	};
	
	var addItemsToCache = function(retrievedItems) {
		var clientCache = com.rs.client.cache.ClientCache.prototype.getInstance();
		
		var products = clientCache.getCacheEntry("products");
		if (typeof products === "undefined") {
			products = {};
		}
		
		for (var i = 0 ; i < retrievedItems.length ; i++) {
			var productTypeId = retrievedItems[i].product_type_id;
			if (typeof products[productTypeId] === "undefined") {
				products[productTypeId] = [];
			}
			products[productTypeId].push(retrievedItems[i]);
		}
		
		clientCache.setCacheEntry("products", products);
		
		var productItems = [];
		for (var i = 0 ; i < tempProductTypeIds.length ; i++) {
			jQuery.merge(productItems, products[tempProductTypeIds[i]]);
		}
		this.items = productItems;
		tempProductTypeIds = null;
	};
	
	var onError = function(xhrResponse) {
		$("#result-modal-label").text("Неуспешенo извличане на данни.");
		$("#result-modal-body").text("Данните за продукта, който искате да заредите не бяха успешно извлечени.");
		$('#result-modal').modal({ keyboard: true });
	};
})();