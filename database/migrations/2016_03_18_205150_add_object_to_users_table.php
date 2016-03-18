<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddObjectToUsersTable extends Migration {

	public function up() {
        Schema::table('users', function (Blueprint $table) {
            $table->string("object_name", 64)->nullable();
        });
    }

    public function down() {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn("object_name");
        });
    }
}
