(function() {
	var application = angular.module("AngularApplication", ["ngRoute", "ui.bootstrap", "ngSanitize"]);
	
	application.config(function($routeProvider) {
		$routeProvider
			.when("/", {
				templateUrl: "resources/assets/html/startPage.html",
				controller: "CarouselController"
			})
			.when("/login", {
				templateUrl: "resources/assets/html/login.html",
				controller: "LoginController"
			})
			.when("/contacts", {
				templateUrl: "resources/assets/html/contacts.html"
			})
			.when("/registration", {
				templateUrl: "resources/assets/html/registration.html",
				controller: "RegistrationController"
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
	
	application.directive("ngCustomRepeatWatcher", function() {
		var directive = {};
		
		directive.restrict = "A";
		directive.link = function(scope, element, attributes) {
			if (scope.$last === true) {
				scope[attributes.ngCustomRepeatWatcher]();
			}
		};
		
		return directive;
	});
})();