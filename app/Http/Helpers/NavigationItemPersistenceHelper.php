<?php

namespace App\Http\Helpers;

use App;
use Log;
use Exception;
use App\NavigationItems;
use App\NavigationItemsI18N;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\HttpKernel\Exception\HttpException;

class NavigationItemPersistenceHelper {

	public function editItem(Response $response, $requestBody) {
		DB::beginTransaction();
		
		try {
			$item = NavigationItems::with("navigationItemI18N")->where("id", $requestBody->itemId)->first();
			if ($item === null) {
				throw new BadRequestHttpException("Navigation item with id: [" . $requestBody->itemId . "] was not found.");
			}
			
			Log::debug("Following navigation item will be modified: [" . json_encode($item, JSON_UNESCAPED_UNICODE) . "].");
			
			$this->modifyItem($item, $requestBody);
			$this->modifyPivotTable($item, $requestBody);
			$this->modifySubItems($item->id, $item->name);
			$this->modifyI18NModel($item, $requestBody);
			
			Log::debug("Modified navigation item: [" . json_encode($item, JSON_UNESCAPED_UNICODE) . "].");
			
			$item->save();
		} catch (Exception $exception) {
			DB::rollBack();
			Log::debug("NavigationItemPersistenceHelper.php -> Failed to modify the navigation item caused by the following exception: [" . $exception->getMessage() . "].");
			throw $exception;
		}
		
		DB::commit();
	}
	
	private function modifyItem(&$item, $requestBody) {
		$parentName = $this->getParentNameById($item->parent_id);
		$href = "#/articles" . $parentName . "/" . $requestBody->name;
			
		$item->href = strtolower($href);
		$item->name = strtolower($requestBody->name);
	}
	
	private function modifyPivotTable(&$item, $requestBody) {
		Log::debug("Detaching previous mappings.");
		$item->productTypes()->detach(null);
			
		Log::debug("Following product type ids will be attached: [" . json_encode($requestBody->productTypeIds, JSON_UNESCAPED_UNICODE) . "].");
		$item->productTypes()->attach($requestBody->productTypeIds);
		
		Log::debug("Detaching previous mappings.");
		$item->vehicleTypes()->detach(null);
			
		Log::debug("Following product type ids will be attached: [" . json_encode($requestBody->productTypeIds, JSON_UNESCAPED_UNICODE) . "].");
		$item->vehicleTypes()->attach($requestBody->vehicleTypeIds);
	}
	
	private function modifySubItems($itemId, $newItemName) {
		if ($itemId === 1) {
			Log::debug("Root item is used. This shouldn't occur.");
			return;
		}
		
		$items = NavigationItems::where("parent_id", $itemId)->get();
		
		if ($items === null) {
			Log::debug("There is no items with the following parent id: [" . $itemId . "]");
			return;
		}
		
		foreach ($items as &$item) {
			$item->href = strtolower("#/articles/" . $newItemName . "/" . $item->name);
			$item->save();
		}
	}
	
	private function modifyI18NModel(&$item, $requestBody) {
		if ($item->navigationItemI18N === null) {
			throw new HttpException(500, "I18N model was not founded.");
		}
		
		foreach ($item->navigationItemI18N as &$i18nItem) {
			if ($i18nItem->language === $requestBody->language) {
				if ($i18nItem->display_name !== $requestBody->displayName) {
					$i18nItem->display_name = $requestBody->displayName;
					$i18nItem->save();
				}
				
				return;
			}
		}
		
		throw new BadRequestHttpException("I18N model was not found for the selected language.");
	}
	
