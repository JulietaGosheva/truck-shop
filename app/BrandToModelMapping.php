<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BrandToModelMapping extends Model
{
    public $timestamps = false;
    protected $table = "brand_to_model_mapping";
}
