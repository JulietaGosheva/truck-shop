<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class NavigationItemsI18N extends Model
{
	public $timestamps = false;
	
    public $table = "navigation_items_i18n";

    public $fillable = ['display_name', 'language', 'navigation_item_id'];
    
    
    public function navigationItem() {
    	return $this->belongsTo("App\NavigationItems", "navigation_item_id");
    }
}
