(function() {
	$.ajaxSetup({
		headers: {
			"X-RS-VType-ID" : 1,
			"X-RS-Language": "bg-BG"
		}
	});
	
	$.ajax({
        url: "http://localhost/truck-shop/rest/navigation/api/v1",
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
        error: function(xhrResponse, textStatus, errorThrown) {
        	console.log("Failed to load the navigation items");
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

com.rs.utils.NavigationUtil = function() {
	this.clientCache = com.rs.client.cache.ClientCache.prototype.getInstance();
	this.navItems = this.toMap(this.clientCache.getCacheEntry("navItems"));
};

com.rs.utils.NavigationUtil.prototype.toMap = function(object) {
	if (object !== Object(object)) {
    	this._displayErrorAndReloadPage();
    	return [];
    }

    var keys = {};
    for(var key in object) {
    	if(Object.prototype.hasOwnProperty.call(object, key)) {
    		var name = object[key].name;
    		keys[name] = object[key];
    	}
    }
    return keys;
};

com.rs.utils.NavigationUtil.prototype._displayErrorAndReloadPage = function() {
	$('#error-modal').modal({ keyboard: true });
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

com.rs.utils.NavigationUtil.prototype.getNavSubItems = function(navItemName) {
	return this.navItems[navItemName].subItems;
};

com.rs.utils.NavigationUtil.prototype.getNavItemByName = function(navItemName) {
	if (typeof this.navItems[navItemName] !== "undefined") {
		return this.navItems[navItemName];
	}
	
	var navItems = Object.toArray(this.getNavItems());
	for (var j = 0 ; j < navItems.length ; j++) {
		var navSubItems = this.getNavSubItems(navItems[j].name);
		if (typeof navSubItems === "undefined") {
			continue;
		}
		
		navSubItems = Object.toArray(navSubItems);
		for (var i = 0 ; i < navSubItems.length ; i++) {
			if (navSubItems[i].name === navItemName) {
				return navSubItems[i];
			}
		}
	}
	
	return undefined;
};

com.rs.utils.NavigationUtil.prototype.getParentNavItemByName = function(navItemName) {
	if (typeof this.navItems[navItemName] !== "undefined") {
		return this.navItems[navItemName];
	}
	
	var navItems = Object.toArray(this.getNavItems());
	for (var j = 0 ; j < navItems.length ; j++) {
		var navSubItems = this.getNavSubItems(navItems[j].name);
		if (typeof navSubItems === "undefined") {
			continue;
		}
		
		navSubItems = Object.toArray(navSubItems);
		for (var i = 0 ; i < navSubItems.length ; i++) {
			if (navSubItems[i].name === navItemName) {
				return navItems[j];
			}
		}
	}
	
	return undefined;
};
