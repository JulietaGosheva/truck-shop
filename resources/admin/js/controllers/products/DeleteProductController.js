(function() {
	
	var module = angular.module("AdminController");
	
	var DeleteProductController = function($scope, $routeParams, RESTUtil, DestinationUtil) {
		$scope.executeRequest = jQuery.proxy(executeRequest, $scope, $routeParams, RESTUtil, DestinationUtil);
	};
	
	module.controller("DeleteProductController", ["$scope", "$routeParams", "RESTUtil", "DestinationUtil", DeleteProductController]);
	
	var executeRequest = function(routeParams, RESTUtil, DestinationUtil) {
		var requestData = prepareRequestData(DestinationUtil, routeParams);
		RESTUtil.DELETE(requestData, jQuery.proxy(onSuccess, this), jQuery.proxy(onError, this));
	};
	
	var prepareRequestData = function(DestinationUtil, routeParams) {
		var productId = routeParams.id;
		
		return {
			method : "DELETE",
			url : String.format(DestinationUtil.Product.deletion, productId)
		};
	};
	
	var onSuccess = function(xhrResponse) {
		this.title = "Успешно изтрит продукт.";
		this.resultMessage = "Успешно изтрит продукт. Моля изчакайте страницата да бъде презаредена.";
		
		$('#delete-products-result-modal').modal({
			backdrop: "static"
		});
		
		setTimeout(function() {
			location.hash = "#/products/delete";
		}, 1500);
	};
	
	var onError = function(xhrResponse) {
		this.title = "Неуспешно изтриване.";
		this.resultMessage = "Данните не бяха изтрити." +
			"Статус на грешката: [" + xhrResponse.status + "], хвърлена грешка: [" + xhrResponse.statusText + "]." +
			"Информация от сървъра: [" 
				+ (typeof xhrResponse.headers()["X-Request-Result"] === "undefined" ? "Няма информация" : xhrResponse.headers()["X-Request-Result"]) 
			+ "]";
		
		$('#delete-products-result-modal').modal({ keyboard: true });
	};
	
})();