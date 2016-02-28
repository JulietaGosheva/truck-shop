(function() {
	
	/* ============ Variables and Constructor ============= */
	
	var moduleNames = null;
	
	if (com.rs.module === undefined) {
		moduleNames = new com.rs.client.module.ClientModules();
	} else {
		moduleNames = new com.rs.module.ModuleNames();
	}
	
	var registry = com.rs.registry.Registry.prototype.getInstance();

	var RestClient = function($http) {
		
		var GETRequest = function(oData, onSuccess, onError) {
			setMandatoryHeaders(oData);
			ValidationUtil.validateUrl(oData);
			ValidationUtil.validateGETMethodType(oData);
			$http(oData).then(onSuccess, onError);
		};
		
		var POSTRequest = function(oData, onSuccess, onError) {
			setMandatoryHeaders(oData);
			ValidationUtil.validateUrl(oData);
			ValidationUtil.validatePOSTMethodType(oData);
			$http(oData).then(onSuccess, onError);
		};

		var PUTRequest = function(oData, onSuccess, onError) {
			setMandatoryHeaders(oData);
			ValidationUtil.validateUrl(oData);
			ValidationUtil.validatePUTMethodType(oData);
			$http(oData).then(onSuccess, onError);
		};
		
		var DELETERequest = function(oData, onSuccess, onError) {
			setMandatoryHeaders(oData);
			ValidationUtil.validateUrl(oData);
			ValidationUtil.validateDELETEMethodType(oData);
			$http(oData).then(onSuccess, onError);
		};
		
		return {
			GET: GETRequest,
			POST: POSTRequest,
			PUT: PUTRequest,
			DELETE: DELETERequest
		};
	};
	
	/* ============ Function declaration ============= */
	
	var setMandatoryHeaders = function(oData) {
		if (typeof oData.headers === "undefined") {
			oData.headers = {};
		}
		oData.headers["X-Requested-With"] = "XMLHttpRequest";
	};
	
	var ValidationUtil = {
		validateUrl: function(oData) {
			if (!oData.url || oData.url === "") {
				throw new Error("Cant invoke such type of request without specifying the url.");
			};
		},
		
		validateGETMethodType: function(oData) {
			if (oData.method && oData.method.toUpperCase() !== "GET") {
				throw new Error("Method type different than \"GET\", can't be passed.");
			}
		},
		
		validatePOSTMethodType: function(oData) {
			if (oData.method && oData.method.toUpperCase() !== "POST") {
				throw new Error("Method type different than \"POST\", can't be passed.");
			}
		},
		
		validatePUTMethodType: function(oData) {
			if (oData.method && oData.method.toUpperCase() !== "PUT") {
				throw new Error("Method type different than \"PUT\", can't be passed.");
			}
		},
		
		validateDELETEMethodType: function(oData) {
			if (oData.method && oData.method.toUpperCase() !== "DELETE") {
				throw new Error("Method type different than \"DELETE\", can't be passed.");
			}
		}
	
	};
	
	/* ============ Module Registration ============= */
	
	registry.register(moduleNames.getRestClientName(), RestClient);
	
	var module = undefined;
	try {
		module = angular.module(moduleNames.getClientControllerName());
		module.factory(moduleNames.getRestClientName(), ["$http", RestClient]);
	} catch(Exception) {
		//just ignore the exception
	}
	
	try {
		var module = angular.module(moduleNames.getAdminControllerName());
		module.factory(moduleNames.getRestClientName(), ["$http", RestClient]);
	} catch(Exception) {
		//just ignore the exception
	}
})();