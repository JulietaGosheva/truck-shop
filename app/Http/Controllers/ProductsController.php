<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;

class ProductsController extends Controller  {
	
	function __construct() {
		
	}
	
	function getBrands() {
		return "There are no created brands till the moment.";
	}
}