(function() {
	
	var module = angular.module("AdminController");
	
	var ProductCreationController = function($scope, RESTUtil, DestinationUtil, ProductLoader) {
		$scope.model = {};
		$scope.model.typeInsertMode = true;
		$scope.model.modelInsertMode = true;
		$scope.model.brandInsertMode = true;
		
		$scope.buttonText = "Създай";
		$scope.modalText = "Резултат от изпълнението на записа";
		$scope.requestExecutionResult = "";
		
		$scope.updateProductModels = jQuery.proxy(updateProductModels, $scope);
		$scope.updateProductTypes = jQuery.proxy(updateProductTypes, $scope, ProductLoader);
		$scope.updateProductBrands = jQuery.proxy(updateProductBrands, $scope, ProductLoader);
		
		$scope.reloadBrands = jQuery.proxy(reloadBrands, $scope, ProductLoader);
		$scope.reloadModels = jQuery.proxy(reloadModels, $scope, ProductLoader);
		
		$scope.executeRequest = jQuery.proxy(executeRequest, $scope, RESTUtil, DestinationUtil);
		
		retrieveAllProductEntries($scope, RESTUtil, DestinationUtil);
	};
	
	module.controller("ProductCreationController", ["$scope", "RESTUtil", "DestinationUtil", "ProductLoader", ProductCreationController]);

	/* ================ Single request for retrieving all products ================ */
	
	var retrieveAllProductEntries = function($scope, RESTUtil, DestinationUtil) {
		var requestData = {
			method: "GET",
			url: DestinationUtil.Product.all
		};
		
		RESTUtil.GET(requestData, jQuery.proxy(onSuccessfullyLoadedProducts, $scope), jQuery.proxy(onFailOfLoadingProducts, $scope));
	};
	
	var onSuccessfullyLoadedProducts = function(xhrResponse) {
		var wholeProductsData = xhrResponse.data;
		extractProductTypesAndAddThemToModel(wholeProductsData, this);
	};
	
	var extractProductTypesAndAddThemToModel = function(products, $scope) {
		$scope.types = [];

		var productTypes = {};
		products.forEach(function(product) {
			var brandId = product.brand_id;
			var productTypeId = product.product_type_id;
			if (typeof productTypes[productTypeId] === "undefined") {
				productTypes[productTypeId] = {
					name: product.product_types.name,
					brands: {}
				};
				
				product.brands['models'] = [ product.models ];
				productTypes[productTypeId].brands[brandId] = product.brands;
				
				$scope.types.push(product.product_types);
			} else if (typeof productTypes[productTypeId].brands[brandId] === "undefined"){
				product.brands['models'] = [ product.models ];
				productTypes[productTypeId].brands[brandId] = product.brands;
			} else {
				productTypes[productTypeId].brands[brandId].models.push(product.models);
			}
		});
		
		$scope.productTypes = productTypes;
	};
	
	var onFailOfLoadingProducts = function() {
		this.requestExecutionResult = "Данните за попълването на модела не бяха извлечени успешно" +
				", допълнително инфорамция: " + xhrResponse.data + ".";
		$('#products-result-modal').modal({ keyboard: true });
	};
	
	/* ================ ngCustomRepeatWatcher directive callback handlers ================ */
	
	var updateProductTypes = function(ProductLoader) {
		setTimeout(function() {
			$("#types").trigger("chosen:updated");
		}, 50);
	};
	
	var updateProductBrands = function(ProductLoader) {
		setTimeout(function() {
			$("#brands").trigger("chosen:updated");
		}, 50);
	};
	
	var updateProductModels = function(ProductLoader) {
		setTimeout(function() {
			$("#models").trigger("chosen:updated");
		}, 50);
	};
	
	/* ================ Selectors onChange event handlers ================ */
	
	var reloadBrands = function(ProductLoader, oElement) {
		this.models = [];
		setTimeout(function() {
			$("#models").trigger("chosen:updated");
		}, 25);
		
		//Make the first index selected
		
		this.brands = this.productTypes[oElement.existingProductType].brands;
		updateProductBrands();
	};
	
	var reloadModels = function(ProductLoader, oElement) {
		this.models = this.productTypes[oElement.existingProductType].brands[oElement.existingProductBrand].models;
	};
	
	/* ================ Backend AJAX requests ================ */

	var executeRequest = function(RESTUtil, DestinationUtil, oData) {
		var requestData = prepareRequestData(oData, DestinationUtil, this);
		RESTUtil.POST(requestData, jQuery.proxy(onSuccess, this), jQuery.proxy(onError, this));
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
			price : oData.price
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
	
	var onSuccess = function(xhrResponse) {
		clearFormInputFields();
		this.requestExecutionResult = "Успешно записани данни.";
		$('#products-result-modal').modal({ keyboard: true });
	};
	
	var clearFormInputFields = function() {
		$("#productsform")[0].reset();
	}
	
	var onError = function(xhrResponse) {
		this.requestExecutionResult = "Данните не бяха успешно записани," +
				" допълнителна информация: " + xhrResponse.data + ".";
		$('#products-result-modal').modal({ keyboard: true });
	};
	
})();