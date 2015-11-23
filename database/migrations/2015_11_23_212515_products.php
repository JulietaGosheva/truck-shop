<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Products extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 128);
            $table->integer('unique_id')->unsigned();
            $table->integer('brand_id')->unsigned();
            $table->integer('product_type_id')->unsigned();
            $table->integer('model_id')->unsigned();
            $table->foreign('brand_id')->references('id')->on('brands');
            $table->foreign('product_type_id')->references('id')->on('product_types');
            $table->foreign('model_id')->references('id')->on('models');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('products');
    }
}
