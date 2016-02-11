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

Route::group(['prefix' => 'products/api/v1', 'middleware' => 'auth'], function() {
	
	Route::get('/', 'ProductsController@findEntities');
	
	Route::post('/', 'ProductsController@persistEntity');
	
	Route::put('/', 'ProductsController@updateEntity');
	
	Route::delete('/', 'ProductsController@deleteEntity');
	
	Route::get('/all', 'ProductsController@getAllEntries');
	
	Route::post('/image', 'ProductsController@uploadImage');
	
	Route::post('/image/{imageName}', 'ProductsController@updateImage');
	
	Route::get('/types', 'ProductTypesController@getTypes');
	
	Route::get('/types/{typeId}/brands', 'BrandsController@getBrands');
	
	Route::get('/types/{typeId}/brands/{brandId}/models', 'ModelsController@getModels');
});

Route::group(['prefix' => 'orders/api/v1'], function() {
	Route::get('/', 'ProductsController@getBrands');
	
	Route::get('/users/{email}', 'ProductsController@getBrands');

	Route::get('/products/{product}', 'ProductsController@getBrands');
	
	// Add method for searching between two dates
});

Route::get("/administration",  ['middleware' => ['auth', 'role'], function() {
	return view("admin.management");
}]);

Route::get("/registration", function() {
	return view("registration");
});

Route::post("/registration", ['middleware' => 'registration', 'AuthController@create']);

Route::get("/authentication", function() {
	return view("authentication");
});