(function() {

	/* ============ Variables and Constructor ============= */
	
	var RestClient= null;
	var HeaderUtil = null;
	var DestinationUtil = null;
	
	var moduleNames = new com.rs.module.ModuleNames();
	var registry = com.rs.registry.Registry.prototype.getInstance();
	
	var module = angular.module(moduleNames.getApplicationName());
	
	var EditNavigationController = function($scope, $http, NavigationRetriever) {
		initModel($scope);
		
		RestClient = registry.getReference(moduleNames.getRestClientName(), $http);
		HeaderUtil = registry.getReference(moduleNames.getHeaderUtilName());
		DestinationUtil = registry.getReference(moduleNames.getDestinationUtilName());
		
		NavigationRetriever.loadItems($scope);
	};
	
	var initModel = function ($scope) {
		$scope.isSubMenuEnabled = false;
		$scope.buttonText = "Редактирай";
		
		$scope.updateItems = updateItems;
		$scope.updateSubItems = updateSubItems;
		$scope.reloadSubItems = jQuery.proxy(reloadSubItems, $scope);
		$scope.executeRequest = jQuery.proxy(executeRequest, $scope);
	};
	
	module.controller("EditNavigationController", ["$scope", "$http", moduleNames.getNavigationItemRetrieverName(), EditNavigationController]);
	
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
	
	/* ================ Selectors onChange event handlers ================ */
	
	var reloadSubItems = function(oElement) {
		var itemId = oElement.existingItemId;
		if (isNaN(itemId)) {
			return this.subItems = [];
		}
		this.subItems = getItemById.call(this, parseInt(itemId));
	};
	
	var getItemById = function (itemId) {
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
		RestClient.PUT(requestData, jQuery.proxy(onSuccess, this), jQuery.proxy(onError, this));
	};
	
	var prepareRequestData = function(formData, scope) {
		var data = {
			itemId : getItemId(scope),
			name : formData.newItemName,
			displayName : formData.displayName,
			language : formData.language
		};
		
		var headers = {
			"Content-Type" : "application/json"
		};
		
		return {
			method : "PUT",
			url : DestinationUtil.getNavigationItemModificationEndpoint(),
			headers : headers,
			data : JSON.stringify(data) 
		};
	};
	
	var getItemId = function(scope) {
		if (scope.isSubMenuEnabled) {
			return scope.existingSubItemId;
		}
		
		return scope.existingItemId;
	};
	
	var onSuccess = function(xhrResponse) {
		this.modalText = "Успешен промяна";
		this.requestExecutionResult = "Успешно променени данни. Моля изчакайте страницата да бъде презаредена.";
		
		$('#result-modal').modal({ backdrop: "static" });
		
		setTimeout(function() {
			location.reload();
		}, 1500);
	};
	
	var onError = function(xhrResponse) {
		this.modalText = "Неуспешена промяна";
		this.requestExecutionResult = "Данните не бяха успешно променени." +
			"Статус на грешката: [" + xhrResponse.status + "], хвърлена грешка: [" + xhrResponse.statusText + "]." +
			"Информация от сървъра: [" 
				+ HeaderUtil.getHeaderValueByName(xhrResponse, "X-Request-Result")
			+ "]";
		$('#result-modal').modal({ keyboard: true });
	};
})();