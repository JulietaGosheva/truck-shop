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

class OrdersController extends Controller {

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
			$response->setStatusCode(400);
			return $response;
		}
		
		Log::debug("Sended request body: [" . $rawContentBody . "]");
		$requestBody = json_decode($rawContentBody);
		
		DB::transaction(function() use(&$response, &$requestBody, &$user) {
			$deliveryInfo = new \stdClass();
			$deliveryInfo->email = $requestBody->email;
			$deliveryInfo->phone = $requestBody->phone;
			$deliveryInfo->address = $requestBody->address;
			
			$previousOrder = null;
			foreach ($requestBody->products as $product) {
				$createdEntry = Orders::create([
						"user_id" => $user->id,
						"product_id" => $product->id,
						"order_date" => date("Y-m-d H:i:s"),
						"delivery_date" => date("Y-m-d H:i:s"),
						"is_payed" => 0,
						"delivery_info" => json_encode($deliveryInfo, JSON_UNESCAPED_UNICODE),
						"in_order_with" => $previousOrder !== null ? $previousOrder->id : 0,
						"order_count" => $product->quantity
				]);
				
				$previousOrder = $createdEntry;
			}
		
			$response->header("Content-Type", "application/json");
			$response->header(Constants::RESPONSE_HEADER, "Successfully persisted entity.");
			$response->setStatusCode(201);
		});
		
		return $response;
	}
}
