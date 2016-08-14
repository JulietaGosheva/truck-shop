<?php

namespace App\Http\Helpers;

use Log;
use Validator;

use App;
use App\Orders;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

use Illuminate\Support\Facades\DB;

class OrderPersistenceHelper {
	
	public function persistOrder(Request $request, Response $response, $requestBody, $user) {
		DB::transaction(function() use(&$response, &$requestBody, &$user) {
			$deliveryInfo = new \stdClass();
			$deliveryInfo->email = $requestBody->email;
			$deliveryInfo->phone = $requestBody->phone;
			$deliveryInfo->address = $requestBody->address;
				
			$baseOrderEntry = null;
			foreach ($requestBody->products as $product) {
				$createdEntry = Orders::create([
						"user_id" => $user->id,
						"product_id" => $product->id,
						"order_date" => date("Y-m-d H:i:s"),
						"delivery_date" => date("Y-m-d H:i:s"),
						"is_payed" => 0,
						"delivery_info" => json_encode($deliveryInfo, JSON_UNESCAPED_UNICODE),
						"in_order_with" => $baseOrderEntry !== null ? $baseOrderEntry->id : 0,
						"order_count" => $product->quantity
				]);
		
				if ($baseOrderEntry === null) {
					$baseOrderEntry = $createdEntry;
				}
			}
		
			$response->header("Content-Type", "application/json");
			$response->header(Constants::RESPONSE_HEADER, "Successfully persisted entity.");
			$response->setStatusCode(Response::HTTP_CREATED);
		});
		
		return $response;
	}
	
	public function findEntitiesForId(Request $request, Response $response, $id) {
		$dbQuery = "SELECT"
				. " o.order_date, o.is_payed, o.delivery_info, o.order_count,"
				. " u.first_name, u.last_name, u.email,"
				. " p.name, p.image_name, p.price, p.unique_id,"
				. " b.name AS brand_name,"
				. " pt.name AS product_type_name,"
				. " m.name AS model_name"
				. " FROM orders o"
				. " JOIN users u ON u.id = o.user_id"
				. " JOIN products p ON p.id = o.product_id"
				. " JOIN brands b ON b.id = p.brand_id"
				. " JOIN product_types pt ON pt.id = p.product_type_id"
				. " JOIN models m ON m.id = p.model_id"
				. " WHERE o.id = ? OR o.in_order_with = ?";
		
		return DB::select($dbQuery, [$id, $id]);
	}
	
	public function findDailyEntities(Request $request, Response $response) {
		$dbQuery = "SELECT o.*, u.first_name, u.last_name, u.email FROM orders o"
				. " JOIN users u ON u.id = o.user_id"
				. " WHERE DATE_FORMAT(o.order_date, '%Y-%d-%m') = DATE_FORMAT(NOW(), '%Y-%d-%m')"
				. " AND o.in_order_with = 0";
		return DB::select($dbQuery);
	}
	
	public function findEntitiesByDate(Request $request, Response $response) {
		$date = new \DateTime($request->input("orderDate"));
		$orderDate = $date->format('Y-m-d');
		
		Log::debug("Retrieving orders by date: [" . $orderDate . "]");
		
		$query = "SELECT o.id, o.order_date, u.first_name, u.last_name, u.email FROM orders o"
				 . " JOIN users u ON u.id = o.user_id"
				 . " WHERE DATE_FORMAT(o.order_date, '%Y-%d-%m') = DATE_FORMAT(?, '%Y-%d-%m')"
		 		 . " AND o.in_order_with = 0";
		
		return DB::select($query, [$orderDate]);
	}
	
	public function findEntitiesByUser(Request $request, Response $response) {
		$dbQuery = "SELECT o.id, o.order_date, u.first_name, u.last_name, u.email FROM orders o"
				   . " JOIN users u ON u.id = o.user_id WHERE o.in_order_with = 0";
		
		if ($request->has("userName")) {
			$dbQuery .= " AND CONCAT(u.first_name, ' ', u.last_name) = ?";
		}
		
		if ($request->has("email")) {
			$dbQuery .= " AND u.email = ?";
		}
		
		$statements = array();
		
		$email = $request->input("email");
		if ($email !== null) {
			array_push($statements, $email);
		}
		
		$userName = $request->input("userName");
		if ($userName !== null) {
			array_push($statements, $userName);
		}
		
		Log::debug("Retrieving entries by user name and email");
		
		Log::debug($dbQuery);
		
		$orders = DB::select($dbQuery, $statements);
		
		Log::debug("Retrieved orders: [" . json_encode($orders) . "]");
		
		return $orders;
	}
	
	public function findEntitiesByProductType(Request $request, Response $response) {
		$productType = $request->input("productType");
		
		Log::debug("Retrieving entries by product type: [" . $productType . "]");
		
		$dbQuery = "SELECT * FROM orders o JOIN products p ON p.id = o.product_id"
				. " JOIN product_types pt ON pt.id = p.product_type_id"
				. " WHERE pt.name = ?";
		
		$orders = DB::select($dbQuery, [ $productType ]);
		
		Log::debug("Retrieved orders: [" . json_encode($orders) . "]");
		
		return $orders;
	}
}