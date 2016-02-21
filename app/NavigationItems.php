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
}
