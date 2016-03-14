(function() {
	
	var AjaxClient = null;
	var HeaderUtil = null;
	var DestinationUtil = null;
	
	var clientModules = new com.rs.client.module.ClientModules();
	var module = angular.module(clientModules.getClientControllerName());
	var registry = new com.rs.registry.Registry().getInstance();
	
	var VTypeController = function ($scope, $http) {
		initModel($scope);
		
		AjaxClient = registry.getReference(clientModules.getAjaxClientName());
		HeaderUtil = registry.getReference(clientModules.getHeaderUtilName());
		DestinationUtil = registry.getReference(clientModules.getDestinationUtilName());
	};
	
	module.controller('VTypeController', ["$scope", "$http", VTypeController]);
	
	var initModel = function($scope) {
		$scope.onLinkClicked = jQuery.proxy(onLinkClicked, $scope);
	};
	
	var onLinkClicked = function(vehicleTypeId) {
		setSelectedVehicleTypeID(vehicleTypeId);
		fetchSelectedVehicleData.apply(this);
		setSelectedItem(vehicleTypeId);
	};
	
	var setSelectedVehicleTypeID = function(vehicleTypeId) {
		jQuery.ajaxSetup({
			headers: {
				"X-RS-VType-ID" : vehicleTypeId
			}
		});
	};
	
	var fetchSelectedVehicleData = function() {
		openBusyDialog();
		
		var requestData = {
			method: "GET",
			url: DestinationUtil.getNavigationItemSearchingEndpoint()
		};
		AjaxClient.GET(requestData, jQuery.proxy(onSuccess, this), jQuery.proxy(onFail, this));
	};
	
	var openBusyDialog = function() {
		$('#wait-modal').modal({
			backdrop: 'static',
			keyboard: false
		});
	};
	
	var onSuccess = function(xhrResponse) {
		try {
			var clientCache = com.rs.client.cache.ClientCache.prototype.getInstance();
			
			var items = null;
			if (Array.isArray(xhrResponse)) {
				items = xhrResponse;
			} else {
				items = Object.toArray(xhrResponse);
			}
			
			clientCache.setCacheEntry("navItems", items);
			
			var templateController = registry.getReference("NavItemsTemplate");
			templateController.setNavItems(items);
			
			location.hash = "#/";
		} catch (Exception) {
			closeBusyDialog();
		}
	};
	
	var onFail = function(xhrResponse) {
		closeBusyDialog();
		
		$("#result-modal-label").text("Неуспешенo извличане на данни.");
		$("#result-modal-body").text("Данните за навигационните менюта, който искате да заредите не бяха успешно извлечени.");
		
		$('#result-modal').modal({ keyboard: true });
	};
	
	var closeBusyDialog = function() {
		$('#wait-modal').modal('hide');
	};
	
	var setSelectedItem = function(vehicleTypeId) {
		if (vehicleTypeId === 1) {
			$("#trucks").removeClass("rs-active-links");
			$("#autos").addClass("rs-active-links");
		} else {
			$("#autos").removeClass("rs-active-links");
			$("#trucks").addClass("rs-active-links");
		}
	};
	
})();