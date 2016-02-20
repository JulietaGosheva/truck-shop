<?php

namespace App\Http\Controllers;

use App;
use App\User;

use Validator;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

use Illuminate\Support\Facades\DB;

use App\Http\Helpers\Constants;
use App\Http\Controllers\Controller;
use App\Http\Helpers\UserPersistenceHelper;

class UsersController extends Controller  {
	
	private $persistenceHelper = null;
	
	public function __construct() {
		$this->persistenceHelper = new UserPersistenceHelper();
	}
	
	public function findUsers(Request $request, Response $response) {
		if ($request->has("id")) {
			return $this->persistenceHelper->findUserById($request, $response);
		}
		
		return $this->persistenceHelper->findUser($request, $response);
	}
	
	public function editUser(Request $request, Response $response) {
		echo "sdsdds";
		$validator = Validator::make($request->all(), [
			'id' => 'required|numeric',
			'email' => 'required|email|max:255',
			'password' => 'required|min:6',
        	'firstname' => 'required|min:1',
        	'lastname' => 'required|min:1'
		]);
		
		if ($validator->fails()) {
			$response->header(Constants::RESPONSE_HEADER, "Validation failed with the following error messages: [" . $validator->errors() . "].");
			$response->setStatusCode(Response::HTTP_UNPROCESSABLE_ENTITY);
			return $response;
		}
		
		$rawContentBody = $request->getContent();
		$requestBody = json_decode($rawContentBody);
		
		$queryResult = User::where("id", $requestBody->id)->
				update([
					"email" => $requestBody->email,
					"password" => bcrypt($requestBody->password),
					"first_name" => $requestBody->firstName,
					"last_name" => $requestBody->lastName
			   	]);
		
		if ($queryResult > 0) {
			$response->header(Constants::RESPONSE_HEADER, "Successfully updated user.");
			$response->setStatusCode(Response::HTTP_NO_CONTENT);
			return $response;
		}
				
		$response->header(Constants::RESPONSE_HEADER, "Failed to update user.");
		$response->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR);
		return $response;
	}
	
	public function deleteUser(Request $request, Response $response) {
		$validator = Validator::make($request->all(), [
			'id' => 'required|numeric'
		]);
		
		if ($validator->fails()) {
			$response->header(Constants::RESPONSE_HEADER, "\"id\" query parameter is required and must contain number as value.");
			$response->setStatusCode(Response::HTTP_UNPROCESSABLE_ENTITY);
			return $response;
		}
		
		DB::beginTransaction();
		
		$userId = $request->input("id");

		$isUserDeleted = User::find($userId)->delete();
		
		if ($isUserDeleted === false) {
			DB::rollBack();
			
			$response->header(Constants::RESPONSE_HEADER, "Failed to delete user.");
			$response->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR);
			return $response;
		}
		
		DB::commit();
		
		$response->header("Content-Type", "application/json");
		$response->header(Constants::RESPONSE_HEADER, "Successfully deleted user.");
		$response->setStatusCode(201);
		
		return $response;
	}
}