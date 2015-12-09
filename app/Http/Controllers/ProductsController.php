<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;

class ProductsController extends Controller  {
	
	function __construct() {
		
	}
	
	function getBrands() {
		return "There are no created brands till the moment.";
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