<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;

class ProductsController extends Controller  {
	
	function __construct() {
		
	}
	
	function findEntity() {
		return "[{".
	   			   "\"id\": 1,".
	   			   "\"src\": \"http://weknowyourdreams.com/images/car/car-05.jpg\",".
	   			   "\"name\": \"Laborghini\",".
	   			   "\"type\": \"Car\"".
			   "},".
			   "{".
				   "\"id\": 2,".
				   "\"src\": \"http://dreamatico.com/data_images/car/car-3.jpg\",".
				   "\"name\": \"Renault\",".
	   			   "\"type\": \"Car\"".
			   "},".
			   "{".
				   "\"id\": 3,".
				   "\"src\": \"http://weknowyourdreams.com/images/car/car-04.jpg\",".
				   "\"name\": \"Mustang\",".
	   			   "\"type\": \"Car\"".
			   "},".
			   "{".
				   "\"id\": 4,".
				   "\"src\": \"http://dreamatico.com/data_images/car/car-1.jpg\",".
				   "\"name\": \"Laborghini\",".
	   			   "\"type\": \"Car\"".
			   "},".
			   "{".
				   "\"id\": 5,".
				   "\"src\": \"http://www.info2india.com/cars/car-photos/small/bmw%20i8%201.jpg\",".
				   "\"name\": \"BMW\",".
	   			   "\"type\": \"Car\"".
			   "}]";
	}
	
	function persistEntity() {
		return "Successfully created product";
	}
	
	function updateEntity() {
		return "Successfully updated product entity";
	}
	
	function deleteEntity() {
		return "Successfully deleted product entity";
	}

	function getTypes() {
		return "[".
					"{\"id\":1,\"name\":\"Волан\"},".
					"{\"id\":2,\"name\":\"Двигател\"}".
			   "]";
	}
	
	function getBrands($typeId) {
		if ($typeId === "1") {
			return "[{\"id\":1,\"name\":\"Nissan\"}]";
		}
		return "[{\"id\":2,\"name\":\"Mercedes\"}]";
	}
	
	function getModels($typeId, $brandId) {
		if ($typeId === "1" && $brandId === "1") {
			return "[{\"id\":1,\"name\":\"Съзтезателен\"}]";
		} else if ($typeId === "2" && $brandId === "2") {
			return "[{\"id\":1,\"name\":\"Бизнесменски\"}]";
		}
		return "[]";
	}
}