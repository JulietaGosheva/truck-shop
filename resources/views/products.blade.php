@extends('master')

@section('filters')
	<div class="filters">
		<a href="#">Най-висока цена</a>
		<a href="#">Най-ниска цена</a>
		<a href="#">А-Я</a>
		<div class="filters-quantity">
			<form>
				<select name="">
					<option value="10">Volvo</option>
					<option value="20">MAN</option>
					<option value="50">Mercedes</option>
					<option value="100">ZAP</option>
				</select>
			</form>
		</div>
		<div class="filters-quantity">
			<form>
				<select name="">
					<option value="10">10 от 100</option>
					<option value="20">20 от 100</option>
					<option value="50">50 от 100</option>
					<option value="100">100 от 100</option>
				</select>
			</form>
		</div>
	</div>
@endsection

@section('page-content')
	<div class="products">
		@forelse ($products as $product)
			<div class="product">
				<a href="http://localhost/truck-shop/product/{{ $product['id'] }}">
					<img src="http://localhost/truck-shop/resources/assets/images/{{ $product['image_name'] }}"/>
				</a>
				<div style="text-align: center;">
					<p class="product-name">{{ $product['name'] }}</p>
					<p class="product-price"><strong>{{ $product['price'] }} лв.</strong></p>
				</div>
				<form onsubmit="addProductToCart(event, {{ $product['unique_id'] }})">
					<input type="submit" value="Добави в количка"/>
				</form>
			</div>
		@empty
    		<p style="text-align: center; margin-top: 55px;">Products was not found</p>
		@endforelse
	</div>
@endsection
