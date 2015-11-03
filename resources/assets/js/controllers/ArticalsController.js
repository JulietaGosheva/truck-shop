(function() {
	var module = angular.module("AngularApplication");
	
	var ArticalsController = function($scope) {
		$scope.articals = [
		   { src: "http://weknowyourdreams.com/images/car/car-05.jpg", description: "Mnogo Qka", price: "Zaslujava si" },
		   { src: "http://dreamatico.com/data_images/car/car-3.jpg", description: "Trendy", price: "Ne si zaslujava" },
		   { src: "http://weknowyourdreams.com/images/car/car-04.jpg", description: "Mashina", price: "Mnogo" },
		   { src: "http://dreamatico.com/data_images/car/car-1.jpg", description: "God", price: "Bezcenna" },
		   { src: "http://www.info2india.com/cars/car-photos/small/bmw%20i8%201.jpg", description: "Electricity", price: "Visoka" }
        ];
	};
	
	module.controller("ArticalsController", ['$scope', ArticalsController]);
})();