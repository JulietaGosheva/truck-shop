(function() {

	var module = angular.module("AdminController");
	
	var SearchUserController = function($scope, $sce, $location, EndpointHelper) {
		$scope.buttonStyle = "primary";
		$scope.buttonText = $sce.trustAsHtml("<span class='glyphicon glyphicon-search'></span>");
		
		$scope.url = constructUrl($location, EndpointHelper);
		
		$scope.model = $scope;
		$scope.executeRequest = findSearchedUsers;
	};
	
	module.controller("SearchUserController", ["$scope", "$sce", "$location", "EndpointHelper", SearchUserController]);
	
	var constructUrl = function($location, EndpointHelper) {
		var hash = $location.path();
		if (hash.indexOf("edit") !== -1) {
			return EndpointHelper.users.edit;
		} else if (hash.indexOf("delete") !== -1) {
			return EndpointHelper.users.deletion;
		}
		return hash;
	};
	
	var findSearchedUsers = function($scope, oData) {
		$scope.users = [
	   		   {
	   			   id: 1,
	   			   email: "kiril@abv.bg",
	   			   firstname: "Kiril",
	   			   lastname: "Kirilov"
			   },
			   {
				   id: 2,
				   email: "petyr@abv.bg",
				   firstname: "Petyr",
				   lastname: "Petrov"
			   },
			   {
				   id: 3,
				   email: "stoqn@abv.bg",
				   firstname: "Stoqn",
				   lastname: "Stoqnov"
			   },
			   {
				   id: 4,
				   email: "milen@abv.bg",
				   firstname: "Milen",
				   lastname: "Milenov"
			   },
			   {
				   id: 5,
				   email: "marko@abv.bg",
				   firstname: "Marko",
				   lastname: "Markov"
			   }
        ];
	};
	
})();