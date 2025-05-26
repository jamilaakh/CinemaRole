<?php

namespace Database\Factories;
// database/factories/ActivityFactory.php

use App\Models\Activity;
use App\Models\User;
use App\Models\Show;
use Illuminate\Database\Eloquent\Factories\Factory;

class ActivityFactory extends Factory
{
    protected $model = Activity::class;

    public function definition()
    {
        return [
            'user_id' => User::factory(),
            'show_id' => Show::factory(),
            'action' => $this->faker->randomElement(['add', 'remove']),
            'list_type' => $this->faker->randomElement(['plan_to_watch', 'favorite']),
        ];
    }
}

