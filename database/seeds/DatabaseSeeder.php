<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        $this->call(RolesSeeder::class);
        $this->call(UsersSeeder::class);
        $this->call(NavigationItemsSeeder::class);
        $this->call(VehicleTypesSeeder::class);
        $this->call(VehicleTypesI18NSeeder::class);

        Model::reguard();
    }
}
