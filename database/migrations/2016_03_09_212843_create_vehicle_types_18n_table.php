<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateVehicleTypes18nTable extends Migration {

	public function up() {
        Schema::create('vehicle_types_i18n', function (Blueprint $table) {
            $table->increments('id');
            $table->string('language', 16);
            $table->string('display_name', 128);
            $table->integer('vehicle_type_id')->unsigned();
            $table->foreign('vehicle_type_id')->references('id')->on('vehicle_types')->onDelete('cascade');
        });
    }

    public function down() {
        Schema::drop('vehicle_types_i18n');
    }
}
