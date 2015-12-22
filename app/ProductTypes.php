<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProductTypes extends Model
{
    public $timestamps = false;
    protected $table = "product_types";
    
    protected $fillable = ['name'];
    
    public function brands() {
    	return $this->belongsToMany("App\Brands", "producttype_to_brand_mapping", "product_type_id", "brand_id");
    }
}
