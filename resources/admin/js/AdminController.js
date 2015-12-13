(function() {
	var application = angular.module("AdminController", ["ngRoute", "ui.bootstrap"]);
	
	application.config(function($routeProvider) {
		$routeProvider
			.when("/", {
				templateUrl: "../../resources/admin/html/startPage.html"
			})
			.when("/products/creation", {
				templateUrl: "../../resources/admin/html/products/creation.html",
				controller: "ProductCreationController"
			})
			.when("/products/edit", {
				templateUrl: "../../resources/admin/html/products/search.html",
				controller: "SearchProductController"
			})
			.when("/products/edit/:id", {
				templateUrl: "../../resources/admin/html/products/edit.html",
				controller: "EditProductController"
			})
			.when("/products/delete", {
				templateUrl: "../../resources/admin/html/products/search.html",
				controller: "SearchProductController"
			})
			.when("/products/delete/:id", {
				templateUrl: "../../resources/admin/html/products/delete.html",
				controller: "DeleteProductController"
			})
			.when("/products/search", {
				templateUrl: "../../resources/admin/html/products/search.html",
				controller: "SearchProductController"
			})
			.when("/products/details/:id", {
				templateUrl: "../../resources/admin/html/products/details.html",
				controller: "ProductDetailsController"
			})
			.when("/users/creation", {
				templateUrl: "../../resources/admin/html/users/creation.html",
				controller: "UserCreationController"
			})
			.when("/users/edit", {
				templateUrl: "../../resources/admin/html/users/search.html",
				controller: "SearchUserController"
			})
			.when("/users/edit/:id", {
				templateUrl: "../../resources/admin/html/users/edit.html",
				controller: "EditUserController"
			})
			.when("/users/delete", {
				templateUrl: "../../resources/admin/html/users/search.html",
				controller: "SearchUserController"
			})
			.when("/users/delete/:id", {
				templateUrl: "../../resources/admin/html/users/delete.html",
				controller: "DeleteUserController"
			})
			.when("/users/search", {
				templateUrl: "../../resources/admin/html/users/search.html",
				controller: "SearchUserController"
			})
			.when("/orders", {
				templateUrl: "../../resources/admin/html/orders.html",
				controller: "OrdersController"
			})
			.when("/promotions", {
				templateUrl: "../../resources/admin/html/promotions.html",
				controller: "PromotionController"
			})
			.when("/navigations/creation", {
				templateUrl: "../../resources/admin/html/navigations/creation.html",
				controller: "NavigationCreationController"
			})
			.when("/navigations/edit", {
				templateUrl: "../../resources/admin/html/navigations/edit.html",
				controller: "EditNavigationController"
			})
			.when("/navigations/delete", {
				templateUrl: "../../resources/admin/html/navigations/delete.html",
				controller: "DeleteNavigationController"
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