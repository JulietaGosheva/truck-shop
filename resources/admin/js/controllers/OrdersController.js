(function() {

	var module = angular.module("AdminController");
	
	var OrdersController = function($scope) {
		$scope.selectedOption = "default";
		$scope.option = "default";
		$scope.model = $scope;
		setOptionTypes($scope);
		$scope.setOption = function() {
			$scope.option = $scope.selectedOption;
		};
	};
	
	module.controller("OrdersController", ["$scope", OrdersController]);
	
	var setOptionTypes = function($scope) {
		$scope.ordersByUser = 'ordersByUser';
		$scope.dailyOrders = 'dailyOrders';
		$scope.ordersByDate = 'ordersByDate';
		$scope.ordersByProductType = 'ordersByProductType';
		$scope.mostSoldProducts = 'mostSoldProducts';
	};
	
	var isSelected = function() {
		return false;
	};
	
	var getCurrentDate = function() {
		var today = new Date();
		var date = today.getDate();
		var month = today.getMonth() + 1;
		var year = today.getFullYear();

		if(date < 10) {
		    date = '0' + date
		} 

		if(month < 10) {
		    month = '0' + month
		} 

		return date + '/' + month + '/' + year;
	};
	
})();