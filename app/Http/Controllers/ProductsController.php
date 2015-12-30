<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;
use Illuminate\Http\Request;

use Validator;

use App\Brands;
use App\Models;
use App\Products;
use App\ProductTypes;
use App\Http\Controllers\Controller;

use Illuminate\Support\Facades\DB;
use App;

class ProductsController extends Controller  {
	
	const RESPONSE_HEADER = "X-Request-Result";
	const IMAGE_PATH = "resources/assets/images";
	
	public function findEntities(Request $request, Response $response) {
		if ($request->has("id")) {
			return $this->findEntityById($request, $response);
		}
		
		if ($request->has("uniqueid")) {
			return $this->findEntityByUniqueId($request, $response);
		}
		
		return $this->findEntity($request, $response);
	}
	
	private function findEntityById(Request $request, Response $response) {
		$validator = Validator::make($request->all(), [
		    'id' => 'required|numeric'
		]);
		
		if ($validator->fails()) {
			$response->header(self::RESPONSE_HEADER, "\"id\" query parameter is required and must contain number as value.");
			$response->setStatusCode(Response::HTTP_UNPROCESSABLE_ENTITY);
			return $response;
		}
			
		$id = $request->input("id");
		
		$product = Products::with('productTypes', 'brands', 'models')->find($id);

		if ($product === null) {
			$response->header(self::RESPONSE_HEADER, "Entity not found.");
			$response->setStatusCode(Response::HTTP_NO_CONTENT);
			return $response;
		}
		
		$response->header(self::RESPONSE_HEADER, "Successfully retrieved data.");

		return $product;
	}
	
	private function findEntityByUniqueId(Request $request, Response $response) {
		return "Method is not implemented";
	}
	
	private function findEntity(Request $request, Response $response) {
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
	
	public function getAllEntries(Response $response) {
		return Products::with('productTypes', 'brands', 'models')->get();
	}
	
	public function persistEntity(Request $request, Response $response) {
		$rawContentBody = $request->getContent();
		$requestBody = json_decode($rawContentBody);
		
		$response = $this->persistProduct($response, $requestBody);
		
		if ($response->isEmpty()) {
			$response->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR);
			$response->header(self::RESPONSE_HEADER, "Failed to create product with provided data.");
		}
		return $response;
	}
	
	private function persistProduct(Response $response, $requestBody) {
		DB::transaction(function() use(&$response, &$requestBody) {
			$brand = $this->persistAndRetrieveBrandEntry($requestBody);
			$model = $this->persistAndRetrieveModelEntry($requestBody);
			$productType = $this->persistAndRetrieveProductTypeEntry($requestBody);
				
			$brand->models()->attach($model->id);
			$productType->brands()->attach($brand->id);
				
			$product = Products::create([
				"brand_id" => $brand->id,
				"model_id" => $model->id,
				"name" => $requestBody->name,
				"product_type_id" => $productType->id,
				"image_name" => $requestBody->imageName,
				"price" => floatval($requestBody->price),
				"unique_id" => $requestBody->uniqueNumber
			]);
			
			$response->header("Content-Type", "application/json");
			$response->header(self::RESPONSE_HEADER, "Successfully persisted entity.");
			$response->setStatusCode(201);
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
	
	public function uploadImage(Request $request, Response $response) {
		if ($request->hasFile("file") === false) {
			$response->header(self::RESPONSE_HEADER, "File must be specified.");
			$response->setStatusCode(Response::HTTP_BAD_REQUEST);
			return $response;
		}
		
		$file = $request->file("file");
		if ($file->isValid() === false) {
			$response->header(self::RESPONSE_HEADER, "Uploaded file is invalid.");
			$response->setStatusCode(Response::HTTP_BAD_REQUEST);
			return $response;
		}
		
		return $this->saveImage($response, $file);
	}
	
	public function updateImage(Request $request, Response $response, $imageName) {
		if ($request->hasFile("file") === false) {
			$response->header(self::RESPONSE_HEADER, "File must be specified.");
			$response->setStatusCode(Response::HTTP_BAD_REQUEST);
			return $response;
		}
		
		$file = $request->file("file");
		if ($file->isValid() === false) {
			$response->header(self::RESPONSE_HEADER, "Uploaded file is invalid.");
			$response->setStatusCode(Response::HTTP_BAD_REQUEST);
			return $response;
		}
		
		if (isset($imageName) === false) {
			$response->header(self::RESPONSE_HEADER, "\"imageName\" parameter should be specified.");
			$response->setStatusCode(Response::HTTP_BAD_REQUEST);
			return $response;
		}
		
		DB::beginTransaction();
		
		$isFileDeleted = $this->deleteImageByName($imageName);
		
		if ($isFileDeleted === false) {
			DB::rollBack();
			
			$response->header(self::RESPONSE_HEADER, "Failed to delete previous file.");
			$response->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR);
			return $response;
		}
		
		$response = $this->saveImage($response, $file);
		
		if ($response->status() === Response::HTTP_CREATED) {
			DB::commit();
		} else {
			DB::rollBack();
		}
		
		return $response;
	}
	
	private function saveImage(Response $response, $file) {
		$imageName = round(microtime(true) * 1000) . "." . $file->getClientOriginalExtension();
		
		try {
			$file->move(base_path(self::IMAGE_PATH), $imageName);
		} catch (Exception $exception) {
			$response->header(self::RESPONSE_HEADER, "Failed to upload image reason: [" . $exception->getMessage() . "]");
			$response->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR);
			return $response;
		}
		
		$response->header("Content-Type", "application/json; charset=UTF-8");
		$response->header(self::RESPONSE_HEADER, "Successfully uploaded image.");
		$response->setStatusCode(Response::HTTP_CREATED);
		
		$response->setContent("{\"imageName\":\"" . $imageName . "\"}");
		
		return $response;
	}
	
	private function deleteImageByName($imageName) {
		$imagesPath = base_path(self::IMAGE_PATH);
		return unlink($imagesPath . "/" . $imageName);
	}
	
	public function updateEntity(Request $request, Response $response) {
		$rawContentBody = $request->getContent();
		$requestBody = json_decode($rawContentBody);
		
		$queryResult = Products::where("id", $requestBody->id)->
				update([
					"name" => $requestBody->name,
					"unique_id" => $requestBody->uniqueNumber,
					"product_type_id" => $requestBody->type,
					"brand_id" => $requestBody->brand,
					"model_id" => $requestBody->model,
					"image_name" => $requestBody->imageName,
					"price" => $requestBody->price,
			   	]);

		if ($queryResult > 0) {
			$response->header(self::RESPONSE_HEADER, "Successfully updated product entry.");
			$response->setStatusCode(Response::HTTP_NO_CONTENT);
			return $response;
		}
		
		$response->header(self::RESPONSE_HEADER, "Failed to update product.");
		$response->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR);
		return $response;
	}
	
	public function deleteEntity() {
		return "Successfully deleted product entity";
	}

}