<?php

namespace Database\Seeders;

use App\Models\Album;
use App\Models\Artist;
use App\Models\Playlist;
use App\Models\Song;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1 usuário de teste
        $user = User::factory()->create([
            'email' => 'aluno@ifsp.edu.br',
            'password' => bcrypt('password'),
        ]);

        // 5 artistas
        $artists = Artist::factory(5)->create();

        foreach ($artists as $artist) {
            // 3 álbuns por artista
            $albums = Album::factory(3)->create(['artist_id' => $artist->id]);

            foreach ($albums as $album) {
                // 10 músicas por álbum
                Song::factory(10)->create(['album_id' => $album->id]);
            }
        }

        // 3 playlists para o usuário
        $playlists = Playlist::factory(3)->create(['user_id' => $user->id]);

        foreach ($playlists as $playlist) {
            // Coloca 8 músicas aleatórias em cada playlist
            $playlist->songs()->attach(
                Song::inRandomOrder()->limit(8)->pluck('id')
            );
        }
    }
}