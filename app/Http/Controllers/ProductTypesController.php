<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\ProductTypes;

class ProductTypesController extends Controller  {
	
	public function getTypes() {
		return ProductTypes::all();
	}
	
}