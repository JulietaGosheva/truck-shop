<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;
use Illuminate\Http\Request;

use Validator;

use App;
use App\Products;
use App\Http\Helpers\Constants;
use App\Http\Controllers\Controller;
use App\Http\Helpers\ProductPersistenceHelper;

use Illuminate\Support\Facades\DB;

class ProductsController extends Controller  {
	
	private $persistenceHelper = null;
	
	function __construct() {
		$this->persistenceHelper = new ProductPersistenceHelper();
	}
	
	public function findEntities(Request $request, Response $response) {
		if ($request->has("id")) {
			return $this->persistenceHelper->findEntityById($request, $response);
		}
		
		if ($request->has("uniqueId")) {
			return $this->persistenceHelper->findEntityByUniqueId($request, $response);
		}
		
		if ($request->has("productTypeIds")) {
			return $this->persistenceHelper->findEntitiesByProductTypeIds($request, $response);
		}
		
		return $this->persistenceHelper->findEntity($request, $response);
	}
	
	public function getAllEntries(Response $response) {
		return Products::with('productTypes', 'brands', 'models')->get();
	}
	
	public function persistEntity(Request $request, Response $response) {
		$rawContentBody = $request->getContent();
		$requestBody = json_decode($rawContentBody);
		
		$response = $this->persistenceHelper->persistProduct($response, $requestBody);
		
		if ($response->isEmpty()) {
			$response->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR);
			$response->header(Constants::RESPONSE_HEADER, "Failed to create product with provided data.");
		}
		return $response;
	}
	
	public function uploadImage(Request $request, Response $response) {
		if ($request->hasFile("file") === false) {
			$response->header(Constants::RESPONSE_HEADER, "File must be specified.");
			$response->setStatusCode(Response::HTTP_BAD_REQUEST);
			return $response;
		}
		
		$file = $request->file("file");
		if ($file->isValid() === false) {
			$response->header(Constants::RESPONSE_HEADER, "Uploaded file is invalid.");
			$response->setStatusCode(Response::HTTP_BAD_REQUEST);
			return $response;
		}
		
		return $this->persistenceHelper->saveImage($response, $file);
	}
	
	public function updateImage(Request $request, Response $response, $imageName) {
		if ($request->hasFile("file") === false) {
			$response->header(Constants::RESPONSE_HEADER, "File must be specified.");
			$response->setStatusCode(Response::HTTP_BAD_REQUEST);
			return $response;
		}
		
		$file = $request->file("file");
		if ($file->isValid() === false) {
			$response->header(Constants::RESPONSE_HEADER, "Uploaded file is invalid.");
			$response->setStatusCode(Response::HTTP_BAD_REQUEST);
			return $response;
		}
		
		if (isset($imageName) === false) {
			$response->header(Constants::RESPONSE_HEADER, "\"imageName\" parameter should be specified.");
			$response->setStatusCode(Response::HTTP_BAD_REQUEST);
			return $response;
		}
		
		DB::beginTransaction();
		
		$isFileDeleted = $this->persistenceHelper->deleteImageByName($imageName);
		
		if ($isFileDeleted === false) {
			DB::rollBack();
			
			$response->header(Constants::RESPONSE_HEADER, "Failed to delete previous file.");
			$response->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR);
			return $response;
		}
		
		$response = $this->persistenceHelper->saveImage($response, $file);
		
		if ($response->status() === Response::HTTP_CREATED) {
			DB::commit();
		} else {
			DB::rollBack();
		}
		
		return $response;
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
			$response->header(Constants::RESPONSE_HEADER, "Successfully updated product entry.");
			$response->setStatusCode(Response::HTTP_NO_CONTENT);
			return $response;
		}
		
		$response->header(Constants::RESPONSE_HEADER, "Failed to update product.");
		$response->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR);
		return $response;
	}
	
	public function deleteEntity(Request $request, Response $response) {
		$validator = Validator::make($request->all(), [
				'id' => 'required|numeric'
		]);
		
		if ($validator->fails()) {
			$response->header(Constants::RESPONSE_HEADER, "\"id\" query parameter is required and must contain number as value.");
			$response->setStatusCode(Response::HTTP_UNPROCESSABLE_ENTITY);
			return $response;
		}
			
		$id = $request->input("id");
		$product = Products::find($id);
		
		DB::beginTransaction();
		
		$isFileDeleted = $this->persistenceHelper->deleteImageByName($product->image_name);
		
		if ($isFileDeleted === false) {
			DB::rollBack();
				
			$response->header(Constants::RESPONSE_HEADER, "Failed to delete previous file.");
			$response->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR);
			return $response;
		}
		
		$isProductDeleted = $product->delete();
		
		if ($isProductDeleted === false) {
			DB::rollBack();
		
			$response->header(Constants::RESPONSE_HEADER, "Failed to delete previous file.");
			$response->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR);
			return $response;
		}
		
		DB::commit();
		
		$response->header(Constants::RESPONSE_HEADER, "Successfully deleted product entry.");
		$response->setStatusCode(Response::HTTP_NO_CONTENT);
		return $response;
	}

}