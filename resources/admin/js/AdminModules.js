if (typeof com === "undefined") {
	var com = {
		rs : {
			module : {
				
			}	
		}
	};
} else if (typeof com.rs === "undefined") {
	com.rs = {};
} else {
	com.rs.module = {};
}

com.rs.module.ModuleNames = function() { };

com.rs.module.ModuleNames.prototype.getRestClientName = function() {
	return "RestClient";
};

com.rs.module.ModuleNames.prototype.getDestinationUtilName = function() {
	return "DestinationUtil";
};

com.rs.module.ModuleNames.prototype.getAjaxClientName = function() {
	return "AjaxClient";
};

com.rs.module.ModuleNames.prototype.getHeaderUtilName = function() {
	return "HeaderUtil";
};

com.rs.module.ModuleNames.prototype.getAdminControllerName = function() {
	return "AdminController";
};

com.rs.module.ModuleNames.prototype.getClientControllerName = function() {
	return "ClientController";
};

com.rs.module.ModuleNames.prototype.getHashHelperName = function() {
	return "HashHelper";
};

com.rs.module.ModuleNames.prototype.getProductRetrieverName = function() {
	return "ProductRetriever";
};

com.rs.module.ModuleNames.prototype.getUserRetrieverName = function() {
	return "UserRetriever";
};

com.rs.module.ModuleNames.prototype.getNavigationItemRetrieverName = function() {
	return "NavigationItemRetriever";
};
