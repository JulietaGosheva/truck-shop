@extends('master')

@section('page-content')
	<div class="cart">
		@if (isset($products))
			<table>
				<tr>
					<th>Продукт</th>
					<th style="padding-left:15px;">Количество</th>
					<th>Единична цена</th>
					<th style="text-align: center">Цена</th>
					<th></th>
				</tr>
				
				@foreach ($products as $product)
					<tr>
						<td class="cart-product">
							<div>
								<div class="cart-image">
									<a href="http://localhost/truck-shop/product/{{ $product['id'] }}"><img src="http://localhost/truck-shop/resources/assets/images/{{ $product['image_name'] }}" /></a>
								</div>
								<div class="cart-detail">
									<p>{{ $product['unique_id'] }}</p>
									<a href="product.html" class="cart-detail-link">{{ $product['name'] }}</a>
								</div>
							</div>
						</td>
						<td class="cart-product-quantity">
							<form>
								<div style="position: relative">
									<span class="fa fa-plus" style="margin-right: 5px; color: green; cursor: pointer;"></span>
									<input type="text" name="quantity" value="1" />	
									<span class="fa fa-minus" style="margin-left: 5px; color: red; cursor: pointer;"></span>
								</div>
							</form>
						</td>
						<td>
							<strong>{{ $product['price'] }}лв.</strong>
						</td>
						<td style="text-align: center">
							<strong>{{ $product['price'] }}лв.</strong>
						</td>
						<td class="cart-product-removal">
							<form method="POST" id="cart-removal-form-{{ $product['unique_id'] }}" action="http://localhost/truck-shop/cart/{{ $product['unique_id'] }}">
								<input type="hidden" name="_method" value="DELETE" />
								<a onclick="removeProductFromCart({{ $product['unique_id'] }})" style="cursor: pointer"><span>&times;</span></a>
							</form>
						</td>
					</tr>
				@endforeach
				
			</table>
		
			<div style="margin-top: 25px; min-width: 100%; background-color: #bf0000; color: white; height: 55px; border-radius: 3px;">
				<div style="margin-right: 25px; padding-top: 20px; padding-left: 15px; display: inline-block; font-size: 17px;"><a href="truck-shop/" style="text-decoration: none; color: white;"><span class="fa fa-long-arrow-left"> Обратно към пазаруването</span></a></div>
				<div style="margin-right: 25px; padding-top: 20px; padding-left: 15px; display: inline-block; font-size: 17px;"><a href="truck-shop/" style="text-decoration: none; color: white;"><span class="fa">Продължи към поръчката</span> <span class="fa fa-long-arrow-right"></span></a></div>
				<div style="margin-right: 25px; padding-top: 15px; display: inline-block; position: absolute; right: 15px;">Общо: <b style="font-size: 22px;">689.<sup>88</sup></b> лв.</div>
			</div>
		@else
	    	<p style="text-align: center; margin-top: 55px;">Няма продукти в количката</p>
		@endif
		
	</div>
@endsection