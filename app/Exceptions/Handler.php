<?php

namespace App\Exceptions;

use Log;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;

class Handler extends ExceptionHandler
{

	protected $dontReport = [
        ModelNotFoundException::class,
    ];

    public function report(Exception $exception) {
    	if ($exception instanceof HttpException) {
	    	Log::error("Exception occured with status code: [" . $exception->getStatusCode() . "]. Error message: [" . $exception->getMessage() . "].");
    	} else {
    		Log::error("Unexpected exception occured with message: [" . $exception->getMessage() . "]");
    	}
    	
    	Log::error("Exception stacktrace: [" . $exception->getTraceAsString() . "]");
        return parent::report($exception);
    }

	public function render($request, Exception $exception) {
		$baseUrl = "<a href='".$request->getBaseUrl()."'>начална страница</a>";
		
		if ($exception instanceof HttpException) {
			return response()->view("errors", ["statusCode" => $exception->getStatusCode(), "excpetionMessage" => $exception->getMessage(), "baseUrl" => $baseUrl]);
		}
        return response()->view("errors", ["statusCode" => $exception->getCode(), "excpetionMessage" => $exception->getMessage(), "baseUrl" => $baseUrl]);
    }
}
