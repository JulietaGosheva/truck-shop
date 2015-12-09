(function() {
	var DestinationUtil = function() {
		var SERVER_URL = "http://localhost/truck-shop/public/index.php/";
		
		return {
			Products : {
				creation: SERVER_URL + "products/api/v1",
				edit: SERVER_URL + "products/api/v1",
				deletion: SERVER_URL + "products/api/v1"
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