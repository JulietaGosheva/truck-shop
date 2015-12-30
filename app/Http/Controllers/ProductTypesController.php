<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;

class ProductTypesController extends Controller  {
	
	public function getTypes() {
		return "[".
					"{\"id\":1,\"name\":\"Волан\"},".
					"{\"id\":2,\"name\":\"Двигател\"}".
				"]";
	}
	
}