(function() {
	
	var module = angular.module("AdminController");
	
	var ProductCreationController = function($scope, AJAXRESTUtil, RESTUtil, DestinationUtil, ProductLoader) {
		$scope.model = {};
		$scope.model.typeInsertMode = true;
		$scope.model.modelInsertMode = true;
		$scope.model.brandInsertMode = true;
		
		$scope.buttonText = "Създай";
		$scope.modalText = "Резултат от изпълнението на записа";
		
		$scope.updateProductModels = updateProductModels;
		$scope.updateProductTypes = updateProductTypes;
		$scope.updateProductBrands = updateProductBrands;
		
		$scope.reloadBrands = jQuery.proxy(reloadBrands, $scope);
		$scope.reloadModels = jQuery.proxy(reloadModels, $scope);
		
		$scope.executeRequest = jQuery.proxy(executeRequest, $scope, AJAXRESTUtil, RESTUtil, DestinationUtil);
		
		ProductLoader.loadAllProductEntries($scope);
	};
	
	module.controller("ProductCreationController", ["$scope", "AJAXRESTUtil", "RESTUtil", "DestinationUtil", "ProductLoader", ProductCreationController]);

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

	var executeRequest = function(AJAXRESTUtil, RESTUtil, DestinationUtil, oData) {
		var requestData = prepareImageUploadRequestData(DestinationUtil, this);
		AJAXRESTUtil.POST(requestData, jQuery.proxy(onSuccessfullyUploadedImage, this, RESTUtil, DestinationUtil, oData), jQuery.proxy(onFailedImageUpload, this));
	};
	
	var prepareImageUploadRequestData = function(DestinationUtil, $scope) {
		var formData = new FormData();
		var fileToUpload = $("#file")[0].files[0];
		formData.append("file", fileToUpload);
		
		return {
			url: DestinationUtil.Product.image,
			data: formData,
            contentType: false
		};
	};
	
	var onSuccessfullyUploadedImage = function(RESTUtil, DestinationUtil, oData, xhrResponse) {
		var responseBody = xhrResponse;
		this.imageName = responseBody.imageName;
		
		var requestData = prepareRequestData(oData, DestinationUtil, this);
		RESTUtil.POST(requestData, jQuery.proxy(onSuccess, this, RESTUtil, DestinationUtil), jQuery.proxy(onError, this));
	};
	
	var onFailedImageUpload = function(xhrResponse) {
		this.requestExecutionResult = "Възникна грешка при качването на снимката." +
				"Статус на грешката: [" + xhrResponse.status + "], хвърлена грешка: [" + xhrResponse.statusText + "]." +
				"Информация от сървъра: [" + xhrResponse.getResponseHeader("X-Request-Result") + "]";

		$('#products-result-modal').modal({ keyboard: true });
	};
	
	var prepareRequestData = function(oData, DestinationUtil, scope) {
		var typesDropdown = $("#types")[0];
		var brandsDropdown = $("#brands")[0];
		var modelsDropdown = $("#models")[0];
		
		var data = {
			name : oData.name,
			uniqueNumber : oData.uniqueNumber,
			type : (scope.model.typeInsertMode === true ? oData.newProductType : typesDropdown.options[typesDropdown.selectedIndex].text),
			brand : (scope.model.brandInsertMode === true ? oData.newProductBrand : brandsDropdown.options[brandsDropdown.selectedIndex].text),
			model : (scope.model.modelInsertMode === true ? oData.newProductModel : modelsDropdown.options[modelsDropdown.selectedIndexl].text),
			price : oData.price,
			imageName : scope.imageName
		};
		
		var headers = {
			"Content-Type" : "application/json"
		};
		
		return {
			method : "POST",
			url : DestinationUtil.Product.creation,
			headers : headers,
			data : JSON.stringify(data) 
		};
	};
	
	var onSuccess = function(RESTUtil, DestinationUtil, xhrResponse) {
		this.requestExecutionResult = "Успешно записани данни. Моля изчакайте страницата да бъде презаредена.";
		
		$('#products-result-modal').modal({
			backdrop: "static"
		});
		
		setTimeout(function() {
			location.reload();
		}, 1500);
	};
	
	var onError = function(xhrResponse) {
		this.requestExecutionResult = "Данните не бяха успешно записани." +
				"Статус на грешката: [" + xhrResponse.status + "], хвърлена грешка: [" + xhrResponse.statusText + "]." +
				"Информация от сървъра: [" + xhrResponse.getResponseHeader("X-Request-Result") + "]";
		$('#products-result-modal').modal({ keyboard: true });
	};
	
})();