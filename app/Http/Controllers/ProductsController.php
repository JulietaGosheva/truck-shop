<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;

class ProductsController extends Controller  {
	
	function __construct() {
		
	}
	
	function getBrands() {
		return "There are no created brands till the moment.";
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
}