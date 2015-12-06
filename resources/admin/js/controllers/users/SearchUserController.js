(function() {

	var module = angular.module("AdminController");
	
	var SearchUserController = function($scope, $sce) {
		$scope.buttonText = $sce.trustAsHtml("<span class='glyphicon glyphicon-search'></span>");
		$scope.buttonStyle = "primary";
	};
	
	module.controller("SearchUserController", ["$scope", "$sce", SearchUserController]);
	
})();