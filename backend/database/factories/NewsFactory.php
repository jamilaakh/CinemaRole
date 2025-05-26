<?php

namespace Database\Factories;

use App\Models\News;
use App\Models\Show;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\News>
 */
class NewsFactory extends Factory
{
    
    protected $model = News::class;

    public function definition()
    {
        return [
            'title' => $this->faker->title(),
            'content' => $this->faker->paragraph,
            'show_id'=>null,
            'image'=>'news/byRDWktpvxwVWqQBNFUb15IGMos5PXf9fJvGvdz9.jpg'
        ];
    }
}
