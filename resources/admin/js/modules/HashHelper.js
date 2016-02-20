(function() {

	/* ============ Variables and Constructor ============= */
	
	var moduleNames = new com.rs.module.ModuleNames();
	var adminControllerName = moduleNames.getApplicationName();
	var hashHelperName = moduleNames.getHashHelperName();
	
	var HashHelper = function() {
		return {
			getProductCreationHash: function() {
				return "/products/creation";
			},
			getProductModificationHash: function() {
				return "/products/edit";
			},
			getProductDeletionHash: function() {
				return "/products/delete";
			},
			getProductSearchingHash: function() {
				return "/products/search";
			},
			getProductDetailsHash: function() {
				return "/products/details";
			},
			getUserCreationHash: function() {
				return "/users/creation";
			},
			getUserModificationHash: function() {
				return "/users/edit";
			},
			getUserDeletionHash: function() {
				return "/users/delete";
			},
			getUserSearchingHash: function() {
				return "/users/search";
			},
			products: {
				creation: "/products/creation",
				edit: "/products/edit",
				deletion: "/products/delete",
				search: "/products/search",
				details: "/products/details"
			},
			users: {
				creation: "/users/creation",
				edit: "/users/edit",
				deletion: "/users/delete",
				search: "/users/search"
			}
		};
	};

	/* ============ Module Registration ============= */
	
	var module = angular.module(adminControllerName);
	module.factory(hashHelperName, [HashHelper]);
})();