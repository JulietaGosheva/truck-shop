<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Orders extends Model
{
    public $timestamps = false;
    public $table = "orders";
    public $fillable = ['user_id', 'product_id', 'order_date', 'delivery_date', 'is_payed', 'delivery_info', 'in_order_with', 'order_count'];
    
    public function users() {
    	return $this->belongsTo("App\User", "user_id");
    }
    
    public function products() {
    	return $this->belongsTo("App\Products", "product_id");
    }
}
