<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateVehicleTypesTable extends Migration {
	
    public function up() {
        Schema::create('vehicle_types', function (Blueprint $table) {
            $table->increments('id');
            $table->string("name", 64);
        });
    }

    public function down() {
        Schema::drop('vehicle_types');
    }
}
