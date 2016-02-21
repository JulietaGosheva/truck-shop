<?php

namespace App\Http\Controllers;

use App;
use Validator;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

use App\Http\Helpers\Constants;
use App\Http\Helpers\NavigationItemPersistenceHelper;

use App\Http\Controllers\Controller;
use App\NavigationItems;

class NavigationController extends Controller  {

	private $persistenceHelper = null;
	
	public function __construct() {
		$this->persistenceHelper = new NavigationItemPersistenceHelper();
	}
	
	public function findItem(Request $request, Response $response) {
		
	}
	
	public function createItem(Request $request, Response $response) {
		$rawContentBody = $request->getContent();
		$requestBody = json_decode($rawContentBody);

		if ($requestBody === NULL) {
			$response->header(Constants::RESPONSE_HEADER, "Failed to parse request body.");
			$response->setStatusCode(Response::HTTP_UNPROCESSABLE_ENTITY);
			return $response;
		}
		
		if (isset($requestBody->name) === false) {
			$response->header(Constants::RESPONSE_HEADER, "\"name\" is required parameter.");
			$response->setStatusCode(Response::HTTP_UNPROCESSABLE_ENTITY);
			return $response;
		}
		
		if (isset($requestBody->displayName) === false) {
			$response->header(Constants::RESPONSE_HEADER, "\"displayName\" is required parameter.");
			$response->setStatusCode(Response::HTTP_UNPROCESSABLE_ENTITY);
			return $response;
		}
		
		if (isset($requestBody->language) === false) {
			$response->header(Constants::RESPONSE_HEADER, "\"language\" is required parameter.");
			$response->setStatusCode(Response::HTTP_UNPROCESSABLE_ENTITY);
			return $response;
		}

		if (isset($requestBody->parentId) === false) {
			$requestBody->parentId = 1;
		}
		
		return $this->persistenceHelper->persistItem($response, $requestBody);
	}
	
	public function editItem(Request $request, Response $response) {
		
	}
	
	public function deleteItem(Request $request, Response $response) {
		
	}
	
	public function getRootItems(Request $request, Response $response) {
		$navigationItems = $this->persistenceHelper->findItemByParentId(1);
		
		if ($navigationItems === null) {
			$response->header(Constants::RESPONSE_HEADER, "Entity not found.");
			$response->setStatusCode(Response::HTTP_NO_CONTENT);
			return $response;
		}
		
		$response->header(Constants::RESPONSE_HEADER, "Successfully retrieved data.");
		
		return $navigationItems;
	}
	
}