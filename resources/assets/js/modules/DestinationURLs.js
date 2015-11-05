(function() {
	var DestinationURLs = function() {
		return {
			ARTICUL: "",
			DETAILS: "",
			CONTACTS: ""
		};
	};
	
	var module = angular.module("AngularApplication");
	module.factory("DestinationURLs", [DestinationURLs]);
})();