<?php

namespace App\Http\Middleware;

use Auth;
use Closure;

use App\Roles;

use Illuminate\Contracts\Auth\Guard;

class RedirectIfAuthenticated {
    protected $auth;

    public function __construct(Guard $auth) {
        $this->auth = $auth;
    }

    public function handle($request, Closure $next) {
        if ($this->auth->check()) {
        	$user = Auth::user();

        	$role = Roles::where('id', $user->role_id)->firstOrFail();
        	if ($role->name === "Administrator") {
        		return redirect()->intended('/administration');
        	}
            return redirect()->intended('/');
        }

        return $next($request);
    }
}
