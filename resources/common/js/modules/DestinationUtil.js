(function() {
	var DestinationUtil = function() {
		var SERVER_URL = "http://localhost/truck-shop/public/index.php/";
		
		var PRODUCTS_ENDPOINT = SERVER_URL + "products/api/v1";
		var PRODUCT_TYPES_ENDPOINT = PRODUCTS_ENDPOINT + "/types";
		var PRODUCT_BRANDS_ENDPOINT = PRODUCTS_ENDPOINT + "/types/{typeId}/brands";
		var PRODUCT_MODELS_ENDPOINT = PRODUCTS_ENDPOINT + "/types/{typeId}/brands/{brandId}/models";
		
		return {
			Product : {
				creation: PRODUCTS_ENDPOINT,
				edit: PRODUCTS_ENDPOINT,
				deletion: PRODUCTS_ENDPOINT,
				search: PRODUCTS_ENDPOINT,
				types: PRODUCT_TYPES_ENDPOINT,
				brands: PRODUCT_BRANDS_ENDPOINT,
				models: PRODUCT_MODELS_ENDPOINT
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