<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;

class BrandsController extends Controller  {

	public function getBrands($typeId) {
		if ($typeId === "1") {
			return "[{\"id\":1,\"name\":\"Nissan\"}]";
		}
		return "[{\"id\":2,\"name\":\"Mercedes\"}]";
	}
	
}