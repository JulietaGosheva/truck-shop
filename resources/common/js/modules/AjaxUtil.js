(function() {
	
	/* ============ Variables and Constructor ============= */
	
	var HeaderUtil = null;
	
	var moduleNames = new com.rs.module.ModuleNames();
	var adminControllerName = moduleNames.getApplicationName();
	var ajaxUtilName = moduleNames.getAjaxUtilName();
	var headerUtilName = moduleNames.getHeaderUtilName();
	
	var AJAXRESTUtil = function(HUtil) {
		HeaderUtil = HUtil;
		
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
	        error: onError
	    });
	};
	
	/* ============ Module Registration ============= */
	
	var module = undefined;
	try {
		module = angular.module("AngularApplication");
		module.factory(ajaxUtilName, [headerUtilName, AJAXRESTUtil]);
	} catch(Exception) {
		//just ignore the exception
	}
	
	try {
		module = angular.module(adminControllerName);
		module.factory(ajaxUtilName, [headerUtilName, AJAXRESTUtil]);
	} catch(Exception) {
		//just ignore the exception
	}
	
})();
