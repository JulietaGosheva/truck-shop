<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class NavigationItems extends Model
{
	public $timestamps = false;
	
    public $table = "navigation_items";

    public $fillable = ['name', 'href', 'parent_id'];
    
    
    public function navigationItemI18N() {
    	return $this->hasMany("App\NavigationItemsI18N", "navigation_item_id");
    }
    
    public function productTypes() {
    	return $this->belongsToMany("App\ProductTypes", "producttype_to_navigationitem_mapping", "navigation_item_id", "product_type_id");
    }
    
    public function vehicleTypes() {
    	return $this->belongsToMany("App\VehicleTypes", "navigationitem_to_vehicletype_mapping", "navigation_item_id", "vehicle_type_id");
    }
    
}
