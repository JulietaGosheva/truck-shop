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
	
	Route::get('/', 'ProductsController@findEntity');
	
	Route::post('/', 'ProductsController@persistEntity');
	
	Route::put('/', 'ProductsController@updateEntity');
	
	Route::delete('/', 'ProductsController@deleteEntity');
	
	Route::get('/all', 'ProductsController@getAllEntries');
	
	Route::post('/image', 'ProductsController@uploadImage');
	
	Route::get('/types', 'ProductsController@getTypes');
	
	Route::get('/types/{typeId}/brands', 'ProductsController@getBrands');
	
	Route::get('/types/{typeId}/brands/{brandId}/models', 'ProductsController@getModels');
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

