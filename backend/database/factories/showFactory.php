<?php

namespace Database\Factories;

use App\Models\Genre;
use App\Models\Show;
use Illuminate\Database\Eloquent\Factories\Factory;
class ShowFactory extends Factory
{
    protected $model = Show::class;

    public function definition()
    {
        return [
            'title' => $this->faker->sentence,
            'description' => $this->faker->paragraph,
            'release_date' => $this->faker->date,
            'genre_id' => $this->faker->numberBetween(1,10),
            'poster_img'=>'https://rukminim2.flixcart.com/image/416/416/jf8khow0/poster/a/u/h/small-hollywood-movie-poster-blade-runner-2049-ridley-scott-original-imaf3qvx88xenydd.jpeg?q=70&crop=false'
        ];
    }
}
