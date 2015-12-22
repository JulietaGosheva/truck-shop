<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Brands extends Model
{
    public $timestamps = false;
    protected $table = "brands";

    protected $fillable = ['name'];
    
    
    public function models() {
    	return $this->belongsToMany("App\Models", "brand_to_model_mapping", "brand_id", "model_id");
    }
}
