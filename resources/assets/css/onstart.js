(function() {
	function showBusyIndicator() {
		var busyIndicator = document.getElementById('busyIndicator');

		busyIndicator.style.display = "inline";
	}

	function executeRequest(uniqueId) {
		$.ajax({
			url: 'http://localhost/truck-shop/cart/quantity',
	        dataType: 'json'
		}).done(function(response) {
			changeCartQuantityCount(response.length);
		}).fail(function(response) {
			changeCartQuantityCount(0);
		}).always(function() {
			closeBusyIndicator();
		});
	}

	function closeBusyIndicator() {
		var busyIndicator = document.getElementById('busyIndicator');

		busyIndicator.style.display = "none";
	}
	
	function changeCartQuantityCount(count) {
		var quantityLink = document.getElementById('cartQuantityCount');

		quantityLink.innerHTML = count;
	}
	
	showBusyIndicator();
	executeRequest();

})()