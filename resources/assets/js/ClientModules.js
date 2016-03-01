if (typeof com === "undefined") {
	var com = {
		rs : {
			client: {
				module : {
					
				}	
			}
		}
	};
} else if (typeof com.rs === "undefined") {
	com.rs = {
		client : {
			module : {
				
			}
		}
	};
} else if (typeof com.rs.client === "undefined") {
	com.rs.client = {
		module: {
			
		}
	};
} else {
	com.rs.client.module = {};
}

com.rs.client.module.ClientModules = function() { };

com.rs.client.module.ClientModules.prototype.getClientControllerName = function() {
	return "AngularApplication";
//	return "ClientController";
};

com.rs.client.module.ClientModules.prototype.getAdminControllerName = function() {
	return "AdminController";
};

com.rs.client.module.ClientModules.prototype.getNavigationItemRetrieverName = function() {
	return "NavigationItemRetriever";
};

com.rs.client.module.ClientModules.prototype.getRestClientName = function() {
	return "RestClient";
};

com.rs.client.module.ClientModules.prototype.getDestinationUtilName = function() {
	return "DestinationUtil";
};

com.rs.client.module.ClientModules.prototype.getAjaxClientName = function() {
	return "AjaxClient";
};

com.rs.client.module.ClientModules.prototype.getHeaderUtilName = function() {
	return "HeaderUtil";
};
