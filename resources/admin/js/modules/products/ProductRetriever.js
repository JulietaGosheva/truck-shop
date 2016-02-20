(function() {
	
	/* ============ Constants ============= */
	
	var NO_CONTENT = 204;
	var UNPROCESSABLE_ENTITY = 422;
	
	/* ============ Variables and Constructor ============= */
	
	var RestUtil = null;
	var HeaderUtil = null;
	var DestinationUtil = null;
	
	var moduleNames = new com.rs.module.ModuleNames();
	var adminControllerName = moduleNames.getApplicationName();
	var restUtilName = moduleNames.getRestUtilName();
	var headerUtilName = moduleNames.getHeaderUtilName();
	var destinationUtilName = moduleNames.getDestinationUtilName();
	var productRetrieverName = moduleNames.getProductRetrieverName();
	
	var ProductLoader = function(RUtil, DUtil, HUtil) {
		RestUtil = RUtil;
		DestinationUtil = DUtil;
		HeaderUtil = HUtil;

		return {
			loadProductById: loadProductById,
			loadProductTypes: loadProductTypes,
			loadProductBrands: loadProductBrands,
			loadProductModels: loadProductModels,
			loadAllProductEntries: loadAllProductEntries
		};
	};
	
	/* ============ Product Loading by ID ============= */
	
	var loadProductById = function(productId, $scope) {
		var requestData = prepareRequestData(productId, $scope);
		RestUtil.GET(requestData, jQuery.proxy(onSuccess, $scope), jQuery.proxy(onError, $scope));
	};
	
	var prepareRequestData = function(productId, $scope) {
		var path = "?id=" + productId;
		
		return {
			method : "GET",
			url : DestinationUtil.getProductSearchingEndpoint() + path
		};
	};
	
	var onSuccess = function(xhrResponse) {
		if (xhrResponse.status === NO_CONTENT) {
			this.notFound = "Не успяхме да намерим търсения от вас продукт.";
			return;
		}
		
		this.id = xhrResponse.data.id;
		this.name = xhrResponse.data.name;
		this.price = xhrResponse.data.price;
		this.imageName = xhrResponse.data.image_name;
		this.uniqueNumber = xhrResponse.data.unique_id;
		this.newProductBrand = xhrResponse.data.brands.name;
		this.newProductModel = xhrResponse.data.models.name;
		this.newProductType = xhrResponse.data.product_types.name;
	};
	
	var onError = function(xhrResponse) {
		if (xhrResponse.status === UNPROCESSABLE_ENTITY) {
			this.errorMessage = "Не успяхме да заредим данните за този продукт, поради грешка възникнала " +
				"при валидацията на входните данни, моля опитайте пак." +
				"Статус на грешката: [" + xhrResponse.status + "], хвърлена грешка: [" + xhrResponse.statusText + "]." +
				"Информация от сървъра: [" + 
					HeaderUtil.getHeaderValueByName(xhrResponse, "X-Request-Result") + 
				"]";
		} else {
			this.errorMessage = "Възникна неочаквана грешка при опит за извличане на информация за продукта, моля опитайте пак." +
				"Статус на грешката: [" + xhrResponse.status + "], хвърлена грешка: [" + xhrResponse.statusText + "]." +
				"Информация от сървъра: [" + 
					HeaderUtil.getHeaderValueByName(xhrResponse, "X-Request-Result") + 
				"]";
		}
	};
	
	/* ============ TYPES Loading ============= */
	
	var loadProductTypes = function($scope) {
		var requestData = {
			method : "GET",
			headers: headers,
			url: DestinationUtil.getProductTypesEndpoint()
		};
		RestUtil.GET(requestData, jQuery.proxy(onSuccessfullyLoadedProductTypes, $scope), jQuery.proxy(onFailingOfLoadingProductTypes, $scope));
	};
	
	var onSuccessfullyLoadedProductTypes = function(xhrResponse) {
		this.types = xhrResponse.data;
	};
	
	var onFailingOfLoadingProductTypes = function(xhrResponse) {
		this.types = [];
		this.errorMessage = "Възникна грешка при зареждането на продуктовите типовете.";
	};
	
	/* ============ BRANDS Loading ============= */
	
	var loadProductBrands = function(typeId, $scope) {
		var requestData = {
			method : "GET",
			headers: headers,
			url: String.format(DestinationUtil.getProductBrandsEndpoint(), typeId)
		};
		RestUtil.GET(requestData, jQuery.proxy(onSuccessfullyLoadedProductBrands, $scope), jQuery.proxy(onFailingOfLoadingProductBrands, $scope));
	};
	
	var onSuccessfullyLoadedProductBrands = function(xhrResponse) {
		this.brands = xhrResponse.data;
	};
	
	var onFailingOfLoadingProductBrands = function(xhrResponse) {
		this.brands = [];
		this.errorMessage = "Възникна грешка при зареждането на продуктовите производители.";
	};
	
	/* ============ MODELS Loading ============= */
	
	var loadProductModels = function(typeId, brandId, $scope) {
		var requestData = {
			method : "GET",
			headers: headers,
			url: String.format(DestinationUtil.getProductModelsEndpoint(), typeId, brandId)
		};
		RestUtil.GET(requestData, jQuery.proxy(onSuccessfullyLoadedProductModels, $scope), jQuery.proxy(onFailingOfLoadingProductModels, $scope));
	};
	
	var onSuccessfullyLoadedProductModels = function(xhrResponse) {
		this.models = xhrResponse.data;
	};
	
	var onFailingOfLoadingProductModels = function(xhrResponse) {
		this.models = [];
		this.errorMessage = "Възникна грешка при зареждането на продуктовите модели.";
	};
	
	
	
/* ================ Single request for retrieving all products ================ */
	
	var loadAllProductEntries = function($scope) {
		var requestData = {
			method: "GET",
			url: DestinationUtil.getProductListEndpoint()
		};
		
		RestUtil.GET(requestData, jQuery.proxy(onSuccessfullyLoadedProducts, $scope), jQuery.proxy(onFailOfLoadingProducts, $scope));
	};
	
	var onSuccessfullyLoadedProducts = function(xhrResponse) {
		var wholeProductsData = xhrResponse.data;
		extractProductsAndAddThemToModel(wholeProductsData, this);
	};
	
	var extractProductsAndAddThemToModel = function(products, $scope) {
		$scope.types = [];

		var productTypes = {};
		products.forEach(function(product) {
			var brandId = product.brand_id;
			var productTypeId = product.product_type_id;
			if (typeof productTypes[productTypeId] === "undefined") {
				productTypes[productTypeId] = {
					name: product.product_types.name,
					brands: {}
				};
				
				product.brands['models'] = [ product.models ];
				productTypes[productTypeId].brands[brandId] = product.brands;
				
				$scope.types.push(product.product_types);
			} else if (typeof productTypes[productTypeId].brands[brandId] === "undefined"){
				product.brands['models'] = [ product.models ];
				productTypes[productTypeId].brands[brandId] = product.brands;
			} else {
				productTypes[productTypeId].brands[brandId].models.push(product.models);
			}
		});
		
		$scope.productTypes = productTypes;
	};
	
	var onFailOfLoadingProducts = function(xhrResponse) {
		this.errorMessage = "Данните за попълването на модела не бяха извлечени успешно." +
			"Статус на грешката: [" + xhrResponse.status + "], хвърлена грешка: [" + xhrResponse.statusText + "]." +
			"Информация от сървъра: [" +
				HeaderUtil.getHeaderValueByName(xhrResponse, "X-Request-Result")
			+ "]";
	};
	
	
	/* ============ Module Registration ============= */
	
	var module = angular.module(adminControllerName);
	module.factory(productRetrieverName, [restUtilName, destinationUtilName, headerUtilName, ProductLoader]);

})();