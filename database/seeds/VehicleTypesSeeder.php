<?php

use Illuminate\Database\Seeder;

class VehicleTypesSeeder extends Seeder {

	public function run() {
        DB::table('vehicle_types')->insert([
            'name' => 'Automobiles',
        ]);
        DB::table('vehicle_types')->insert([
        	'name' => 'Trucks',
        ]);
    }
}
