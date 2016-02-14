<?php

namespace App\Http\Controllers\Auth;

use Auth;
use Validator;

use App\User;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;

class AuthController extends Controller
{
    use AuthenticatesAndRegistersUsers, ThrottlesLogins;

    public $loginPath = '/authentication';
    public $redirectAfterLogout = "/";
    
    public function __construct()
    {
        $this->middleware('guest', ['except' => 'getLogout']);
    }

    public function validator(array $data)
    {
        return Validator::make($data, [
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|confirmed|min:6',
        	'first_name' => 'required|min:1',
        	'last_name' => 'required|min:1',
        	'role_id' => 'required|integer'
        ]);
    }

    public function create(array $data)
    {
        return User::create([
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        	'first_name' => $data['firstName'],
        	'last_name' => $data['lastName'],
        	'role_id' => $data['roleId']
        ]);
    }
    
    public function authenticate(Request $request)
    {
    	if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
    		return redirect()->intended('index');
    	}
    	return redirect('/');
    }
    
}
