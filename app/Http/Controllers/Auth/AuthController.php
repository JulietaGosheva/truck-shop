<?php

namespace App\Http\Controllers\Auth;

use Auth;
use Validator;

use App\User;
use App\Http\Helpers\Constants;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;

use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;

class AuthController extends Controller
{
    use AuthenticatesAndRegistersUsers, ThrottlesLogins;

    public $loginPath = '/authentication';
    public $redirectAfterLogout = "/";
    
    public function validator(array $data) {
        return Validator::make($data, [
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|min:6',
        	'firstname' => 'required|min:1',
        	'lastname' => 'required|min:1',
        	'roleId' => 'required|integer'
        ]);
    }

    public function createUser(Request $request, Response $response) {
    	$validator = $this->validator($request->all());
    	
    	if ($validator->fails()) {
    		$response->header(Constants::RESPONSE_HEADER, "Validation failed with the following error messages: [" . $validator->errors() . "].");
    		$response->setStatusCode(Response::HTTP_BAD_REQUEST);
    		return $response;
    	}
    	
    	$user = User::create([
    		'email' => $request->input('email'),
    		'password' => bcrypt($request->input('password')),
    		'first_name' => $request->input('firstname'),
    		'last_name' => $request->input('lastname'),
    		'role_id' => $request->input('roleId')
    	]);
    	
    	if ($user === null) {
    		$response->header(Constants::RESPONSE_HEADER, "Failed to create user.");
    		$response->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR);
    		return $response;
    	}
    	
        return $user;
    }
    
    public function authenticate(Request $request) {
    	if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
    		return redirect()->intended('index');
    	}
    	throw new UnauthorizedHttpException("Wrong email or password.");
    }
    
}
