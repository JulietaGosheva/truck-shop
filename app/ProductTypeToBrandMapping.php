<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProductTypeToBrandMapping extends Model
{
    public $timestamps = false;
    protected $table = "producttype_to_brand_mapping";
}
