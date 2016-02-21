<?php

use Illuminate\Database\Seeder;

class NavigationItemsSeeder extends Seeder
{
    public function run()
    {
        DB::table("navigation_items")->insert([
            "name" => "root",
            "parent_id" => "1",
            "href" => "#/"
        ]);
    }
}
