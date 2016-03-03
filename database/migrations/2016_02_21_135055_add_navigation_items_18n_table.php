<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddNavigationItems18nTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('navigation_items_i18n', function (Blueprint $table) {
            $table->increments('id');
            $table->string('language', 16);
            $table->string('display_name', 128);
            $table->integer('navigation_item_id')->unsigned();
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
        Schema::drop('navigation_items_i18n');
    }
}
