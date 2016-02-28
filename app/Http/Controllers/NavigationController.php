<?php

namespace App\Http\Controllers;

use App;
use Log;
use Validator;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

use App\Http\Helpers\Constants;
use App\Http\Helpers\NavigationItemPersistenceHelper;

use App\Http\Controllers\Controller;

class NavigationController extends Controller  {

	private $persistenceHelper = null;
	private $selectedLanguage = "bg";
	
	public function __construct() {
		$this->persistenceHelper = new NavigationItemPersistenceHelper();
	}
	
	public function findItem(Request $request, Response $response) {
		
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
				
			$newStructure = array();
			$newStructure["id"] = $item->id;
			$newStructure["parent"] = "self";
			$newStructure["href"] = $item->href;
			$newStructure["name"] = $item->name;
			
			$itemI18N = null;
			foreach ($item->navigationItemI18N as $I18N) {
				if ($I18N->language === $this->selectedLanguage) {						
					$itemI18N = $I18N;
				}
			}
				
			if ($itemI18N === null) {
				Log::debug("Empty I18N model for item: [" . json_encode($item) . "]. Item will be skipped.");
				continue;
			}
				
			$newStructure["displayName"] = $itemI18N->display_name;
			$structure[$item->id] = $newStructure;
		}
	}
	
	private function addSubItemsToStructure(&$structure, $items) {
		foreach ($items as $item) {
			if ($this->isRootItem($item)) {
				continue;
			}

			$newStructure = array();
			$newStructure["id"] = $item->id;
			$newStructure["parent"] = $item->parent_id;
			$newStructure["href"] = $item->href;
			$newStructure["name"] = $item->name;

			$itemI18N = null;
			foreach ($item->navigationItemI18N as $I18N) {
				if ($I18N->language === $this->selectedLanguage) {						
					$itemI18N = $I18N;
				}
			}
		
			if ($itemI18N === null) {
				Log::debug("Empty I18N model for item: [" . json_encode($item) . "]. Item will be skipped.");
				continue;
			}
		
			$newStructure["displayName"] = $itemI18N->display_name;
			$structure[$item->parent_id]["subItems"][$item->id] = $newStructure;
		}
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