(function() {
	
	var module = angular.module("AdminController");
	
	var SearchProductController = function($scope, $location, RESTUtil, DestinationUtil, EndpointHelper) {
		$scope.url = constructUrl($location, EndpointHelper);
		$scope.executeSearchRequest = jQuery.proxy(executeSearchRequest, $scope, RESTUtil, DestinationUtil);
	};
	
	module.controller("SearchProductController", ["$scope", "$location", "RESTUtil", "DestinationUtil", "EndpointHelper", SearchProductController]);
	
	var constructUrl = function($location, EndpointHelper) {
		var hash = $location.path();
		if (hash.indexOf("edit") !== -1) {
			return EndpointHelper.products.edit;
		} else if (hash.indexOf("delete") !== -1) {
			return EndpointHelper.products.deletion;
		}
		return hash;
	};
	
	var executeSearchRequest = function(RESTUtil, DestinationUtil, oData) {
		var requestData = prepareRequestData(oData, DestinationUtil, this);
		RESTUtil.GET(requestData, jQuery.proxy(onSuccess, this), jQuery.proxy(onError, this));
	};
	
	var prepareRequestData = function(oData, DestinationUtil, scope) {
		var path = "?";
		
		for (key in oData) {
			if (typeof oData[key] !== "undefined" && oData[key] !== "") {
				path += key + "=" + oData[key] + "&";
			}
		}
		
		var headers = {
			"Content-Type" : "application/json"
		};
		
		return {
			method : "GET",
			url : DestinationUtil.Products.search + path,
			headers : headers
		};
	};
	
	var onSuccess = function(xhrResponse) {
		this.products = xhrResponse.data;
		console.log("Success message : " + xhrResponse.data);
	};
	
	var onError = function(xhrResponse) {
		this.products = [];
		console.log("Error message : " + xhrResponse.data);
	};
	
})();