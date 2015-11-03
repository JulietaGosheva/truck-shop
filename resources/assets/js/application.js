(function() {
	var application = angular.module("AngularApplication", ["ngRoute"]);
	
	application.config(function($routeProvider) {
		$routeProvider
			.when("/", {
				templateUrl: "../resources/assets/html/articals.html",
				controller: "ArticalsController"
			})
			.when("/:navItem", {
				templateUrl: "../resources/assets/html/subparts.html",
				controller: "SubitemsController"
			})
			.otherwise({ redirectTo: "/" });
		});
	
})();