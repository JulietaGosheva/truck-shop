if (typeof com === "undefined") {
	var com = {
		rs : {
			client : {
				cache: {
					
				}
			}	
		}
	};
} else if (typeof com.rs === "undefined") {
	com.rs = {
		client: {
			cache: {
				
			}
		}
	};
} else if (typeof com.rs.client === "undefined") {
	com.rs.client = {
			cache: {
				
			}
	};
} else {
	com.rs.client.cache = {};
}

com.rs.client.cache.ClientCache = function() {
	this.cacheEntries = {};
};

com.rs.client.cache.ClientCache.prototype._instance = undefined;

com.rs.client.cache.ClientCache.prototype.getInstance = function() {
	if (this._instance === undefined) {
		this._instance = new com.rs.client.cache.ClientCache();
	}
	return this._instance;
};

com.rs.client.cache.ClientCache.prototype.setCacheEntry = function(key, value) {
	this.cacheEntries[key] = value;
};

com.rs.client.cache.ClientCache.prototype.getCacheEntry = function(key) {
	return this.cacheEntries[key];
};