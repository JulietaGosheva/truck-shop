(function() {
	var module = angular.module('AngularApplication');
	
	var CarouselController = function ($scope) {
	  $scope.myInterval = 5000;
	  $scope.noWrapSlides = false;
	  
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