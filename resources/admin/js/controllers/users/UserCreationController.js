(function() {

	var module = angular.module("AdminController");
	
	var UserCreationController = function($scope, $sce) {
		$scope.buttonText = $sce.trustAsHtml("Регистрирай");
		$scope.buttonStyle = "default";
	};
	
	module.controller("UserCreationController", ["$scope", "$sce", UserCreationController]);
	
})();