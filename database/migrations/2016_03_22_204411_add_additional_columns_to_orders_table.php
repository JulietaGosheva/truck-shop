<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddAdditionalColumnsToOrdersTable extends Migration {
    
	public function up() {
        Schema::table('orders', function (Blueprint $table) {
        	$table->dateTime('order_date');
        	$table->dateTime('delivery_date');
        	$table->boolean('is_payed')->default(false);
        	$table->text('delivery_info');
        	$table->integer('in_order_with')->unsigned();
        	$table->smallInteger('order_count')->unsigned()->default(1);
        });
    }

    public function down() {
        Schema::table('orders', function (Blueprint $table) {
        	$table->dropColumn('order_date');
        	$table->dropColumn('delivery_date');
        	$table->dropColumn('is_payed');
        	$table->dropColumn('delivery_info');
        	$table->dropColumn('in_order_with');
        	$table->dropColumn('order_count');
        });
    }
}
