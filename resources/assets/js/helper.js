(function() {
	if(!Object.keys) 
		Object.keys = function(object){
	     if (object !== Object(object)) {
	    	 throw new TypeError('Object.keys called on non-object');
	     }

	     var keys = []
	     for(var key in object) {
	    	 if(Object.prototype.hasOwnProperty.call(object,key)) {
	    		 keys.push(key);
	    	 }
	     }
	     return keys;
	}
})();