<?php

namespace App\Http\Middleware;

use Auth;
use Closure;

use Illuminate\Http\Response;

use App\Roles;
use App\Http\Helpers\Constants;

use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class RegistrationMiddleware
{

	public function handle($request, Closure $next)
    {
    	$response = new Response();
    	
    	if (Auth::check() === false) {
    		$request->request->set('roleId', $this->retrieveRoleIdByName('Customer'));
    		return $next($request);
    	}
    	
    	$user = Auth::user();
    	if ($user === null) {
    		$response->header(Constants::RESPONSE_HEADER, "Failed to retrieve authenticated user.");
    		$response->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR);
    		return $response;
    	}
    	
    	$role = Roles::where('id', $user->role_id)->firstOrFail();
    	
    	if ($role->name !== "Administrator") {
    		$response->header(Constants::RESPONSE_HEADER, "Permission are required for performing registration operation.");
    		$response->setStatusCode(Response::HTTP_FORBIDDEN);
    		return $response;
    	}

    	try {
	    	$roleName = $request->get('roleName');
			if ($roleName === null) {
				$request->request->set('roleId', $this->retrieveRoleIdByName('Customer'));
			} else {
				$request->request->set('roleId', $this->retrieveRoleIdByName($roleName));
			}
    	} catch (Exception $exception) {
    		$response->header(Constants::RESPONSE_HEADER, $exception->getMessage());
    		$response->setStatusCode(Response::HTTP_BAD_REQUEST);
    		return $response;
    	}
		
        return $next($request);
    }
    
    private function retrieveRoleIdByName($roleName) {
    	$role = Roles::where("name", $roleName)->first();
    	if ($role === null) {
    		throw new BadRequestHttpException("Provided role does not exists.");
    	}
    	return $role->id;
    }
}
