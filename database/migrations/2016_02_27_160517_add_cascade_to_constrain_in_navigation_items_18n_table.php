<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddCascadeToConstrainInNavigationItems18nTable extends Migration {

	public function up() {
		Schema::table('navigation_items_i18n', function (Blueprint $table) {
			$table->engine = "InnoDB";
			
			$table->dropForeign("navigation_items_i18n_navigation_item_id_foreign");
			
			$table->foreign('navigation_item_id')->references('id')->on('navigation_items')->onDelete('cascade');
		});
    }

    public function down() {
    	Schema::table('navigation_items_i18n', function (Blueprint $table) {
    		$table->dropForeign("navigation_items_i18n_navigation_item_id_foreign");
    		 
    		$table->foreign('navigation_item_id')->references('id')->on('navigation_items');
    	});
    }
}
