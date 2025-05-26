<?php

namespace Database\Factories;

use App\Models\FavoriteShowsList;
use App\Models\Show;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class FavoriteShowsListFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = FavoriteShowsList::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'user_id' => $this->faker->numberBetween(1, 15) ,
            'show_id' => Show::factory() ,
        ];
    }
}
