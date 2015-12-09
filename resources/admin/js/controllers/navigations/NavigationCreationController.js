(function() {
	
	var module = angular.module("AdminController");
	
	var NavigationCreationController = function($scope) {
		$scope.menuInsertMode = true;
		$scope.subMenuInsertMode = true;
	};
	
	module.controller("NavigationCreationController", ["$scope", NavigationCreationController]);
	
})();