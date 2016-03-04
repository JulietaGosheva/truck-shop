(function() {
	var application = angular.module("AngularApplication", ["ngRoute", "ui.bootstrap"]);
	
	application.config(function($routeProvider) {
		$routeProvider
			.when("/", {
				templateUrl: "resources/assets/html/startPage.html",
				controller: "CarouselController"
			})
			.when("/map", {
				templateUrl: "resources/assets/html/map.html"
			})
			.when("/contacts", {
				templateUrl: "resources/assets/html/contacts.html"
			})
			.when("/information", {
				templateUrl: "resources/assets/html/information.html"
			})
			.when("/search/:uniqueId", {
				templateUrl: "resources/assets/html/articles/details.html",
				controller: "DetailsController"
			})
			.when("/articles/:navItemName", {
				templateUrl: "resources/assets/html/articles/articals.html",
				controller: "ArticalsController"
			})
			.when("/articles/:navItemName/article/:uniqueId", {
				templateUrl: "resources/assets/html/articles/details.html",
				controller: "DetailsController"
			})
			.when("/articles/:navItemName/:navSubItemName", {
				templateUrl: "resources/assets/html/articles/subArticals.html",
				controller: "SubArticalsController"
			})
			.when("/articles/:navItemName/:navSubItemName/article/:uniqueId", {
				templateUrl: "resources/assets/html/articles/details.html",
				controller: "DetailsController"
			})
			.otherwise({ redirectTo: "/" });
		});
	
})();