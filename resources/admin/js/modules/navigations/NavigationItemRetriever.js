(function() {
	
	/* ============ Constants ============= */
	
	var NO_CONTENT = 204;
	var UNPROCESSABLE_ENTITY = 422;
	
	/* ============ Variables and Constructor ============= */
	
	var RestUtil = null;
	var HeaderUtil = null;
	var DestinationUtil = null;
	
	var moduleNames = new com.rs.module.ModuleNames();
	var navigationItemRetrieverName = moduleNames.getNavigationItemRetrieverName();
	var adminControllerName = moduleNames.getApplicationName();
	var restUtilName = moduleNames.getRestUtilName();
	var destinationUtilName = moduleNames.getDestinationUtilName();
	var headerUtilName = moduleNames.getHeaderUtilName();
	
	var UserRetriever = function(RUtil, DUtil, HUtil) {
		RestUtil = RUtil;
		HeaderUtil = HUtil;
		DestinationUtil = DUtil;
		
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
		
		RestUtil.GET(requestData, jQuery.proxy(onSuccessfullyLoadedItems, $scope), jQuery.proxy(onErrorWhileLoadingItems, $scope));
	};
	
	var onSuccessfullyLoadedItems = function(xhrResponse) {
		if (xhrResponse.status === NO_CONTENT) {
			this.notFound = "Не успяхме да намерим търсения от вас продукт.";
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
		
		RestUtil.GET(requestData, jQuery.proxy(onSuccessfullyLoadedRootItems, $scope), jQuery.proxy(onErrorWhileLoadingRootItems, $scope));
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
		
		RestUtil.GET(requestData, jQuery.proxy(onSuccessfullyLoadedItem, $scope), jQuery.proxy(onErrorWhileLoadingItem, $scope));
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
	
	var module = angular.module(adminControllerName);
	module.factory(navigationItemRetrieverName, [restUtilName, destinationUtilName, headerUtilName, UserRetriever]);

})();