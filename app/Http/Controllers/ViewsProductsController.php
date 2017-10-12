<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

use App;
use App\Http\Helpers\ProductPersistenceHelper;

class ViewsProductsController extends ProductsController {
	
	private $persistenceHelper = null;
	
	function __construct() {
		$this->persistenceHelper = new ProductPersistenceHelper();
	}
	
	public function getAllProducts(Response $response) {
		$products = parent::getAllEntries($response);

		return view("products", ['products' => $products->toArray()]);
	}
	
	public function getProductsByNavigationItemName($navigationItemName) {
		$products = $this->persistenceHelper->findProductsByNavigationItemName($navigationItemName);
	
		$products = array_map(function($product) {
			return (array) $product;
		}, $products);
	
		return view('products', ['products' => $products]);
	}

	public function getProductById($productId) {
		$product = $this->persistenceHelper->findEntityByProductId($productId);
		
		return view('product', ['product' => $product]);
	}

}