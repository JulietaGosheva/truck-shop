<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class VehicleTypes extends Model {
	
	public $timestamps = false;
    public $table = "vehicle_types";
    
    public $fillable = ['name'];
}
