(function() {
	var application = angular.module("AngularApplication", ["ngRoute"]);
	
	application.config(function($routeProvider) {
		$routeProvider
			.when("/", {
				templateUrl: "../resources/assets/html/index.html",
				controller: "IndexController"
			})
			.when("/:artical", {
				templateUrl: "../resources/assets/html/articals.html",
				controller: "ArticalsController"
			})
			.when("/:artical/:id", {
				templateUrl: "../resources/assets/html/details.html",
				controller: "DetailsController"
			})
			.when("/:artical/subArtical/:subArtical", {
				templateUrl: "../resources/assets/html/articals.html",
				controller: "ArticalsController"
			})
			.when("/:artical/subArtical/:subArtical/:id", {
				templateUrl: "../resources/assets/html/details.html",
				controller: "DetailsController"
			})
			.otherwise({ redirectTo: "/" });
		});
	
})();