	public function persistItem(Response $response, $requestBody) {
		DB::beginTransaction();

		$parentName = $this->getParentNameById($requestBody->parentId);
		$href = "#/articles" . $parentName . "/" . strtolower($requestBody->name);
		
		try {
			$item = NavigationItems::firstOrCreate([
				"name" => strtolower($requestBody->name),
				"href" => strtolower($href),
				"parent_id" => $requestBody->parentId
			]);
			
			Log::debug("Created navigation item: [" . json_encode($item, JSON_UNESCAPED_UNICODE) . "]");
			
			Log::debug("Detaching previous mappings.");
			$item->productTypes()->detach(null);
			
			Log::debug("Following product type ids will be attached: [" . json_encode($requestBody->productTypeIds, JSON_UNESCAPED_UNICODE) . "].");
			$item->productTypes()->attach($requestBody->productTypeIds);
			
			Log::debug("Successfully created mapping between product types and navigation item with id: [" . $item->id . "].");
			
			Log::debug("Detaching previous mappings.");
			$item->vehicleTypes()->detach(null);
			
			Log::debug("Following vehicle type ids will be attached: [" . json_encode($requestBody->vehicleTypeIds, JSON_UNESCAPED_UNICODE) . "].");
			$item->vehicleTypes()->attach($requestBody->vehicleTypeIds);
			
			Log::debug("Successfully created mapping between navigation item and vehicle item with id: [" . $item->id . "].");
		} catch (Exception $exception) {
			DB::rollBack();
			Log::debug("Failed to create navigation item. Transaction rolled back. Caused by: [" . $exception->getMessage() . "].");
			throw new HttpException(500, "Failed to create navigation item. Caused by: [" . $exception->getMessage() . "].");
		}
		
		try {
			$i18nItem = NavigationItemsI18N::firstOrCreate([
				"language" => $requestBody->language,
				"display_name" => $requestBody->displayName,
				"navigation_item_id" => $item->id
			]);
				
			Log::debug("Created navigation item I18N model: [" . json_encode($i18nItem, JSON_UNESCAPED_UNICODE) . "]");
		} catch (Exception $exception) {
			DB::rollBack();
			Log::debug("Failed to create I18N model. Transaction rolled back. Caused by: [" . $exception->getMessage() . "].");
			throw new HttpException(500, "Failed to create I18N model. Caused by: [" . $exception->getMessage() . "].");
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
	
	public function deleteItemById($itemId) {
		DB::beginTransaction();
		
		try {
			$item = NavigationItems::where("id", $itemId)->first();
			if ($item === null) {
				throw new BadRequestHttpException("Navigation item with id: [" . $requestBody->itemId . "] was not found.");
			}
				
			Log::debug("Following navigation item will be deleted: [" . json_encode($item, JSON_UNESCAPED_UNICODE) . "].");
			
			$this->deleteSubItems($itemId);
			
			$item->delete();
		} catch (Exception $exception) {
			DB::rollBack();
			Log::debug("NavigationItemPersistenceHelper.php -> Failed to delete the navigation item caused by the following exception: [" . $exception->getMessage() . "].");
			throw $exception;
		}
		
		DB::commit();
	}

	private function deleteSubItems($itemId) {
		$items = NavigationItems::where("parent_id", $itemId)->get();
		if ($items === null) {
			Log::debug("There is no items with the following parent id: [" . $itemId . "]");
			return;
		}
		
		Log::debug("Following subitems will be deleted: [" . json_encode($items, JSON_UNESCAPED_UNICODE) . "].");

		foreach ($items as &$item) {
			$item->delete();
		}
	}
	
	public function getAllItems() {
		return NavigationItems::with("navigationItemI18N", "productTypes", "vehicleTypes")->get();
	}
	
	public function findItems(Request $request) {
		$language = $request->headers->get("X-RS-Language");
		Log::debug("Selected item language: [" . $language . "].");
		
		$vehicleTypeId = $request->headers->get("X-RS-VType-ID");
		Log::debug("Selected vehicle type id: [" . $vehicleTypeId . "]");
		
		$query = "SELECT"
				." navigation_items.id, navigation_items.name, navigation_items.href, navigation_items.parent_id,"
				." navigation_items_i18n.display_name, navigation_items_i18n.language,"
				." producttype_to_navigationitem_mapping.product_type_id, navigationitem_to_vehicletype_mapping.vehicle_type_id"
				." FROM navigation_items"
				." JOIN navigation_items_i18n ON navigation_items_i18n.navigation_item_id = navigation_items.id"
				." JOIN producttype_to_navigationitem_mapping ON producttype_to_navigationitem_mapping.navigation_item_id = navigation_items.id"
				." JOIN navigationitem_to_vehicletype_mapping ON navigationitem_to_vehicletype_mapping.navigation_item_id = navigation_items.id"
			  	." WHERE"
				." navigation_items_i18n.language = ? AND"
				." navigationitem_to_vehicletype_mapping.vehicle_type_id = ?";
		
		$navItems = DB::select($query, [$language, $vehicleTypeId]);

		$hierarchicalStructure = array();
		
		$this->addRootItemsToStructure($hierarchicalStructure, $navItems);
		$this->addSubItemsToStructure($hierarchicalStructure, $navItems);
		
		return $hierarchicalStructure;
	}
	
	private function addRootItemsToStructure(&$structure, $navItems) {
		foreach ($navItems as $navItem) {
			if ($this->isRootItem($navItem) === false || $navItem->name === "root") {
				continue;
			}
			
			Log::debug("Following item will be processed: [" . json_encode($navItem, JSON_UNESCAPED_UNICODE) . "].");
			
			if (array_key_exists($navItem->id, $structure) === false) {
				$newStructure = $this->createStructureData($navItem);
				$structure[$navItem->id] = $newStructure;
			} else {
				array_push($structure[$navItem->id]["productTypeIds"], $navItem->product_type_id);
				array_push($structure[$navItem->id]["vehicleTypeIds"], $navItem->vehicle_type_id);
			}
		}
	}
	
	private function addSubItemsToStructure(&$structure, $navItems) {
		foreach ($navItems as $navItem) {
			if ($this->isRootItem($navItem)) {
				continue;
			}
				
			Log::debug("Following sub item will be processed: [" . json_encode($navItem, JSON_UNESCAPED_UNICODE) . "].");
				
			if (array_key_exists($navItem->id, $structure) === false) {
				$newStructure = $this->createStructureData($navItem);
				$structure[$navItem->parent_id]["subItems"][$navItem->id] = $newStructure;
			} else {
				array_push($structure[$navItem->parent_id]["subItems"][$navItem->id]["productTypeIds"], $navItem->product_type_id);
				array_push($structure[$navItem->parent_id]["subItems"][$navItem->id]["vehicleTypeIds"], $navItem->vehicle_type_id);
			}
		}
	}
	
	private function createStructureData($navItem) {
		$newStructure = array();
		$newStructure["id"] = $navItem->id;
		$newStructure['name'] = $navItem->name;
		$newStructure["href"] = $navItem->href;
		$newStructure["parent"] = $navItem->parent_id;
		$newStructure['language'] = $navItem->language;
		$newStructure['displayName'] = $navItem->display_name;
		$newStructure['productTypeIds'] = array($navItem->product_type_id);
		$newStructure['vehicleTypeIds'] = array($navItem->vehicle_type_id);
		
		return $newStructure;
	}
	
	private function isRootItem($navItem) {
		return $navItem->parent_id === 1;
	}
	
	public function findItemByParentId($parentId) {
		return NavigationItems::with("navigationItemI18N")->where("parent_id", $parentId)->get();
	}
	
}