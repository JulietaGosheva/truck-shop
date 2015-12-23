<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Products extends Model
{
    public $timestamps = false;
    protected $table = "products";
    
    protected $fillable = ["name", "unique_id", "brand_id", "product_type_id", "model_id", "image_name", "price"];
    
    public function brands() {
    	return $this->belongsTo("App\Brands", "brand_id");
    }
    
    public function models() {
    	return $this->belongsTo("App\Models", "model_id");
    }
    
    public function productTypes() {
    	return $this->belongsTo("App\ProductTypes", "product_type_id");
    }
}
