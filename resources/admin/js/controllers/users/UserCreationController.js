(function() {

	var module = angular.module("AdminController");
	
	var UserCreationController = function($scope) {
		$scope.buttonText = "Регистрирай";
		$scope.buttonStyle = "default";
	};
	
	module.controller("UserCreationController", ["$scope", UserCreationController]);
	
})();