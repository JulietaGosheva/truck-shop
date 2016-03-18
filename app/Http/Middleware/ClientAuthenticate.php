<?php

namespace App\Http\Middleware;

use Closure;

use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;

class ClientAuthenticate
{

	public function handle($request, Closure $next) {
		$user = Auth::user();
		if ($user !== null) {
			throw new UnauthorizedHttpException("Authentication is required to perform the requested operation.");
		}
		
        return $next($request);
    }
}
