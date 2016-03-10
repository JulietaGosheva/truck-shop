(function() {
	
	/* ============ Variables and Constructor ============= */
	
	var RestClient = null;
	var HeaderUtil = null;
	var DestinationUtil = null;
	
	var moduleNames = new com.rs.module.ModuleNames();
	var registry = com.rs.registry.Registry.prototype.getInstance();

	var module = angular.module(moduleNames.getAdminControllerName());
	
	var NavigationCreationController = function($scope, $http, NavigationItemRetriever, ProductRetriever) {
		initModel($scope);
		
		RestClient = registry.getReference(moduleNames.getRestClientName(), $http);
		HeaderUtil = registry.getReference(moduleNames.getHeaderUtilName());
		DestinationUtil = registry.getReference(moduleNames.getDestinationUtilName());
		
		NavigationItemRetriever.loadItems($scope);
		ProductRetriever.loadProductTypes($scope);
	};
	
	var initModel = function ($scope) {
		$scope.language = "bg-BG";
		$scope.itemCreation = true;
		$scope.subItemCreation = true;
		$scope.vehicleTypeIds = ["1"];
		
		$scope.updateItems = updateItems;
		$scope.updateSubItems = updateSubItems;
		$scope.updateProductTypes = updateProductTypes;
		$scope.reloadSubItems = jQuery.proxy(reloadSubItems, $scope);
		$scope.executeRequest = jQuery.proxy(executeRequest, $scope);
	};
	
	module.controller("NavigationCreationController", ["$scope", "$http", moduleNames.getNavigationItemRetrieverName(), moduleNames.getProductRetrieverName(), NavigationCreationController]);
	
	/* ================ ngCustomRepeatWatcher directive callback handlers ================ */
	
	var updateItems = function() {
		setTimeout(function() {
			$("#itemNames").trigger("chosen:updated");
		}, 50);
	};
	
	var updateSubItems = function() {
		setTimeout(function() {
			$("#subItemNames").trigger("chosen:updated");
		}, 50);
	};
	
	var updateProductTypes = function() {
		setTimeout(function() {
			$("#productTypeNames").trigger("chosen:updated");
		}, 50);
	};
	
	/* ================ Selectors onChange event handlers ================ */
	
	var reloadSubItems = function(oElement) {
		var itemId = oElement.existingItemId;
		if (isNaN(itemId)) {
			return this.subItems = [];
		}
		this.subItems = getSubItemsById.call(this, parseInt(itemId));
	};
	
	var getSubItemsById = function (itemId) {
		for (var i = 0 ; i < this.items.length ; i++) {
			var navItem = this.items[i];
			if (navItem.id === itemId) {
				return typeof navItem.subItems === "undefined" ? [] : navItem.subItems;
			}
		}
		return [];
	};
	
	/* ================ Backend AJAX requests ================ */
	
	var executeRequest = function(formData) {
		var requestData = prepareRequestData(formData, this);
		RestClient.POST(requestData, jQuery.proxy(onSuccess, this), jQuery.proxy(onError, this));
	};
	
	var prepareRequestData = function(formData, scope) {
		var data = {
			name : getItemName(formData, scope),
			parentId : getParentId(scope),
			productTypeIds : formData.productTypeIds,
			vehicleTypeIds : formData.vehicleTypeIds,
			displayName : formData.displayName,
			language : formData.language
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
	
	var getItemName = function (formData, scope) {
		if (scope.itemCreation === true) {
			return formData.newItemName;
		}
		
		if (scope.subItemCreation === true) {
			return formData.newSubItemName;
		}
		
		var subItemNames = $("#subItemNames")[0];
		var selectedIndex = $("#subItemNames")[0].selectedIndex;
		return subItemNames.options[selectedIndex].text;
	};
	
	var getParentId = function(scope) {
		if (scope.itemCreation === true) {
			return undefined;
		}
		
		return scope.existingItemId;
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