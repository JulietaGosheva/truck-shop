(function() {
	var application = angular.module("AdminController", ["ngRoute", "ui.bootstrap"]);
	
	application.config(function($routeProvider) {
		$routeProvider
			.when("/", {
				templateUrl: "../../resources/admin/html/startPage.html"
			})
			.when("/products/creation", {
				templateUrl: "../../resources/admin/html/products/creation.html",
				controller: "ProductController"
			})
			.otherwise({ redirectTo: "/" });
	});
})();