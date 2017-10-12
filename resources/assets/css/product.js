var modal = document.getElementById('productModal');

var productImage = document.getElementById('productImage');
var modalImgage = document.getElementById("modalImage");
var captionText = document.getElementById("caption");

productImage.onclick = function(){
    modal.style.display = "block";

    modalImgage.src = this.src;

    captionText.innerHTML = this.alt;
}