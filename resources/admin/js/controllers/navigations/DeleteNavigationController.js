(function() {
	
	var module = angular.module("AdminController");
	
	var DeleteNavigationController = function($scope) {
		$scope.subMenuEnabled = false;
		$scope.buttonText = "Изтрии";
	};
	
	module.controller("DeleteNavigationController", ["$scope", DeleteNavigationController]);
	
})();