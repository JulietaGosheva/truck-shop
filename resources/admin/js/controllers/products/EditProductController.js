(function() {
	
	var module = angular.module("AdminController");
	
	var EditProductController = function($scope, $routeParams, AJAXRESTUtil, RESTUtil, DestinationUtil, ProductLoader) {
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

		$scope.executeRequest = jQuery.proxy(executeRequest, $scope, AJAXRESTUtil, RESTUtil, DestinationUtil);

		var productId = $routeParams.id;
		ProductLoader.loadProductById(productId, $scope);
		ProductLoader.loadAllProductEntries($scope);
	};
	
	module.controller("EditProductController", ["$scope", "$routeParams", "AJAXRESTUtil", "RESTUtil", "DestinationUtil", "ProductLoader", EditProductController]);

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
		this.doesImageUpdateSucceed = true;
		executeImageUpdateRequest(AJAXRESTUtil, RESTUtil, DestinationUtil, oData, this);
		
		if (this.doesImageUpdateSucceed === true) {
			var requestData = prepareRequestData(oData, DestinationUtil, this);
			RESTUtil.PUT(
				requestData,
				jQuery.proxy(onSuccess, this, RESTUtil, DestinationUtil),
				jQuery.proxy(onError, this)
			);
		}
	};
	
	var executeImageUpdateRequest = function(AJAXRESTUtil, RESTUtil, DestinationUtil, oData, $scope) {
		var formData = new FormData();
		var fileToUpload = $("#file")[0].files[0];
		
		if (fileToUpload === undefined) {
			return;
		}
		
		formData.append("file", fileToUpload);
		
		var requestData = {
			async: false,
			data: formData,
            contentType: false,
            url: String.format(DestinationUtil.Product.imageUpdate, $scope.imageName)
		};
		
		AJAXRESTUtil.POST(
			requestData,
			jQuery.proxy(onSuccessfullyUploadedImage, $scope, RESTUtil, DestinationUtil, oData),
			jQuery.proxy(onFailedImageUpload, $scope)
		);
		
	};
	
	var onSuccessfullyUploadedImage = function(RESTUtil, DestinationUtil, oData, xhrResponse) {
		this.imageName = xhrResponse.imageName;
	};
	
	var onFailedImageUpload = function(xhrResponse) {
		this.title = "Неуспешно редактиране на снимката.";
		this.resultMessage = "Възникна грешка при качването на снимката." +
				"Статус на грешката: [" + xhrResponse.status + "], хвърлена грешка: [" + xhrResponse.statusText + "]." +
				"Информация от сървъра: [" 
					+ (typeof xhrResponse.getResponseHeader("X-Request-Result") === "undefined" ? "Няма информация" : xhrResponse.getResponseHeader("X-Request-Result"))
				+ "]";

		this.doesImageUpdateSucceed = false;
		$('#edit-products-result-modal').modal({ keyboard: true });
	};
	
	var prepareRequestData = function(oData, DestinationUtil, $scope) {
		var type = $scope.model.typeInsertMode === true ? extractProductTypeIdByName(oData.newProductType, $scope) : oData.existingProductType;
		var brand = $scope.model.brandInsertMode === true ? extractProductBrandIdByName(oData.newProductBrand, type, $scope) : oData.existingProductBrand;
		var model = $scope.model.modelInsertMode === true ? extractProductModelIdByName(oData.newProductModel, type, brand, $scope) : oData.existingProductModel;
		
		var data = {
			id : $scope.id,
			name : oData.name,
			uniqueNumber : oData.uniqueNumber,
			type : type,
			brand : brand,
			model : model,
			imageName: $scope.imageName,
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
			"Информация от сървъра: [" 
				+ (typeof xhrResponse.headers()["X-Request-Result"] === "undefined" ? "Няма информация" : xhrResponse.headers()["X-Request-Result"]) 
			+ "]";
		
		$('#edit-products-result-modal').modal({ keyboard: true });
	};
	
	/* ================ Helper Functions ================ */
	
	var extractProductTypeIdByName = function(typeName, $scope) {
		var productTypeId = -1;
		$.each($scope.productTypes, function(index, value) {
			if (value.name === typeName) {
				productTypeId = index;
				return false;
			}
		});
		
		if (productTypeId === -1) {
			return typeName;
		}
		
		return productTypeId;
	};
	
	var extractProductBrandIdByName = function(brandName, typeId, $scope) {
		if (isNaN(typeId)) {
			return brandName;
		}
		
		var brandId = -1;
		$.each($scope.productTypes[typeId].brands, function(index, value) {
			if (value.name === brandName) {
				brandId = index;
				return false;
			}
		});
		
		if (brandId === -1) {
			return brandName;
		}
		
		return brandId;
	};
	
	var extractProductModelIdByName = function(modelName, typeId, brandId, $scope) {
		if (isNaN(typeId) || isNaN(brandId)) {
			return modelName;
		}
		
		var modelId = -1;
		$.each($scope.productTypes[typeId].brands[brandId].models, function(index, value) {
			if (value.name === modelName) {
				modelId = value.id;
				return false;
			}
		});
		
		if (modelId === -1) {
			return modelName;
		}
		
		return modelId;
	};
})();