function addProductToCart(oEvent, uniqueId) {
	oEvent.preventDefault();

	showBusyIndicator();
	executeRequest(uniqueId);
}

function showBusyIndicator() {
	var busyIndicator = document.getElementById('busyIndicator');

	busyIndicator.style.display = "inline";
}

function executeRequest(uniqueId) {
	$.ajax({
		url: 'http://localhost/truck-shop/cart/' + uniqueId,
		method: "POST",
        dataType: 'json'
	}).done(function(response) {
		if (response && response.length != 0) {
			changeCartQuantityCount(response.length);
			showDialog('successOrderDialog');
		} else {
			showDialog('previouslyOrderedDialog');
		}

	}).fail(function(response) {
		showDialog('failureOrderDialog');
	}).always(function() {
		closeBusyIndicator();
	});
}

function closeBusyIndicator() {
	var busyIndicator = document.getElementById('busyIndicator');

	busyIndicator.style.display = "none";
}

function showDialog(dialogId) {
	var orderDialog = document.getElementById(dialogId);
	
	orderDialog.style.display = 'inline-block';

	setTimeout(function() {
		orderDialog.style.display = 'none';
	}, 4000);
}

function changeCartQuantityCount(count) {
	var quantityLink = document.getElementById('cartQuantityCount');

	quantityLink.innerHTML = count;
}