<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class NavigationItemsToVehicleTypesMapping extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('navigationitem_to_vehicletype_mapping', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('navigation_item_id')->unsigned();
            $table->integer('vehicle_type_id')->unsigned();
            $table->foreign('navigation_item_id')->references('id')->on('navigation_items')->onDelete('cascade');
            $table->foreign('vehicle_type_id')->references('id')->on('vehicle_types')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('navigationitem_to_vehicletype_mapping');
    }
}
