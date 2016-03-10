<?php

use Illuminate\Database\Seeder;

class VehicleTypesI18NSeeder extends Seeder {
	
    public function run() {
        DB::table("vehicle_types_i18n")->insert([
            "language" => "bg-BG",
        	"display_name" => "Автомобили",
			"vehicle_type_id" => "1"
        ]);
        
        DB::table("vehicle_types_i18n")->insert([
        		"language" => "bg-BG",
        		"display_name" => "Камиони",
        		"vehicle_type_id" => "2"
        ]);
    }
}
