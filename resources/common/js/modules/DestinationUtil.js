(function() {
	var DestinationUtil = function() {
		var SERVER_URL = "http://localhost/truck-shop/public/index.php/";
		
		var PRODUCTS_ENDPOINT = SERVER_URL + "products/api/v1";
		var ALL_PRODUCTS_ENDPOINT = PRODUCTS_ENDPOINT + "/all";
		var PRODUCT_TYPES_ENDPOINT = PRODUCTS_ENDPOINT + "/types";
		var PRODUCT_IMAGE_ENDPOINT = PRODUCTS_ENDPOINT + "/image";
		var DELETE_PRODUCT_ENDPOINT = PRODUCTS_ENDPOINT + "?id={productId}";
		var PRODUCT_BRANDS_ENDPOINT = PRODUCTS_ENDPOINT + "/types/{typeId}/brands";
		var UPDATE_PRODUCT_IMAGE_ENDPOINT = PRODUCTS_ENDPOINT + "/image/{imageName}";
		var PRODUCT_MODELS_ENDPOINT = PRODUCTS_ENDPOINT + "/types/{typeId}/brands/{brandId}/models";
		
		return {
			Product : {
				all: ALL_PRODUCTS_ENDPOINT,
				creation: PRODUCTS_ENDPOINT,
				edit: PRODUCTS_ENDPOINT,
				deletion: DELETE_PRODUCT_ENDPOINT,
				search: PRODUCTS_ENDPOINT,
				types: PRODUCT_TYPES_ENDPOINT,
				brands: PRODUCT_BRANDS_ENDPOINT,
				models: PRODUCT_MODELS_ENDPOINT,
				image: PRODUCT_IMAGE_ENDPOINT,
				imageUpdate: UPDATE_PRODUCT_IMAGE_ENDPOINT
			}
		};
	};
	
	var module = undefined;
	try {
		module = angular.module("AngularApplication");
		module.factory("DestinationUtil", [DestinationUtil]);
	} catch(Exception) {
		//just ignore the exception
	}
	
	try {
		module = angular.module("AdminController");
		module.factory("DestinationUtil", [DestinationUtil]);
	} catch(Exception) {
		//just ignore the exception
	}
})();