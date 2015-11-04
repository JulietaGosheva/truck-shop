(function() {
	var module = angular.module("AngularApplication");
	
	var NavigationUtil = function() {
		var navigationArticals = {
				"accessoars": {
					href: "#/accessoars",
					displayName: "Аксесоари",
					subArtical : [
						{ 
							"gresiorka" : {
			            		href: "#/buffers/subArtical/gresiorka",
				            	displayName: "Гресьорка",
				            	subArtical : []
			            	}
						},
						{ 
							"eluredi" : {
			            		href: "#/buffers/subArtical/eluredi",
				            	displayName: "Електрически уреди",
				            	subArtical : []
			            	}
						}
	                ],
				},
			    "buffers": {
					href: "#/buffers",
					displayName: "Буфери",
					subArtical : [
			            { 
			            	"golemi" : {
			            		href: "#/buffers/subArtical/golemi",
				            	displayName: "Буфери и лафети",
				            	subArtical : []
			            	}
	            		},
			            {
	            			"lafeti" : {
			            		href: "#/buffers/subArtical/lafeti",
			            		displayName: "Лафети",
			            		subArtical : []
			            	}
			            }
		            ],
					
			    },
			    "engines": {
			    	href: "#/engines",
			    	displayName: "Двигатели",
			    	subArtical : [],
			    },
			    "buffer-laffets": {
			    	href: "#/buffer-laffets",
			    	displayName: "Буфери-Лафети",
			    	subArtical : [],
			    },
			    "snow-net": {
			    	href: "#/snow-net",
			    	displayName: "Вериги за сняг",
			    	subArtical : []
			    }
		};
		
		return {
			getNavigationArtical: function(item) {
				return navigationArticals[item];
			},
			
			getNavigationArticals: function() {
				return navigationArticals;
			},
			
			getNavigationSubArticals: function(key) {
				var subArticals = [];
				
				var articals = navigationArticals[key].subArtical;
				for (var i = 0 ; i < articals.length ; i++) {
					for (var articalKey in articals[i]) {
						subArticals.push({
							navLinkName: articals[i][articalKey].displayName,
							navLinkUrl: articals[i][articalKey].href
						});
					}
				}
				return subArticals;
			}
		};
	};
	
	module.factory("NavigationUtil", NavigationUtil);
})();