<?php

namespace App\Http\Middleware;

use Auth;
use Closure;

use App\Roles;

use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

class RoleMiddleware
{

	public function handle($request, Closure $next)
    {
    	$user = Auth::user();
    	if ($user === null) {
    		throw new HttpException(500, "Failed to retrieve authenticated user.");
    	}
    	
    	$role = Roles::where('id', $user->role_id)->firstOrFail();
    	
    	if ($role->name !== "Administrator") {
    		throw new AccessDeniedHttpException("Permission are required for performing registration operation.");
    	}
    	
        return $next($request);
    }
    
}
