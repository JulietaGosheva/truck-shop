(function() {
	
	var _extractXSRFTokenFromCookies = function() {
		var xsrfTokenCookieName = "XSRF-TOKEN";

		var xsrfToken = null;
		var availableCookies = document.cookie;
		var cookies = availableCookies.split(";");
		
		if (cookies.length === 1) {
			xsrfToken = cookies[0].trim().substring(xsrfTokenCookieName.length + 1);
			return xsrfToken.replace(/%3D/gi, "=");
		}
		
		for (var i = 0 ; i < cookies.length ; i++) {
			if (cookies[i].indexOf(xsrfTokenCookieName) !== -1) {
				xsrfToken = cookies[i].trim().substring(xsrfTokenCookieName.length + 1);
				return xsrfToken.replace(/%3D/gi, "=");
			}
		}
		
		return xsrfToken;
	};
	
	var AJAXRESTUtil = function() {
		var GETRequest = function(oData, onSuccess, onError) {
			throw new Exception("Not implemented.");
		};
		
		var POSTRequest = function(oData, onSuccess, onError) {
			var xsrfToken = _extractXSRFTokenFromCookies();
			
			if (xsrfToken !== null) {
				if (typeof oData.headers === 'undefined') {
					oData.headers = {
						"X-XSRF-TOKEN" : xsrfToken
					};
				} else {
					oData.headers['X-XSRF-TOKEN'] = xsrfToken;
				}
			}
			
			$.ajax({
		        url: oData.url,
		        type: 'POST',
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
		
		var PUTRequest = function(oData, onSuccess, onError) {
			throw new Exception("Not implemented.");
		};
		
		var DELETERequest = function(oData, onSuccess, onError) {
			throw new Exception("Not implemented.");
		};
		
		return {
			GET: GETRequest,
			POST: POSTRequest,
			PUT: PUTRequest,
			DELETE: DELETERequest
		};
	};
	
	var module = undefined;
	try {
		module = angular.module("AngularApplication");
		module.factory("AJAXRESTUtil", [AJAXRESTUtil]);
	} catch(Exception) {
		//just ignore the exception
	}
	
	try {
		module = angular.module("AdminController");
		module.factory("AJAXRESTUtil", [AJAXRESTUtil]);
	} catch(Exception) {
		//just ignore the exception
	}
	
})();
