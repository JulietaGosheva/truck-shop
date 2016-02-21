(function() {
	
	/* ============ Variables and Constructor ============= */
	
	var moduleNames = new com.rs.module.ModuleNames();
	var adminControllerName = moduleNames.getApplicationName();
	var destinationUtilName = moduleNames.getDestinationUtilName();
	
	var DestinationUtil = function() {
		var SERVER_URL = "http://localhost/truck-shop/";
		
		var USERS_ENDPOINT = SERVER_URL + "users/api/v1";
		var PRODUCTS_ENDPOINT = SERVER_URL + "products/api/v1";
		var NAVIGATION_ITEM_ENDPOINT = SERVER_URL + "navigation/api/v1";

		var CREATE_PRODUCTS_ENDPOINT = PRODUCTS_ENDPOINT;
		var MODIFY_PRODUCTS_ENDPOINT = PRODUCTS_ENDPOINT;
		var SEARCH_PRODUCTS_ENDPOINT = PRODUCTS_ENDPOINT;
		var LIST_PRODUCTS_ENDPOINT = PRODUCTS_ENDPOINT + "/all";
		var PRODUCT_TYPES_ENDPOINT = PRODUCTS_ENDPOINT + "/types";
		var PRODUCT_IMAGE_ENDPOINT = PRODUCTS_ENDPOINT + "/image";
		var DELETE_PRODUCT_ENDPOINT = PRODUCTS_ENDPOINT + "?id={productId}";
		var PRODUCT_BRANDS_ENDPOINT = PRODUCTS_ENDPOINT + "/types/{typeId}/brands";
		var UPDATE_PRODUCT_IMAGE_ENDPOINT = PRODUCTS_ENDPOINT + "/image/{imageName}";
		var PRODUCT_MODELS_ENDPOINT = PRODUCTS_ENDPOINT + "/types/{typeId}/brands/{brandId}/models";
		
		var CREATE_USER_ENDPOINT = USERS_ENDPOINT;
		var MODIFY_USER_ENDPOINT = USERS_ENDPOINT;
		var DELETE_USER_ENDPOINT = USERS_ENDPOINT + "?id={userId}";
		var SEARCH_USERS_ENDPOINT = USERS_ENDPOINT;
		
		var CREATE_NAVIGATION_ITEM_ENDPOINT = NAVIGATION_ITEM_ENDPOINT;
		var MODIFY_NAVIGATION_ITEM_ENDPOINT = NAVIGATION_ITEM_ENDPOINT;
		var DELETE_NAVIGATION_ITEM_ENDPOINT = NAVIGATION_ITEM_ENDPOINT + "?id={navigationItemId}";
		var SEARCH_NAVIGATION_ITEM_ENDPOINT = NAVIGATION_ITEM_ENDPOINT;
		
		var USER_REGISTRATION_ENDPOINT = SERVER_URL + "/registration";
		
		return {
					/* Product APIs */
			getProductListEndpoint: function() {
				return LIST_PRODUCTS_ENDPOINT;
			},
			getProductCreationEndpoint: function() {
				return CREATE_PRODUCTS_ENDPOINT;
			},
			getProductModificationEndpoint: function() {
				return MODIFY_PRODUCTS_ENDPOINT;
			},
			getProductDeletionEndpoint: function() {
				return DELETE_PRODUCT_ENDPOINT;
			},
			getProductSearchingEndpoint: function() {
				return SEARCH_PRODUCTS_ENDPOINT;
			},
			getProductTypesEndpoint: function() {
				return PRODUCT_TYPES_ENDPOINT;
			},
			getProductBrandsEndpoint: function() {
				return PRODUCT_BRANDS_ENDPOINT;
			},
			getProductModelsEndpoint: function() {
				return PRODUCT_MODELS_ENDPOINT;
			},
			getProductPhotoEndpoint: function() {
				return PRODUCT_IMAGE_ENDPOINT;
			},
			getProductPhotoModificationEndpoint: function() {
				return UPDATE_PRODUCT_IMAGE_ENDPOINT;
			},
					/* User APIs */
			getUserRegistrationEndpoint : function() {
				return USER_REGISTRATION_ENDPOINT;
			},
			getUserCreationEndpoint: function() {
				return CREATE_USER_ENDPOINT;
			},
			getUserModificationEndpoint: function() {
				return MODIFY_USER_ENDPOINT;
			},
			getUserDeletionEndpoint: function() {
				return DELETE_USER_ENDPOINT;
			},
			getUserSearchingEndpoint: function() {
				return SEARCH_USERS_ENDPOINT;
			},
					/* Navigation Item APIs */
			getNavigationItemCreationEndpoint: function() {
				return CREATE_NAVIGATION_ITEM_ENDPOINT;
			},
			getNavigationItemModificationEndpoint: function() {
				return MODIFY_NAVIGATION_ITEM_ENDPOINT;
			},
			getNavigationItemDeletionEndpoint: function() {
				return DELETE_NAVIGATION_ITEM_ENDPOINT;
			},
			getNavigationItemSearchingEndpoint: function() {
				return SEARCH_NAVIGATION_ITEM_ENDPOINT;
			}
		};
	};
	
	/* ============ Module Registration ============= */
	
	var module = undefined;
	try {
		module = angular.module("AngularApplication");
		module.factory(destinationUtilName, [DestinationUtil]);
	} catch(Exception) {
		//just ignore the exception
	}
	
	try {
		module = angular.module(adminControllerName);
		module.factory(destinationUtilName, [DestinationUtil]);
	} catch(Exception) {
		//just ignore the exception
	}
})();