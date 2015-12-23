<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddCascadeToConstraintInTypebrandMappingTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('producttype_to_brand_mapping', function (Blueprint $table) {
            $table->engine = "InnoDB";
            
            $table->dropForeign("producttype_to_brand_mapping_brand_id_foreign");
            $table->dropForeign("producttype_to_brand_mapping_product_type_id_foreign");
            
            $table->foreign('brand_id')->references('id')->on('brands')->onDelete('cascade');
            $table->foreign('product_type_id')->references('id')->on('product_types')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('producttype_to_brand_mapping', function (Blueprint $table) {
            $table->dropForeign("producttype_to_brand_mapping_brand_id_foreign");
        	$table->dropForeign("producttype_to_brand_mapping_product_type_id_foreign");
        	
            $table->foreign('brand_id')->references('id')->on('brands');
            $table->foreign('product_type_id')->references('id')->on('product_types');
        });
    }
}
