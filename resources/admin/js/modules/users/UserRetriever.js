(function() {
	
	/* ============ Constants ============= */
	
	var NO_CONTENT = 204;
	var UNPROCESSABLE_ENTITY = 422;
	
	/* ============ Variables and Constructor ============= */
	
	var RestUtil = null;
	var HeaderUtil = null;
	var DestinationUtil = null;
	
	var moduleNames = new com.rs.module.ModuleNames();
	var userRetrieverName = moduleNames.getUserRetrieverName();
	var adminControllerName = moduleNames.getAdminControllerName();
	var restUtilName = moduleNames.getRestClientName();
	var destinationUtilName = moduleNames.getDestinationUtilName();
	var headerUtilName = moduleNames.getHeaderUtilName();
	
	var UserRetriever = function(RUtil, DUtil, HUtil) {
		RestUtil = RUtil;
		HeaderUtil = HUtil;
		DestinationUtil = DUtil;
		
		return {
			loadUserById: loadUserById
		};
	};
	
	/* ============ Function declaration ============= */
	
	var loadUserById = function(userId, $scope) {
		var requestData = prepareUserRequestData(userId);
		RestUtil.GET(requestData, jQuery.proxy(onSuccess, $scope), jQuery.proxy(onError, $scope));
	};
	
	var prepareUserRequestData = function(userId) {
		var path = "?id=" + userId;
		
		return {
			method : "GET",
			url : DestinationUtil.getUserSearchingEndpoint() + path
		};
	};
	
	var onSuccess = function(xhrResponse) {
		if (xhrResponse.status === NO_CONTENT) {
			this.notFound = "Не успяхме да намерим търсения от вас продукт.";
			return;
		}
		
		this.id = xhrResponse.data.id;
		this.email = xhrResponse.data.email;
		this.firstname = xhrResponse.data.first_name;
		this.lastname = xhrResponse.data.last_name;
	};

	var onError = function(xhrResponse) {
		if (xhrResponse.status === UNPROCESSABLE_ENTITY) {
			this.errorMessage = "Не успяхме да заредим данните за този продукт, поради грешка възникнала " +
				"при валидацията на входните данни, моля опитайте пак." +
				"Статус на грешката: [" + xhrResponse.status + "], хвърлена грешка: [" + xhrResponse.statusText + "]." +
				"Информация от сървъра: [" + 
					HeaderUtil.getHeaderValueByName(xhrResponse, "X-Request-Result") + 
				"]";
		} else {
			this.errorMessage = "Възникна неочаквана грешка при опит за извличане на информация за продукта, моля опитайте пак." +
				"Статус на грешката: [" + xhrResponse.status + "], хвърлена грешка: [" + xhrResponse.statusText + "]." +
				"Информация от сървъра: [" + 
					HeaderUtil.getHeaderValueByName(xhrResponse, "X-Request-Result") + 
				"]";
		}
	};
	
	/* ============ Module Registration ============= */
	
	var module = angular.module(adminControllerName);
	module.factory(userRetrieverName, [restUtilName, destinationUtilName, headerUtilName, UserRetriever]);

})();