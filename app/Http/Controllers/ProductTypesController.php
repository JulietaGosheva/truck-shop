<?php

namespace App\Http\Controllers;

use Log;

use App\ProductTypes;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

use App\Http\Controllers\Controller;

class ProductTypesController extends Controller  {
	
	public function getTypes(Request $request, Response $response) {
		Log::debug("Retrieving product types.");
		
		if ($request->has("productIds") === false) {
			Log::debug("Retreiving all product type");
			return ProductTypes::all();
		}

		$productIds = explode(";", $request->productIds);
		Log::debug("ProductTypesController#getTypes -> Passed product Ids: [" . json_encode($productIds) . "]");

		return ProductTypes::all()->only($productIds);
	}
	
}