(function() {
	
	var module = angular.module("AdminController");
	
	var EditProductController = function($scope) {
		$scope.typeInsertMode = true;
		$scope.modelInsertMode = true;
		$scope.brandInsertMode = true;
		$scope.buttonText = "Редактирай";
	};
	
	module.controller("EditProductController", ["$scope", EditProductController]);
	
})();