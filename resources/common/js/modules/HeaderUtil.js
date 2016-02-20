(function() {

	/* ============ Constants ============= */
	
	var EMPTY_STRING = "";
	var XSRF_COOKIE_NAME = "XSRF-TOKEN";
	var DEFAULT_HEADER_VALUE = "Няма информация";
	
	/* ============ Variables and Constructor ============= */
	
	var moduleNames = new com.rs.module.ModuleNames();
	var headerUtilName = moduleNames.getHeaderUtilName();
	var adminControllerName = moduleNames.getApplicationName();
	
	var HeaderUtil = function() {
		return {
			getHeaderValueByName: getHeaderValueByName,
			extractCSRFTokenFromCookie: extractCSRFTokenFromCookie
		};
	};
	
	/* ============ Function declaration ============= */
	
	var getHeaderValueByName = function(xhrResponse, headerName) {
		if (typeof headerName !== "string" || headerName === EMPTY_STRING) {
			return DEFAULT_HEADER_VALUE;
		}
		
		if (typeof xhrResponse.headers === "function") {
			var headers = xhrResponse.headers();
			
			var headerValue = headers[headerName];
			if (typeof headerValue !== "undefined") {
				return headerValue;
			}
			
			headerValue = headers[headerName.toLowerCase()];
			return typeof headerValue === "undefined" ? DEFAULT_HEADER_VALUE : headerValue;
		}
		
		if (typeof xhrResponse.getResponseHeader === "function") {
			var headerValue = xhrResponse.getResponseHeader(headerName);
			if (typeof headerValue !== "undefined") {
				return headerValue;
			}
			
			headerValue = xhrResponse.getResponseHeader(headerName.toLowerCase());
			return typeof headerValue === "undefined" ? DEFAULT_HEADER_VALUE : headerValue;
		}
		
		return DEFAULT_HEADER_VALUE;
	};
	
	var extractCSRFTokenFromCookie = function() {
		var xsrfToken = null;
		var availableCookies = document.cookie;
		var cookies = availableCookies.split(";");
		
		for (var i = 0 ; i < cookies.length ; i++) {
			if (cookies[i].indexOf(XSRF_COOKIE_NAME) !== -1) {
				xsrfToken = cookies[i].trim().substring(XSRF_COOKIE_NAME.length + 1);
				return xsrfToken.replace(/%3D/gi, "=");
			}
		}
		
		return xsrfToken;
	};
	
	/* ============ Module Registration ============= */
	
	var module = undefined;
	try {
		module = angular.module("AngularApplication");
		module.factory(headerUtilName, [HeaderUtil]);
	} catch(Exception) {
		//just ignore the exception
	}
	
	try {
		module = angular.module(adminControllerName);
		module.factory(headerUtilName, [HeaderUtil]);
	} catch(Exception) {
		//just ignore the exception
	}
})();