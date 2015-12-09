(function() {
	
	var module = angular.module("AdminController");
	
	var EditNavigationController = function($scope) {
		$scope.subMenuEnabled = false;
		$scope.buttonText = "Редактирай";
	};
	
	module.controller("EditNavigationController", ["$scope", EditNavigationController]);
	
})();