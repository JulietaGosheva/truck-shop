<?php

namespace App\Http\Helpers;

use App;
use App\NavigationItems;
use App\NavigationItemsI18N;

use App\Http\Helpers\Constants;

use Illuminate\Http\Response;

use Illuminate\Support\Facades\DB;

class NavigationItemPersistenceHelper {
	
	public function persistItem(Response $response, $requestBody) {
		$parentName = $this->getParentNameById($requestBody->parentId);
		$location = "#/articals" . $parentName . "/" . $requestBody->name;

		DB::transaction(function() use(&$response, &$requestBody, &$location) {
			
			$navigationItem = NavigationItems::create([
				"name" => $requestBody->name,
				"href" => strtolower($location),
				"parent_id" => $requestBody->parentId
			]);
			
			$navigationItemI18N = NavigationItemsI18N::create([
				"language" => $requestBody->language,
				"display_name" => $requestBody->displayName,
				"navigation_item_id" => $navigationItem->id
			]);
			
			$response->header(Constants::RESPONSE_HEADER, "Successfully persisted navigation item.");
			$response->setStatusCode(Response::HTTP_CREATED);
		});

		if ($response->isEmpty()) {
			$response->header(Constants::RESPONSE_HEADER, "Failed to persist navigation item.");
			$response->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR);
		}
		
		return $response;
	}
	
	private function getParentNameById($parentId) {
		$navigationItem = NavigationItems::find($parentId);
		
		if ($navigationItem === null || $navigationItem->name === "root") {
			return "";
		}
		
		return "/" . $navigationItem->name;
	}
	
	public function findItemByParentId($parentId) {
		return NavigationItems::with("navigationItemI18N")->where("parent_id", $parentId)->get();
	}
	
}