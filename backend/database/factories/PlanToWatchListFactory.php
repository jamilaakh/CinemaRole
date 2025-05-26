<?php

namespace Database\Factories;

use App\Models\PlanToWatchList;
use App\Models\Show;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PlanToWatchList>
 */
class PlanToWatchListFactory extends Factory
{
   /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = PlanToWatchList::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'user_id' => $this->faker->numberBetween(1, 15),
            'show_id' => Show::factory(),
        ];
    }
}
