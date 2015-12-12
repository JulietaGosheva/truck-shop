(function() {
	var DestinationUtil = function() {
		var SERVER_URL = "http://localhost/truck-shop/public/index.php/";
		var PRODUCTS_ENDPOINT = "products/api/v1";
		
		return {
			Products : {
				creation: SERVER_URL + PRODUCTS_ENDPOINT,
				edit: SERVER_URL + PRODUCTS_ENDPOINT,
				deletion: SERVER_URL + PRODUCTS_ENDPOINT,
				search: SERVER_URL + PRODUCTS_ENDPOINT
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