(function() {

	var EndpointHelper = function() {
		return {
			products: {
				creation: "/products/creation",
				edit: "/products/edit",
				deletion: "/products/delete",
				search: "/products/search",
				review: "/products/review"
			},
			users: {
				creation: "/users/creation",
				edit: "/users/edit",
				deletion: "/users/delete",
				search: "/users/search"
			}
		};
	};

	var module = angular.module("AdminController");
	module.factory("EndpointHelper", [EndpointHelper]);
})();