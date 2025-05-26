<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = User::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->name,
            'email' => $this->faker->unique()->safeEmail,
            'email_verified_at' => now(),
            'password' => '$2y$12$bgcuxE1BeeMMwlGyOFkk1eJzlrruQQQEoio8da3pNrgPi3KEZzDNW', // password
            'remember_token' => Str::random(10),
            'profile_picture' => $this->faker->imageUrl(), 
            'cover_picture'   => $this->faker->imageUrl(),           
            // Assuming profile_picture is a URL
        ];
    }
}
