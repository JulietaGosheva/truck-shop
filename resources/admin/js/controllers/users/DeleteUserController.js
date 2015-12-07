(function() {

	var module = angular.module("AdminController");
	
	var DeleteUserController = function($scope) {
		$scope.buttonText = "Изтрии";
		$scope.buttonStyle = "default";
	};
	
	module.controller("DeleteUserController", ["$scope", DeleteUserController]);
	
})();