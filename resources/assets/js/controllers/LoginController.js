(function() {

	/* ============ Variables and Constructor ============= */
	
	var RestClient = null;
	var DestinationUtil = null;
	
	var clientModules = new com.rs.client.module.ClientModules();
	var registry = com.rs.registry.Registry.prototype.getInstance();

	var module = angular.module(clientModules.getClientControllerName());
	
	var LoginController = function ($scope, $http) {
		initModel($scope);
		RestClient = registry.getReference(clientModules.getRestClientName(), $http);
		DestinationUtil = registry.getReference(clientModules.getDestinationUtilName());
		registry.getReference(clientModules.getTemplateUtilName()).setBreadcrumb({ displayName: "Вход" });
	};
	
	module.controller('LoginController', ["$scope", "$http", LoginController]);
	
	var initModel = function($scope) {
		$scope.executeRequest = jQuery.proxy(registerClient, $scope);
	};
	
	/* ================ Backend AJAX requests ================ */
	
	var registerClient = function(formData) {
		var requestData = prepareRequestData(formData);
		RestClient.POST(requestData, jQuery.proxy(onSuccess, this), jQuery.proxy(onError, this));
	};
	
	var prepareRequestData = function(formData) {
		var requestBody = {};
		
		requestBody['email'] = formData.email;
		requestBody['password'] = formData.password;
		
		var headers = {
			"Content-Type" : "application/x-www-form-urlencoded"
		};
		
		return {
			method: "POST",
			headers: headers,
			data: requestBody,
			transformRequest: function(requestObject) {
		        var requestParams = [];
		        for(var key in requestObject) {
		        	requestParams.push(encodeURIComponent(key) + "=" + encodeURIComponent(requestObject[key]));
		        }
		        return requestParams.join("&");
		    },
			url: DestinationUtil.getClientAuthenticationEndpoint()
		};
	};
	
	var onSuccess = function(xhrResponse) {
		location.hash = "#/";
	};
	
	var onError = function(xhrResponse) {
		$("#result-modal-label").text("Неуспешен вход в системата.");
		$("#result-modal-body").text("Извинявайте за неудобството, но не успяхме да ви впишен в системата.");
		$('#result-modal').modal({ keyboard: true });
	};
	
})();