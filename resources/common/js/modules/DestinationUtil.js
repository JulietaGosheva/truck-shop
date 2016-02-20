(function() {
	
	/* ============ Variables and Constructor ============= */
	
	var moduleNames = new com.rs.module.ModuleNames();
	var adminControllerName = moduleNames.getApplicationName();
	var destinationUtilName = moduleNames.getDestinationUtilName();
	
	var DestinationUtil = function() {
		var SERVER_URL = "http://localhost/truck-shop/";
		
		var PRODUCTS_ENDPOINT = SERVER_URL + "products/api/v1";
		var ALL_PRODUCTS_ENDPOINT = PRODUCTS_ENDPOINT + "/all";
		var PRODUCT_TYPES_ENDPOINT = PRODUCTS_ENDPOINT + "/types";
		var PRODUCT_IMAGE_ENDPOINT = PRODUCTS_ENDPOINT + "/image";
		var DELETE_PRODUCT_ENDPOINT = PRODUCTS_ENDPOINT + "?id={productId}";
		var PRODUCT_BRANDS_ENDPOINT = PRODUCTS_ENDPOINT + "/types/{typeId}/brands";
		var UPDATE_PRODUCT_IMAGE_ENDPOINT = PRODUCTS_ENDPOINT + "/image/{imageName}";
		var PRODUCT_MODELS_ENDPOINT = PRODUCTS_ENDPOINT + "/types/{typeId}/brands/{brandId}/models";
		
		return {
			getProductListEndpoint: function() {
				return ALL_PRODUCTS_ENDPOINT;
			},
			getProductCreationEndpoint: function() {
				return PRODUCTS_ENDPOINT;
			},
			getProductModificationEndpoint: function() {
				return PRODUCTS_ENDPOINT;
			},
			getProductDeletionEndpoint: function() {
				return DELETE_PRODUCT_ENDPOINT;
			},
			getProductSearchingEndpoint: function() {
				return PRODUCTS_ENDPOINT;
			},
			getProductTypesEndpoint: function() {
				return PRODUCT_TYPES_ENDPOINT;
			},
			getProductBrandsEndpoint: function() {
				return PRODUCT_BRANDS_ENDPOINT;
			},
			getProductModelsEndpoint: function() {
				return PRODUCT_MODELS_ENDPOINT;
			},
			getProductPhotoEndpoint: function() {
				return PRODUCT_IMAGE_ENDPOINT;
			},
			getProductPhotoModificationEndpoint: function() {
				return UPDATE_PRODUCT_IMAGE_ENDPOINT;
			},
			getUserCreationEndpoint : function() {
				return SERVER_URL + "/registration";
			}
		};
	};
	
	/* ============ Module Registration ============= */
	
	var module = undefined;
	try {
		module = angular.module("AngularApplication");
		module.factory(destinationUtilName, [DestinationUtil]);
	} catch(Exception) {
		//just ignore the exception
	}
	
	try {
		module = angular.module(adminControllerName);
		module.factory(destinationUtilName, [DestinationUtil]);
	} catch(Exception) {
		//just ignore the exception
	}
})();