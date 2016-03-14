<?php

namespace App\Http\Controllers;

use App;
use Log;
use Validator;
use Exception;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

use App\Http\Helpers\Constants;
use App\Http\Helpers\NavigationItemPersistenceHelper;

use App\Http\Controllers\Controller;

use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class NavigationController extends Controller  {

	private $persistenceHelper = null;
	private $selectedLanguage = "bg-BG";
	
	public function __construct() {
		$this->persistenceHelper = new NavigationItemPersistenceHelper();
	}
	
	public function findItem(Request $request, Response $response) {
		Log::debug("Retrieving navigation items");
		
		if ($request->header("X-RS-Language") === null) {
			throw new BadRequestHttpException("X-RS-Language is not found.");
		}
		
		if ($request->header("X-RS-VType-ID") === null) {
			throw new BadRequestHttpException("X-RS-VType-ID is not found.");
		}
		
		$items = $this->persistenceHelper->findItems($request);
		
		if ($items === null) {
			throw new BadRequestHttpException("Entity not found.");
		}
		
		Log::debug("Retrieved navigation items: [" . json_encode($items, JSON_UNESCAPED_UNICODE) . "]");
		return $items;
	}
	
	public function createItem(Request $request, Response $response) {
		Log::debug("Creating navigation item.");
		
		$rawContentBody = $request->getContent();
		$requestBody = json_decode($rawContentBody);

		Log::debug("Request data: [" . $rawContentBody . "]");

		if ($requestBody === NULL) {
			$response->header(Constants::RESPONSE_HEADER, "Failed to parse request body.");
			$response->setStatusCode(Response::HTTP_UNPROCESSABLE_ENTITY);
			return $response;
		}
		
		if (isset($requestBody->name) === false) {
			$response->header(Constants::RESPONSE_HEADER, "\"name\" is required parameter.");
			$response->setStatusCode(Response::HTTP_BAD_REQUEST);
			return $response;
		}
		
		if (isset($requestBody->displayName) === false) {
			$response->header(Constants::RESPONSE_HEADER, "\"displayName\" is required parameter.");
			$response->setStatusCode(Response::HTTP_BAD_REQUEST);
			return $response;
		}
		
		if (isset($requestBody->language) === false) {
			$response->header(Constants::RESPONSE_HEADER, "\"language\" is required parameter.");
			$response->setStatusCode(Response::HTTP_BAD_REQUEST);
			return $response;
		}
		
		if (isset($requestBody->productTypeIds) === false || count($requestBody->productTypeIds) === 0) {
			$response->header(Constants::RESPONSE_HEADER, "\"productType\" is required parameter.");
			$response->setStatusCode(Response::HTTP_BAD_REQUEST);
			return $response;
		}
		
		if (isset($requestBody->vehicleTypeIds) === false || count($requestBody->vehicleTypeIds) === 0) {
			$response->header(Constants::RESPONSE_HEADER, "\"vehicleTypeIds\" is required parameter.");
			$response->setStatusCode(Response::HTTP_BAD_REQUEST);
			return $response;
		}

		if (isset($requestBody->parentId) === false) {
			$requestBody->parentId = 1;
		}
		
		$this->persistenceHelper->persistItem($response, $requestBody);
		
		Log::debug("Navigation item creation finished successfully.");
		
		$response->header(Constants::RESPONSE_HEADER, "Successfully persisted navigation item.");
		$response->setStatusCode(Response::HTTP_CREATED);
		return $response;
	}
	
	public function editItem(Request $request, Response $response) {
		Log::debug("Modifying navigation item.");
		
		$rawContentBody = $request->getContent();
		$requestBody = json_decode($rawContentBody);
		
		Log::debug("Request data: [" . $rawContentBody . "]");
		
		if ($requestBody === NULL) {
			$response->header(Constants::RESPONSE_HEADER, "Failed to parse request body.");
			$response->setStatusCode(Response::HTTP_UNPROCESSABLE_ENTITY);
			return $response;
		}
		
		if (isset($requestBody->name) === false) {
			$response->header(Constants::RESPONSE_HEADER, "\"name\" is required parameter.");
			$response->setStatusCode(Response::HTTP_BAD_REQUEST);
			return $response;
		}
		
		if (isset($requestBody->displayName) === false) {
			$response->header(Constants::RESPONSE_HEADER, "\"displayName\" is required parameter.");
			$response->setStatusCode(Response::HTTP_BAD_REQUEST);
			return $response;
		}
		
		if (isset($requestBody->language) === false) {
			$response->header(Constants::RESPONSE_HEADER, "\"language\" is required parameter.");
			$response->setStatusCode(Response::HTTP_BAD_REQUEST);
			return $response;
		}
		
		if (isset($requestBody->itemId) === false) {
			$response->header(Constants::RESPONSE_HEADER, "\"itemId\" is required parameter.");
			$response->setStatusCode(Response::HTTP_BAD_REQUEST);
			return $response;
		}
		
		if (isset($requestBody->productTypeIds) === false || count($requestBody->productTypeIds) === 0) {
			$response->header(Constants::RESPONSE_HEADER, "\"productType\" is required parameter.");
			$response->setStatusCode(Response::HTTP_BAD_REQUEST);
			return $response;
		}
		
		if (isset($requestBody->vehicleTypeIds) === false || count($requestBody->vehicleTypeIds) === 0) {
			$response->header(Constants::RESPONSE_HEADER, "\"vehicleTypeIds\" is required parameter.");
			$response->setStatusCode(Response::HTTP_BAD_REQUEST);
			return $response;
		}
		
		$this->persistenceHelper->editItem($response, $requestBody);
		
		Log::debug("Navigation item modification finished successfully.");
		
		$response->header(Constants::RESPONSE_HEADER, "Successfully modified navigation item.");
		$response->setStatusCode(Response::HTTP_NO_CONTENT);
		return $response;
	}
	
	public function deleteItem(Request $request, Response $response) {
		$validator = Validator::make($request->all(), [
			'id' => 'required|numeric'
		]);
		
		if ($validator->fails()) {
			$response->header(Constants::RESPONSE_HEADER, "\"id\" query parameter is required and must contain number as value.");
			$response->setStatusCode(Response::HTTP_UNPROCESSABLE_ENTITY);
			return $response;
		}
		
		$itemId = $request->input("id");
		
		$this->persistenceHelper->deleteItemById($itemId);
		
		Log::debug("Navigation item deletion finished successfully.");
		
		$response->header(Constants::RESPONSE_HEADER, "Successfully deleted navigation item.");
		$response->setStatusCode(Response::HTTP_NO_CONTENT);
		return $response;
	}
	
	public function getItems(Request $request, Response $response) {
		Log::debug("Retrieving navigation items.");
		
		$items = $this->persistenceHelper->getAllItems();
		
		if ($items === null) {
			$response->header(Constants::RESPONSE_HEADER, "Entity not found.");
			$response->setStatusCode(Response::HTTP_NO_CONTENT);
			return $response;
		}
		
		$structure = $this->constructHierarchicalStructure($items);
		
		Log::debug("Retrieved navigation items: [" . json_encode($structure, JSON_UNESCAPED_UNICODE) . "]");
		return $structure;
	}
	
	private function constructHierarchicalStructure($items) {
		$hierarchicalStructure = array();
		
		$this->addRootItemsToStructure($hierarchicalStructure, $items);
		$this->addSubItemsToStructure($hierarchicalStructure, $items);
		
		return $hierarchicalStructure;
	}
	
	private function addRootItemsToStructure(&$structure, $items) {
		foreach ($items as $item) {
			if ($this->isRootItem($item) === false) {
				continue;
			}
			
			Log::debug("Following item will be processed: [" . json_encode($item, JSON_UNESCAPED_UNICODE) . "].");
			
			$newStructure = array();
			
			try {
				$this->addItemModelToStructure($newStructure, $item);
				$this->addI18NModelToStructure($newStructure, $item);
				$this->addProductTypeModelToStructure($newStructure, $item);
				$this->addVehicleTypeModelToStructure($newStructure, $item);
			} catch (Exception $exception) {
				continue;
			}
			
			$structure[$item->id] = $newStructure;
		}
	}
	
	private function addSubItemsToStructure(&$structure, $items) {
		foreach ($items as $item) {
			if ($this->isRootItem($item)) {
				continue;
			}
			
			Log::debug("Following sub item will be processed: [" . json_encode($item, JSON_UNESCAPED_UNICODE) . "].");
			
			$newStructure = array();
			
			try {
				$this->addItemModelToStructure($newStructure, $item);
				$this->addI18NModelToStructure($newStructure, $item);
				$this->addProductTypeModelToStructure($newStructure, $item);
				$this->addVehicleTypeModelToStructure($newStructure, $item);
			} catch (Exception $exception) {
				continue;
			}
			
			$structure[$item->parent_id]["subItems"][$item->id] = $newStructure;
		}
	}
	
	private function addItemModelToStructure(&$structure, $item) {
		$structure["id"] = $item->id;
		$structure["parent"] = $item->parent_id;
		$structure["href"] = $item->href;
		$structure["name"] = $item->name;
	}
	
	private function addI18NModelToStructure(&$structure, $item) {
		$itemI18N = null;
		foreach ($item->navigationItemI18N as $I18N) {
			if ($I18N->language === $this->selectedLanguage) {
				$itemI18N = $I18N;
			}
		}
		
		if ($itemI18N === null) {
			Log::debug("Empty I18N model for item: [" . json_encode($item) . "]. Item will be skipped.");
			throw new Exception();
		}
		
		$structure['language'] = $itemI18N->language;
		$structure["displayName"] = $itemI18N->display_name;
	}
	
	private function addProductTypeModelToStructure(&$structure, $item) {
		$productTypeIds = array();
		foreach ($item->productTypes as $productType) {
			array_push($productTypeIds, strval($productType->id));
		}
		
		$structure["productTypeIds"] = $productTypeIds;
	}
	
	private function addVehicleTypeModelToStructure(&$structure, $item) {
		$vehicleTypeIds = array();
		foreach ($item->vehicleTypes as $vehicleType) {
			array_push($vehicleTypeIds, strval($vehicleType->id));
		}
		
		$structure["vehicleTypeIds"] = $vehicleTypeIds;
	}
	
	private function isRootItem($item) {
		return $item->parent_id === 1;
	}
	
	public function getRootItems(Request $request, Response $response) {
		$items = $this->persistenceHelper->findItemByParentId(1);
		
		if ($items === null) {
			$response->header(Constants::RESPONSE_HEADER, "Entity not found.");
			$response->setStatusCode(Response::HTTP_NO_CONTENT);
			return $response;
		}
		
		$response->header(Constants::RESPONSE_HEADER, "Successfully retrieved data.");
		
		return $items;
	}
	
}