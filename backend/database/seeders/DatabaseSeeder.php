<?php

namespace Database\Seeders;

use App\Models\News;
use App\Models\Show;
use App\Models\User;
use App\Models\Activity;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\PlanToWatchList;
use Illuminate\Database\Seeder;
use App\Models\FavoriteShowsList;
use App\Models\Genre;
use App\Models\Rate;
use GuzzleHttp\Promise\Create;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        // User::factory(30)->create();

        // Genre::factory(10)->Create();


        // Show::factory(30)->create();

        // PlanToWatchList::factory(30)->create();

        // FavoriteShowsList::factory(30)->create();

        // Rate::factory(20)->create();

        // Activity::factory(10)->create();

        News::factory(10)->create();
    }
}
