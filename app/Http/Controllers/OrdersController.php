<?php

namespace App\Http\Controllers;

use DB;
use Log;
use App;
use Auth;
use App\Orders;

use App\Http\Helpers\Constants;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

use App\Http\Controllers\Controller;
use App\Http\Helpers\OrderPersistenceHelper;

class OrdersController extends Controller {

	private $persistenceHelper = null;
	
	function __construct() {
		$this->persistenceHelper = new OrderPersistenceHelper();
	}
	
	public function retrieveUserOrders(Request $request, Response $response) {
		return Orders::with("users", "products")->get();
	}
	
	public function retrieveUserOrdersFromCart(Request $request, Response $reponse) {
		return $request->session()->get("cart", []);
	}
	
	public function isProductIntoCart(Request $request, Response $response, $uniqueId) {
		$session = $request->session();
		if ($session->has("cart") === false) {
			$response->header(Constants::RESPONSE_HEADER, "Element not found in the cart.");
			$response->setStatusCode(Response::HTTP_NO_CONTENT);
			return $response;
		}
		
		$cart = $session->get("cart");
		if (($key = array_search($uniqueId, $cart)) !== false) {
			Log::debug("Element is founded in the cart.");
			return [];
		}
		
		$response->header(Constants::RESPONSE_HEADER, "Element not found in the cart.");
		$response->setStatusCode(Response::HTTP_NO_CONTENT);
		return $response;
	}
	
	public function addProductToCart(Request $request, Response $response, $uniqueId) {
		$session = $request->session();
		if ($session->has("cart") === false) {
			$session->put("cart", []);
		}
		
		$session->push("cart", $uniqueId);
		
		return $session->get("cart");
	}
	
	public function removeProductFromCart(Request $request, Response $response, $uniqueId) {
		Log::debug("Trying to remove following element [" . $uniqueId . "] from the cart");
		
		$session = $request->session();
		if ($session->has("cart") === false) {
			$session->put("cart", []);
			
			$response->header(Constants::RESPONSE_HEADER, "Element not found in the cart.");
			$response->setStatusCode(Response::HTTP_NO_CONTENT);
			return $response;
		}
		
		$cart = $session->get("cart");
		if (($key = array_search($uniqueId, $cart)) !== false) {
			unset($cart[$key]);

			Log::debug("Element is successfully removed.");

			$session->put("cart", $cart);
			return $cart;
		}
		
		$response->header(Constants::RESPONSE_HEADER, "Remove product from cart operation finish successfully.");
		$response->setStatusCode(Response::HTTP_NO_CONTENT);
		return $response;
	}
	
	public function orderProducts(Request $request, Response $response) {
		Log::debug("Ordering products...");
		
		$user = Auth::user();
		if ($user === null) {
			$response->header(Constants::RESPONSE_HEADER, "There is no authenticated user.");
			$response->setStatusCode(Response::HTTP_NO_CONTENT);
			return $response;
		}
		
		$rawContentBody = $request->getContent();
		if ($rawContentBody === null) {
			$response->header(Constants::RESPONSE_HEADER, "Missing content body.");
			$response->setStatusCode(Response::HTTP_BAD_REQUEST);
			return $response;
		}
		
		Log::debug("Sended request body: [" . $rawContentBody . "]");
		$requestBody = json_decode($rawContentBody);
		
		return $this->persistenceHelper->persistOrder($request, $response, $requestBody, $user);
	}
	
	public function retrieveOrdersForId(Request $request, Response $response, $orderId) {
		Log::debug("Retrieving orders for id");
		
		$orders = $this->persistenceHelper->findEntitiesForId($request, $response, $orderId);
		
		Log::debug("Retrieved orders: [" . json_encode($orders) . "]");
		
		return $orders;
	}
	
	public function retrieveDailyEntities(Request $request, Response $response) {
		Log::debug("Retrieving current date orders");
		
		$orders = $this->persistenceHelper->findDailyEntities($request, $response);
		
		Log::debug("Retrieved orders: [" . json_encode($orders) . "]");
		
		return $orders;
	}
	
	public function retrieveEntitiesByDate(Request $request, Response $response) {
		Log::debug("Retrieving orders by date");
		
		$orders = $this->persistenceHelper->findEntitiesByDate($request, $response);
		
		Log::debug("Retrieved orders: [" . json_encode($orders) . "]");
		
		return $orders;
	}
	
	public function retrieveEntitiesByUser(Request $request, Response $response) {
		Log::debug("Retrieving orders by user");
	
		$orders = $this->persistenceHelper->findEntitiesByUser($request, $response);
	
		Log::debug("Retrieved orders: [" . json_encode($orders) . "]");
	
		return $orders;
	}
}
