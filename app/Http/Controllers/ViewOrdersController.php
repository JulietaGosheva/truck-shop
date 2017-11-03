<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

use Log;
use App;
use App\Http\Helpers\OrderPersistenceHelper;
use App\Http\Helpers\ProductPersistenceHelper;

class ViewOrdersController extends OrdersController {
	
	private $persistenceHelper = null;
	private $productPersistenceHelper = null;
	
	function __construct() {
		$this->persistenceHelper = new OrderPersistenceHelper();
		$this->productPersistenceHelper = new ProductPersistenceHelper();
	}

	public function retrieveUserOrdersQuantityFromCart(Request $request, Response $response) {
		$response->header("Content-Type", "application/json");

		return parent::retrieveUserOrdersFromCart($request, $response);
	}

	public function retrieveUserOrdersFromCart(Request $request, Response $reponse) {
		$uniqueIds = parent::retrieveUserOrdersFromCart($request, $reponse);

		$products = $this->productPersistenceHelper->_findEntitiesByUniqueIds($uniqueIds);

		if (count($products) == 0) {
			return view('cart');
		}
	
		return view('cart', ['products' => $products]);
	}

	public function addProductToCart(Request $request, Response $response, $uniqueId) {
		$response->header("Content-Type", "application/json");

		$uniqueIds = parent::retrieveUserOrdersFromCart($request, $response);
		if (($key = array_search($uniqueId, $uniqueIds)) !== false) {
			Log::debug("Element is founded in the cart.");
			return "[]";
		}

		Log::debug("Adding [" + $uniqueId + "] to cart.");

		return parent::addProductToCart($request, $response, $uniqueId);
	}

	public function removeProductFromCart(Request $request, Response $response, $uniqueId) {
		parent::removeProductFromCart($request, $response, $uniqueId);
		
		return redirect("/cart");
	}
}