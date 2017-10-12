(function() {
	
	var RestClient = null;
	var DestinationUtil = null;
	
	var clientModules = new com.rs.client.module.ClientModules();
	var registry = com.rs.registry.Registry.prototype.getInstance();
	
	var module = angular.module(clientModules.getClientControllerName());
	
	var DetailsController = function($scope, $routeParams, $http) {
		RestClient = registry.getReference(clientModules.getRestClientName(), $http);
		DestinationUtil = registry.getReference(clientModules.getDestinationUtilName());
		
		initModel($scope);
		
		var uniqueId = $routeParams.uniqueId;
		if (isNaN(uniqueId)) {
			return showErrorDialog($scope);
		}

		setBreadcrumb($scope, $routeParams, uniqueId);
		
		loadProductFromCart.call($scope, uniqueId);
		loadItemByUniqueId.call($scope, uniqueId);
	};
	
	var initModel = function($scope) {
		$scope.isInvalidProduct = false;
		$scope.executeRequest = jQuery.proxy(executeRequest, $scope);
		$scope.addProductToCart = jQuery.proxy(addProductToCart, $scope);
		$scope.host = DestinationUtil.getResourcesEndpoint();
	};
	
	module.controller("DetailsController", ["$scope", "$routeParams", "$http", DetailsController]);
	
	var showErrorDialog = function($scope) {
		$scope.isInvalidProduct = true;
		$("#result-modal-label").text("Невалиден продукт.");
		$("#result-modal-body").text("Продукта, който се опитвате да заредите е невалиден.");
		$('#result-modal').modal({ keyboard: true });
	};
	
	var setBreadcrumb = function($scope, $routeParams, uniqueId) {
		var navItemName = $routeParams.navItemName;
		var navSubItemName = $routeParams.navSubItemName;
		
		var navUtil = new com.rs.utils.NavigationUtil();
		
		var navItem = navUtil.getNavItemByName(navItemName);
		var navSubItem = navUtil.getNavItemByName(navSubItemName);
		
		var navItemUtil = registry.getReference(clientModules.getTemplateUtilName());
		navItemUtil.setBreadcrumb(navItem, navSubItem, { displayName: String(uniqueId) });
	};
	
	var loadProductFromCart = function(uniqueId) {
		var onSuccess = jQuery.proxy(function(data, textStatus, jqXhr) {
			closeBusyDialog();
			
			this.$apply(jQuery.proxy(function() {
				if (jqXhr.status !== 204) {
					this.buttonText = "Премахни от количката";
				} else {
					this.buttonText = "Добави в количката";
				}
			}, this));
		}, this);
		
		var onError = jQuery.proxy(function(jqXhr, textStatus, errorThrow) {
			closeBusyDialog();
			this.buttonText = "Добави в количката";
		}, this);
		
		openBusyDialog();
		
		var ordersUtil = new com.rs.utils.OrdersUtil();
		ordersUtil.isProductInCart(onSuccess, onError, uniqueId);
	};
	
	var loadItemByUniqueId = function(uniqueId) {
		var requestData = {
			method: "GET",
			url: DestinationUtil.getProductSearchingEndpoint() + "?uniqueId=" + uniqueId
		};
		
		openBusyDialog();
		
		RestClient.GET(requestData, jQuery.proxy(onSuccess, this), jQuery.proxy(onError, this));
	};
	
	var onSuccess = function(xhrResponse) {
		this.item = xhrResponse.data;

		closeBusyDialog();
	};
	
	var onError = function(xhrResponse) {
		closeBusyDialog();
		
		$("#result-modal-label").text("Неуспешенo извличане на данни.");
		$("#result-modal-body").text("Данните за продукта, който искате да заредите не бяха успешно извлечени.");
		$('#result-modal').modal({ keyboard: true });
	};
	
	var executeRequest = function(uniqueId) {
		var ordersUtil = new com.rs.utils.OrdersUtil();
		if (this.buttonText === "Добави в количката") {
			ordersUtil.addProductToCart(jQuery.proxy(onSuccessfullyAddedProduct, this), jQuery.proxy(onFailureOfAddingProduct, this), uniqueId);
		} else {
			ordersUtil.removeProductFromCart(jQuery.proxy(onSuccessfullyRemovedProduct, this), jQuery.proxy(onErrorOfRemovingProduct, this), uniqueId);
		}
	};
	
	var addProductToCart = function(uniqueId) {
		var requestData = {
			method: "POST",
			url: String.format(DestinationUtil.getAddProductToCartEndpoint(), uniqueId)
		};

		openBusyDialog();

		RestClient.POST(requestData, jQuery.proxy(onSuccessfullyAddedProduct, this), jQuery.proxy(onFailureOfAddingProduct, this));
	};
	
	var onSuccessfullyAddedProduct = function(data, textStatus, jqXhr) {
		closeBusyDialog();
		
		$("#result-modal-label").text("Успешно добавен продукт.");
		$("#result-modal-body").text("Продуктът беше добавен успешно към вашата кошница.");
		$('#result-modal').modal({ keyboard: true });
		
		this.$apply(jQuery.proxy(function() {
			this.buttonText = "Премахни от количката";
		}, this));
		
		registry.getReference(clientModules.getCartUtilName()).incrementItemsInTheCart();
	};
	
	var onFailureOfAddingProduct = function(jqXhr, textStatus, errorThrow) {
		closeBusyDialog();
		
		$("#result-modal-label").text("Неуспешенo записване на данни.");
		$("#result-modal-body").text("Извиняваме се за неудобството, но не успяхме да вкараме продукта в кошницата.");
		$('#result-modal').modal({ keyboard: true });
	};
	
	var onSuccessfullyRemovedProduct = function(data, textStatus, jqXhr) {
		closeBusyDialog();
		
		$("#result-modal-label").text("Успешно премахнат продукт.");
		$("#result-modal-body").text("Продуктът беше премахнат успешно към вашата кошница.");
		$('#result-modal').modal({ keyboard: true });
		
		this.$apply(jQuery.proxy(function() {
			this.buttonText = "Добави в количката";
		}, this));
		
		registry.getReference(clientModules.getCartUtilName()).decrementItemsFromTheCart();
	};
	
	var onErrorOfRemovingProduct = function(jqXhr, textStatus, errorThrow) {
		closeBusyDialog();
		
		$("#result-modal-label").text("Неуспешенo премахнати на данни.");
		$("#result-modal-body").text("Извиняваме се за неудобството, но не успяхме да премахнем продукта от кошницата.");
		$('#result-modal').modal({ keyboard: true });
	};
	
	var openBusyDialog = function() {
		$('#wait-modal').modal({
			backdrop: 'static',
			keyboard: false
		});
	};
	
	var closeBusyDialog = function() {
		$('#wait-modal').modal('hide');
	};
	
})();