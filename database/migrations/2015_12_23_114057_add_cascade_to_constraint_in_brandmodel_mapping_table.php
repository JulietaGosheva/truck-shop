<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddCascadeToConstraintInBrandmodelMappingTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('brand_to_model_mapping', function (Blueprint $table) {
            $table->engine = "InnoDB";
            
            $table->dropForeign("brand_to_model_mapping_brand_id_foreign");
            $table->dropForeign("brand_to_model_mapping_model_id_foreign");

            $table->foreign('brand_id')->references('id')->on('brands')->onDelete('cascade');
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
        Schema::table('brand_to_model_mapping', function (Blueprint $table) {
            $table->dropForeign("brand_to_model_mapping_brand_id_foreign");
            $table->dropForeign("brand_to_model_mapping_model_id_foreign");
        	
            $table->foreign('brand_id')->references('id')->on('brands');
            $table->foreign('model_id')->references('id')->on('models');
        });
    }
}
