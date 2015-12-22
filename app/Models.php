<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Models extends Model
{
    public $timestamps = false;
    protected $table = "models";
    
    protected $fillable = ['name'];
    
}
