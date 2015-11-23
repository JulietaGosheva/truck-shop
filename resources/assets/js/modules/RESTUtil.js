(function() {

	var ValidationUtil = {
		validateUrl: function(oData) {
			if (!oData.url || oData.url === "") {
				throw new Exception("Cant invoke such type of request without specifying the url.");
			};
		},
		
		validateGETMethodType: function(oData) {
			if (oData.method && oData.method.toUpperCase() !== "GET") {
				throw new Exception("Method type different than \"GET\", can't be passed.");
			}
		},
		
		validatePOSTMethodType: function(oData) {
			if (oData.method && oData.method.toUpperCase() !== "POST") {
				throw new Exception("Method type different than \"POST\", can't be passed.");
			}
		}
	
	};
	
	var RESTUtil = function($http) {
		
		var GETRequest = function(oData, onSuccess, onError) {
			ValidationUtil.validateUrl(oData);
			ValidationUtil.validateGETMethodType(oData);
			$http(oData).then(onSuccess, onError);
		};
		
		var POSTRequest = function(oData, onSuccess, onError) {
			ValidationUtil.validateUrl(oData);
			ValidationUtil.validatePOSTMethodType(oData);
			$http(oData).then(onSuccess, onError);
		};
		
		return {
			GET: GETRequest,
			POST: POSTRequest
		};
	};

	var module = angular.module("AngularApplication");
	module.factory("RESTUtil", ["$http", RESTUtil]);
})();