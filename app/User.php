<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Foundation\Auth\Access\Authorizable;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;

class User extends Model implements AuthenticatableContract,
                                    AuthorizableContract,
                                    CanResetPasswordContract
{
    use Authenticatable, Authorizable, CanResetPassword;

    public $table = 'users';
    public $timestamps = false;
    public $hidden = ['password', 'role_id'];
    public $fillable = ['email', 'password', 'first_name', 'last_name', 'role_id', 'object_name'];
    
    public function role() {
    	return $this->belongsTo("App\Roles", "role_id");
    }
    
    /* @Override */
    public function getRememberToken()
    {
    	return null;
    }
    
    /* @Override */
    public function setRememberToken($value)
    {
		//do nothing
    }
    
    /* @Override */
    public function getRememberTokenName()
    {
    	return null;
    }
}
