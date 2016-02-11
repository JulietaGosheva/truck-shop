<?php

namespace App\Http\Middleware;

use Auth;
use Closure;
use App\Roles;

use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

class RegistrationMiddleware
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
    	if (Auth::check() === false) {
    		$request->request->set('roleId', $this->retrieveRoleIdByName('Customer'));
    		return $next($request);
    	}
    	
    	$user = Auth::user();
    	if ($user === null) {
    		throw new HttpException(500, "Failed to retrieve authenticated user.");
    	}
    	
    	if ($user->role !== "Administrator") {
    		throw new AccessDeniedHttpException("Permission are required for performing registration operation.");
    	}
    	
    	$roleName = $request->get('roleName');
		if ($roleName === null) {
			$request->request->set('roleId', 'Customer');
		} else {
			$request->request->set('roleId', $this->retrieveRoleIdByName($roleName));
		}
		
        return $next($request);
    }
    
    private function retrieveRoleIdByName($roleName) {
    	$role = Roles::with("id")->where("name", $roleName)->first();
    	if ($role === null) {
    		throw new BadRequestHttpException("Provided role does not exists.");
    	}
    	return $role->id;
    }
}
