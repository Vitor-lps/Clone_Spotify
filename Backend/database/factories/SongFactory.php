<?php

namespace Database\Factories;

use App\Models\Song;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Album;
/**
 * @extends Factory<Song>
 */
class SongFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'album_id'=> Album::factory(),
            'title'=> fake()->words(3,true),
            'duration' => fake()->numberBetween(120, 320),
            'file_path' => null,
            'plays' => fake()->numberBetween(0,5000),
        ];
    }
}
