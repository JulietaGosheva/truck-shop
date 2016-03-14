<?php

namespace App\Exceptions;

use Log;
use Exception;

use Illuminate\Http\Response;
use App\Http\Helpers\Constants;

use Symfony\Component\HttpKernel\Exception\HttpException;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;

class Handler extends ExceptionHandler
{

	private $isStacktraceDumpEnabled = true;
	
    public function report(Exception $exception) {
    	if ($exception instanceof HttpException) {
	    	Log::error("Exception occured with status code: [" . $exception->getStatusCode() . "]. Error message: [" . $exception->getMessage() . "].\n");
    	} else {
    		Log::error("Unexpected exception occured with message: [" . $exception->getMessage() . "]\n");
    	}
    	
    	if ($this->isStacktraceDumpEnabled) {
	    	Log::error("Exception stacktrace: [" . $exception->getTraceAsString() . "]");
    	}
    }

	public function render($request, Exception $exception) {
		$baseUrl = "<a href='".$request->getBaseUrl()."'>начална страница</a>";
		
		if ($request->ajax()) {
			$response = Response::create();
			
			if ($exception instanceof HttpException) {
				$response->setStatusCode($exception->getStatusCode());
				$response->headers->set(Constants::RESPONSE_HEADER, $exception->getMessage());
				return $response;
			}
			$response->headers->set(Constants::RESPONSE_HEADER, $exception->getMessage());
			$response->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR);
			return $response;
		}
		
		if ($exception instanceof HttpException) {
			return response()->view("errors", ["statusCode" => $exception->getStatusCode(), "excpetionMessage" => $exception->getMessage(), "baseUrl" => $baseUrl]);
		}
        return response()->view("errors", ["statusCode" => $exception->getCode(), "excpetionMessage" => $exception->getMessage(), "baseUrl" => $baseUrl]);
    }
}
