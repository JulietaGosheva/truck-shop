<?php

namespace App\Http\Helpers;

use Log;
use Validator;

use App;
use App\Brands;
use App\Models;
use App\Products;
use App\ProductTypes;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

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
	
		$product = $this->findEntityByProductId($id);
	
		if ($product === null) {
			$response->header(Constants::RESPONSE_HEADER, "Entity not found.");
			$response->setStatusCode(Response::HTTP_NO_CONTENT);
			return $response;
		}
	
		$response->header(Constants::RESPONSE_HEADER, "Successfully retrieved data.");
	
		return $product;
	}
	
	public function findEntityByProductId($productId) {
		return Products::with('productTypes', 'brands', 'models')->find($productId);
	}
	
	public function findEntityByUniqueId(Request $request, Response $response) {
		$validator = Validator::make($request->all(), [
				'uniqueId' => 'required|numeric'
		]);
	
		if ($validator->fails()) {
			$response->header(Constants::RESPONSE_HEADER, "\"uniqueId\" query parameter is required and must contain number as value.");
			$response->setStatusCode(Response::HTTP_UNPROCESSABLE_ENTITY);
			return $response;
		}
			
		$uniqueId = $request->input("uniqueId");
	
		Log::debug("Search request with the following unique ID was performed: [" . $uniqueId . "]");
		
		$product = Products::with('productTypes', 'brands', 'models')->where("unique_id", $uniqueId)->first();
	
		if ($product === null) {
			$response->header(Constants::RESPONSE_HEADER, "Entity not found.");
			$response->setStatusCode(Response::HTTP_NO_CONTENT);
			return $response;
		}
	
		$response->header(Constants::RESPONSE_HEADER, "Successfully retrieved data.");
	
		return $product;
	}

	public function findProductsByNavigationItemName($navigationItemName) {
		$dbQuery = "SELECT"
				. " p.id, p.name, p.image_name, p.price, p.unique_id,"
				. " b.name AS brand_name,"
				. " pt.name AS product_type_name,"
				. " m.name AS model_name"
				. " FROM products p"
				. " JOIN product_types pt ON pt.id = p.product_type_id"
				. " JOIN brands b ON b.id = p.brand_id"
				. " JOIN models m ON m.id = p.model_id"
				. " JOIN producttype_to_navigationitem_mapping pt_ni ON pt_ni.product_type_id = pt.id"
				. " JOIN navigation_items ni ON ni.id = pt_ni.navigation_item_id"
				. " WHERE ni.name = ?";
		
		return DB::select($dbQuery, [$navigationItemName]);
	}

	public function findEntitiesByProductTypeIds(Request $request, Response $response) {
		$productTypeIds = $request->input("productTypeIds");
		$productTypeIds = explode(";", $productTypeIds);
		
		Log::debug("Requested product type ids are: [" . json_encode($productTypeIds) . "]");
		
		$products = Products::with('productTypes', 'brands', 'models')->whereIn("product_type_id", $productTypeIds)->get();
		
		Log::debug("Retrieved products are: [" . json_encode($products) . "]");
		
		return $products;
	}
	
	public function findEntity(Request $request, Response $response) {
		$queryBuilder = Products::with('productTypes', 'brands', 'models');
		
		if ($request->has("name")) {
			$queryBuilder->where("products.name", $request->name);
		}
		
		if ($request->has("type")) {
			$queryBuilder->join('product_types', 'product_types.id', '=', 'products.product_type_id');
			$queryBuilder->where("product_types.name", $request->type);
		}
		
		if ($request->has("brand")) {
			$queryBuilder->join('brands', 'brands.id', '=', 'products.brand_id');
			$queryBuilder->where("brands.name", $request->brand);
		}
		
		if ($request->has("model")) {
			$queryBuilder->join('models', 'models.id', '=', 'products.model_id');
			$queryBuilder->where("models.name", $request->model);
		}
		
		return $queryBuilder->get();
	}
	
	public function findEntitiesByUniqueIds(Request $request, Response $response) {
		$uniqueIds = $request->input("uniqueIds");
		$uniqueIds = explode(";", $uniqueIds);
		
		Log::debug("Requested product type ids are: [" . json_encode($uniqueIds) . "]");
		
		$products = Products::with('productTypes', 'brands', 'models')->whereIn("unique_id", $uniqueIds)->get();
		
		Log::debug("Retrieved products are: [" . json_encode($products) . "]");
		
		return $products;
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