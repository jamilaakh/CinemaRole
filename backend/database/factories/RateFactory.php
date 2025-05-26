<?php

namespace Database\Factories;

use App\Models\Rate;
use App\Models\Show;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Rate>
 */
class RateFactory extends Factory
{
    protected $model = Rate::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' =>$this->faker->numberBetween(1, 30) ,
            'show_id' => $this->faker->numberBetween(1, 30),
            'score' => $this->faker->numberBetween(10, 90),
        ];
    }
}
