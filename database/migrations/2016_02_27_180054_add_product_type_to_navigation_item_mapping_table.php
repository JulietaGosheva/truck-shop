<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddProductTypeToNavigationItemMappingTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('producttype_to_navigationitem_mapping', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('product_type_id')->unsigned();
            $table->integer('navigation_item_id')->unsigned();
            $table->foreign('product_type_id')->references('id')->on('product_types')->onDelete('cascade');
            $table->foreign('navigation_item_id')->references('id')->on('navigation_items')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('producttype_to_navigationitem_mapping');
    }
}
