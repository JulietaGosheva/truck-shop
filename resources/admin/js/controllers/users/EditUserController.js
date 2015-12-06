(function() {

	var module = angular.module("AdminController");
	
	var EditUserController = function($scope) {
		$scope.buttonText = "Редактирай";
		$scope.buttonStyle = "default";
	};
	
	module.controller("EditUserController", ["$scope", EditUserController]);
	
})();