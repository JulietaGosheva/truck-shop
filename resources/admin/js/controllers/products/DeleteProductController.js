(function() {
	
	var module = angular.module("AdminController");
	
	var DeleteProductController = function($scope, $routeParams, RESTUtil, DestinationUtil) {
		$scope.executeRequest = jQuery.proxy(executeRequest, $scope, $routeParams, RESTUtil, DestinationUtil);
	};
	
	module.controller("DeleteProductController", ["$scope", "$routeParams", "RESTUtil", "DestinationUtil", DeleteProductController]);
	
	//TODO: clarify whether or not the verification of the data will be here in the controller or at the backend
	var executeRequest = function(routeParams, RESTUtil, DestinationUtil) {
		var requestData = prepareRequestData(DestinationUtil, routeParams);
		RESTUtil.POST(requestData, onSuccess, onError);
	};
	
	var prepareRequestData = function(DestinationUtil, routeParams) {
		var data = {
			id: routeParams.id
		};

		return {
			method : "DELETE",
			url : DestinationUtil.Product.deletion,
			headers : headers,
			data : JSON.stringify(data) 
		};
	};
	
	var onSuccess = function(xhrResponse) {
		console.log("Success message : " + xhrResponse.data);
	};
	
	var onError = function(xhrResponse) {
		console.log("Error message : " + xhrResponse.data);
	};
	
})();