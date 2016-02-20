<?php

namespace App\Http\Helpers;

use App;
use App\User;

use Validator;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

class UserPersistenceHelper {
	
	public function findUserById(Request $request, Response $response) {
		$validator = Validator::make($request->all(), [
				'id' => 'required|numeric'
		]);
	
		if ($validator->fails()) {
			$response->header(Constants::RESPONSE_HEADER, "\"id\" query parameter is required and must contain number as value.");
			$response->setStatusCode(Response::HTTP_UNPROCESSABLE_ENTITY);
			return $response;
		}
			
		$id = $request->input("id");
	
		$product = User::with('role')->find($id);
	
		if ($product === null) {
			$response->header(Constants::RESPONSE_HEADER, "User not found.");
			$response->setStatusCode(Response::HTTP_NO_CONTENT);
			return $response;
		}
	
		$response->header(Constants::RESPONSE_HEADER, "Successfully retrieved data.");
	
		return $product;
	}
	
	public function findUser(Request $request, Response $response) {
		$queryBuilder = User::with('role');
		
		if ($request->has("email")) {
			$queryBuilder->where("email", $request->email);
		}
		
		if ($request->has("firstname")) {
			$queryBuilder->where("first_name", $request->firstname);
		}
		
		if ($request->has("lastname")) {
			$queryBuilder->where("last_name", $request->lastname);
		}
		
		return $queryBuilder->get();
	}
	
}