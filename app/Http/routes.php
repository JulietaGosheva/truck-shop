<?php

/*
 |--------------------------------------------------------------------------
 | Application Routes
 |--------------------------------------------------------------------------
 | 
 | This routes are used by application for data management. 
 |
 */

Route::get('/', function () {
    return view('index');
});

Route::get("/administration",  ['middleware' => ['auth', 'role'], function() {
	return view("admin.management");
}]);

Route::group(['prefix' => 'products/api/v1'], function() {
	
	Route::get('/', 'ProductsController@findEntities');
	
	Route::post('/', ['middleware' => ['auth', 'role'], 'uses' => 'ProductsController@persistEntity']);
	
	Route::put('/', ['middleware' => ['auth', 'role'], 'uses' => 'ProductsController@updateEntity']);
	
	Route::delete('/', ['middleware' => ['auth', 'role'], 'uses' => 'ProductsController@deleteEntity']);
	
	Route::get('/all', 'ProductsController@getAllEntries');
	
	Route::post('/image', ['middleware' => ['auth', 'role'], 'uses' => 'ProductsController@uploadImage']);
	
	Route::post('/image/{imageName}', ['middleware' => ['auth', 'role'], 'uses' => 'ProductsController@updateImage']);
	
	Route::get('/types', 'ProductTypesController@getTypes');
	
	Route::get('/types/{typeId}/brands', 'BrandsController@getBrands');
	
	Route::get('/types/{typeId}/brands/{brandId}/models', 'ModelsController@getModels');
});

Route::group(['prefix' => 'users/api/v1'], function() {
	Route::get('/', ['middleware' => ['auth', 'role'], 'uses' => 'UsersController@findUsers']);
	
	Route::post('/', ['middleware' => ['registration', 'auth', 'role'], 'uses' => 'Auth\AuthController@createUser']);
	
	Route::put('/', ['middleware' => ['auth', 'role'], 'uses' => 'UsersController@editUser']);
	
	Route::delete('/', ['middleware' => ['auth', 'role'], 'uses' => 'UsersController@deleteUser']);
	
	Route::get('/data', 'UsersController@retrieveUserData');
});

Route::group(['prefix' => 'navigation/api/v1'], function() {
	Route::get('/', 'NavigationController@findItem');
	
	Route::post('/', ['middleware' => ['auth', 'role'], 'uses' => 'NavigationController@createItem']);

	Route::put('/', ['middleware' => ['auth', 'role'], 'uses' => 'NavigationController@editItem']);

	Route::delete('/', ['middleware' => ['auth', 'role'], 'uses' => 'NavigationController@deleteItem']);

	Route::get('/items', 'NavigationController@getItems');
	
	Route::get('/items/root', ['middleware' => ['auth', 'role'], 'uses' => 'NavigationController@getRootItems']);
});

Route::group(['prefix' => 'orders/api/v1'], function() {
	//TODO: Add method for searching between two dates
});

/*
 |--------------------------------------------------------------------------
 | Login/Logout/Registration Routes
 |--------------------------------------------------------------------------
 |
 | This routes are used for login, logout and registration.
 |
 */

Route::get('/logout', 'Auth\AuthController@getLogout');

Route::post("/authentication", "Auth\AuthController@authenticate");

Route::post("/client/authentication", "Auth\AuthController@authenticate");

Route::get("/authentication", function() { return view("authentication"); });

Route::get("/registration", function() { return view("registration"); });

Route::post("/registration", ['middleware' => ['registration'], 'uses' => 'Auth\AuthController@createUser']);

