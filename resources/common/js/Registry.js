if (typeof com === "undefined") {
	var com = {
		rs : {
			registry : {
				
			}	
		}
	};
} else if (typeof com.rs === "undefined") {
	com.rs = {};
} else {
	com.rs.registry = {};
}

com.rs.registry.Registry = function() {
	this.registry = {};
};

com.rs.registry.Registry.prototype._instance = undefined;

com.rs.registry.Registry.prototype.getInstance = function() {
	if (this._instance === undefined) {
		this._instance = new com.rs.registry.Registry();
	}
	return this._instance;
};

com.rs.registry.Registry.prototype.register = function(key, value) {
	this.registry[key] = value;
};

com.rs.registry.Registry.prototype.unregister = function(key) {
	delete this.registry[key];
};

com.rs.registry.Registry.prototype.getReference = function(key) {
	var reference = this.registry[key];
	if (typeof reference === "function") {
		return this.registry[key].apply(null, Array.prototype.slice.call(arguments, 1));
	}
	return this.registry[key];
};
