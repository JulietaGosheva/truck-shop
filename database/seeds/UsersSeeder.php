<?php

use Illuminate\Database\Seeder;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'email' => 'administrator@gmail.com',
            'password' => bcrypt('password'),
        	'first_name' => 'Super',
        	'last_name' => 'Administrator',
        	'role_id' => 1
        ]);
    }
}
