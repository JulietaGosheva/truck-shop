<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('index');
});

Route::group(['prefix' => 'products/api/v1'], function() {
	Route::post('/', 'ProductsController@persistEntity');
	
	Route::put('/', 'ProductsController@updateEntity');
	
	Route::delete('/', 'ProductsController@deleteEntity');
	
	Route::get('brands', 'ProductsController@getBrands');
	
	Route::get('types', 'ProductsController@getBrands');
	
	Route::get('models', 'ProductsController@getBrands');

	Route::get('type/{type}', 'ProductsController@getBrands');
	
	Route::get('type/{type}/models', 'ProductsController@getBrands');
	
	Route::get('uniqueNumber/{uniqueNumber}', 'ProductsController@getBrands');
	
	// wouldn't it be better if i use filters e.g query parameters to filter the searched results ? or to use 
	// distinct url for everything ?? ?? ??
	
	Route::get('type/{type}/models/{model}', 'ProductsController@getBrands');
	
	Route::get('type/{type}/models/{model}/brands', 'ProductsController@getBrands');
	
	Route::get('type/{type}/models/{model}/brands/{brand}', 'ProductsController@getBrands');
});

Route::group(['prefix' => 'orders/api/v1'], function() {
	Route::get('products', 'ProductsController@getBrands');
	
	Route::get('users/{email}', 'ProductsController@getBrands');

	Route::get('products/{product}', 'ProductsController@getBrands');
	
	// Add method for searching between two dates
});


Route::get("/administration", function() {
	return view("admin.management");
});

