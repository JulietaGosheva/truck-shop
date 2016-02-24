<?php

namespace App\Http\Helpers;

use App;
use Log;
use Exception;
use App\NavigationItems;
use App\NavigationItemsI18N;

use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class NavigationItemPersistenceHelper {
	
	public function persistItem(Response $response, $requestBody) {
		$parentName = $this->getParentNameById($requestBody->parentId);
		$location = "#/articals" . $parentName . "/" . $requestBody->name;

		DB::beginTransaction();
		
		try {
			$navigationItem = NavigationItems::firstOrCreate([
				"name" => $requestBody->name,
				"href" => strtolower($location),
				"parent_id" => $requestBody->parentId
			]);
			
			Log::debug("Created navigation item: [" . json_encode($navigationItem, JSON_UNESCAPED_UNICODE) . "]");
		} catch (Exception $exception) {
			DB::rollBack();
			throw new Exception("Failed to create navigation item. Transaction rolled back.");
		}
		
		try {
			$navigationItemI18N = NavigationItemsI18N::firstOrCreate([
				"language" => $requestBody->language,
				"display_name" => $requestBody->displayName,
				"navigation_item_id" => $navigationItem->id
			]);
				
			Log::debug("Created navigation item I18N model: [" . json_encode($navigationItemI18N, JSON_UNESCAPED_UNICODE) . "]");
		} catch (Exception $exception) {
			DB::rollBack();
			throw new Exception("Failed to create I18N model. Transaction rolled back.");
		}
		
		DB::commit();
	}
	
	private function getParentNameById($parentId) {
		$navigationItem = NavigationItems::find($parentId);
		
		if ($navigationItem === null || $navigationItem->name === "root") {
			return "";
		}
		
		return "/" . $navigationItem->name;
	}
	
	public function getAllItems() {
		return NavigationItems::with("navigationItemI18N")->get();
	}
	
	public function findItemByParentId($parentId) {
		return NavigationItems::with("navigationItemI18N")->where("parent_id", $parentId)->get();
	}
	
}