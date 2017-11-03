function removeProductFromCart(uniqueId) {
	var form = document.getElementById('cart-removal-form-' + uniqueId);

	form.submit();
}