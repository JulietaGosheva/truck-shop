(function() {
	var application = angular.module("AngularApplication", ["ngRoute", "ui.bootstrap"]);
	
	application.config(function($routeProvider) {
		$routeProvider
			.when("/", {
				templateUrl: "../resources/assets/html/startPage.html",
				controller: "CarouselController"
			})
			.when("/map", {
				templateUrl: "../resources/assets/html/map.html"
			})
			.when("/contacts", {
				templateUrl: "../resources/assets/html/contacts.html"
			})
			.when("/information", {
				templateUrl: "../resources/assets/html/information.html"
			})
			.when("/search/:uniqueNumber", {
				templateUrl: "../resources/assets/html/templates/articals.html",
				controller: "SearchController"
			})
			.when("/:artical", {
				templateUrl: "../resources/assets/html/templates/articals.html",
				controller: "ArticalsController"
			})
			.when("/:artical/:uniqueNumber", {
				templateUrl: "../resources/assets/html/templates/details.html",
				controller: "DetailsController"
			})
			.when("/:artical/subArtical/:subArtical", {
				templateUrl: "../resources/assets/html/templates/articals.html",
				controller: "ArticalsController"
			})
			.when("/:artical/subArtical/:subArtical/:uniqueNumber", {
				templateUrl: "../resources/assets/html/templates/details.html",
				controller: "DetailsController"
			})
			.otherwise({ redirectTo: "/" });
		});
	
})();