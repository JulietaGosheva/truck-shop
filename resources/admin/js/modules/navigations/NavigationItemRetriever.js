(function() {
	
	/* ============ Constants ============= */
	
	var NO_CONTENT = 204;
	var UNPROCESSABLE_ENTITY = 422;
	
	/* ============ Variables and Constructor ============= */
	
	var RestClient = null;
	var HeaderUtil = null;
	var DestinationUtil = null;
	
	var moduleNames = new com.rs.module.ModuleNames();
	var registry = com.rs.registry.Registry.prototype.getInstance();
	
	var NavigationItemRetriever = function($http) {
		RestClient = registry.getReference(moduleNames.getRestClientName(), $http);
		HeaderUtil = registry.getReference(moduleNames.getHeaderUtilName());
		DestinationUtil = registry.getReference(moduleNames.getDestinationUtilName());
		
		return {
			loadItems: loadItems,
			loadRootItems: loadRootItems,
			loadItemById: loadItemById
		};
	};
	
	/* ============ Function declaration ============= */
	
	var loadItems = function($scope) {
		var requestData = {
			method : "GET",
			url : DestinationUtil.getNavigationItemsEndpoint()
		};
		
		RestClient.GET(requestData, jQuery.proxy(onSuccessfullyLoadedItems, $scope), jQuery.proxy(onErrorWhileLoadingItems, $scope));
	};
	
	var onSuccessfullyLoadedItems = function(xhrResponse) {
		if (xhrResponse.status === NO_CONTENT) {
			this.notFound = "Не успяхме да извлечем навигационните менюта.";
			return;
		}
		
		if (Array.isArray(xhrResponse.data)) {
			this.items = xhrResponse.data;
		} else {
			this.items = Object.toArray(xhrResponse.data);
		}
	};
	
	var onErrorWhileLoadingItems = function(xhrResponse) {
		if (xhrResponse.status === UNPROCESSABLE_ENTITY) {
			this.errorMessage = "Не успяхме да заредим навигационни менюта поради възникването на грешка " +
				"при валидиране на входните данни, моля опитайте пак." +
				"Статус на грешката: [" + xhrResponse.status + "], хвърлена грешка: [" + xhrResponse.statusText + "]." +
				"Информация от сървъра: [" + 
					HeaderUtil.getHeaderValueByName(xhrResponse, "X-Request-Result") + 
				"]";
		} else {
			this.errorMessage = "Възникна неочаквана грешка при опит за извличане на навигационните менюта, моля опитайте пак." +
				"Статус на грешката: [" + xhrResponse.status + "], хвърлена грешка: [" + xhrResponse.statusText + "]." +
				"Информация от сървъра: [" + 
					HeaderUtil.getHeaderValueByName(xhrResponse, "X-Request-Result") + 
				"]";
		}
	};
	
	var loadRootItems = function($scope) {
		var requestData = {
			method : "GET",
			url : DestinationUtil.getRootNavigationItemsEndpoint()
		};
		
		RestClient.GET(requestData, jQuery.proxy(onSuccessfullyLoadedRootItems, $scope), jQuery.proxy(onErrorWhileLoadingRootItems, $scope));
	};
	
	var onSuccessfullyLoadedRootItems = function(xhrResponse) {
		if (xhrResponse.status === NO_CONTENT) {
			this.notFound = "Не успяхме да намерим търсения от вас продукт.";
			return;
		}
		
		if (Array.isArray(xhrResponse.data)) {
			this.items = xhrResponse.data;
		} else {
			this.items = [xhrResponse.data];
		}
	};
	
	var onErrorWhileLoadingRootItems = function(xhrResponse) {
		if (xhrResponse.status === UNPROCESSABLE_ENTITY) {
			this.errorMessage = "Не успяхме да заредим навигационни менюта поради възникването на грешка " +
				"при валидиране на входните данни, моля опитайте пак." +
				"Статус на грешката: [" + xhrResponse.status + "], хвърлена грешка: [" + xhrResponse.statusText + "]." +
				"Информация от сървъра: [" + 
					HeaderUtil.getHeaderValueByName(xhrResponse, "X-Request-Result") + 
				"]";
		} else {
			this.errorMessage = "Възникна неочаквана грешка при опит за извличане на навигационните менюта, моля опитайте пак." +
				"Статус на грешката: [" + xhrResponse.status + "], хвърлена грешка: [" + xhrResponse.statusText + "]." +
				"Информация от сървъра: [" + 
					HeaderUtil.getHeaderValueByName(xhrResponse, "X-Request-Result") + 
				"]";
		}
	};
	
	var loadItemById = function(userId, $scope) {
		var requestData = {
			method : "GET",
			url : String.format(DestinationUtil.getNavigationItemSearchingEndpoint(), userId)
		};
		
		RestClient.GET(requestData, jQuery.proxy(onSuccessfullyLoadedItem, $scope), jQuery.proxy(onErrorWhileLoadingItem, $scope));
	};
	
	var onSuccessfullyLoadedItem = function(xhrResponse) {
		if (xhrResponse.status === NO_CONTENT) {
			this.notFound = "Не успяхме да намерим търсения от вас продукт.";
			return;
		}
		
		this.name = xhrResponse.data.name;
		this.href = xhrResponse.data.href;
		this.displayName = xhrResponse.data.navigation_item_i18_n[0].display_name;
	};

	var onErrorWhileLoadingItem = function(xhrResponse) {
		if (xhrResponse.status === UNPROCESSABLE_ENTITY) {
			this.errorMessage = "Не успяхме да заредим данните за това навигационно меню, поради грешка възникнала " +
				"при валидацията на входните данни, моля опитайте пак." +
				"Статус на грешката: [" + xhrResponse.status + "], хвърлена грешка: [" + xhrResponse.statusText + "]." +
				"Информация от сървъра: [" + 
					HeaderUtil.getHeaderValueByName(xhrResponse, "X-Request-Result") + 
				"]";
		} else {
			this.errorMessage = "Възникна неочаквана грешка при опит за извличане на информация за това навигационно меню, моля опитайте пак." +
				"Статус на грешката: [" + xhrResponse.status + "], хвърлена грешка: [" + xhrResponse.statusText + "]." +
				"Информация от сървъра: [" + 
					HeaderUtil.getHeaderValueByName(xhrResponse, "X-Request-Result") + 
				"]";
		}
	};
	
	/* ============ Module Registration ============= */
	
	var module = angular.module(moduleNames.getAdminControllerName());
	module.factory(moduleNames.getNavigationItemRetrieverName(), ["$http", NavigationItemRetriever]);
})();