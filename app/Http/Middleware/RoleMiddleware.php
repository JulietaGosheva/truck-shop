<?php

namespace App\Http\Middleware;

use Auth;
use Closure;

use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
    	$user = Auth::user();
    	if ($user === null) {
    		throw new HttpException(500, "Failed to retrieve authenticated user.");
    	}
    	
    	if ($user->role !== "Administrator") {
    		throw new AccessDeniedHttpException("Permission are required for performing registration operation.");
    	}
    	
        return $next($request);
    }
}
