<?php

namespace App\Http\Controllers;

use App\Brands;
use App\Http\Controllers\Controller;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use App\ProductTypes;
use App\Models;
use App\Products;
use Illuminate\Support\Facades\DB;

class ProductsController extends Controller  {
	
	function __construct() {
		
	}
	
	function findEntity() {
		return "[{".
	   			   "\"id\": 1,".
	   			   "\"src\": \"http://weknowyourdreams.com/images/car/car-05.jpg\",".
	   			   "\"name\": \"Laborghini\",".
	   			   "\"type\": \"Car\"".
			   "},".
			   "{".
				   "\"id\": 2,".
				   "\"src\": \"http://dreamatico.com/data_images/car/car-3.jpg\",".
				   "\"name\": \"Renault\",".
	   			   "\"type\": \"Car\"".
			   "},".
			   "{".
				   "\"id\": 3,".
				   "\"src\": \"http://weknowyourdreams.com/images/car/car-04.jpg\",".
				   "\"name\": \"Mustang\",".
	   			   "\"type\": \"Car\"".
			   "},".
			   "{".
				   "\"id\": 4,".
				   "\"src\": \"http://dreamatico.com/data_images/car/car-1.jpg\",".
				   "\"name\": \"Laborghini\",".
	   			   "\"type\": \"Car\"".
			   "},".
			   "{".
				   "\"id\": 5,".
				   "\"src\": \"http://www.info2india.com/cars/car-photos/small/bmw%20i8%201.jpg\",".
				   "\"name\": \"BMW\",".
	   			   "\"type\": \"Car\"".
			   "}]";
	}
	
	function getAllEntries() {
		return Products::with('productTypes', 'brands', 'models')->get();
	}
	
	function persistEntity(Request $request) {
		$rawContentBody = $request->getContent();
		$requestBody = json_decode($rawContentBody);
		
		$response = $this->persistProduct($requestBody);
		
		if ($response->isEmpty()) {
			$response->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR, "Възникна проблем при създаването на продукта.");
			$response->header("X-Response-Result", "Failed to create product with provided data.");
		}
		return $response;
	}
	
	private function persistProduct($requestBody) {
		$response = new Response();
		
		DB::transaction(function() use(&$requestBody, &$response) {
			$productType = $this->persistAndRetrieveProductTypeEntry($requestBody);
			$brand = $this->persistAndRetrieveBrandEntry($requestBody);
			$model = $this->persistAndRetrieveModelEntry($requestBody);
				
			$productType->brands()->attach($brand->id);
			$brand->models()->attach($model->id);
				
			$productName = $requestBody->name;
			$uniqueId = $requestBody->uniqueNumber;
			$price = intval($requestBody->price);
			$imageName = $requestBody->imageName;
				
			$product = Products::create([
					"name" => $productName,
					"unique_id" => $uniqueId,
					"product_type_id" => $productType->id,
					"brand_id" => $brand->id,
					"model_id" => $model->id,
					"price" => $price,
					"image_name" => $imageName
			]);
			
			$response->header("Content-Type", "application/json");
			$response->header("X-Response-Result", "success");
			$response->setStatusCode(201);

			$responseBody = "{\"productId\":\"". $product->id ."\", \"imagename\":\"". $imageName ."\"}";
			$response->setContent($responseBody);
		});
		
		return $response;
	}
	
	private function persistAndRetrieveProductTypeEntry($requestBody) {
		return ProductTypes::firstOrCreate(["name" => $requestBody->type]);
	}
	
	private function persistAndRetrieveBrandEntry($requestBody) {
		return Brands::firstOrCreate(["name" => $requestBody->brand]);
	}
	
	private function persistAndRetrieveModelEntry($requestBody) {
		return Models::firstOrCreate(["name" => $requestBody->model]);
	}
	
	function uploadImage(Request $request) {
		$response = new Response();
		if ($request->hasFile("file")) {
			$file = $request->file("file");
			if ($file->isValid()) {
				$imageName = round(microtime(true) * 1000) . "." . $file->getClientOriginalExtension();
				try {
					$file->move(base_path("resources/assets/images"), $imageName);
				} catch (Exception $exception) {
					$response->header("Content-Type", "application/json; charset=UTF-8");
					$response->header("X-Response-Result", "Failed to upload image reason: [" . $exception->getMessage() . "]");
					$response->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR);
					return $response;
				}
				$response->header("Content-Type", "application/json; charset=UTF-8");
				$response->header("X-Response-Result", "Successfully uploaded image.");
				$response->setStatusCode(Response::HTTP_CREATED);
	
				$response->setContent("{\"imageName\":\"" . $imageName . "\"}");
			} else {
				$response->header("X-Response-Result", "Uploaded file is invalid.");
				$response->header("Content-Type", "application/json; charset=UTF-8");
				$response->setStatusCode(Response::HTTP_BAD_REQUEST);
			}
		} else {
			$response->header("X-Response-Result", "File must be uploaded.");
			$response->header("Content-Type", "application/json; charset=UTF-8");
			$response->setStatusCode(Response::HTTP_BAD_REQUEST);
		}
		return $response;
	}
	
	function updateEntity() {
		return "Successfully updated product entity";
	}
	
	function deleteEntity() {
		return "Successfully deleted product entity";
	}

	function getTypes() {
		return "[".
					"{\"id\":1,\"name\":\"Волан\"},".
					"{\"id\":2,\"name\":\"Двигател\"}".
			   "]";
	}
	
	function getBrands($typeId) {
		if ($typeId === "1") {
			return "[{\"id\":1,\"name\":\"Nissan\"}]";
		}
		return "[{\"id\":2,\"name\":\"Mercedes\"}]";
	}
	
	function getModels($typeId, $brandId) {
		if ($typeId === "1" && $brandId === "1") {
			return "[{\"id\":1,\"name\":\"Съзтезателен\"}]";
		} else if ($typeId === "2" && $brandId === "2") {
			return "[{\"id\":1,\"name\":\"Бизнесменски\"}]";
		}
		return "[]";
	}
}