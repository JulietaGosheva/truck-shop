(function() {

	var RestClient = null;
	var DestinationUtil = null;
	
	var ordersUtil = new com.rs.utils.OrdersUtil();
    var clientModules = new com.rs.client.module.ClientModules();
    var registry = com.rs.registry.Registry.prototype.getInstance();

    var module = angular.module(clientModules.getClientControllerName());
    
    var CartController = function ($scope, $http) {
    	RestClient = registry.getReference(clientModules.getRestClientName(), $http);
    	DestinationUtil = registry.getReference(clientModules.getDestinationUtilName());
    	
    	initModel($scope);
    	registerCartUtil($scope);
    	
    	if (isCalledFromRouteMatchEvent() === false) {
    		var onComplete = function(xhrResponse) {
    			window.location.hash = "#/";
    			window.location.hash = "#/cart";
    		};
		}
    	
    	if (location.hash === "#/cart") {
    		registry.getReference(clientModules.getTemplateUtilName()).setBreadcrumb({ displayName: "Количка" });
    		
    		openBusyDialog();
    		
    		ordersUtil.retrieveUserOrdersFromCart(jQuery.proxy(onSuccess, $scope), jQuery.proxy(onError, $scope), onComplete);
    	} else {
    		ordersUtil.retrieveUserOrdersFromCart();
    	}
    	
    	setInterval(function() {
    		if ($scope.emptyCartMessage === "Няма добавени продукти към вашата количка." || location.hash === "#/cart") {
    			$("#wait-modal").hide();
    		}
    	}, 5000);
    };
    
    var isCartUtilRegistered = function() {
    	return typeof registry.getReference(clientModules.getCartUtilName()) !== "undefined";
    };
    
    var isCalledFromRouteMatchEvent = function() {
    	try {
     		throw new Error();
    	} catch (e) {
    		return e.stack.indexOf("angular-route.min.js") !== -1;
    	}
    };
    
    var initModel = function($scope) {
    	$scope.email = "";
    	$scope.phone = "";
    	$scope.address = "";
    	$scope.itemCount = 0;
    	
    	//TODO: dispaly google map
    	$scope.googleMap = {
			center: {
				latitude: 43,
				longitude: 25
			},
			zoom: 6
		};
    	
    	$scope.host = DestinationUtil.getResourcesEndpoint();
    	$scope.executeRequest = jQuery.proxy(_executeRequest, $scope);
    	$scope.removeProductFromCart = jQuery.proxy(_removeProductFromCart, $scope);
    };
    
    var registerCartUtil = function($scope) {
    	if (isCartUtilRegistered() || isCalledFromRouteMatchEvent()) {
    		return;
    	}
    	
    	var cartUtil = {
    		setItemsCount: function(itemsCount) {
    			$scope.itemCount = itemsCount;
    		},
    		getItemsCount: function() {
    			return $scope.itemCount;
    		},
    		incrementItemsInTheCart: function() {
    			$scope.$apply(function() {
    				$scope.itemCount++;
    			});
    		},
    		decrementItemsFromTheCart: function() {
    			$scope.$apply(function() {
    				$scope.itemCount--;
    			});
    		}
    	};
      
    	registry.register(clientModules.getCartUtilName(), cartUtil);
    };
    
    module.controller('CartController', ["$scope", "$http", CartController]);
    
    //TODO: Retrieve items by unique id. Try to find it in cache and if we don't find it, then search in backend
    var onSuccess = function(data, textStatus, jqXhr) {
    	var uniqueIds = typeof data === "undefined" ? [] : Object.toArray(data);
    	
    	var cartUtil = registry.getReference(clientModules.getCartUtilName());
    	if (typeof cartUtil === "undefined") {
    		closeBusyDialog();
    		return;
    	}
    	
    	cartUtil.setItemsCount(uniqueIds.length);
    	
    	if (uniqueIds.length > 0) {
    		this.emptyCartMessage = undefined;
    		retrieveProductDetails.call(this, uniqueIds);
    	} else {
    		closeBusyDialog();
    		
    		this.emptyCartMessage = "Няма добавени продукти към вашата количка.";
    	}
    	
    	ordersUtil.setProductOrders(uniqueIds);
    };
    
    var onError = function(jqXhr, textStatus, errorThrown) {
    	closeBusyDialog();
		
		$("#result-modal-label").text("Неуспешенo извличане на данни.");
		$("#result-modal-body").text("Извиняваме се за неудобството, но не успяхме да извлечем продуктите от вашата кошницата. Моля опитайте отново.");
		$('#result-modal').modal({ keyboard: true });
    };
    
    var retrieveProductDetails = function(uniqueIds) {
    	var groupedIds = uniqueIds.join(";");
    	
    	var requestData = {
    		method: "GET",	
    		url: String.format(DestinationUtil.getMultipleProductDetailsEndpoint(), groupedIds)
    	};
    	
    	RestClient.GET(requestData, jQuery.proxy(onSuccessfullyRetrievedItemsData, this), jQuery.proxy(onError, this));
    };
    
    var onSuccessfullyRetrievedItemsData = function(xhrResponse) {
    	closeBusyDialog();
    	
    	this.items = typeof xhrResponse.data === "undefined" ? [] : Object.toArray(xhrResponse.data);
    	setQuantityFieldToItems.call(this, this.items);
    };
    
    var setQuantityFieldToItems = function(items) {
    	for (var i = 0 ; i < items.length ; i++) {
    		items[i].quantity = 1;
    	}
    };
    
    var _removeProductFromCart = function(uniqueId) {
    	openBusyDialog();

    	var onSuccessFn = jQuery.proxy(_onSuccessfullyRemovedProduct, this);
    	var onErrorFn = jQuery.proxy(_onErrorOfRemovingProduct, this);

		ordersUtil.removeProductFromCart(onSuccessFn, onErrorFn, uniqueId);
	};
    
    var _onSuccessfullyRemovedProduct = function(data, textStatus, jqXhr) {
		closeBusyDialog();
		
		refreshProductListAfterRemoval.call(this);
		
		$("#result-modal-label").text("Успешно премахнат продукт.");
		$("#result-modal-body").text("Продуктът беше премахнат успешно от вашата кошница.");
		$('#result-modal').modal({ keyboard: true });
		
		this.buttonText = "Добави в количката";
		
		registry.getReference(clientModules.getCartUtilName()).decrementItemsFromTheCart();
	};
	
	var _onErrorOfRemovingProduct = function(jqXhr, textStatus, errorThrow) {
		closeBusyDialog();
		
		$("#result-modal-label").text("Неуспешенo премахнати на данни.");
		$("#result-modal-body").text("Извиняваме се за неудобството, но не успяхме да премахнем продукта от кошницата.");
		$('#result-modal').modal({ keyboard: true });
	};
    
	var refreshProductListAfterRemoval = function() {
		this.$apply(jQuery.proxy(function() {
			var itemIds = ordersUtil.getProductOrders();
			for (var i = 0 ; i < this.items.length ; i++) {
				if (itemIds.indexOf(String(this.items[i].unique_id)) === -1) {
					this.items.splice(i, 1);
				}
			}
		}, this));
	};
	
	var _executeRequest = function() {
		var requestData = _prepareOrderRequest.call(this);
		
		RestClient.POST(requestData, jQuery.proxy(_onSuccessfullyOrderedProducts, this), jQuery.proxy(_onErrorWhileOrderingProducts, this));
	};

	var _prepareOrderRequest = function() {
		var postData = {
			email: this.email,
			phone: this.phone,
			address: this.address,
			products: this.items
		};
		
		return {
			method: "POST",
			data: JSON.stringify(postData),
    		url: DestinationUtil.getProductOrderEndpoint()
    	};
	};
	
	var _onSuccessfullyOrderedProducts = function(data, textStatus, jqXhr) {
		$("#result-modal-label").text("Успешно поръчани продукти.");
		$("#result-modal-body").text("Продуктите бяха успешно поръчани. При първа възможност," +
				" ще се свържем с вас, за да потвърдите поръчката.");
		$('#result-modal').modal({ keyboard: true });
	};
	
	var _onErrorWhileOrderingProducts = function(jqXhr, textStatus, errorThrow) {
		$("#result-modal-label").text("Неуспешно поръчване на продуктите.");
		$("#result-modal-body").text("Съжаляваме за неудобството, но поръчката на продуктите е неуспешна.");
		$('#result-modal').modal({ keyboard: true });
	};
	
    var openBusyDialog = function() {
		$('#wait-modal').modal({
//			backdrop: 'static',
			keyboard: true
		});
	};
	
	var closeBusyDialog = function() {
		$('#wait-modal').modal('hide');
	};
	
})();