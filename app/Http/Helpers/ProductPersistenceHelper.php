<?php

namespace App\Http\Helpers;

use Illuminate\Http\Response;
use Illuminate\Http\Request;

use Validator;

use App;
use App\Brands;
use App\Models;
use App\Products;
use App\ProductTypes;

use Illuminate\Support\Facades\DB;

class ProductPersistenceHelper {
	
	public function findEntityById(Request $request, Response $response) {
		$validator = Validator::make($request->all(), [
				'id' => 'required|numeric'
		]);
	
		if ($validator->fails()) {
			$response->header(Constants::RESPONSE_HEADER, "\"id\" query parameter is required and must contain number as value.");
			$response->setStatusCode(Response::HTTP_UNPROCESSABLE_ENTITY);
			return $response;
		}
			
		$id = $request->input("id");
	
		$product = Products::with('productTypes', 'brands', 'models')->find($id);
	
		if ($product === null) {
			$response->header(Constants::RESPONSE_HEADER, "Entity not found.");
			$response->setStatusCode(Response::HTTP_NO_CONTENT);
			return $response;
		}
	
		$response->header(Constants::RESPONSE_HEADER, "Successfully retrieved data.");
	
		return $product;
	}
	
	public function findEntityByUniqueId(Request $request, Response $response) {
		$validator = Validator::make($request->all(), [
				'uniqueNumber' => 'required|numeric'
		]);
	
		if ($validator->fails()) {
			$response->header(Constants::RESPONSE_HEADER, "\"uniqueNumber\" query parameter is required and must contain number as value.");
			$response->setStatusCode(Response::HTTP_UNPROCESSABLE_ENTITY);
			return $response;
		}
			
		$uniqueNumber = $request->input("uniqueNumber");
	
		$product = Products::with('productTypes', 'brands', 'models')->where("unique_id", $uniqueNumber)->first();
	
		if ($product === null) {
			$response->header(Constants::RESPONSE_HEADER, "Entity not found.");
			$response->setStatusCode(Response::HTTP_NO_CONTENT);
			return $response;
		}
	
		$response->header(Constants::RESPONSE_HEADER, "Successfully retrieved data.");
	
		return $product;
	}
	
	public function findEntity(Request $request, Response $response) {
		$queryBuilder = Products::with('productTypes', 'brands', 'models');
		
		if ($request->has("name")) {
			$queryBuilder->where("name", $request->name);
		}
		
		if ($request->has("type")) {
			$queryBuilder->where("productTypes.name", $request->type);
		}
		
		if ($request->has("brand")) {
			$queryBuilder->where("brands.name", $request->brand);
		}
		
		if ($request->has("model")) {
			$queryBuilder->where("models.name", $request->model);
		}
		
		return $queryBuilder->get();
	}
	
	public function persistProduct(Response $response, $requestBody) {
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
			$response->header(Constants::RESPONSE_HEADER, "Successfully persisted entity.");
			$response->setStatusCode(201);
		});
	
			return $response;
	}
	
	public function persistAndRetrieveProductTypeEntry($requestBody) {
		return ProductTypes::firstOrCreate(["name" => $requestBody->type]);
	}
	
	public function persistAndRetrieveBrandEntry($requestBody) {
		return Brands::firstOrCreate(["name" => $requestBody->brand]);
	}
	
	public function persistAndRetrieveModelEntry($requestBody) {
		return Models::firstOrCreate(["name" => $requestBody->model]);
	}
	
	public function saveImage(Response $response, $file) {
		$imageName = round(microtime(true) * 1000) . "." . $file->getClientOriginalExtension();
	
		try {
			$file->move(base_path(Constants::IMAGE_PATH), $imageName);
		} catch (Exception $exception) {
			$response->header(Constants::RESPONSE_HEADER, "Failed to upload image reason: [" . $exception->getMessage() . "]");
			$response->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR);
			return $response;
		}
	
		$response->header("Content-Type", "application/json; charset=UTF-8");
		$response->header(Constants::RESPONSE_HEADER, "Successfully uploaded image.");
		$response->setStatusCode(Response::HTTP_CREATED);
	
		$response->setContent("{\"imageName\":\"" . $imageName . "\"}");
	
		return $response;
	}
	
	public function deleteImageByName($imageName) {
		$imagesPath = base_path(Constants::IMAGE_PATH);
		return unlink($imagesPath . "/" . $imageName);
	}
	
}