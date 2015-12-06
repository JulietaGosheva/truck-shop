(function() {
	
	var module = angular.module("AdminController");
	
	var ProductCreationController = function($scope) {
		$scope.typeInsertMode = true;
		$scope.modelInsertMode = true;
		$scope.brandInsertMode = true;
		$scope.buttonText = "Създай";
	};
	
	module.controller("ProductCreationController", ["$scope", ProductCreationController]);
	
})();