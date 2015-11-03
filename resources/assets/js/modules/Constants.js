(function() {
	var module = angular.module("AngularApplication");
	
	var Constants = function() {
		var Constants = {
				"accessoars": {
						href: "#/accessoars",
						displayName: "Аксесоари",
						subItems : [
							{ name: "Тест1" },
							{ name: "Тест2" }
		                ],
					},
			    "buffers": {
						href: "#/buffers",
						displayName: "Буфери",
						subItems : [
				            { name: "Тест3" },
				            { name: "Тест4" }
			            ],
						
				    },
			    "engines": {
				    	href: "#/engines",
				    	displayName: "Двигатели",
						subItems : [],
				    },
			    "buffer-laffets": {
				    	href: "#/buffer-laffets",
				    	displayName: "Буфери-Лафети",
						subItems : [],
				    },
			    "snow-net": {
				    	href: "#/snow-net",
				    	displayName: "Вериги за сняг",
						subItems : []
				    }
		};
		
		return {
			getNavigationItems: function() {
				return Constants;
			},
			getNavigationSubItems: function(item) {
				return Constants[item] !== undefined ? Constants[item].subItems : [];
			}
		};
	};
	
	module.factory("Constants", Constants);
})();