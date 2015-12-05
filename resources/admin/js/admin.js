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
			.when("/products/edit", {
				templateUrl: "../../resources/admin/html/products/edit.html",
				controller: "ProductController"
			})
			.when("/products/delete", {
				templateUrl: "../../resources/admin/html/products/search.html",
				controller: "ProductController"
			})
			.when("/products/search", {
				templateUrl: "../../resources/admin/html/products/search.html",
				controller: "ProductController"
			})
			.when("/products/review", {
				templateUrl: "../../resources/admin/html/products/review.html",
				controller: "ProductController"
			})
			.when("/users/creation", {
				templateUrl: "../../resources/admin/html/users/creation.html",
				controller: "UsersController"
			})
			.when("/users/edit", {
				templateUrl: "../../resources/admin/html/users/edit.html",
				controller: "UsersController"
			})
			.when("/users/delete", {
				templateUrl: "../../resources/admin/html/users/search.html",
				controller: "UsersController"
			})
			.when("/users/search", {
				templateUrl: "../../resources/admin/html/users/search.html",
				controller: "UsersController"
			})
			.when("/orders", {
				templateUrl: "../../resources/admin/html/orders.html",
				controller: "OrdersController"
			})
			.when("/promotions", {
				templateUrl: "../../resources/admin/html/promotions.html",
				controller: "PromotionController"
			})
			.when("/navigations", {
				templateUrl: "../../resources/admin/html/navigations.html",
				controller: "NavigationController"
			})
			.otherwise({ redirectTo: "/" });
	});
})();