if (typeof com === "undefined") {
	var com = {
		rs : {
			utils : {

			}	
		}
	};
} else if (typeof com.rs === "undefined") {
	com.rs = {
		utils: {

		}
	};
} else if(typeof com.rs.utils === "undefined") {
	com.rs.utils = {};
}

com.rs.utils.OrdersUtil = function() {
	if (com.rs.utils.OrdersUtil.prototype._selfInvoked) {
		this.orders = [];
		
		this._registry = com.rs.registry.Registry.prototype.getInstance();
		this._moduleNames = new com.rs.client.module.ClientModules();

		this._AjaxClient = this._registry.getReference(this._moduleNames.getAjaxClientName());
		this._DestinationUtil = this._registry.getReference(this._moduleNames.getDestinationUtilName());

		return this;
	}
	
	if (com.rs.utils.OrdersUtil.prototype._instance !== undefined) {
		return com.rs.utils.OrdersUtil.prototype._instance;
	}
	
	com.rs.utils.OrdersUtil.prototype._selfInvoked = true;
	com.rs.utils.OrdersUtil.prototype._instance = new com.rs.utils.OrdersUtil();
	com.rs.utils.OrdersUtil.prototype._selfInvoked = false;
	
	return com.rs.utils.OrdersUtil.prototype._instance;
};

com.rs.utils.OrdersUtil.prototype._selfInvoked = false;
com.rs.utils.OrdersUtil.prototype._instance = undefined;

com.rs.utils.OrdersUtil.prototype.retrieveUserOrdersFromCart = function(onSuccessFnProvided, onErrorFnProvided, onComplete) {
	var requestData = {
		async: false,
		dataType: 'json',
		url: this._DestinationUtil.getUserOrdersFromCartEndpoint(),
		complete: onComplete || function(xhrResponse) {}
	};

	var onSuccess = onSuccessFnProvided || jQuery.proxy(function(data, textStatus, jqXhr) {
		this.orders = typeof data === "undefined" ? [] : Object.toArray(data);
		this._registry.getReference(this._moduleNames.getCartUtilName()).setItemsCount(this.orders.length);
    }, this);
	
	var onError = onErrorFnProvided || jQuery.proxy(function(jqXhr, textStatus, errorThrown) {
    	this._showErrorModal("Грешка", "Съжалявам, но не успяхме да заредим продукта от вашата кошницата, моля презаредете страницата.");
    }, this);
	
	this._AjaxClient.GET(requestData, onSuccess, onError);
};

com.rs.utils.OrdersUtil.prototype.removeProductFromCart = function(onSuccessFnProvided, onErrorFnProvided, uniqueId) {
	var elementIndex = this.orders.indexOf(String(uniqueId));
	if (elementIndex === -1) {
		return;
	}
	
	this.orders.splice(elementIndex, 1);
	this._removeProductFromCart(onSuccessFnProvided, onErrorFnProvided, uniqueId);
};

com.rs.utils.OrdersUtil.prototype._removeProductFromCart = function(onSuccessFnProvided, onErrorFnProvided, uniqueId) {
	var requestData = {
		url: String.format(this._DestinationUtil.getRemoveProductFromCartEndpoint(), uniqueId)
	};
	
	var onSuccess = onSuccessFnProvided || jQuery.proxy(function() {
		this._closeBusyDialog();
		this._registry.getReference(this._moduleNames.getCartUtilName()).decrementItemsFromTheCart();
	}, this);
	
	var onError = onErrorFnProvided || jQuery.proxy(function() {
		this._closeBusyDialog();
		this._showErrorModal("Грешка", "Съжалявам, но не успяхме да премахнем продукта от кошницата.");
	}, this);
	
	this._openBusyDialog();
	
	this._AjaxClient.DELETE(requestData, onSuccess, onError);
};

com.rs.utils.OrdersUtil.prototype.addProductToCart = function(onSuccessFnProvided, onErrorFnProvided, uniqueId) {
	this.orders.push(String(uniqueId));
	this._addProductToCart(onSuccessFnProvided, onErrorFnProvided, uniqueId);
};

com.rs.utils.OrdersUtil.prototype._addProductToCart = function(onSuccessFnProvided, onErrorFnProvided, uniqueId) {
	var requestData = {
		url: String.format(this._DestinationUtil.getAddProductToCartEndpoint(), uniqueId)
	};
	
	var onSuccess = onSuccessFnProvided || jQuery.proxy(function() {
		this._closeBusyDialog();
		this._registry.getReference(this._moduleNames.getCartUtilName()).incrementItemsInTheCart();
	}, this);
	
	var onError = onErrorFnProvided || jQuery.proxy(function() {
		this._closeBusyDialog();
		this._showErrorModal("Грешка", "Съжалявам, но не успяхме да добавим продукта в кошницата.");
	}, this);
	
	
	this._openBusyDialog();
	
	this._AjaxClient.POST(requestData, onSuccess, onError);
};

com.rs.utils.OrdersUtil.prototype.isProductInCart = function(onSuccess, onError, uniqueId) {
	var requestData = {
		url: String.format(this._DestinationUtil.getCartProductSearchingEndpoint(), uniqueId)	
	};
	
	this._AjaxClient.GET(requestData, onSuccess, onError);
};

com.rs.utils.OrdersUtil.prototype.setProductOrders = function(orders) {
	this.orders = orders;
};

com.rs.utils.OrdersUtil.prototype.getProductOrders = function() {
	return this.orders;
};

com.rs.utils.OrdersUtil.prototype._openBusyDialog = function() {
	$('#wait-modal').modal({
		backdrop: 'static',
		keyboard: false
	});
};

com.rs.utils.OrdersUtil.prototype._closeBusyDialog = function() {
	$('#wait-modal').modal('hide');
};

com.rs.utils.OrdersUtil.prototype._showErrorModal = function(errorTitle, errorMessage) {
	$("#result-modal-label").text(errorTitle);
	$("#result-modal-body").text(errorMessage);
	$('#result-modal').modal({ keyboard: true });
};
