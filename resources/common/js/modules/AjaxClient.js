(function() {
	
	/* ============ Variables and Constructor ============= */
	
	var HeaderUtil = null;
	
	var moduleNames = null;
	
	if (com.rs.module === undefined) {
		moduleNames = new com.rs.client.module.ClientModules();
	} else {
		moduleNames = new com.rs.module.ModuleNames();
	}
	
	var ajaxClientName = moduleNames.getAjaxClientName();
	var registry = com.rs.registry.Registry.prototype.getInstance();
	
	var AjaxClient = function() {
		HeaderUtil = registry.getReference(moduleNames.getHeaderUtilName());
		
		var GETRequest = function(oData, onSuccess, onError) {
			executeRequest(oData, onSuccess, onError, 'GET');
		};
		
		var POSTRequest = function(oData, onSuccess, onError) {
			executeRequest(oData, onSuccess, onError, 'POST');
		};
		
		var PUTRequest = function(oData, onSuccess, onError) {
			executeRequest(oData, onSuccess, onError, 'PUT');
		};
		
		var DELETERequest = function(oData, onSuccess, onError) {
			executeRequest(oData, onSuccess, onError, 'DELETE');
		};
		
		return {
			GET: GETRequest,
			POST: POSTRequest,
			PUT: PUTRequest,
			DELETE: DELETERequest
		};
	};
	
	/* ============ Function declaration ============= */
	
	var executeRequest = function(oData, onSuccess, onError, methodType) {
		var xsrfToken = HeaderUtil.extractCSRFTokenFromCookie();
		
		if (xsrfToken !== null) {
			if (typeof oData.headers === 'undefined') {
				oData.headers = {
					'X-XSRF-TOKEN' : xsrfToken
				};
			} else {
				oData.headers['X-XSRF-TOKEN'] = xsrfToken;
			}
			oData.headers['X-Requested-With'] = 'XMLHttpRequest';
		}
		
		$.ajax({
	        url: oData.url,
	        type: methodType,
	        cache: false,
	        data: oData.data,
	        async: typeof oData.async === 'undefined' ? true : oData.async,
	        dataType: 'json',
            processData: false,
	        headers: typeof oData.headers === 'undefined' ? {} : oData.headers,
    		contentType: typeof oData.contentType === 'undefined' ? true : oData.contentType,
	        success: onSuccess,
	        error: onError,
	        complete: oData.complete
	    });
	};
	
	/* ============ Module Registration ============= */
	
	registry.register(ajaxClientName, AjaxClient);
	
	var module = undefined;
	try {
		module = angular.module(moduleNames.getClientControllerName());
		module.factory(ajaxClientName, [AjaxClient]);
	} catch(Exception) {
		//just ignore the exception
	}
	
	try {
		module = angular.module(moduleNames.getAdminControllerName());
		module.factory(ajaxClientName, [AjaxClient]);
	} catch(Exception) {
		//just ignore the exception
	}
	
})();
