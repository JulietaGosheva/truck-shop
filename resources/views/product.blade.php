@extends('master')

@section('page-content')
	@if (isset($product))
		<div class="product-details">
			<div class="product-details-images">
				<div class="product-details-main-image">
					<img class="productImage" src="http://localhost/truck-shop/resources/assets/images/{{ $product['image_name'] }}"/>
				</div>
				<div class="product-details-secondary-images">
					<img class="productImage" src="http://localhost/truck-shop/resources/assets/images/{{ $product['image_name'] }}"/>
					<img class="productImage" src="http://localhost/truck-shop/resources/assets/images/{{ $product['image_name'] }}"/>
					<img class="productImage" src="http://localhost/truck-shop/resources/assets/images/{{ $product['image_name'] }}"/>
					<img class="productImage" src="http://localhost/truck-shop/resources/assets/images/{{ $product['image_name'] }}"/>
				</div>
			</div>
			
			<div class="product-details-description">
				<div>
					<table>
						<tr>
							<td class="description">Описание: </td>
							<td></td>
						</tr>
						<tr>
							<td class="description">Модел: </td>
							<td>{{ $product['models']->name }}</td>
						</tr>
						<tr>
							<td class="description">Марка: </td>
							<td>{{ $product['brands']->name }}</td>
						</tr>
						<tr>
							<td class="description">Име: </td>
							<td>{{ $product['name'] }}</td>
						</tr>
						<tr>
							<td class="description">Цена: </td>
							<td>{{ $product['price'] }} лв.</td>
						</tr>
						<tr>
							<td></td>
							<td>
								<form onsubmit="addProductToCart(event, {{ $product['unique_id'] }})">
									<input type="submit" value="Добави в количка"/>
								</form>
							</td>
						</tr>
					</table>
				</div>
			</div>
		</div>
		
		<div id="productModal" class="modal">
	  		<span class="close" onclick="document.getElementById('productModal').style.display='none'">&times;</span>
			
		  	<img class="modal-content" id="modalImage">
		
		  	<div id="caption"></div>
		</div>

	@else
    	<p style="text-align: center; margin-top: 55px;">Product was not found</p>
	@endif

	<script>
		var modal = document.getElementById('productModal');
	
		var productImages = document.getElementsByClassName('productImage');
		var modalImgage = document.getElementById("modalImage");
		var captionText = document.getElementById("caption");

		debugger;

		for (var i = 0 ; i < productImages.length ; i++ ){
			productImages[i].onclick = function(){
			    modal.style.display = "block";
		
			    modalImgage.src = this.src;
		
			    captionText.innerHTML = this.alt;
			}
		}
	</script>
@endsection
