(function() {
	$.ajaxSetup({
		headers: {
			"X-RS-VType-ID" : 1,
			"X-RS-Language": "bg-BG"
		}
	});
	
	$.ajax({
        url: "http://localhost/truck-shop/rest/users/api/v1/data",
        type: "GET",
        async: false,
        dataType: 'json',
        success: function(data, textStatus, jqXhr) {
        	var clientCache = com.rs.client.cache.ClientCache.prototype.getInstance();
        	
        	clientCache.setCacheEntry("userData", typeof data === "undefined" ? undefined : data);
        },
        error: function(jqXhr, textStatus, errorThrown) {
        	console.log("Failed to load user data");
        },
        complete: function(xhrResponse) {
        	
        }
    });
})();

if (typeof com === "undefined") {
	var com = {
		rs : {
			utils : {

			}	
		}
	};
} else if (typeof com.rs === "undefined") {
	com.rs = {
		utils: {

		}
	};
} else if(typeof com.rs.utils === "undefined") {
	com.rs.utils = {};
}

com.rs.utils.UserUtil = function() {
	var modules = new com.rs.client.module.ClientModules();
	this.registry = com.rs.registry.Registry.prototype.getInstance();
	this.sessionUtil = this.registry.getReference(modules.getSessionUtilName());
	this.clientCache = com.rs.client.cache.ClientCache.prototype.getInstance();
	this.userData = this.clientCache.getCacheEntry("userData");
};

com.rs.utils.UserUtil.prototype.isUserLoggedIn = function() {
	return typeof this.userData !== "undefined";
};

com.rs.utils.UserUtil.prototype.getUserName = function() {
	if (typeof this.userData === "undefined") {
		return "";
	}
	return this.userData["first_name"] + " " + this.userData['last_name'];
};

com.rs.utils.UserUtil.prototype.setUserData = function(userData) {
	this.userData = userData;
	this.clientCache.setCacheEntry("userData", this.userData);
	
	if (typeof this.userData !== "undefined") {
		this.sessionUtil.showLoggedInUserTemplate();
	} else {
		this.sessionUtil.hideLoggedInUserTemplate();
	}
};
