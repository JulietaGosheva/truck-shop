(function() {
	
	/* ============ Variables and Constructor ============= */
	
	var RestClient= null;
	var HeaderUtil = null;
	var DestinationUtil = null;
	
	var moduleNames = new com.rs.module.ModuleNames();
	var registry = com.rs.registry.Registry.prototype.getInstance();
	
	var module = angular.module(moduleNames.getAdminControllerName());
	
	var DeleteNavigationController = function($scope, $http, NavigationRetriever) {
		initModel($scope);
		
		$scope.subMenuEnabled = false;
		$scope.buttonText = "Изтрии";
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
	
	module.controller("DeleteNavigationController", ["$scope", "$http", moduleNames.getNavigationItemRetrieverName(), DeleteNavigationController]);

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
	
	var executeRequest = function() {
		var requestData = prepareRequestData(this);
		RestClient.DELETE(requestData, jQuery.proxy(onSuccess, this), jQuery.proxy(onError, this));
	};
	
	var prepareRequestData = function(scope) {
		var itemId = getItemId(scope);
		
		return {
			method : "DELETE",
			url : String.format(DestinationUtil.getNavigationItemDeletionEndpoint(), itemId),
		};
	};
	
	var getItemId = function(scope) {
		if (scope.isSubMenuEnabled) {
			return scope.existingSubItemId;
		}
		
		return scope.existingItemId;
	};
	
	var onSuccess = function(xhrResponse) {
		this.modalText = "Успешно изтрит елемент";
		this.requestExecutionResult = "Успешно изтрити данни. Моля изчакайте страницата да бъде презаредена.";
		
		$('#result-modal').modal({ backdrop: "static" });
		
		setTimeout(function() {
			location.reload();
		}, 1500);
	};
	
	var onError = function(xhrResponse) {
		this.modalText = "Неуспешно изтриване";
		this.requestExecutionResult = "Данните не бяха успешно изтрити." +
			"Статус на грешката: [" + xhrResponse.status + "], хвърлена грешка: [" + xhrResponse.statusText + "]." +
			"Информация от сървъра: [" 
				+ HeaderUtil.getHeaderValueByName(xhrResponse, "X-Request-Result")
			+ "]";
		$('#result-modal').modal({ keyboard: true });
	};
})();