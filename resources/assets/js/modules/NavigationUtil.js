(function() {
	$.ajax({
        url: "http://localhost/truck-shop/navigation/api/v1/items",
        type: "GET",
        async: false,
        dataType: 'json',
        success: function(xhrResponse) {
        	var clientCache = com.rs.client.cache.ClientCache.prototype.getInstance();
        	
        	var items = null;
        	if (Array.isArray(xhrResponse)) {
    			items = xhrResponse;
    		} else {
    			items = Object.toArray(xhrResponse);
    		}
        	
        	clientCache.setCacheEntry("navItems", items);
        },
        error: function(xhrResponse) {
        	console.log(1);
        },
        complete: function(xhrResponse) {
        	console.log(2);
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
} else {
	com.rs.utils = {};
}

com.rs.utils.NavigationUtil = function() {
	this.clientCache = com.rs.client.cache.ClientCache.prototype.getInstance();
	this.navItems = this.clientCache.getCacheEntry("navItems");
};

com.rs.utils.NavigationUtil.prototype.hasSubItems = function(navItemName) {
	if (typeof this.navItems[navItemName] === "undefined") {
		return false;
	}
	return typeof this.navItems[navItemName].subItems !== "undefined";
};

com.rs.utils.NavigationUtil.prototype.getNavItems = function() {
	return this.navItems;
};

com.rs.utils.NavigationUtil.prototype.getNavSubItems = function(navItem) {
	return this.navItems[navItemName].subItems;
};
