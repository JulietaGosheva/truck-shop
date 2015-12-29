(function() {
	
	var module = angular.module("AdminController");
	
	var EditProductController = function($scope, $routeParams, RESTUtil, DestinationUtil, ProductLoader) {
		$scope.model = {};
		$scope.model.typeInsertMode = true;
		$scope.model.modelInsertMode = true;
		$scope.model.brandInsertMode = true;
		$scope.buttonText = "Редактирай";
		
		$scope.updateProductModels = updateProductModels;
		$scope.updateProductTypes = updateProductTypes;
		$scope.updateProductBrands = updateProductBrands;
		
		$scope.reloadBrands = jQuery.proxy(reloadBrands, $scope);
		$scope.reloadModels = jQuery.proxy(reloadModels, $scope);

		$scope.executeRequest = jQuery.proxy(executeRequest, $scope, RESTUtil, DestinationUtil);

		var productId = $routeParams.id;
		ProductLoader.loadProductById(productId, $scope);
		ProductLoader.loadAllProductEntries($scope);
	};
	
	module.controller("EditProductController", ["$scope", "$routeParams", "RESTUtil", "DestinationUtil", "ProductLoader", EditProductController]);

	/* ================ ngCustomRepeatWatcher directive callback handlers ================ */
	
	var updateProductTypes = function() {
		setTimeout(function() {
			$("#types").trigger("chosen:updated");
		}, 50);
	};
	
	var updateProductBrands = function() {
		setTimeout(function() {
			$("#brands").trigger("chosen:updated");
		}, 50);
	};
	
	var updateProductModels = function() {
		setTimeout(function() {
			$("#models").trigger("chosen:updated");
		}, 50);
	};
	
	/* ================ Selectors onChange event handlers ================ */
	
	var reloadBrands = function(oElement) {
		this.models = [];
		updateProductModels();
		
		this.brands = this.productTypes[oElement.existingProductType].brands;
		updateProductBrands();
	};
	
	var reloadModels = function(oElement) {
		this.models = this.productTypes[oElement.existingProductType].brands[oElement.existingProductBrand].models;
	};
	
	/* ================ Backend AJAX requests ================ */

	var executeRequest = function(RESTUtil, DestinationUtil, oData) {
		var requestData = prepareRequestData(oData, DestinationUtil, this);
		RESTUtil.PUT(requestData, onSuccess, onError);
	};
	
	var prepareRequestData = function(oData, DestinationUtil, scope) {
		var data = {
			id : oData.id,
			name : oData.name,
			uniqueNumber : oData.uniqueNumber,
			type : (scope.typeInsertMode === true ? oData.newProductType : oData.existingProductType),
			brand : (scope.brandInsertMode === true ? oData.newProductBrand : oData.existingProductBrand),
			model : (scope.modelInsertMode === true ? oData.newProductModel : oData.existingProductModel),
			imageName: oData.imageName,
			price : oData.price
		};
		
		var headers = {
			"Content-Type" : "application/json"
		};
		
		return {
			method : "PUT",
			url : DestinationUtil.Product.edit,
			headers : headers,
			data : JSON.stringify(data) 
		};
	};
	
	var onSuccess = function(xhrResponse) {
		this.title = "Успешно редактиране.";
		this.resultMessage = "Успешно редактирани данни. Моля изчакайте страницата да бъде презаредена.";
		
		$('#edit-products-result-modal').modal({
			backdrop: "static"
		});
		
		setTimeout(function() {
			location.hash = "#/products/edit";
		}, 1500);
	};
	
	var onError = function(xhrResponse) {
		this.title = "Неуспешно редактиране.";
		this.resultMessage = "Данните не бяха редактирани." +
			"Статус на грешката: [" + xhrResponse.status + "], хвърлена грешка: [" + xhrResponse.statusText + "]." +
			"Информация от сървъра: [" + xhrResponse.getResponseHeader("X-Request-Result") + "]";
		
		$('#edit-products-result-modal').modal({ keyboard: true });
	};
})();