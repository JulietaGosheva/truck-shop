<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddCascadeToConstraintInProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('products', function (Blueprint $table) {
            $table->engine = "InnoDB";
            
            $table->dropForeign("products_brand_id_foreign");
            $table->dropForeign("products_product_type_id_foreign");
            $table->dropForeign("products_model_id_foreign");
            
            $table->foreign('brand_id')->references('id')->on('brands')->onDelete('cascade');
            $table->foreign('product_type_id')->references('id')->on('product_types')->onDelete('cascade');
            $table->foreign('model_id')->references('id')->on('models')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('products', function (Blueprint $table) {
        	$table->dropForeign("products_brand_id_foreign");
        	$table->dropForeign("products_product_type_id_foreign");
        	$table->dropForeign("products_model_id_foreign");
        	
            $table->foreign('brand_id')->references('id')->on('brands');
            $table->foreign('product_type_id')->references('id')->on('product_types');
            $table->foreign('model_id')->references('id')->on('models');
        });
    }
}
