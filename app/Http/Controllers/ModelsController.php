<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;

class ModelsController extends Controller  {

	public function getModels($typeId, $brandId) {
		if ($typeId === "1" && $brandId === "1") {
			return "[{\"id\":1,\"name\":\"Съзтезателен\"}]";
		} else if ($typeId === "2" && $brandId === "2") {
			return "[{\"id\":1,\"name\":\"Бизнесменски\"}]";
		}
		return "[]";
	}
	
}