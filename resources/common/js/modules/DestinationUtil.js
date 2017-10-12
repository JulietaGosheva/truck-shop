(function() {
	
	/* ============ Variables and Constructor ============= */
	
	var moduleNames = null;
	
	if (com.rs.module === undefined) {
		moduleNames = new com.rs.client.module.ClientModules();
	} else {
		moduleNames = new com.rs.module.ModuleNames();
	}
	
	var registry = com.rs.registry.Registry.prototype.getInstance();
	
	var DestinationUtil = function() {
		var SERVER_URL = "http://localhost/truck-shop/rest/";
		
		var USERS_ENDPOINT = SERVER_URL + "users/api/v1";
		var ORDERS_ENDPOINT = SERVER_URL + "orders/api/v1";
		var PRODUCTS_ENDPOINT = SERVER_URL + "products/api/v1";
		var NAVIGATION_ITEM_ENDPOINT = SERVER_URL + "navigation/api/v1";

		
		/* Product API Endpoints */
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
		
		/* User API Endpoints */
		var CREATE_USER_ENDPOINT = USERS_ENDPOINT;
		var MODIFY_USER_ENDPOINT = USERS_ENDPOINT;
		var DELETE_USER_ENDPOINT = USERS_ENDPOINT + "?id={userId}";
		var SEARCH_USERS_ENDPOINT = USERS_ENDPOINT;
		var USER_DATA_ENDPOINT = USERS_ENDPOINT + "/data";
		
		/* Navigation API Endpoints */
		var CREATE_NAVIGATION_ITEM_ENDPOINT = NAVIGATION_ITEM_ENDPOINT;
		var MODIFY_NAVIGATION_ITEM_ENDPOINT = NAVIGATION_ITEM_ENDPOINT;
		var DELETE_NAVIGATION_ITEM_ENDPOINT = NAVIGATION_ITEM_ENDPOINT + "?id={navigationItemId}";
		var SEARCH_NAVIGATION_ITEM_ENDPOINT = NAVIGATION_ITEM_ENDPOINT;
		var NAVIGATION_ITEMS_ENDPOINT = NAVIGATION_ITEM_ENDPOINT + "/items";
		var ROOT_NAVIGATION_ITEMS_ENDPOINT = NAVIGATION_ITEM_ENDPOINT + "/items/root";
		
		/* Orders API Endpoints */
		var GET_USER_ORDERS = ORDERS_ENDPOINT;
		var GET_DAILY_ORDERS = ORDERS_ENDPOINT + "/daily";
		var GET_ORDERS_BY_ID = ORDERS_ENDPOINT + "/by/id/{id}";
		var GET_ORDERS_BY_DATE = ORDERS_ENDPOINT + "/by/date?orderDate={date}";
		var GET_ORDERS_BY_USER = ORDERS_ENDPOINT + "/by/user?";
		var GET_USER_ORDERS_FROM_CART = ORDERS_ENDPOINT + "/products";
		var ORDER_PRODUCTS = ORDERS_ENDPOINT + "/products";
		var SEARCH_PRODUCT_INTO_CART = ORDERS_ENDPOINT + "/products/{uniqueId}";
		var ADD_USER_ORDER_TO_CART = ORDERS_ENDPOINT + "/products/{uniqueId}";
		var REMOVE_USER_ORDER_FROM_CART = ORDERS_ENDPOINT + "/products/{uniqueId}";
		
		/* Authentication Ednpoints */
		var LOGOUT_ENDPOINT = SERVER_URL + "logout";
		var USER_REGISTRATION_ENDPOINT = SERVER_URL + "registration";
		var CLIENT_AUTHENTICATION_ENDPOINT = SERVER_URL + "client/authentication";
		
		return {
			getServerHostEndpoint: function() {
				return SERVER_URL;
			},
			getResourcesEndpoint: function() {
				return SERVER_URL.replace("/rest", "");
			},
			
			/* Product API Endpoints */
			getProductListEndpoint: function() {
				return LIST_PRODUCTS_ENDPOINT;
			},
			getMultipleProductDetailsEndpoint: function() {
				return SEARCH_PRODUCTS_ENDPOINT + "?uniqueIds={uniqueIds}";
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
			
			/* User API Endpoints */
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
			getUsersDataEndpoint: function() {
				return USER_DATA_ENDPOINT;
			},
			
			/* Navigation API Endpoints */
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
			},
			getNavigationItemsEndpoint: function() {
				return NAVIGATION_ITEMS_ENDPOINT;
			},
			getRootNavigationItemsEndpoint: function() {
				return ROOT_NAVIGATION_ITEMS_ENDPOINT;
			},

			/* Order API Endpoints */
			getUserOrdersEndpoint: function() {
				return GET_USER_ORDERS;
			},
			getDailyOrdersEndpoint: function() {
				return GET_DAILY_ORDERS;
			},
			getOrdersByDate: function() {
				return GET_ORDERS_BY_DATE;
			},
			getOrdersById: function() {
				return GET_ORDERS_BY_ID;
			},
			getOrdersByUser: function() {
				return GET_ORDERS_BY_USER;
			},
			getUserOrdersFromCartEndpoint: function() {
				return GET_USER_ORDERS_FROM_CART;
			},
			getCartProductSearchingEndpoint: function() {
				return SEARCH_PRODUCT_INTO_CART;
			},
			getAddProductToCartEndpoint: function() {
				return ADD_USER_ORDER_TO_CART;
			},
			getRemoveProductFromCartEndpoint: function() {
				return REMOVE_USER_ORDER_FROM_CART;
			},
			getProductOrderEndpoint: function() {
				return ORDER_PRODUCTS;
			},
			
			/* Authentication Endpoints */
			getClientAuthenticationEndpoint: function() {
				return CLIENT_AUTHENTICATION_ENDPOINT;
			},
			getLogoutEndpoint: function() {
				return LOGOUT_ENDPOINT;
			}
		};
	};
	
	/* ============ Module Registration ============= */
	
	registry.register(moduleNames.getDestinationUtilName(), DestinationUtil);
	
	var module = undefined;
	try {
		module = angular.module(moduleNames.getClientControllerName());
		module.factory(moduleNames.getDestinationUtilName(), [DestinationUtil]);
	} catch(Exception) {
		//just ignore the exception
	}
	
	try {
		module = angular.module(moduleNames.getAdminControllerName());
		module.factory(moduleNames.getDestinationUtilName(), [DestinationUtil]);
	} catch(Exception) {
		//just ignore the exception
	}
})();