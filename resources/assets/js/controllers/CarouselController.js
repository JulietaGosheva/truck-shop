(function() {

	var clientModules = new com.rs.client.module.ClientModules();
	var registry = com.rs.registry.Registry.prototype.getInstance();

	var module = angular.module(clientModules.getClientControllerName());
	
	var CarouselController = function ($scope) {
	  $scope.myInterval = 5000;
	  $scope.noWrapSlides = false;
	  
	  registry.getReference(clientModules.getTemplateUtilName()).setBreadcrumb();
	  
	  var slides = $scope.slides = [
            {
			  image: "http://weknowyourdreams.com/images/car/car-05.jpg",
			  text: "Mnogo qka"
  			},
  			{
  				image: "http://dreamatico.com/data_images/car/car-3.jpg",
  				text: "Mnogo sharena"
  			},
  			{
  				image: "http://dreamatico.com/data_images/car/car-1.jpg",
  				text: "Ne normalno dobra"
  			}
      ];
	};
	
	module.controller('CarouselController', ["$scope", CarouselController]);
})();