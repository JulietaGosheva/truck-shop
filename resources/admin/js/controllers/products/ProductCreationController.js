(function() {
	
	var module = angular.module("AdminController");
	
	var ProductCreationController = function($scope, RESTUtil, DestinationUtil, ProductLoader) {
		$scope.typeInsertMode = true;
		$scope.modelInsertMode = true;
		$scope.brandInsertMode = true;
		$scope.buttonText = "Създай";
		
		$scope.loadProductTypes = jQuery.proxy(loadProductTypes, $scope, ProductLoader);
		$scope.loadProductBrands = jQuery.proxy(loadProductBrands, $scope, ProductLoader);
		$scope.loadProductModels = jQuery.proxy(loadProductModels, $scope);
		
		$scope.executeRequest = jQuery.proxy(executeRequest, $scope, RESTUtil, DestinationUtil);
		
		ProductLoader.loadProductTypes($scope);
	};
	
	module.controller("ProductCreationController", ["$scope", "RESTUtil", "DestinationUtil", "ProductLoader", ProductCreationController]);

	var loadProductTypes = function(ProductLoader) {
		ProductLoader.loadProductBrands(this.types[0].id, this);
		setTimeout(function() {
			$("#types").trigger("chosen:updated");
		}, 50);
	};
	
	var loadProductBrands = function(ProductLoader) {
		ProductLoader.loadProductModels(this.types[0].id, this.brands[0].id, this);
		setTimeout(function() {
			$("#brands").trigger("chosen:updated");
		}, 50);
	};
	
	var loadProductModels = function(ProductLoader) {
		setTimeout(function() {
			$("#models").trigger("chosen:updated");
		}, 50);
	};
	
	//TODO: clarify whether or not the verification of the data will be here in the controller or at the backend
	var executeRequest = function(RESTUtil, DestinationUtil, oData) {
		var requestData = prepareRequestData(oData, DestinationUtil, this);
		RESTUtil.POST(requestData, onSuccess, onError);
	};
	
	var prepareRequestData = function(oData, DestinationUtil, scope) {
		var data = {
			name : oData.name,
			uniqueNumber : oData.uniqueNumber,
			type : (scope.typeInsertMode === true ? oData.newProductType : oData.existingProductType),
			brand : (scope.brandInsertMode === true ? oData.newProductBrand : oData.existingProductBrand),
			model : (scope.modelInsertMode === true ? oData.newProductModel : oData.existingProductModel),
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
		console.log("Success message : " + xhrResponse.data);
	};
	
	var onError = function(xhrResponse) {
		console.log("Error message : " + xhrResponse.data);
	};
	
})();